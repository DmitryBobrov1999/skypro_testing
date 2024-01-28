import styled from 'styled-components';

export const LoaderSpan = styled.span`
	width: 48px;
	height: 48px;
	border: 5px solid #fff;
	border-bottom-color: #ff3d00;
	border-radius: 50%;
	display: inline-block;
	box-sizing: border-box;
	animation: rotation 1s linear infinite;
	margin-top: 400px;

	@keyframes rotation {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
`;
