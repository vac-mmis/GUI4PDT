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

The tool can now be reached at [localhost:8080](http://localhost:8080/).

Stop containers

```sh
docker compose down
```


### Manual installation

As this application is split in two parts, it requires two separate installation or local running. 

#### 1. Frontend

#### Environment variables

Before installing frontend, you will to specify URL to backend API in setting `VITE_API_BASE_URL` variable in [`.env`](/frontend/.env) file. Default value could be setup with :

```sh
cp .env.example .env # Get right environment variables
```

#### Install dependencies

```sh
npm install
```


#### 2. Backend

#### Environment variables

To run this project, you will need to add the following environment variables to your `.env` file :

-   `PORT` : Express.JS server port
-   `DATA` : Main data folder
-   `MODELS` : Models folder
-   `MATERIALS` : Material folder

Defaults could be setup with :

```sh
cp .env.example .env # Get right environment variables
```

#### Install dependencies

```sh
npm install
```


For further information, please refer to the dedicated documentation of each part :

-   [Frontend README](/frontend/README.md)
-   [Backend README](/backend/README.md)

## Running

### Live Mode (Default)
- Make the following changes to the `.env` file inside the frontend directory
    - VITE_STATIC_MODE=false
    - VITE_BASE_PATH="/"
- Just run `npm run dev` in the `/frontend` and `/backend` directory.
- All data is located in the `/backend/data` directory
- Reach the tool by default at [localhost:5173](http://localhost:5173/) or just have a look in the frontend console.

### Static Mode
If you do not want to use a separate backend server, 
it is possible to save all data in a file and provide 
the tool with a single HTTP server. 
We call this variant Static Mode.
- Make the following changes to the `.env` file inside the `/frontend` directory
    - VITE_STATIC_MODE=true
-   VITE_BASE_PATH="/path/to/server"

Change the VITE_BASE_PATH. (Only if you are not in `/home`, otherwise just leave `/`)

`server` is the directory in which you put all the server's files.

Now you need to save all backend data into a file:

- Run `npm run dev` in the `/backend` directory.  
After the server is started, all data is saved into `/backend/static_mode/backend_data.json`. You can close the server now.
- Run `npm run build` in the frontend directory.

After the build process, all server files are saved in a `dist` folder in the frontend directory.

- Copy the entire contents of the `dist` directory into your HTTP server directory
- Also copy the `backend_data.json` file from `/backend/static_mode/backend_data.json` into your HTTP server directory





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
