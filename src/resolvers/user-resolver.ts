import argon2 from 'argon2';
import { GraphQLError } from 'graphql';
import jwt from 'jsonwebtoken';

import { User } from '../entities/User';
import { Resolvers } from '../__generated__/resolvers-types';

export const userResolver: Resolvers = {
	Query: {
		getUsers: async (_, __, { dataSources: { em } }) => await em.find(User, {}),
		me: async (_, __, { dataSources: { req, em, token } }) => {
			if (!token) {
				return null;
			}

			const user = await em.findOne(User, { id: req.auth.sub });
			return user;
		},
	},

	Mutation: {
		register: async (_, { inputs: { username, password } }, { dataSources: { em } }) => {
			if (username.length <= 2) {
				throw new GraphQLError('length must be greater than 2', {
					extensions: {
						code: 'BAD_USER_INPUT',
					},
				});
			}
			if (password.length <= 3) {
				throw new GraphQLError('length must be greater than 3', {
					extensions: {
						code: 'BAD_USER_INPUT',
					},
				});
			}

			const hashedPassword = await argon2.hash(password);
			const user = em.create(User, { username, password: hashedPassword });
			if (!user) {
				throw new GraphQLError('Something went wrong, please try again', {
					extensions: {
						code: 'BAD_USER_INPUT',
					},
				});
			}

			try {
				await em.persistAndFlush(user);
			} catch (error) {
				if ((error.code = '23505' || error.detail.include('already exists'))) {
					throw new GraphQLError('Username already exists', {
						extensions: {
							code: 'BAD_USER_INPUT',
						},
					});
				}
			}
			return user;
		},
		login: async (_, { inputs: { username, password } }, { dataSources: { em, req } }) => {
			const user = await em.findOne(User, { username });
			if (user) {
				const valid = await argon2.verify(user?.password, password);

				if (!valid) {
					throw new GraphQLError('Invalid password', {
						extensions: {
							code: 'BAD_USER_INPUT',
						},
					});
				}

				const token = await jwt.sign({ 'http://localhost:4000/': { user } }, 'shhhhhhared-secret', {
					algorithm: 'HS256',
					subject: `${user.id}`,
				});

				return token;
			} else {
				{
					throw new GraphQLError("username doesn't exist", {
						extensions: {
							code: 'BAD_USER_INPUT',
						},
					});
				}
			}
		},
	},
};
