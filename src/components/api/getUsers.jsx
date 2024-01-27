import axios from 'axios';

export const getUsers = async (
	userName,
	itemsPerPage,
	itemOffset,
) => {
	const URL = 'https://api.github.com/';

	const response = await axios
		.get(
			`${URL}search/users?q=${userName}&per_page=${itemsPerPage}&page=${itemOffset}`
		)
		return response
}; // функция get-запроса списка пользователей с передачей в ссылке имени-логина(userName), кол-ва элементов на одной странице(itemsPerPage), номера конкретной страницы(itemOffset)
