import { RESTDataSource } from '@apollo/datasource-rest';
// import { AuthResponse, RegisterRequestBody } from 'src/__generated__/resolvers-types';
import { LoginRequestBody, LoginResponseBody, RegisterRequestBody, RegisterResponseBody } from 'src/types';

export class AuthAPI extends RESTDataSource {
	constructor() {
		super();
		this.baseURL = 'http://localhost:4000/';
	}

	async register({ email, username, password }: RegisterRequestBody): Promise<RegisterResponseBody> {
		try {
			const user: RegisterResponseBody = await this.post('/register', {
				body: { email, username, password },
			});

			return user;
		} catch (error) {
			return error;
		}
	}

	async login({ email, password }: LoginRequestBody): Promise<LoginResponseBody> {
		try {
			const user: LoginResponseBody = await this.post('/login', {
				body: { email, password },
			});

			console.log('resolver', { user });

			return user;
		} catch (error) {
			return error;
		}
	}
}
