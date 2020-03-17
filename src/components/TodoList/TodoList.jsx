import React from 'react';

import { TodoListComponentStyles } from './TodoList.Styles';

// It is recommended to keep components stateless and use redux for managing states
const TodoList = (props) => {
  if (!props.isOpen) {
    return null;
  }

  return (
    <TodoListComponentStyles>
        <br/>
        <h1>TO DO</h1>
        <hr/>
        <ul>
            <li>list 1</li>
            <li>list 2</li>
            <li>list 3</li>
        </ul>
      This is a dismissible demo component
      <i className="accented" onClick={props.dismissBar}>
        close
      </i>
      Hello darkness here my friend
    </TodoListComponentStyles>
  );
};

export default TodoList;
