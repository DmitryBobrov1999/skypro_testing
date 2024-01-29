import * as S from './Error.styles';

export const Error = ({ error }) => {
	return (
		<S.Error>
			<S.ErrorSpan>Ошибка: {error.message}</S.ErrorSpan>
		</S.Error>
	);
};
