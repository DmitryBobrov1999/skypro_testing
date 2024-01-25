import ReactPaginate from 'react-paginate';
import * as S from './Pagination.styles';

export const Pagination = ({ handlePageClick, pageCount }) => {
	return (
		<S.Paginate
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
	);
};
