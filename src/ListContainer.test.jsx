import { render, fireEvent } from '@testing-library/react';

import { useDispatch, useSelector } from 'react-redux';

import { deleteTask } from './actions';

import { tasks } from './fixtures/task-dummy';

import ListContainer from './ListContainer';

jest.mock('react-redux');

describe('ListContainer', () => {
  const dispatch = jest.fn();

  useDispatch.mockImplementation(() => dispatch);

  useSelector.mockImplementation((selector) => selector({
    tasks,
  }));

  const renderListContainer = () => render((
    <ListContainer />
  ));

  it('list-title 을 렌더링한다', () => {
    const { getByText } = renderListContainer();

    expect(getByText(/할일 1/)).not.toBeNull();
  });

  it('click 이벤트를 listen한다', () => {
    const { getAllByText } = renderListContainer();

    const buttons = getAllByText('완료');

    fireEvent.click(buttons[0]);

    expect(dispatch).toBeCalledWith(deleteTask(1));
  });
});
