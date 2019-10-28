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
      todoText:'', 
      filter: 'all',
    }

    this.id = 1
    this.handleChange =  this.handleChange.bind(this)
    this.addTodo = this.addTodo.bind(this)
    this.deleteTodo = this.deleteTodo.bind(this)
    this.markTodo = this.markTodo.bind(this)
  }

  handleChange(e){
     this.setState({
        todoText: e.target.value
     })
  }

  addTodo(){
     const {todos, todoText} = this.state;
     this.setState({
       todos: [...todos, {
         id: this.id,
         content: todoText,
         status: false,
       }],
       todoText: '',
     })
     this.id ++
  }

  deleteTodo(id){
    this.setState({
      todos: this.state.todos.filter(todo => todo.id !== id) 
    })
  }

  markTodo(id){
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

  filterTodo(filters,todos){
    switch (filters) {
      case 'done':
      return todos.filter(todo=>todo.status);
      case 'undone':
      return todos.filter(todo=>!todo.status);  
      default:
      return todos;
    }
  }

  render() {
    const { todos, todoText,filter } = this.state;
    return (
      <div className="container">
        <Title />
        <div className="list-header">
          <input type="text" id="input-todo" placeholder="type in something" value={todoText} onChange={this.handleChange}/>
          <div className="btn btn-add" type="button" onClick={this.addTodo}>add</div>
        </div>
        <div className="list-group">
          <div className>
            <div className="filters__all" onClick={()=>{
              this.setState({
                filter: 'all'
              })
            }}>All</div>
            <div className="filters__done" onClick={()=>{
              this.setState({
                filter: 'done'
              })
            }}>Done</div>
            <div className="filters__undone" onClick={()=>{
              this.setState({
                filter: 'undone'
              })
            }}>Undone</div>
          </div>
        {this.filterTodo(filter,todos).map(todo => (
          <Todo key={todo.id} todo={todo} deleteTodo={this.deleteTodo}
            markTodo={this.markTodo}/>
          ))}
        </div>
      </div>
    );
  }
}

export default App;
        
        /*
  if (todos.length >= 1) {
                id = todos[todos.length - 1].id + 1;
              }
            }
  
function setData() {
                window.localStorage.setItem('todoapp', JSON.stringify(todos));
              render(todos);
            }
  
$(document).ready(() => {
  const todoData = window.localStorage.getItem('todoapp');
  if (todoData) {
                todos = JSON.parse(todoData);
              render(todos);
            }
  
  $('.list-group').click((e) => {
    const dataId = Number($(e.target).attr('data-id'));
          
                      // 事項狀態
    if ($(e.target).hasClass('checkbox')) {
                todos = todos.map((todo) => {
                  if (todo.id !== dataId) {
                    return todo;
                  }
                  return {
                    ...todo,
                    status: !todo.status,
                  };
                });
              setData();
            } */
  
  // 編輯
// if ($(e.target).hasClass('btn-edit')) {
//   if ($(e.target).parent().find('.checkbox').prop('checked')) {
//     alert('已完成事項無法編輯');
//     return;
//   }
//   $(e.target).prev().prev().children()
//     .eq(0)
//     .hide(); // item-content,label value
//   $(e.target).prev().show(); // input
//   $(e.target).hide(); // edit
//   $(e.target).nextAll().eq(0).show(); // save
//   $(e.target).nextAll().eq(0).addClass('active');
//   $(e.target).nextAll().eq(1).hide(); // delete
//   $(e.target).nextAll().eq(2).show(); // cancel
//   $(e.target).nextAll().eq(2).addClass('active');
// }

// // 刪除
// if ($(e.target).hasClass('btn-delete')) {
//   // eslint-disable-next-line no-alert
//   // eslint-disable-next-line no-restricted-globals
//   if (confirm('確認要刪除?')) {
//     todos = todos.filter(todo => todo.id !== dataId);
//     setData();
//   }
// }

// // 編輯後儲存
// if ($(e.target).hasClass('btn-save')) {
//   const content = $(e.target).parent().find('.item-input').val();
//   if (content !== '') {
//     todos = todos.map((todo) => {
//       if (todo.id !== dataId) {
//         return todo;
//       }
//       return {
//         ...todo,
//         content,
//       };
//     });
//     setData();
//   } else {
//     alert('內容不可為空');
//   }
// }

// // 取消編輯
// if ($(e.target).hasClass('btn-cancel')) {
//   setData();
// }
//           });
//         });
