import { RESTDataSource } from '@apollo/datasource-rest';

const booksData = [
	{
		id: '1',
		title: 'The Awakening',
		author: 'Kate Chopin',
	},
	{
		id: '2',
		title: 'City of Glass',
		author: 'Paul Auster',
	},
	{
		id: '3',
		title: 'City of Glass!!!!!',
		author: 'Paul Auster!!!!!',
	},
];

export class BooksAPI extends RESTDataSource {
	async getBooks(): Promise<any[]> {
		return await booksData;
	}
}
