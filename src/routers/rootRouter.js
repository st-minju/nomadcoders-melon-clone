import express from "express";
import { home, updateChart } from "../controllers/songController";

const rootRouter = express.Router();

rootRouter.get("/", home);
rootRouter.post("/:id/chart", updateChart);

export default rootRouter;
