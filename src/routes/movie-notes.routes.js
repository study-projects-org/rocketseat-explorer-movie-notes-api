import { Router } from "express";
import { MovieNotesController } from "../controllers/movie-notes.controller.js";

const movieNotesRoutes = Router();
const movieNotesController = new MovieNotesController();

movieNotesRoutes.post('/:user_id', movieNotesController.create);
movieNotesRoutes.get('/', movieNotesController.list);
movieNotesRoutes.get('/:id', movieNotesController.show);
movieNotesRoutes.delete('/:id', movieNotesController.delete);

export { movieNotesRoutes };