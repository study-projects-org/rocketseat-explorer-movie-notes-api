import { knexApp } from '../database/knex/config.js'

export class MovieTagsController {

  async list(request, response) {
    const { user_id } = request.params;

    const tags = await knexApp('movie_tags')
      .where({ user_id })
      .groupBy('name')
      .orderBy('name');

    return response.json(tags);
  }
}