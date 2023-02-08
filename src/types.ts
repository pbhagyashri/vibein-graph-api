import { Connection, EntityManager, IDatabaseDriver } from '@mikro-orm/core';

export interface MyContext {
	dataSources: {
		em: EntityManager<IDatabaseDriver<Connection>>;
	};
}
