import knex from 'knex';
import { development } from '../../../knexfile.js';


const knexApp = knex(development);

export { knexApp }