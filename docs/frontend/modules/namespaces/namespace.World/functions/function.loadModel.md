# Function: loadModel

> **loadModel**(`model`): `Promise`\< `Group` \>

Loads model from file blobs provided by backend API

## Parameters

| Parameter | Type                                                                                                    | Description              |
| :-------- | :------------------------------------------------------------------------------------------------------ | :----------------------- |
| `model`   | [`ModelFile`](../../namespace.Interfaces/namespaces/namespace.Assets/interfaces/interface.ModelFile.md) | Model file blob to load. |

## Returns

`Promise`\< `Group` \>

Loaded model as Three.JS `Group` object.

## Remark

For the moment, this loader only handle GLTF 3D models in `.glb` format.

## Defined In

World/systems/loader.ts:38

---

Generated using [TypeDoc](https://typedoc.org/) and [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown)
