import { RESTDataSource } from '@apollo/datasource-rest';
import { Loaded } from '@mikro-orm/core';
import { EntityManager } from '@mikro-orm/mysql';
import { Request } from 'express';
import { User } from '../entities/User';
import jwt from 'jsonwebtoken';
import argon2 from 'argon2';
import { GraphQLError } from 'graphql';

export class UserAPI extends RESTDataSource {
	em: EntityManager;
	token?: string;
	req: Request | any;

	constructor(em: EntityManager, req: Request | any, token?: string) {
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

		return await this.em.findOne(User, { id: this.req.auth.sub });
	}

	async login(username: string, password: string): Promise<String> {
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

			return jwt.sign({ 'http://localhost:4000/': { user } }, 'shhhhhhared-secret', {
				algorithm: 'HS256',
				subject: `${user.id}`,
			});
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
					path: 'username',
				},
			});
		}

		const hashedPassword = await argon2.hash(password);
		let user;
		try {
			const result = await this.em
				.createQueryBuilder(User)
				.getKnexQuery()
				.insert({ username: username, password: hashedPassword, created_at: new Date(), updated_at: new Date() })
				.returning('*');
			user = result[0];
		} catch (error) {
			if (!!error) {
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
