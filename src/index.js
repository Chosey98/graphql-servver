import express from 'express';
import graphqlHTTP from 'express-graphql';
import cors from 'cors';
import schema from './schema.js';
import startDatabase from './database.js';
import expressPlayground from 'graphql-playground-middleware-express';

// Create a context for holding contextual data
const context = async (req) => {
	const db = await startDatabase();
	return { db };
};

// Provide resolver functions for your schema fields
const resolvers = {
	events: async (_, context) => {
		const { db } = await context();
		return db.getData('/events');
	},
	event: async ({ id }, context) => {
		const { db } = await context();
		const events = db.getData('/events');
		const event = await events.find((event) => event.id === id);
		return event;
	},
	users: async (_, context) => {
		const { db } = await context();
		return db.getData('/users');
	},
	user: async ({ id }, context) => {
		const { db } = await context();
		const users = db.getData('/users');
		const user = await users.find((event) => event.id === id);
		return user;
	},
	editEvent: async ({ id, title, description }, context) => {
		const { db } = await context();
		const events = db.getData('/events');
		const event = await events.find((event) => event.id === id);
		event.title = title;
		event.description = description;
		db.push('/events', events);
		return event;
	},
};

const app = express();
app.use(
	'/graphql',
	cors(),
	graphqlHTTP(async (req) => ({
		schema,
		rootValue: resolvers,
		context: () => context(req),
	}))
);
app.get('/playground', expressPlayground.default({ endpoint: '/graphql' }));
app.listen(4000);

console.log(`🚀 Server ready at http://localhost:4000/graphql`);
