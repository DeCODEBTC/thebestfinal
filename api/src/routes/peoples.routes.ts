import { Router } from "express";
import { PeopleController } from "../controllers/PeopleController";
import { authMiddleware } from "../middlewares/authMiddleware";

const peopleRoutes = Router();
peopleRoutes.use(authMiddleware);
peopleRoutes.post("/people", new PeopleController().create);
peopleRoutes.get("/people", new PeopleController().find);
peopleRoutes.put("/people/:id", new PeopleController().update);
peopleRoutes.delete("/people/:id", new PeopleController().delete);

export { peopleRoutes };
