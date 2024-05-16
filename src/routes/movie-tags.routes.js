import { Router } from "express";
import { MovieTagsController } from "../controllers/movie-tags.controller.js";

const tagsRoutes = Router();
const tagsController = new MovieTagsController();

tagsRoutes.get('/:user_id', tagsController.list);

export { tagsRoutes };