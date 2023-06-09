import express from "express";
import bodyParser from "body-parser";
import routes from "./routes/routes";
import cors from "cors";

import PDTServices from "./services/pdt.services";
const app = express();
app.use(cors());

app.use(bodyParser.json({ limit: "50mb" }));

app.use("/", routes);

const port = 3000;
app.listen(port, async () => {
    await PDTServices.init().then(() => console.log(`Express app listening on port ${port}`));
});
