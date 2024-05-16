import { Validation } from '../util/validations.js';
import { AppError } from '../errors/app-error.js';
import { knexApp } from '../database/knex/config.js';

export class MovieNotesController {

  async create(request, response) {
    const { title, description, rating, tags } = request.body;
    const { user_id } = request.params;

    if (!title || !description || !rating || !(Array.isArray(tags))) {
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

    if (tags.length === 0) {
      errors.push('At least one tag must be filled');

    }

    if (errors.length > 0) {
      throw new AppError(errors.join(', '));
    }



    const [noteId] = await knexApp('movie_notes')
      .insert(
        {
          user_id,
          title: title.trim(),
          description: description.trim(),
          rating: Number(rating)
        });

    const movieTags = tags.map((tag) => {
      return {
        name: tag.trim(),
        note_id: noteId,
        user_id
      }
    });

    await knexApp('movie_tags').insert(movieTags);

    return response.status(201).json();
  }

  async list(request, response) {
    const { title, tags, user_id } = request.query;

    let notes;

    const notesQuery = knexApp('movie_notes')
      .join('movie_tags', 'movie_notes.id', 'movie_tags.note_id')
      .where('movie_notes.user_id', user_id)
      .whereLike('movie_notes.title', `%${title}%`)

    if (tags && tags.length > 0) {
      const filterTags = tags.split(',').map(tag => tag.trim());

      notes = await notesQuery
        .whereIn('movie_tags.name', filterTags)
        .select('movie_notes.*')
        .distinct('movie_notes.*')
        .orderBy('movie_notes.created_at', 'desc');
    } else {
      notes = await notesQuery
        .select('movie_notes.*')
        .distinct('movie_notes.*')
        .orderBy('movie_notes.created_at', 'desc');
    }

    const userTags = await knexApp('movie_tags').where({ user_id });
    const notesWithTags = notes.map(note => {
      const tags = userTags.filter(tag => tag.note_id === note.id);
      return {
        ...note,
        tags
      }
    });

    return response.json(notesWithTags);
  }

  async show(request, response) {
    const { id } = request.params;
    console.log(id);

    const note = await knexApp('movie_notes').where({ id }).first();

    if (!note) {
      throw new AppError('Note not found');
    }

    const tags = await knexApp('movie_tags').where('note_id', id);

    return response.json({ ...note, tags });
  }

  async delete(request, response) {
    const { id } = request.params;

    const note = await knexApp('movie_notes').where({ id }).first();

    if (!note) {
      throw new AppError('Note not found');
    }

    await knexApp('movie_notes').where({ id }).delete();

    return response.json();
  }
}