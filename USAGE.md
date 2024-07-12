# How to use

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

The tool can now be reached at [localhost:8080](http://localhost:8080/).

Stop containers

```sh
docker compose down
```


### Manual installation and local running

As this application is split in two parts, it requires two separate installation or local running. Therefore, please refer to the dedicated documentation of each part :

-   [Frontend README](/frontend/README.md)
-   [Backend README](/backend/README.md)


## Static Mode vs. Live Mode
If you do not want to use a separate backend server, 
it is possible to save all data in a file and provide 
the tool with a single HTTP server. 
We call this variant Static Mode.

### Live Mode (Default)
- Make the following changes to the `.env` file inside the frontend directory
    - VITE_STATIC_MODE=false
    - VITE_BASE_PATH="/"
- Just run `npm run dev` in both `/frontend` and `/backend` directory.
- All data is located in the `/backend/data` directory
- Reach the tool by default at [localhost:5173](http://localhost:5173/) or just have a look in the frontend console.

### Static Mode
- Make the following changes to the `.env` file inside the `/frontend` directory
    - VITE_STATIC_MODE=true
-   VITE_BASE_PATH="/path/to/server"

Change the VITE_BASE_PATH. (Only if you are not in `/home`, otherwise just leave `/`)

`server` is the directory in which you put all the server's files.

Now you need to save all backend data into a file:

- Run `nom run dev` in the `/backend` directory.  
After the server is started, all data is saved into `/backend/static_mode/backend_data.json`. You can close the server now.
- Run `npm run build` in the frontend directory.

After the build process, all server files are saved in a `dist` folder in the frontend directory.

- Copy the entire contents of the `dist` directory into your HTTP server directory
- Also copy the `backend_data.json` file from `/backend/static_mode/backend_data.json` into your HTTP server directory



