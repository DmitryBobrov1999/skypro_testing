import styled from 'styled-components';
import ReactPaginate from 'react-paginate';

export const Paginate = styled(ReactPaginate)`
	list-style: none;
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 1.2rem;
	margin-top: 40px;
	padding: 8px 0;

	.page-num {
		padding: 8px 15px;
		cursor: pointer;
		font-weight: 400;
		border: 1px solid #ddd;
	}

	.page-num:hover {
		background-color: #929494;
		color: #fff;
	}

	.active {
		background-color: #5ab1bb;
	}
`;
