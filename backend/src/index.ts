import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import routes from "@/routes/routes";

import pdtStore from "@/store/pdt.store";
import modelStore from "./store/model.store";
import materialStore from "./store/material.store";

const port = 3000;
const app = express();
app.use(cors())
    .use(bodyParser.json({ limit: "50mb" }))
    .use("/api", routes);

const setup = async () => {
    await modelStore
        .load()
        .then(() => materialStore.load())
        .then(() => pdtStore.load())
        .then(() =>
            app.listen(port, () => {
                console.log(`Express app listening on port ${port}`);
            })
        )
        .catch((err) => console.error(err));
};

setup();
