import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Todo extends Component {
  constructor(props) {
    super(props);

    this.delete = this.delete.bind(this);
    this.mark = this.mark.bind(this);
  }

  delete() {
    const { todo, deleteTodo } = this.props;
    deleteTodo(todo.id);
  }

  mark() {
    const { todo, markTodo } = this.props;
    markTodo(todo.id);
  }

  render() {
    const { todo } = this.props;
    return (
      <li className="list-group-item">
        <label>
          <span className="item-content">
            {todo.content}
          </span>
          <input className="checkbox" type="checkbox" defaultChecked={todo.status} data-id={todo.id} onClick={this.mark} />
          <span className="checkmark"></span>
        </label>
        <input type="text" className="item-input" value={todo.content} />
        <span className="btn btn-edit"></span>
        <span className="btn btn-save" ></span>
        <span className="btn btn-delete" onClick={this.delete}></span>
        <span className="btn btn-cancel"></span>
      </li>

    );
  }
}

Todo.propTypes = {
  todo: PropTypes.object,
  deleteTodo: PropTypes.func,
  markTodo: PropTypes.func,
}

export default Todo;
