import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isInEditMode: false,
      editText: '',
    }

    this.mark = this.mark.bind(this);
    this.changeEditMode = this.changeEditMode.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.update = this.update.bind(this)
    this.delete = this.delete.bind(this);
  }

  mark() {
    const { todo, markTodo } = this.props;
    markTodo(todo.id);
  }

  delete() {
    const { todo, deleteTodo } = this.props;
    deleteTodo(todo.id);
  }

  changeEditMode() {
    const { isInEditMode } = this.state;
    this.setState({
      isInEditMode: !isInEditMode,
    })
  }

  handleChange(e) {
    this.setState({
      editText: e.target.value,
    })
  }

  update() {
    const { todo, updateTodo } = this.props;
    const { editText } = this.state;
    this.setState({
      isInEditMode: false,
      editText: '',
    })
    if (editText !== '') {
      updateTodo(todo.id, editText);
    }
  }

  render() {
    const { todo } = this.props;
    const { isInEditMode } = this.state;
    return (
      <li className="list-group-item">
        <label>
          <span className="item-content" style={{ display: isInEditMode ? 'none' : 'block' }}>
            {todo.content}
          </span>
          <input className="checkbox" type="checkbox" defaultChecked={todo.status} data-id={todo.id} onClick={this.mark} />
          <span className="checkmark" ></span>
        </label>
        <input type="text" className="item-input" defaultValue={todo.content} style={{ display: isInEditMode ? 'block' : 'none' }} onChange={this.handleChange} />
        <span className="btn btn-edit" onClick={this.changeEditMode} style={{ display: isInEditMode ? 'none' : 'block' }}></span>
        <span className="btn btn-save" onClick={this.update} style={{ display: isInEditMode ? 'block' : 'none' }}></span>
        <span className="btn btn-delete" onClick={this.delete} style={{ display: isInEditMode ? 'none' : 'block' }}></span>
        <span className="btn btn-cancel" onClick={this.changeEditMode} style={{ display: isInEditMode ? 'block' : 'none' }}></span>
      </li >

    );
  }
}

Todo.propTypes = {
  setState: PropTypes.func,
  todo: PropTypes.object,
  deleteTodo: PropTypes.func,
  markTodo: PropTypes.func,
  updateTodo: PropTypes.func,
  isInEditMode: PropTypes.string,
}

export default Todo;
