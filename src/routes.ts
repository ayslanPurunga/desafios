import { Router } from "express";
import { UserController } from "./controllers/userController";
import validateTokenMiddleware from "./middlewares/validateTokenMiddleware";


const routes = Router();

const userController = new UserController();

routes.post('/users', userController.handle)

routes.get('/users/', validateTokenMiddleware, userController.list)
routes.get('/users/:id', validateTokenMiddleware, userController.show)

routes.put('/users/:id', validateTokenMiddleware, userController.update)

routes.delete('/users/:id', validateTokenMiddleware, userController.delete)

export { routes }
