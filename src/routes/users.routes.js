import { Router } from "express";
import { UsersController } from "../controllers/users.controller.js";

const usersController = new UsersController();

const usersRoutes = Router();

usersRoutes.post('/', usersController.crate);
usersRoutes.put('/:id', usersController.update);

export { usersRoutes };