import { buildSchema } from 'graphql';

// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
    type Event {
        id: ID!
        title: String!
        description: String!
        date: String!
        attendants: [User!]
    }

    type User {
        id: ID!
        name: String!
        age: Int!
    }

    type Query {
        events: [Event!]!
        event(id: Int!): Event!
		users: [User!]
		user(id: Int!): User!
    }

    type Mutation {
        editEvent(id: Int!, title: String!): Event!
    }
`);

export default schema;
