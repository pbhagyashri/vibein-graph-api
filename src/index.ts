import { MikroORM } from '@mikro-orm/core';
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { loadFilesSync } from '@graphql-tools/load-files';
import path from 'path';
import { expressMiddleware } from '@apollo/server/express4';
import cors from 'cors';
import bodyParser from 'body-parser';
import http from 'http';
import express from 'express';

import { __prod__ } from './constants';
import { Post } from './entities/Post';
import mikroConfig from './mikro-orm.config';
import { resolvers } from './resolvers';
import { BooksAPI } from './datasources/books';

const main = async () => {
	const orm = await MikroORM.init(mikroConfig);
	const em = orm.em.fork();
	await orm.getMigrator().up();

	const app = express();
	const httpServer = http.createServer(app);
	const { resolve, dirname, join } = path;
	const typeDefs = loadFilesSync(join(resolve(dirname('')), './schema.graphql'));

	interface MyContext {
		dataSources: {
			BooksAPI: BooksAPI;
		};
	}

	const server = new ApolloServer<MyContext>({
		introspection: true,
		typeDefs,
		resolvers,
	});

	await server.start();

	// Set up our Express middleware to handle CORS, body parsing,
	// and our expressMiddleware function.
	app.use(
		'/',
		cors<cors.CorsRequest>(),
		bodyParser.json(),
		// expressMiddleware accepts the same arguments:
		// an Apollo Server instance and optional configuration options
		expressMiddleware(server, {
			context: async () => ({
				dataSources: {
					BooksAPI: new BooksAPI(),
				},
			}),
		}),
	);

	// Modified server startup
	await new Promise<void>((resolve) => httpServer.listen({ port: 4000 }, resolve));
	console.log(`🚀 Server ready at http://localhost:4000/`);

	// const { url } = await startStandaloneServer(server, {
	// 	context: async () => ({
	// 		dataSources: {
	// 			BooksAPI: new BooksAPI(),
	// 		},
	// 	}),
	// });

	// console.log(`🚀  Server ready at: ${url}`);
};

main();
