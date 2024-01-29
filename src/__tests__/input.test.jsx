import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SearchUsers } from '../searchUsers/SearchUsers';

it('the button should be disabled when input is empty', () => {
	render(<SearchUsers />);
	const inputElement = screen.getByRole('textbox');
	const buttonElement = screen.getByTestId('button');
	expect(buttonElement).toBeDisabled();
	userEvent.type(inputElement, 'dima');
	expect(buttonElement).not.toBeDisabled();
});
