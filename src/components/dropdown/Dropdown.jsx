import { useEffect } from 'react';
import * as S from './Dropdown.styles';
import { getUsersSubmit } from '../../api/getUsersSubmit';

export const DropDown = ({
	userName,
	itemOffset,
	setUsersArray,
	setSelects,
	selects,
	usersArray,
	setLoader,
	setError,
}) => {
	const usersPerPage = 15;

	useEffect(() => {
		if (usersArray) {
			setLoader(true);
			getUsersSubmit({ userName, usersPerPage, itemOffset, selects, setLoader })
				.then(response => {
					setLoader(false);
					setUsersArray(response.data.items);
				})
				.catch(error => {
					setLoader(false);
					setError(error);
				});
		}
	}, [selects]); // запрос на получение списка пользователей при переключении сортировки

	return (
		<S.DropdownDiv>
			<S.DropdownSelect onChange={e => setSelects(e.target.value)}>
				<S.DropdownOption value={'&'}>по умолчанию</S.DropdownOption>
				<S.DropdownOption value={'&sort=repositories&order=asc'}>
					по возрастанию
				</S.DropdownOption>
				<S.DropdownOption value={'&sort=repositories&order=desc'}>
					по убыванию
				</S.DropdownOption>
			</S.DropdownSelect>
		</S.DropdownDiv>
	);
}; // компонент сортировки
