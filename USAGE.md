# How to use
- Clone the repository
- Checkout the gui-v2 branch
- Create `.env` files in frontend and backend directory, using `.env.example`

# Offline
- Make the following changes to the `.env` file inside the frontend directory
    - VITE_OFFLINE_MODE=true
    - VITE_BASE_PATH="/path/to/server"

Change the VITE_BASE_PATH.

The `server` is the directory in which you put all the server's files.

- Run `run.sh` in the backend directory. 
After the server is started, all data is saved in a json file with the name saveData.json, which is now located in the backend directory.
- Run `build.sh` in the frontend directory.

After the build process, all server files are saved in a `dist` folder in the frontend directory.

- Copy the entire contents of the `dist` directory into your HTTP server directory
- Also copy the `saveData.json` file from the backend into your HTTP server directory

- Now run the HTTP server in your home directory.

# Online
- Make the following changes to the `.env` file inside the frontend directory
    - VITE_OFFLINE_MODE=false
    - VITE_BASE_PATH="/"

- all data is located in the backend/data directory

- run `npm run dev` in backend

- run `npm run dev` in frontend

