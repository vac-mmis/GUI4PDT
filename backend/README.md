# Welcome to MMIS-GUI-backend 👋

![Version](https://img.shields.io/badge/version-0.1.0-blue.svg?cacheSeconds=2592000)
[![Documentation](https://img.shields.io/badge/documentation-yes-brightgreen.svg)](doc/README.md)
[![License: ISC](https://img.shields.io/badge/License-ISC-yellow.svg)](#)

> MMIS GUI project aims at providing Probabilistic Digital-Twins (PDT) Web 3D visualization. This is the backend Express.JS API server which gives PDT data to GUI frontend.

## Get started

### Environment variables

To run this project, you will need to add the following environment variables to your `.env` file :

-   `PORT` : Express.JS server port
-   `DATA` : Main data folder
-   `MODELS` : Models folder
-   `MATERIALS` : Material folder

Defaults could be setup with :

```sh
cp .env.vault .env # Get right environment variables
```

### Installation

```sh
npm i
```

### Development running

```sh
npm run dev
```

### Build for production

```
NODE_ENV=production npm run build
```

### Build container

```
docker run -t mmis-gui-backend .
```

## API Reference

### PDT

#### Get available PDT names list

```http
  GET /api/pdts/list
```

#### Get a specific PDT by its name

```http
  GET /api/pdt/${name}
```

| Parameter | Type     | Description                        |
| :-------- | :------- | :--------------------------------- |
| `name`    | `string` | **Required**. Name of PDT to fetch |

### Models

#### Get available models

```http
  GET /api/models
```

#### Get a specific model by its name

```http
  GET /api/model/${name}
```

| Parameter | Type     | Description                          |
| :-------- | :------- | :----------------------------------- |
| `name`    | `string` | **Required**. Name of model to fetch |

### Materials

#### Get available materials

```http
  GET /api/materials
```

#### Get a specific material by its name

```http
  GET /api/material/${name}
```

| Parameter | Type     | Description                             |
| :-------- | :------- | :-------------------------------------- |
| `name`    | `string` | **Required**. Name of material to fetch |

## Contribute

See [CONTRIBUTING](/backend/CONTRIBUTING.md) page.

## Author

👤 **[Mathieu Dupoux](mailto:mdupoux@bordeaux-inp.fr)**

---

_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
