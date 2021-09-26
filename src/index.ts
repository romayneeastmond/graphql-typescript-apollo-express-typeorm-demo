import 'reflect-metadata';
import express from 'express';
import { buildSchema } from 'type-graphql';
import { createConnection } from 'typeorm';
import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';
import { CountryPopulationResolver } from './resolvers/CountryPopulationResolver';

(async () => {
    const app = express();

    await createConnection();

    const schema = await buildSchema({
        resolvers: [CountryPopulationResolver]
    });

    const apolloServer = new ApolloServer({
        schema: schema,
        context: ({ req, res }) => ({ req, res }),
        introspection: true,
        plugins: [ApolloServerPluginLandingPageGraphQLPlayground],

    });

    await apolloServer.start();

    apolloServer.applyMiddleware({ app, cors: false });

    app.listen(4000, () => {
        console.log(`Apollo Express server started http://localhost:4000${apolloServer.graphqlPath}`);
    })
})();