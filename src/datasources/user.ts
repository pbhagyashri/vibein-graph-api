import { RESTDataSource } from '@apollo/datasource-rest';
import { Request } from 'express';
import { User } from '../entities/User';
import jwt from 'jsonwebtoken';
import argon2 from 'argon2';
import { GraphQLError } from 'graphql';

export class UserAPI extends RESTDataSource {
	token?: string;
	req: Request | any;

	constructor(req: Request | any, token?: string) {
		super();
		this.token = token;
		this.req = req;
	}

	async getUsers() {
		const users = await User.find();
		return users;
	}

	async me() {
		if (!this.token) {
			throw new Error('Your session has expired. Please log in again.');
		}

		return await User.findOne({
			where: {
				id: this.req.auth.sub,
			},
		});
	}

	async login(username: string, password: string) {
		const user = await User.findOne({ where: { username } });

		if (user) {
			const valid = await argon2.verify(user?.password, password);

			if (!valid) {
				throw new GraphQLError('Invalid password', {
					extensions: {
						argumentName: 'password',
						code: 'VALIDATION_ERROR',
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
						argumentName: 'username',
						code: 'BAD_USER_INPUT',
					},
				});
			}
		}
	}

	async register(username: string, password: string) {
		if (username.length <= 2) {
			throw new GraphQLError('username must be greater than 2', {
				extensions: {
					argumentName: 'username',
					code: 'BAD_USER_INPUT',
				},
			});
		}

		if (password.length <= 3) {
			throw new GraphQLError('password must be greater than 3', {
				extensions: {
					argumentName: 'password',
					code: 'VALIDATION_ERROR',
				},
			});
		}

		const user = await User.find({
			where: {
				username: username,
			},
		});

		if (user?.length > 0) {
			throw new GraphQLError('Username already exists', {
				extensions: {
					argumentName: 'username',
					code: 'VALIDATION_ERROR',
				},
			});
		}

		const hashedPassword = await argon2.hash(password);

		try {
			const user = await User.create({
				username: username,
				password: hashedPassword,
			}).save();

			const token = jwt.sign({ 'http://localhost:4000/': { user } }, 'shhhhhhared-secret', {
				algorithm: 'HS256',
				subject: `${user.id}`,
			});

			return {
				token,
				user,
			};
		} catch (error) {
			throw new GraphQLError(error.message, {
				extensions: {
					code: 'INTERNAL_SERVER_ERROR',
				},
			});
		}
	}
}
