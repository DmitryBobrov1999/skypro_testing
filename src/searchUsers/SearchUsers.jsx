import * as S from './SearchUsers.styles';
import { useEffect, useState } from 'react';
import { DropDown } from '../components/dropdown/Dropdown';
import { Pagination } from '../components/pagination/Pagination';
import axios from 'axios';
import { getUsersSubmit } from '../api/getUsersSubmit';
import moment from 'moment/moment';
import 'moment/locale/ru';
import { Loader } from '../components/loader/Loader';
import { Error } from '../components/error/Error';

export const SearchUsers = () => {
	const [userName, setUserName] = useState(null); // логин пользователей
	const [usersArray, setUsersArray] = useState(null); // массив пользователей
	const [totalCount, setTotalCount] = useState(null); // кол-во пользователей
	const [itemOffset, setItemOffset] = useState(1); // номер страницы
	const [pageCount, setPageCount] = useState(0); // кол-во страниц
	const [selects, setSelects] = useState('&'); // выбранная сортировка
	const [id, setId] = useState(null); // id пользователя
	const [userInfo, setUserInfo] = useState(null); // информация о пользователе
	const [loader, setLoader] = useState(false);
	const [error, setError] = useState(null);
	const usersPerPage = 15; // кол-во пользователей на одной странице

	const URL = 'https://api.github.com/';

	useEffect(() => {
		setPageCount(Math.ceil(totalCount / usersPerPage));
	}, [usersArray]); // установка кол-ва страниц при каждом изменении usersArray

	useEffect(() => {
		if (usersArray) {
			setLoader(true);
			getUsersSubmit({ userName, usersPerPage, itemOffset, selects })
				.then(response => {
					setLoader(false);
					setUsersArray(response.data.items);
				})
				.catch(error => {
					setLoader(false);
					setError(error);
				});
		}
	}, [itemOffset]); // запрос на получение пользователей при переходе на опр. страницу

	const handleSubmit = event => {
		event.preventDefault();
		setLoader(true);
		getUsersSubmit({ userName, usersPerPage, itemOffset, selects })
			.then(response => {
				setLoader(false);
				setUsersArray(response.data.items);
				if (response.data.total_count > 1000) {
					setTotalCount(1000);
				} else {
					setTotalCount(response.data.total_count);
				}
			})
			.catch(error => {
				setLoader(false);
				setError(error);
			});
	}; // запрос на получение пользователей при нажатии на кнопку после ввода имени в инпуте

	const handleChange = event => {
		setUserName(event.target.value);
	}; // функция для записи в стейт введенного имени в инпуте

	const handlePageClick = event => {
		setItemOffset(event.selected + 1);
	}; // функция для записи в стейт номера страницы

	const getUserInfo = user => {
		axios.get(`${URL}users/${user}`).then(response => {
			setUserInfo(response.data);
		});
	}; // функция запроса информации о конкретном пользователе

	const handleUserClick = userId => {
		if (id === userId) {
			setId(null);
		} else {
			setId(userId);
		}
	};

	return (
		<S.SearchUsersWrapper>
			<S.SearchUsersTitle>Github Search Users</S.SearchUsersTitle>
			<S.SearchUsersForm onSubmit={handleSubmit}>
				<S.SearchUsersInput
					type='text'
					placeholder='Поиск'
					onChange={handleChange}
				/>
				<S.SearchUsersButton
					data-testid='button'
					disabled={userName ? false : true}
					type='submit'
				>
					Поиск
				</S.SearchUsersButton>

				<DropDown
					userName={userName}
					itemOffset={itemOffset}
					setUsersArray={setUsersArray}
					setTotalCount={setTotalCount}
					setSelects={setSelects}
					selects={selects}
					usersArray={usersArray}
					setLoader={setLoader}
					setError={setError}
				/>
			</S.SearchUsersForm>

			{loader ? (
				<Loader />
			) : (
				<>
					{error && <Error error={error} />}
					<S.SearchUsersContainer>
						{usersArray &&
							usersArray.map(user => (
								<S.SearchUsersUser
									onClick={() => {
										getUserInfo(user.login);
										handleUserClick(user.id);
									}}
									key={user.id}
								>
									<S.SearchUsersInfo $isClicked={user.id === id}>
										<S.SearchUsersSpan>
											Репозиториев: {userInfo?.public_repos}
										</S.SearchUsersSpan>
										<S.SearchUsersSpan>
											Аккаунт создан:
											{moment(userInfo?.created_at).format('LL')}
										</S.SearchUsersSpan>
									</S.SearchUsersInfo>
									<S.SearchUsersAvatar src={user.avatar_url} alt={user.login} />
									<S.SearchUsersSpan>{user.login}</S.SearchUsersSpan>
								</S.SearchUsersUser>
							))}
					</S.SearchUsersContainer>
					{usersArray?.length === 0 && 'Данных нет'}
				</>
			)}
			{usersArray?.length > 0 && (
				<Pagination pageCount={pageCount} handlePageClick={handlePageClick} />
			)}
		</S.SearchUsersWrapper>
	);
};
