import reducer, { initialState } from './reducer';

import { updateTaskTitle, addTask, deleteTask } from './actions';

describe('reducer', () => {
  describe('updateTaskTitle', () => {
    it('changes task title', () => {
      const state = reducer(
        {
          taskTitle: '',
        },
        updateTaskTitle('New Title'),
      );

      expect(state.taskTitle).toBe('New Title');
    });
  });

  describe('addTask', () => {
    function reduceAddTask(taskTitle) {
      return reducer(
        {
          newId: 100,
          taskTitle,
          tasks: [],
        },
        addTask(),
      );
    }

    context('with task title', () => {
      it('appends a new state into tasks', () => {
        const state = reduceAddTask('New Task');

        expect(state.tasks).toHaveLength(1);
        expect(state.tasks[0].id).not.toBeUndefined();
        expect(state.tasks[0].title).toBe('New Task');
      });

      it('clear task title', () => {
        const state = reduceAddTask('New Task');

        expect(state.taskTitle).toBe('');
      });
    });
    context('without task title', () => {
      it("doesn't work", () => {
        const state = reduceAddTask('');

        expect(state.tasks).toHaveLength(0);
      });
    });
  });

  describe('deleteTask', () => {
    context('with existed task id', () => {
      it('removes the task from tasks', () => {
        const state = reducer(
          {
            tasks: [{ id: 1, title: 'Task' }],
          },
          deleteTask(1),
        );

        expect(state.tasks).toHaveLength(0);
      });
    });

    context('without task id', () => {
      it("doesn't work", () => {
        const state = reducer(
          {
            tasks: [{ id: 1, title: 'Task' }],
          },
          deleteTask(2),
        );

        expect(state.tasks).toHaveLength(1);
      });
    });

    context('without any actions', () => {
      it('returns initial state', () => {
        const state = reducer(
          undefined,
          {
            type: undefined,
          },
        );

        expect(state).toEqual(initialState);
      });
    });
  });
});