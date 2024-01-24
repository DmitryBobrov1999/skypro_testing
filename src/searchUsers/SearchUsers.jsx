import * as S from './SearchUsers.styles';
import axios from 'axios';
import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import './pagination.css';

export const SearchUsers = () => {
	const [userName, setUserName] = useState(null);
	const [usersArray, setUsersArray] = useState(null);
	const [totalCount, setTotalCount] = useState(null);
	const [itemOffset, setItemOffset] = useState(1);
	const [pageCount, setPageCount] = useState(0);
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
		// setCurrentPage(1);
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
	};

	const handlePageClick = event => {
		setItemOffset(event.selected + 1);

		
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
				<S.SearchUsersButton type='submit'>Поиск</S.SearchUsersButton>
			</S.SearchUsersForm>

			<S.SearchUsersContainer>
				{usersArray &&
					usersArray.map(user => (
						<S.SearchUsersUser key={user.id}>
							<S.SearchUsersAvatar src={user.avatar_url} alt={user.login} />
							<S.SearchUsersSpan>{user.login}</S.SearchUsersSpan>
						</S.SearchUsersUser>
					))}
			</S.SearchUsersContainer>
			{usersArray && (
				<ReactPaginate
					breakLabel='...'
					nextLabel='next >'
					onPageChange={handlePageClick}
					pageRangeDisplayed={3}
					pageCount={pageCount}
					previousLabel='< previous'
					renderOnZeroPageCount={null}
					containerClassName='pagination'
					pageLinkClassName='page-num'
					previousLinkClassName='page-num'
					nextLinkClassName='page-num'
					activeLinkClassName='active'
					breakLinkClassName='page-num'
				/>
			)}
		</S.SearchUsersWrapper>
	);
};
