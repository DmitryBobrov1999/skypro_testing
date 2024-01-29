import axios from 'axios';

export const getUsersSubmit = async ({
	userName,
	usersPerPage,
	itemOffset,
	selects,
}) => {
	const URL = 'https://api.github.com/';

	const response = await axios.get(
		`${URL}search/users?q=${userName}&per_page=${usersPerPage}&page=${itemOffset}${selects}`
	);

	return response;
}; // функция get-запроса списка пользователей с передачей в ссылке имени-логина(userName), кол-ва элементов на одной странице(usersPerPage), номера конкретной страницы(itemOffset), выбранной сортировки(selects)
