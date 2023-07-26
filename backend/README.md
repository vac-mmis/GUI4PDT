# Welcome to MMIS-GUI-backend 👋

![Version](https://img.shields.io/badge/version-0.1.0-blue.svg?cacheSeconds=2592000)
[![Documentation](https://img.shields.io/badge/documentation-yes-brightgreen.svg)](doc/README.md)
[![License: ISC](https://img.shields.io/badge/License-ISC-yellow.svg)](#)

> MMIS GUI project aims at providing Probabilistic Digital-Twins (PDT) Web 3D visualization. This is the backend Express.JS API server which gives PDT data to GUI frontend.

## Get started

### Installation

```sh
npm i
```

### Development running

```sh
npm run dev
```

### Production

Not implemented for the moment

## Routes

### PDT

-   `GET /api/pdts/list` : Get available PDT name list
-   `GET /api/pdt/:name` : Find PDT by name

### Models

-   `GET /api/models` : Get available models
-   `GET /api/model/:name` : Find model by name

### Materials

-   `GET /api/materials` : Get available materials
-   `GET /api/material/:name` : Find material by name

## Developer documentation

Developer documentation generated by TypeDoc starts with [modules.md](modules.md). It can be built with this command :

```sh
npm run build:doc
```

## Author

👤 **[Mathieu Dupoux](mailto:mdupoux@bordeaux-inp.fr)**

---

_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_