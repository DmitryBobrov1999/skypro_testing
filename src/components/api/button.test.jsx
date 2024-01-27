import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SearchUsers } from "../../searchUsers/SearchUsers";

it('button',  () => {
	render(<SearchUsers/>);
	const element = screen.getByTestId('buttonId');
	userEvent.click(element)
});