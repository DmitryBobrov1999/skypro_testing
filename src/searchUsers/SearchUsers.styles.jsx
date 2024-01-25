import styled from 'styled-components';

export const SearchUsersWrapper = styled.div`
	width: 100%;
	min-height: 100vh;
	padding-top: 40px;
	display: flex;
	flex-direction: column;
	align-items: center;
`;

export const SearchUsersContainer = styled.div`
	max-width: 1158px;
	padding-top: 30px;
	display: grid;
	grid-template-columns: repeat(5, 200px);
	grid-gap: 30px 26px;
	cursor: pointer;
`;

export const SearchUsersTitle = styled.h1``;

export const SearchUsersForm = styled.form`
	margin-top: 20px;
	display: flex;
	gap: 20px;
`;

export const SearchUsersButton = styled.button`
	width: 100px;
	height: 40px;
`;

export const SearchUsersInput = styled.input`
	width: 400px;
	height: 40px;
	padding: 10px;
`;

export const SearchUsersUser = styled.div`
	display: flex;
	flex-direction: column;
	position: relative;
	
`;

export const SearchUsersInfo = styled.div`
	position: absolute;
	background: white;
	width: 200px;
	height: 204px;
	transform: ${props =>
		props.$isClicked ? 'translate(0px)' :'translate(200px)'};
	${'' /* display: ${props => (props.$isClicked ? 'block' : 'none')}; */}
	opacity: ${props => (props.$isClicked ? '1' : '0')};
	transition: all 0.5s;
	display: flex;
	flex-direction: column;
`;

export const SearchUsersAvatar = styled.img`
	padding-bottom: 4px;
`;

export const SearchUsersSpan = styled.span``;

export const SearchUsersDropNav = styled.nav`
	list-style: none;
	overflow: hidden;
	height: 172px;
	background-color: #34495e;
	font-family: Arial;
	width: 200px;
	margin: 0 auto;
	padding: 0;
	text-align: center;
	-webkit-transition: height 0.3s ease;
	transition: height 0.3s ease;
`;

export const SearchUsersDropUl = styled.ul``;

export const SearchUsersDropLi = styled.li``;
