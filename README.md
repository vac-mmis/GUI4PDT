# Welcome to MMIS GUI for Probabilistic Digital Twins 👋

![Version](https://img.shields.io/badge/version-0.1.0-blue.svg?cacheSeconds=2592000)
![Documentation](https://img.shields.io/badge/documentation-yes-brightgreen.svg)

## Description

MMIS GUI for PDT project aims at providing a visualization for Probabilistic Digital-Twins (PDT) in the [OTC-DaTA project (de)](https://www.mmis.informatik.uni-rostock.de/research/projects/otc-data/) supported by [the chair of Mobile Multimedia Information Systems](https://www.mmis.informatik.uni-rostock.de/) at the University of Rostock.

## Architecture

This full Typescript application is split in two parts :

-   A REST API backend powered by [Express.JS](https://expressjs.com) provides PDT data based on JSON files. Please go to [backend README 📝](/backend/README.md) to get more information about it.
-   The main [Vue](https://vuejs.org) user-interface base on [Three.JS](https://threejs.org/) Web 3D visualization framework. Details are available in the [frontend README 📝](/frontend/README.md).

## Installation

### Deployment with Docker Compose

This project could be easily deployed with [Docker Compose](https://docs.docker.com/compose/). Here is some common CLI used to deploy the app :

Build images

```sh
docker compose build
```

Run containers

```sh
docker compose up
```

Run as daemon

```sh
docker compose up -d
```

Stop containers

```sh
docker compose down
```

### Manual installation and local running

As this application is split in two parts, it requires two separate installation or local running. Therefore, please refer to the dedicated documentation of each part :

-   [Frontend README](/frontend/README.md)
-   [Backend README](/backend/README.md)

## Credits

This projet was initiated by 👤 **[Mathieu Dupoux](mdupoux@bordeaux-inp.fr)** in the context of an internship with the chair MMIS during the summer of 2023.

## License

Will be a Creative Common license.

## Contribute

See [frontend contributing](/frontend/CONTRIBUTING.md) and [backend contributing](/frontend/CONTRIBUTING.md) files.
