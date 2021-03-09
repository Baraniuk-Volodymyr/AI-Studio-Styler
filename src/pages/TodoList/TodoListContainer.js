import React, { Component } from 'react';
import TodoDataService from 'services/TodoDataService';
import Todo from 'models/Todo';
import { toast } from 'react-toastify';
import _ from 'lodash';
import TodoList from './TodoList';

export default class TodoListContainer extends Component {
  actions = [
    {
      title: 'Show closed',
      action: () => {
        this.status = 'close';
        this._refetchData();
      },
    },
    {
      title: 'Show open',
      action: () => {
        this.status = 'open';
        this._refetchData();
      },
    },
    {
      title: 'Show all',
      action: () => {
        this.status = 'all';
        this._refetchData();
      },
    },
  ];

  status = 'open';

  constructor(props) {
    super(props);
    this.state = {
      todos: this._preprocessTodos(TodoDataService.getOpen()),
    };
  }

  _preprocessTodos = (todos) => _.orderBy(todos, '_createdAt', 'desc');

  _refetchData = () => {
    let todos = [];
    switch (this.status) {
      case 'close':
        todos = TodoDataService.getClose();
        break;
      case 'open':
        todos = TodoDataService.getOpen();
        break;
      case 'all':
        todos = TodoDataService.getAll();
        break;
      default:
        todos = TodoDataService.getOpen();
    }

    todos = this._preprocessTodos(todos);

    this.setState({
      todos,
    });
  };

  handleToggleTodo = async (_id) => {
    try {
      const todo = TodoDataService.findOne({ _id });
      let updated = todo;
      if (todo.open) {
        updated = Todo.close(todo);
      } else {
        updated = Todo.reopen(todo);
      }
      await TodoDataService.update(_id, updated);
      this._refetchData();
    } catch (error) {
      const firstError = _.get(error, 'details[0].message', error.message);
      toast.error(firstError);
    }
  };

  handleReopenTodo = (_id) => {
    TodoDataService.reopen(_id);
    this._refetchData();
  };

  handleRemoveTodo = (_id) => {
    TodoDataService.remove(_id);
    this._refetchData();
  };

  handleCreateTodo = async (values) => {
    try {
      const todo = Todo.init(values);
      await TodoDataService.insert(todo);
      this._refetchData();
    } catch (error) {
      const firstError = _.get(error, 'details[0].message', error.message);
      toast.error(firstError);
    }
  };

  render() {
    const { todos } = this.state;
    const { actions } = this;

    return (
      <TodoList
        todos={todos}
        onToggleTodo={this.handleToggleTodo}
        onRemoveTodo={this.handleRemoveTodo}
        onCreateTodo={this.handleCreateTodo}
        actions={actions}
      />
    );
  }
}
