import { JsonDB } from 'node-json-db';
import { Config } from 'node-json-db/dist/lib/JsonDBConfig.js';
const db = new JsonDB(new Config('data', true, false, '/'));

async function startDatabase() {
	return db;
}

export default startDatabase;
