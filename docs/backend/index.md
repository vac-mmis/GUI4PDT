# Backend developper documentation👋

![Version](https://img.shields.io/badge/version-0.1.0-blue.svg?cacheSeconds=2592000)
[![License: ISC](https://img.shields.io/badge/License-ISC-yellow.svg)](#)

> MMIS GUI project aims at providing Probabilistic Digital-Twins (PDT) Web 3D visualization. This is the backend Express.JS API server which gives PDT data to GUI frontend.

## Data format

### PDT raw data format

#### Data folder

PDT data are provided by this backend server and stored in [`data`](/backend/data) folder structured like this :

```
data/
├── PDT1            // First available PDT
│   │
│   ├── pdt1_0.json // First PDT1 timestamp
│   ├── pdt1_1.json // Second PDT1 timestamp
│   ...
│   └── pdt1_n.json // Last PDT1 timestamp
│
├── PDT2            // First available PDT
│   │
│   ├── pdt2_0.json // First PDT2 timestamp
│   ├── pdt2_1.json // Second PDT2 timestamp
│   ...
│   └── pdt2_n.json // Last PDT2 timestamp
...
```

#### PDT JSON representation

Each PDT timestamp are JSON files with PDT name, timestep and timestamps and their objects :

```json
{
    "name": "world2",
    "timestep": 178,
    "timestamp": null,
    "objects": [
        // Object list
    ]
}
```

#### Object JSON representation inside PDT timestamps

Each object (identified by `id` field) has several properties (class, location, rotation) which can be absolute or probabilistic (with `dist` sub-attribute). Object and its attributes types are defined in [`src/types` folder](/backend/doc/modules/Types.md).

## Assets (models and materials)

### Assets folder

Assets as models and materials are shared between all PDTs. They are stored in [`assets`](/backend/assets) folder, structured like this :

```
assets
├── materials                       // Material folder
│   │
│   ├── material1                   // First available material
│   │   ├── material1_albedo.png    // Material1 PNG files components
│   │   ├── material1_ao.png
│   │   ├── material1_height.png
│   │   ├── material1_metalness.png
│   │   ├── material1_normal.png
│   │   └── material1_roughness.png
│   ...
│   └── materialN                   // Last available material
│       ├── materialN_albedo.png    // MaterialN PNG files components
│       ├── materialN_metalness.png
│       ├── materialN_normal.png
│       └── materialN_roughness.png
│
└── models          // Models folder
    │
    ├── Model1.glb  // First model in GLTF (.glb) format
    ├── Model2.glb
    ...
    └── ModelN.glb  // Last model in GLTF (.glb) format
```

### Material storage

For the moment, only PNG file components are supported by the MMIS GUI application. Each PNG file is a component to represent a [MeshStandardMaterial](https://threejs.org/docs/#api/en/materials/MeshStandardMaterial) in Three.JS for the frontend part. If you want to add a new texture, it must follow this file structure. Material name must also correspond of the lowercase version used in [PDT material representation](/backend/doc/modules/Types.Objects.md#materialjson)
Lots of textures could be found [here](https://freepbr.com/).

### Model storage

For the moment, this project supports only [glTF 2.0](https://www.khronos.org/gltf/) binary files (`.glb`) to store and handle model, as [recommanded by Three.JS project](https://threejs.org/manual/#en/load-gltf). Each new model must have this format to be handle by the frontend. Model name must also correspond of the lowercase version used in [PDT class representation](/backend/doc/modules/Types.Objects.md#classjson).

## Documentation

Backend documentation is automatically generated in Markdown format from [TSDoc](https://tsdoc.org/) doc comments standard with [TypeDoc](https://typedoc.org/). Docs building is outsourced in [/docs/backend](/docs/backend) in the root folder.

You can alse generate documentation webpages with [Vitepress](https://vitepress.dev) following instructions available in [main README.md Contribute](/README.md#contribute) section

## Author

👤 **[Mathieu Dupoux](mailto:mdupoux@bordeaux-inp.fr)**
