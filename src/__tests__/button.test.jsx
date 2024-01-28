import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SearchUsers } from '../searchUsers/SearchUsers';

it('buttons should be clickable', () => {
	render(<SearchUsers />);
	const element = screen.getByRole('button');
	userEvent.click(element);
});
