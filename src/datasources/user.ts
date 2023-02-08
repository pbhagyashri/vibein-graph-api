import { RESTDataSource } from '@apollo/datasource-rest';
import { Connection, EntityManager, IDatabaseDriver, Loaded } from '@mikro-orm/core';
import { Request } from 'express';
import { User } from '../entities/User';
import jwt from 'jsonwebtoken';
import argon2 from 'argon2';
import { GraphQLError } from 'graphql';

export class UserAPI extends RESTDataSource {
	em: EntityManager<IDatabaseDriver<Connection>>;
	token?: string;
	req: Request | any;

	constructor(em: EntityManager<IDatabaseDriver<Connection>>, req: Request | any, token?: string) {
		super();
		this.em = em;
		this.token = token;
		this.req = req;
	}

	async getUsers(): Promise<Loaded<User>[]> {
		return await this.em.find(User, {});
	}

	async me(): Promise<Loaded<User | null>> {
		if (!this.token) {
			return null;
		}

		const user = await this.em.findOne(User, { id: this.req.auth.sub });
		return user;
	}

	async login(username: string, password: string): Promise<string> {
		const user = await this.em.findOne(User, { username });
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
	}

	async register(username: string, password: string): Promise<Loaded<User>> {
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
		const user = this.em.create(User, { username, password: hashedPassword });
		if (!user) {
			throw new GraphQLError('Something went wrong, please try again', {
				extensions: {
					code: 'BAD_USER_INPUT',
				},
			});
		}

		try {
			await this.em.persistAndFlush(user);
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
	}
}
