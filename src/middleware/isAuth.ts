import { MyContext } from 'src/types';
import { MiddlewareFn } from 'type-graphql';

export const isAuth: MiddlewareFn<MyContext> = ({ context: { dataSources } }, next) => {
	if (!dataSources.postApi.token) {
		throw new Error('Not authenticated');
	}
	return next();
};
