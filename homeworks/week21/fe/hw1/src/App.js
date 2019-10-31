import React, { Component } from 'react';
import Todo from './Todo';
import './css/style.css';

class Title extends Component {
  render() {
    return (
      <div className="title">todolist</div>
    );
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [
      ],
      todoText: '',
      filter: 'all',
    }

    this.id = 1
    this.handleChange = this.handleChange.bind(this)
    this.addTodo = this.addTodo.bind(this)
    this.deleteTodo = this.deleteTodo.bind(this)
    this.markTodo = this.markTodo.bind(this)
    this.updateTodo = this.updateTodo.bind(this)
  }

  componentDidMount() {
    const todoData = window.localStorage.getItem('todoapp');
    if (todoData) {
      const oldTodos = JSON.parse(todoData)
      this.setState({
        todos: oldTodos,
      })
      this.id = oldTodos[oldTodos.length - 1].id + 1
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.todos !== this.state.todos) {
      window.localStorage.setItem('todoapp', JSON.stringify(this.state.todos));
    }
  }

  handleChange(e) {
    this.setState({
      todoText: e.target.value
    })
  }

  addTodo() {
    const { todos, todoText } = this.state;
    this.setState({
      todos: [...todos, {
        id: this.id,
        content: todoText,
        status: false,
      }],
      todoText: '',
    })
    this.id++
  }

  deleteTodo(id) {
    this.setState({
      todos: this.state.todos.filter(todo => todo.id !== id)
    })
  }

  markTodo(id) {
    this.setState({
      todos: this.state.todos.map((todo) => {
        if (todo.id !== id) {
          return todo;
        }
        return {
          ...todo,
          status: !todo.status,
        };
      })
    })
  }

  updateTodo(id, value) {
    this.setState({
      todos: this.state.todos.map((todo) => {
        if (todo.id !== id) {
          return todo;
        }
        return {
          ...todo,
          content: value,
        }
      })
    })
  }

  filterTodo(filters, todos) {
    switch (filters) {
      case 'done':
        return todos.filter(todo => todo.status);
      case 'undone':
        return todos.filter(todo => !todo.status);
      default:
        return todos;
    }
  }

  render() {
    const { todos, todoText, filter } = this.state;
    return (
      <div className="container">
        <Title />
        <div className="list-header">
          <input type="text" id="input-todo" placeholder="type in something" value={todoText} onChange={this.handleChange} />
          <div className="btn btn-add" type="button" onClick={this.addTodo}>add</div>
        </div>
        <div className="list-group">
          <div className="filters">
            <div className="filter filter__all" onClick={() => {
              this.setState({
                filter: 'all'
              })
            }}>All
              <span className="count">
                {todos.length}
              </span>
            </div>
            <div className="filter filter__done" onClick={() => {
              this.setState({
                filter: 'done'
              })
            }}>Done
              <span className="count">
                {(todos.filter(todo => todo.status)).length}
              </span>
            </div>
            <div className="filter filter__undone" onClick={() => {
              this.setState({
                filter: 'undone'
              })
            }}>Undone
              <span className="count">
                {(todos.filter(todo => !todo.status)).length}
              </span>
            </div>
          </div>
          {this.filterTodo(filter, todos).map(todo => (
            <Todo key={todo.id} todo={todo} deleteTodo={this.deleteTodo}
              markTodo={this.markTodo} updateTodo={this.updateTodo} />
          ))}
        </div>
      </div>
    );
  }
}

export default App;
