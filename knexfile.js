
import { fileURLToPath } from 'url';
import { resolve, dirname } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


export const development = {
  client: 'sqlite3',
  pool: {
    afterCreate: (conn, callback) => conn.run('PRAGMA foreign_keys = ON', callback)
  },
  connection: {
    filename: resolve(__dirname, 'src', 'database', 'database.db')
  },
  migrations: {
    directory: resolve(__dirname, 'src', 'database', 'migrations')
  }, 
  useNullAsDefault: true 
};
