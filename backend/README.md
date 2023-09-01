# GUI for PDT backend

[![Documentation](https://img.shields.io/badge/documentation-yes-brightgreen.svg)](doc/README.md) [![License: CC BY-NC-SA 4.0](https://img.shields.io/badge/License-CC%20BY--NC--SA%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by-nc-sa/4.0/)

> MMIS GUI for PDT project aims at providing Probabilistic Digital-Twins (PDT) Web 3D visualization. This is the Express.JS API part the [MMIS GUI for Probabilistic Digital-Twins](/README.md) project.

-   [GUI for PDT backend](#gui-for-pdt-backend)
    -   [Get started](#get-started)
        -   [Environment variables](#environment-variables)
        -   [Installation](#installation)
        -   [Development running](#development-running)
        -   [Build for production](#build-for-production)
        -   [Build Docker image](#build-docker-image)
    -   [API Reference](#api-reference)
        -   [PDT](#pdt)
            -   [Get available PDT names list](#get-available-pdt-names-list)
            -   [Get a specific PDT by its name](#get-a-specific-pdt-by-its-name)
        -   [Models](#models)
            -   [Get available models](#get-available-models)
            -   [Get a specific model by its name](#get-a-specific-model-by-its-name)
        -   [Materials](#materials)
            -   [Get available materials](#get-available-materials)
            -   [Get a specific material by its name](#get-a-specific-material-by-its-name)
    -   [License and Credits](#license-and-credits)
    -   [Contribute](#contribute)

## Get started

### Environment variables

To run this project, you will need to add the following environment variables to your `.env` file :

-   `PORT` : Express.JS server port
-   `DATA` : Main data folder
-   `MODELS` : Models folder
-   `MATERIALS` : Material folder

Defaults could be setup with :

```sh
cp .env.example .env # Get right environment variables
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

### Build Docker image

Global application deployment is available with Docker Compose. See more [in the main README.md installation section](/README.md#installation). However, you could also build this image standalone :

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

## License and Credits

The whole projet was initiated by 👤 **[Mathieu Dupoux](mailto:mdupoux@bordeaux-inp.fr)** in the context of an internship for the chair MMIS supervised by 👤 **[Dr. ret. nat. Sebastian Bader](mailto:sebastian.bader@uni-rostock.de)** during summer 2023.

This work is licensed under a [Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License](http://creativecommons.org/licenses/by-nc-sa/4.0/).

![by-nc-sa](https://i.creativecommons.org/l/by-nc-sa/4.0/88x31.png "Logo CC-by-nc-sa")

For details view the [Licence file](LICENSE)!

## Contribute

See [CONTRIBUTING](/backend/CONTRIBUTING.md) page.
