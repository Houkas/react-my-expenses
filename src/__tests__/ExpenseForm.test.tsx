import { render, screen } from '@testing-library/react';
import { unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import { test, expect, describe, it, beforeEach, afterEach, vitest } from 'vitest';
import ExpenseForm from '../components/Logic/NewExpense/ExpenseForm';
import { ExpenseCategory } from '../types/ExpenseCategory';

let container: any = null;
beforeEach(() => {
    // setup a DOM element as a render target
    container = document.createElement("div");
    document.body.appendChild(container);
});

afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});

it('Renders user categories', async () => {
    const fakeCategories: ExpenseCategory[] = [
        new ExpenseCategory('test', 'red'),
        new ExpenseCategory('test2', 'blue')
    ]
    /*vitest.spyOn(global, "fetch").mockImplementation(() =>
        Promise.resolve({
            json: () => Promise.resolve(fakeCategories)
        })
    );*/

    // Use the asynchronous version of act to apply resolved promises
    await act(async () => {
        render(<ExpenseForm />, container);
    });

    const categorySelect = screen.getByLabelText('Catégorie')
    expect(categorySelect).toBeTruthy();
})


/*test('Renders ExpenseForm correctly', async () => {
    const component = render(<ExpenseForm/>)
    const categorySelect = screen.getByLabelText('Catégorie')
    expect(categorySelect).toBeTruthy();
    
  });*/