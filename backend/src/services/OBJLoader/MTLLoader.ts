import {
    Color,
    DefaultLoadingManager,
    FileLoader,
    FrontSide,
    Loader,
    LoaderUtils,
    MeshPhongMaterial,
    RepeatWrapping,
    TextureLoader,
    Vector2,
    SRGBColorSpace,
    Material,
    LoadingManager,
    Mapping,
    BufferGeometry,
    Side,
    Texture,
    Wrapping,
} from "three";

export interface MaterialCreatorOptions {
    /**
     * side: Which side to apply the material
     * THREE.FrontSide (default), THREE.BackSide, THREE.DoubleSide
     */
    side: Side | undefined;
    /*
     * wrap: What type of wrapping to apply for textures
     * THREE.RepeatWrapping (default), THREE.ClampToEdgeWrapping, THREE.MirroredRepeatWrapping
     */
    wrap: Wrapping | undefined;
    /*
     * normalizeRGB: RGBs need to be normalized to 0-1 from 0-255
     * Default: false, assumed to be already normalized
     */
    normalizeRGB: boolean | undefined;
    /*
     * ignoreZeroRGBs: Ignore values of RGBs (Ka,Kd,Ks) that are all 0's
     * Default: false
     */
    ignoreZeroRGBs: boolean | undefined;
    /*
     * invertTrProperty: Use values 1 of Tr field for fully opaque. This option is useful for obj
     * exported from 3ds MAX, vcglib or meshlab.
     * Default: false
     */
    invertTrProperty: boolean | undefined;
}

export interface MaterialInfo {
    ks?: number[];
    kd?: number[];
    ke?: number[];
    map_kd?: string;
    map_ks?: string;
    map_ke?: string;
    norm?: string;
    map_bump?: string;
    bump?: string;
    map_d?: string;
    ns?: number;
    d?: number;
    tr?: number;
}

export interface TexParams {
    scale: Vector2;
    offset: Vector2;
    url: string;
}

/**
 * Create a new MTLLoader.MaterialCreator
 * @param baseUrl - Url relative to which textures are loaded
 * @param options - Set of options on how to construct the materials
 *                  side: Which side to apply the material
 *                        FrontSide (default), THREE.BackSide, THREE.DoubleSide
 *                  wrap: What type of wrapping to apply for textures
 *                        RepeatWrapping (default), THREE.ClampToEdgeWrapping, THREE.MirroredRepeatWrapping
 *                  normalizeRGB: RGBs need to be normalized to 0-1 from 0-255
 *                                Default: false, assumed to be already normalized
 *                  ignoreZeroRGBs: Ignore values of RGBs (Ka,Kd,Ks) that are all 0's
 *                                  Default: false
 * @constructor
 */

class MaterialCreator {
    baseUrl: string;
    options: MaterialCreatorOptions;
    materialsInfo: { [key: string]: MaterialInfo };
    materials: { [key: string]: Material };
    private materialsArray: Material[];
    nameLookup: { [key: string]: number };
    side: Side;
    wrap: Wrapping;
    crossOrigin: string;
    manager?: LoadingManager;

    constructor(baseUrl?: string, options?: MaterialCreatorOptions) {
        this.baseUrl = baseUrl || "";
        this.options = options || ({} as MaterialCreatorOptions);
        this.materialsInfo = {};
        this.materials = {};
        this.materialsArray = [];
        this.nameLookup = {};

        this.crossOrigin = "anonymous";

        this.side = this.options.side !== undefined ? this.options.side : FrontSide;
        this.wrap = this.options.wrap !== undefined ? this.options.wrap : RepeatWrapping;
    }

    setCrossOrigin(value: string): this {
        this.crossOrigin = value;
        return this;
    }

    setManager(value: LoadingManager): void {
        this.manager = value;
    }

    setMaterials(materialsInfo: { [key: string]: MaterialInfo }): void {
        this.materialsInfo = this.convert(materialsInfo);
        this.materials = {};
        this.materialsArray = [];
        this.nameLookup = {};
    }

    convert(materialsInfo: { [key: string]: MaterialInfo }): { [key: string]: MaterialInfo } {
        if (!this.options) return materialsInfo;

        const converted = {} as any;

        for (const mn in materialsInfo) {
            // Convert materials info into normalized form based on options

            const mat = materialsInfo[mn] as any;

            const covmat = {} as any;

            converted[mn] = covmat;

            for (const prop in mat) {
                let save = true;
                let value = mat[prop];
                const lprop = prop.toLowerCase();

                switch (lprop) {
                    case "kd":
                    case "ka":
                    case "ks":
                        // Diffuse color (color under white light) using RGB values

                        if (this.options && this.options.normalizeRGB) {
                            value = [value[0] / 255, value[1] / 255, value[2] / 255];
                        }

                        if (this.options && this.options.ignoreZeroRGBs) {
                            if (value[0] === 0 && value[1] === 0 && value[2] === 0) {
                                // ignore

                                save = false;
                            }
                        }
                        break;

                    default:
                        break;
                }

                if (save) {
                    covmat[lprop] = value;
                }
            }
        }

        return converted;
    }

    preload(): void {
        for (const mn in this.materialsInfo) {
            this.create(mn);
        }
    }

    getIndex(materialName: string): number {
        return this.nameLookup[materialName];
    }

    getAsArray(): Material[] {
        let index = 0;

        for (const mn in this.materialsInfo) {
            this.materialsArray[index] = this.create(mn);
            this.nameLookup[mn] = index;
            index++;
        }

        return this.materialsArray;
    }

    create(materialName: string): Material {
        if (this.materials[materialName] === undefined) {
            this.createMaterial_(materialName);
        }

        return this.materials[materialName];
    }

    createMaterial_(materialName: string): Material {
        // Create material

        const scope = this;
        const mat = this.materialsInfo[materialName] as any;
        const params = {
            name: materialName,
            side: this.side,
        } as any;

        function resolveURL(baseUrl: string, url: string) {
            if (typeof url !== "string" || url === "") return "";

            // Absolute URL
            if (/^https?:\/\//i.test(url)) return url;

            return baseUrl + url;
        }

        function setMapForType(mapType: string, value: string) {
            if (params[mapType]) return; // Keep the first encountered texture

            const texParams = scope.getTextureParams(value, params);
            const map = scope.loadTexture(resolveURL(scope.baseUrl, texParams.url));

            map.repeat.copy(texParams.scale);
            map.offset.copy(texParams.offset);

            map.wrapS = scope.wrap;
            map.wrapT = scope.wrap;

            if (mapType === "map" || mapType === "emissiveMap") {
                map.colorSpace = SRGBColorSpace;
            }

            params[mapType] = map;
        }

        for (const prop in mat) {
            const value = mat[prop];
            let n;

            if (value === "") continue;

            switch (prop.toLowerCase()) {
                // Ns is material specular exponent

                case "kd":
                    // Diffuse color (color under white light) using RGB values

                    params.color = new Color().fromArray(value).convertSRGBToLinear();

                    break;

                case "ks":
                    // Specular color (color when light is reflected from shiny surface) using RGB values
                    params.specular = new Color().fromArray(value).convertSRGBToLinear();

                    break;

                case "ke":
                    // Emissive using RGB values
                    params.emissive = new Color().fromArray(value).convertSRGBToLinear();

                    break;

                case "map_kd":
                    // Diffuse texture map

                    setMapForType("map", value);

                    break;

                case "map_ks":
                    // Specular map

                    setMapForType("specularMap", value);

                    break;

                case "map_ke":
                    // Emissive map

                    setMapForType("emissiveMap", value);

                    break;

                case "norm":
                    setMapForType("normalMap", value);

                    break;

                case "map_bump":
                case "bump":
                    // Bump texture map

                    setMapForType("bumpMap", value);

                    break;

                case "map_d":
                    // Alpha map

                    setMapForType("alphaMap", value);
                    params.transparent = true;

                    break;

                case "ns":
                    // The specular exponent (defines the focus of the specular highlight)
                    // A high exponent results in a tight, concentrated highlight. Ns values normally range from 0 to 1000.

                    params.shininess = parseFloat(value);

                    break;

                case "d":
                    n = parseFloat(value);

                    if (n < 1) {
                        params.opacity = n;
                        params.transparent = true;
                    }

                    break;

                case "tr":
                    n = parseFloat(value);

                    if (this.options && this.options.invertTrProperty) n = 1 - n;

                    if (n > 0) {
                        params.opacity = 1 - n;
                        params.transparent = true;
                    }

                    break;

                default:
                    break;
            }
        }

        this.materials[materialName] = new MeshPhongMaterial(params);
        return this.materials[materialName];
    }

    getTextureParams(value: string, matParams: any): TexParams {
        const texParams = {
            scale: new Vector2(1, 1),
            offset: new Vector2(0, 0),
            url: "",
        };

        const items = value.split(/\s+/);
        let pos;

        pos = items.indexOf("-bm");

        if (pos >= 0) {
            matParams.bumpScale = parseFloat(items[pos + 1]);
            items.splice(pos, 2);
        }

        pos = items.indexOf("-s");

        if (pos >= 0) {
            texParams.scale.set(parseFloat(items[pos + 1]), parseFloat(items[pos + 2]));
            items.splice(pos, 4); // we expect 3 parameters here!
        }

        pos = items.indexOf("-o");

        if (pos >= 0) {
            texParams.offset.set(parseFloat(items[pos + 1]), parseFloat(items[pos + 2]));
            items.splice(pos, 4); // we expect 3 parameters here!
        }

        texParams.url = items.join(" ").trim();
        return texParams;
    }

    loadTexture(
        url: string,
        mapping?: Mapping,
        onLoad?: (bufferGeometry: BufferGeometry) => void,
        onProgress?: (event: ProgressEvent) => void,
        onError?: (event: ErrorEvent) => void
    ): Texture {
        const manager = this.manager !== undefined ? this.manager : DefaultLoadingManager;
        let loader = manager.getHandler(url) as any;

        if (loader === null) {
            loader = new TextureLoader(manager);
        }

        if (loader.setCrossOrigin) loader.setCrossOrigin(this.crossOrigin);

        const texture = loader.load(url, onLoad, onProgress, onError);

        if (mapping !== undefined) texture.mapping = mapping;

        return texture;
    }
}

/**
 * Loads a Wavefront .mtl file specifying materials
 */
class MTLLoader extends Loader {
    materialOptions!: MaterialCreatorOptions;

    constructor(manager?: LoadingManager) {
        super(manager);
    }

    /**
     * Loads and parses a MTL asset from a URL.
     *
     * @param {String} url - URL to the MTL file.
     * @param {Function} [onLoad] - Callback invoked with the loaded object.
     * @param {Function} [onProgress] - Callback for download progress.
     * @param {Function} [onError] - Callback for download errors.
     *
     * @see setPath setResourcePath
     *
     * @note In order for relative texture references to resolve correctly
     * you must call setResourcePath() explicitly prior to load.
     */
    load(
        url: string,
        onLoad: (materialCreator: MaterialCreator) => void,
        onProgress?: (event: ProgressEvent) => void,
        onError?: (event: ErrorEvent) => void
    ): void {
        const scope = this;

        const path = this.path === "" ? LoaderUtils.extractUrlBase(url) : this.path;

        const loader = new FileLoader(this.manager);
        loader.setPath(this.path);
        loader.setRequestHeader(this.requestHeader);
        loader.setWithCredentials(this.withCredentials);
        loader.load(
            url,
            function (text) {
                try {
                    onLoad(scope.parse(text, path));
                } catch (e: any) {
                    if (onError) {
                        onError(e);
                    } else {
                        console.error(e);
                    }

                    scope.manager.itemError(url);
                }
            },
            onProgress,
            onError
        );
    }

    setMaterialOptions(value: MaterialCreatorOptions) {
        this.materialOptions = value;
        return this;
    }

    /**
     * Parses a MTL file.
     *
     * @param {String} text - Content of MTL file
     * @return {MaterialCreator}
     *
     * @see setPath setResourcePath
     *
     * @note In order for relative texture references to resolve correctly
     * you must call setResourcePath() explicitly prior to parse.
     */
    parse(text: string | ArrayBuffer, path: string): MaterialCreator {
        const lines = text.toString().split("\n");
        let info = {} as any;
        const delimiter_pattern = /\s+/;
        const materialsInfo = {} as any;

        for (const element of lines) {
            let line = element;
            line = line.trim();

            if (line.length === 0 || line.startsWith("#")) {
                // Blank line or comment ignore
                continue;
            }

            const pos = line.indexOf(" ");

            let key = pos >= 0 ? line.substring(0, pos) : line;
            key = key.toLowerCase();

            let value = pos >= 0 ? line.substring(pos + 1) : "";
            value = value.trim();

            if (key === "newmtl") {
                // New material

                info = { name: value };
                materialsInfo[value] = info;
            } else {
                if (key === "ka" || key === "kd" || key === "ks" || key === "ke") {
                    const ss = value.split(delimiter_pattern, 3);
                    info[key] = [parseFloat(ss[0]), parseFloat(ss[1]), parseFloat(ss[2])];
                } else {
                    info[key] = value;
                }
            }
        }

        const materialCreator = new MaterialCreator(
            this.resourcePath || path,
            this.materialOptions
        );
        materialCreator.setCrossOrigin(this.crossOrigin);
        materialCreator.setManager(this.manager);
        materialCreator.setMaterials(materialsInfo);
        return materialCreator;
    }
}

export { MTLLoader, MaterialCreator };
