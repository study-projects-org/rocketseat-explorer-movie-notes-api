import { Router } from "express";
import { MovieNotesController } from "../controllers/movie-notes.controller.js";

const movieNotesRoutes = Router();
const movieNotesController = new MovieNotesController();

movieNotesRoutes.post('/:user_id', movieNotesController.create);

export { movieNotesRoutes };