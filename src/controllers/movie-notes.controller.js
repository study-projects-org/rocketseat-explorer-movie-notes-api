import { Validation } from '../util/validations.js';
import { AppError } from '../errors/app-error.js';
import { knexApp } from '../database/knex/config.js';

export class MovieNotesController {

  async create(request, response) {
    const { title, description, rating } = request.body;
    const { user_id } = request.params;

    if (!title || !description || !rating) {
      throw new AppError('All fields must be filled');
    }

    const titleValidation = Validation.text({ value: title, minLength: 3, propName: 'title' });
    const descriptionValidation = Validation.text({ value: description, minLength: 6, propName: 'description' });
    const ratingValidation = Validation.rating(rating);

    const errors = [];

    if (titleValidation.valid === false) {
      errors.push(titleValidation.error);
    }

    if (descriptionValidation.valid === false) {
      errors.push(descriptionValidation.error);
    }

    if (ratingValidation.valid === false) {
      errors.push(ratingValidation.error);
    }

    if (errors.length > 0) {
      throw new AppError(errors.join(', '));
    }

    await knexApp('movie_notes')
      .insert(
        {
          user_id,
          title: title.trim(),
          description: description.trim(),
          rating: Number(rating)
        });

    return response.status(201).json();
  }
}