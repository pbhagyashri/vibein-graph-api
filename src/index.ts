import 'reflect-metadata';
import { ApolloServer } from '@apollo/server';
import { loadFilesSync } from '@graphql-tools/load-files';
import path from 'path';
import { expressMiddleware } from '@apollo/server/express4';
import cors from 'cors';
import bodyParser from 'body-parser';
import http from 'http';
import express from 'express';
import { expressjwt } from 'express-jwt';
import { DataSource } from 'typeorm';

import { __prod__ } from './constants';
import { postResolver } from './resolvers/post-resolver';
import { userResolver } from './resolvers/user-resolver';
import { MyContext } from './types';
import { PostsAPI } from './datasources/posts';
import { UserAPI } from './datasources/user';
import { Post } from './entities/Post';
import { User } from './entities/User';

const main = async () => {
	const myDataSource = new DataSource({
		type: 'postgres',
		host: 'localhost',
		port: 5432,
		database: 'lireddit2',
		entities: [Post, User],
		logging: true,
		synchronize: true,
	});

	myDataSource
		.initialize()
		.then(() => {
			console.log('Data Source has been initialized!');
		})
		.catch((err) => {
			console.error('Error during Data Source initialization:', err);
		});

	const app = express();

	app.use(
		expressjwt({
			secret: 'shhhhhhared-secret',
			algorithms: ['HS256'],
			credentialsRequired: false,
		}),
	);

	const httpServer = http.createServer(app);
	const { resolve, dirname, join } = path;
	const typeDefs = loadFilesSync(join(resolve(dirname('')), './schema.graphql'));

	const server = new ApolloServer<MyContext>({
		introspection: !__prod__,
		typeDefs,
		resolvers: [postResolver, userResolver],
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
					postApi: new PostsAPI(req, req.headers.authorization),
					userApi: new UserAPI(req, req.headers.authorization),
				},
			}),
		}),
	);

	await new Promise<void>((resolve) => httpServer.listen({ port: 4000 }, resolve));
	console.log(`🚀 Server ready at http://localhost:4000/`);
};

main();
