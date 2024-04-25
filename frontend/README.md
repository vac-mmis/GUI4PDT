# GUI for PDT frontend

[![Documentation](https://img.shields.io/badge/documentation-yes-brightgreen.svg)](doc/README.md) [![License: CC BY-NC-SA 4.0](https://img.shields.io/badge/License-CC%20BY--NC--SA%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by-nc-sa/4.0/)

> MMIS GUI for PDT project aims at providing Probabilistic Digital-Twins (PDT) Web 3D visualization. This is the main user-interface frontend part of the [MMIS GUI for Probabilistic Digital-Twins](/README.md) project.

-   [GUI for PDT frontend](#gui-for-pdt-frontend)
    -   [Technologies](#technologies)
    -   [Installation](#installation)
        -   [Requirements](#requirements)
        -   [Build Docker image](#build-docker-image)
        -   [Manual installation](#manual-installation)
            -   [Environment variables](#environment-variables)
            -   [Install dependencies](#install-dependencies)
            -   [Start Vite development environment with Hot Module Replacement.](#start-vite-development-environment-with-hot-module-replacement)
            -   [Type-Check, Compile and Minify for Production](#type-check-compile-and-minify-for-production)
            -   [Lint with ESLint](#lint-with-eslint)
    -   [Credits and License](#credits-and-license)
    -   [Contribute](#contribute)

## Technologies

Fully written in Typescript, this user interface uses :

-   [Vue 3](https://vuejs.org) framework with Composition API
-   [Vite](https://vitejs.dev) frontend tooling
-   [Three.JS](https://threejs.org) (3D visualization) and [Plotly.JS](https://plotly.com/javascript/) (2D charts) for data visualization
-   [Vuetify](vuetifyjs.com/) UI components

## Installation

### Requirements

-   Node.JS version `18.0` or higher.

### Build Docker image

Global application deployment is available with Docker Compose. See more [in the main README.md installation section](/README.md#installation). However, you could also build this image standalone :

```sh
docker build -t mmis-gui-frontend .
```

### Manual installation

#### Environment variables

Before installing frontend, you will to specify URL to backend API in setting `VITE_API_BASE_URL` variable in [`.env`](/frontend/.env) file. Default value could be setup with :

```sh
cp .env.example .env # Get right environment variables
```

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

## Credits and License

The whole project was initiated by 👤 **[Mathieu Dupoux](mailto:mdupoux@bordeaux-inp.fr)** in the context of an internship for the chair MMIS supervised by 👤 **[Dr. ret. nat. Sebastian Bader](mailto:sebastian.bader@uni-rostock.de)** during summer 2023.

This work is licensed under a [Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License](http://creativecommons.org/licenses/by-nc-sa/4.0/).

![by-nc-sa](https://i.creativecommons.org/l/by-nc-sa/4.0/88x31.png "Logo CC-by-nc-sa")

For details view the [Licence file](LICENSE)!

## Contribute

See [CONTRIBUTING](/frontend/CONTRIBUTING.md) page.
