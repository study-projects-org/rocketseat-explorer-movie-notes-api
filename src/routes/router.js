import { Router } from "express";
import { usersRoutes } from "./users.routes.js";
import { movieNotesRoutes } from "./movie-notes.routes.js";
import { tagsRoutes } from "./movie-tags.routes.js";

const routes = Router();

routes.use('/users', usersRoutes);
routes.use('/movie-notes', movieNotesRoutes);
routes.use('/tags', tagsRoutes);

export { routes };