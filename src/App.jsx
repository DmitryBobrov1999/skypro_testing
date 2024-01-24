import { GlobalStyle } from './App.styles';
import { SearchUsers } from './searchUsers/SearchUsers';

export const App = () => {
	return (
		<div>
			<GlobalStyle />
			<SearchUsers/>
		</div>
	);
};
