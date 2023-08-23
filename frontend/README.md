# GUI for PDT frontend

![Version](https://img.shields.io/badge/version-0.1.0-blue.svg?cacheSeconds=2592000)
[![Documentation](https://img.shields.io/badge/documentation-yes-brightgreen.svg)](doc/index.md)
[![License: ISC](https://img.shields.io/badge/License-ISC-yellow.svg)](#)

## Description

This is the main user-interface frontend part of the [MMIS GUI for Probabilistic Digital-Twins](../README.md).

## Technologies used

Fully written in Typescript, this user interface uses :

-   [Vue 3](https://vuejs.org) framework with Composition API

-   [Vite](https://vitejs.dev) frontend tooling

-   [Three.JS](https://threejs.org) (3D visualization) and [Plotly.JS](https://plotly.com/javascript/) (2D charts) for data visualization

-   [Vuetify](vuetifyjs.com/) UI components

## Installation

### Requirements

-   Node.JS version `18.0` or higher.

### Build Docker image

Global application deployment is available with Docker Compose. See more [here](../README.md#installation). However, you could also build this image standalone :

```sh
docker build -t mmis-gui-frontend .
```

### Manual installation

#### Install dependencies

```sh
npm install
```

#### Start Vite development environment with Hot Module Replacement.

```sh
npm run dev
```

#### Type-Check, Compile and Minify for Production

```sh
npm run build
```

#### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

## Contribute

See [CONTRIBUTING](/frontend/CONTRIBUTING.md) page.

## Credits

The whole projet was initiated by 👤 **[Mathieu Dupoux](mdupoux@bordeaux-inp.fr)** in the context of an internship with the chair MMIS during the summer of 2023.

## License

Will be a Creative Common license.

## Contribute

See [frontend contributing](/frontend/CONTRIBUTING.md) and
