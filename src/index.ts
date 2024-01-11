import 'reflect-metadata';
import { ApolloServer } from '@apollo/server';
import { loadFilesSync } from '@graphql-tools/load-files';
import path from 'path';
import { expressMiddleware } from '@apollo/server/express4';
import cors from 'cors';
import bodyParser from 'body-parser';
import http from 'http';
import express from 'express';

import { __prod__ } from './constants';
import { postResolver, userResolver, authResolver } from './resolvers';
import { MyContext } from './types';
import { PostsAPI, UserAPI, AuthAPI } from './datasources';

const main = async () => {
	const app = express();

	const httpServer = http.createServer(app);
	const { resolve, dirname, join } = path;
	const typeDefs = loadFilesSync(join(resolve(dirname('')), './schema.graphql'));

	const server = new ApolloServer<MyContext>({
		introspection: !__prod__,
		typeDefs,
		resolvers: [postResolver, userResolver, authResolver],
	});

	await server.start();

	app.use(
		'/',
		cors<cors.CorsRequest>({
			credentials: true,
			origin: ['http://localhost:4000', 'http://localhost:3000'],
		}),
		bodyParser.json(),
		expressMiddleware(server, {
			context: async ({ req, res }) => ({
				dataSources: {
					req,
					res,
					token: req.headers.authorization,
					postApi: new PostsAPI(),
					userApi: new UserAPI(),
					authApi: new AuthAPI(),
				},
			}),
		}),
	);

	await new Promise<void>((resolve) => httpServer.listen({ port: 4001 }, resolve));
	console.log(`🚀 Server ready at http://localhost:4001/`);
};

main();
