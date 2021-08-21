// Module
import { Router } from "express";
const router = Router();
import AllData from "./controllers/getData.controller";
const allData = new AllData();

//home
router.get("/", (_, res) => {
  res.send({ message: "Welcome Search" });
});

router.post("/search", allData.handle);

export default router;
