import { Router } from "express";
import { UserController } from "../controllers/UserController";

const authenticateRoutes = Router();
authenticateRoutes.get("/", (_, res) => {
  res.send("Server");
});
authenticateRoutes.post("/signup", new UserController().create);
authenticateRoutes.post("/signin", new UserController().login);

export { authenticateRoutes };
