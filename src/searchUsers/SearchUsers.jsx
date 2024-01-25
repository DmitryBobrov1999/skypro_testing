import * as S from './SearchUsers.styles';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { DropDown } from '../components/dropdown/Dropdown';
import { Pagination } from '../components/pagination/Pagination';

export const SearchUsers = () => {
	const [userName, setUserName] = useState(null);
	const [usersArray, setUsersArray] = useState(null);
	const [totalCount, setTotalCount] = useState(null);
	const [itemOffset, setItemOffset] = useState(1);
	const [pageCount, setPageCount] = useState(0);
	const [selects, setSelects] = useState(null);
	const [details, setDetails] = useState(null);
	const [userInfo, setUserInfo] = useState(null);
	const itemsPerPage = 15;

	const URL = 'https://api.github.com/';

	const handleChange = event => {
		setUserName(event.target.value);
	};

	useEffect(() => {
		setPageCount(Math.ceil(totalCount / itemsPerPage));
	}, [usersArray]);

	useEffect(() => {
		if (usersArray) {
			axios
				.get(
					`${URL}search/users?q=${userName}&per_page=${itemsPerPage}&page=${itemOffset}`
				)
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
		}
	}, [itemOffset]);

	const handleSubmit = event => {
		event.preventDefault();

		axios
			.get(
				`${URL}search/users?q=${userName}&per_page=${itemsPerPage}&page=${itemOffset}${selects}`
			)
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
	};

	const handlePageClick = event => {
		setItemOffset(event.selected + 1);
	};

	function getUserInfo(user) {
		axios.get(`${URL}users/${user}`).then(response => {
			setUserInfo(response.data);
		});
	}

	return (
		<S.SearchUsersWrapper>
			<S.SearchUsersTitle>Github Search Users</S.SearchUsersTitle>
			<S.SearchUsersForm onSubmit={handleSubmit}>
				<S.SearchUsersInput
					type='text'
					placeholder='Поиск'
					onChange={handleChange}
				/>
				<S.SearchUsersButton type='submit'>Поиск</S.SearchUsersButton>

				<DropDown
					userName={userName}
					itemOffset={itemOffset}
					setUsersArray={setUsersArray}
					setTotalCount={setTotalCount}
					setSelects={setSelects}
					selects={selects}
				/>
			</S.SearchUsersForm>

			<S.SearchUsersContainer>
				{usersArray &&
					usersArray.map(user => (
						<S.SearchUsersUser
							onClick={() => {
								getUserInfo(user.login);
								setDetails(user.id);
							}}
							key={user.id}
						>
							<S.SearchUsersInfo $isClicked={user.id === details}>
								<span>Репозиториев: {userInfo?.public_repos}</span>
								<span>Аккаунт создан: {userInfo?.created_at}</span>
							</S.SearchUsersInfo>
							<S.SearchUsersAvatar src={user.avatar_url} alt={user.login} />
							<S.SearchUsersSpan>{user.login}</S.SearchUsersSpan>
						</S.SearchUsersUser>
					))}
			</S.SearchUsersContainer>
			{usersArray && (
				<Pagination pageCount={pageCount} handlePageClick={handlePageClick} />
			)}
		</S.SearchUsersWrapper>
	);
};
