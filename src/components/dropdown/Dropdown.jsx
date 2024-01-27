import { useEffect } from 'react';
import * as S from './Dropdown.styles';
import { getUsersSubmit } from '../api/getUsersSubmit';

export const DropDown = ({
	userName,
	itemOffset,
	setUsersArray,
	setTotalCount,
	setSelects,
	selects,
}) => {
	const itemsPerPage = 15;

	useEffect(() => {
		getUsersSubmit(userName, itemsPerPage, itemOffset, selects)
			.then(response => {
				setUsersArray(response.data.items);
				if (response.data.total_count > 1000) {
					setTotalCount(1000);
				} else {
					setTotalCount(response.data.total_count);
				}
			})
			.catch(error => {
				console.error('Ошибка:', error);
			});
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
