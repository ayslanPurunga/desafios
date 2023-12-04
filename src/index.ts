import express from "express";
import { AppDataSource } from "./dataSource";

AppDataSource.initialize().then(() => {
    const app = express();

    app.use(express.json());

    return app.listen(process.env.PORT)
});