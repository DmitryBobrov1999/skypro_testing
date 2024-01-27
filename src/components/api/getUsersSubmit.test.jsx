import { getUsersSubmit } from './getUsersSubmit';
import axios from 'axios';
jest.mock('axios');

it('should return a successful response', async () => {
	const mockResponse = {
		data: {
			items: [{ login: 'dima' }],
		},
	};
	axios.get = jest.fn().mockResolvedValue(mockResponse);

	const usersData = await getUsersSubmit();
	expect(mockResponse.data).toEqual(usersData.data);
}); // тест get-запроса
