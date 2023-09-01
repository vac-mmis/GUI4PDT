# Welcome to MMIS GUI for Probabilistic Digital Twins 👋

![Documentation](https://img.shields.io/badge/Documentation-yes-brightgreen.svg) [![License: CC BY-NC-SA 4.0](https://img.shields.io/badge/License-CC%20BY--NC--SA%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by-nc-sa/4.0/)

> MMIS GUI for PDT project aims at providing a visualization for Probabilistic Digital-Twins (PDT) in the [OTC-DaTA project (de)](https://www.mmis.informatik.uni-rostock.de/research/projects/otc-data/) supported by [the chair of Mobile Multimedia Information Systems](https://www.mmis.informatik.uni-rostock.de/) at the University of Rostock.

-   [Welcome to MMIS GUI for Probabilistic Digital Twins 👋](#welcome-to-mmis-gui-for-probabilistic-digital-twins-)
    -   [Architecture](#architecture)
    -   [Installation](#installation)
        -   [Deployment with Docker Compose](#deployment-with-docker-compose)
        -   [Manual installation and local running](#manual-installation-and-local-running)
    -   [License and Credits](#license-and-credits)
    -   [Contribute](#contribute)
        -   [Generate documentation webpage](#generate-documentation-webpage)
        -   [Contributing pages](#contributing-pages)

## Architecture

This full Typescript application is split in two parts :

-   A REST API backend powered by [Express.JS](https://expressjs.com) provides PDT data based on JSON files. Please go to [backend README 📝](/backend/README.md) to get more information about it.
-   The main [Vue](https://vuejs.org) user-interface base on [Three.JS](https://threejs.org/) Web 3D visualization framework. Details are available in the [frontend README 📝](/frontend/README.md).

![MMIS GUI for PDT architecture](/docs/assets/MMISGUI4PDT_Architecture.png)

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

## License and Credits

The projet was initiated by 👤 **[Mathieu Dupoux](mailto:mdupoux@bordeaux-inp.fr)** in the context of an internship for the chair MMIS supervised by 👤 **[Dr. ret. nat. Sebastian Bader](mailto:sebastian.bader@uni-rostock.de)** during summer 2023.

This work is licensed under a [Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License](http://creativecommons.org/licenses/by-nc-sa/4.0/).

![by-nc-sa](https://i.creativecommons.org/l/by-nc-sa/4.0/88x31.png "Logo CC-by-nc-sa")

For details view the [Licence file](LICENSE)!

## Contribute

### Generate documentation webpage

A documentation webpage could be generated thanks to [Vitepress](https://vitepress.dev) and [TypeDoc](https://typedoc.org/) :

```sh
npm run docs:gen    # Generate documentation Markdown pages in docs folder.
npm run docs:dev    # Show doc webpage with dynamic render.
```

Docs webpage would be available at [localhost:5174](http://localhost:5174).

It is also possible to build docs website without running Vitepress :

```sh
npm run docs:gen        # Needed if documentation is not yet generated or not to update.
npm run docs:build      # Build documentation webpage, ready to be served.

npm run docs:preview    # Preview built docs webpage.
```

Preview is available at [localhost:4174](http://localhost:4174).

### Contributing pages

You could also see [frontend](/frontend/CONTRIBUTING.md) and [backend](/frontend/CONTRIBUTING.md) contributing pages.
