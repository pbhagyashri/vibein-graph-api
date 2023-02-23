import { MikroORM } from '@mikro-orm/core';
import { ApolloServer } from '@apollo/server';
import { loadFilesSync } from '@graphql-tools/load-files';
import path from 'path';
import { expressMiddleware } from '@apollo/server/express4';
import cors from 'cors';
import bodyParser from 'body-parser';
import http from 'http';
import express from 'express';
// import session from 'express-session';
// import connectRedis from 'connect-redis';
// import { createClient } from 'redis';
import { expressjwt } from 'express-jwt';

import { __prod__ } from './constants';
import mikroConfig from './mikro-orm.config';
import { postResolver } from './resolvers/post-resolver';
import { userResolver } from './resolvers/user-resolver';
import { MyContext } from './types';
import { PostsAPI } from './datasources/posts';
import { UserAPI } from './datasources/user';
import { EntityManager } from '@mikro-orm/mysql';

const main = async () => {
	const orm = await MikroORM.init(mikroConfig);
	const em = orm.em.fork() as EntityManager;
	await orm.getMigrator().up();

	const app = express();

	// const RedisStore = connectRedis(session);
	// const redisClient = createClient({ url: 'redis://127.0.0.1:6379', legacyMode: true });
	// await redisClient.connect();
	// redisClient.on('error', (err) => console.log('Redis Client Error', err));

	// app.use(
	// 	session({
	// 		name: 'qid',
	// 		store: new RedisStore({
	// 			client: redisClient,
	// 			disableTouch: true,
	// 		}),
	// 		cookie: {
	// 			maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
	// 			httpOnly: true,
	// 			sameSite: 'lax', // csrf
	// 			secure: __prod__,
	// 		},
	// 		saveUninitialized: false,
	// 		secret: 'dghdgfhjfdhgdhjfjghfgd',
	// 		resave: false,
	// 	}),
	// );

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
					postApi: new PostsAPI(em),
					userApi: new UserAPI(em, req, req.headers.authorization),
				},
			}),
		}),
	);

	await new Promise<void>((resolve) => httpServer.listen({ port: 4000 }, resolve));
	console.log(`🚀 Server ready at http://localhost:4000/`);
};

main();
