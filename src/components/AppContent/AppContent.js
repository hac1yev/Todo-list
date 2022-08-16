import React from 'react';
import { useSelector } from 'react-redux';
import TodoItem from '../TodoItem/TodoItem';
import classes from './AppContent.module.css';

const AppContent = () => {
  const todoList = useSelector((state) => state.todo.todoList);
  const filterStatus = useSelector((state) => state.todo.filterStatus);
  const sortedList = useSelector(state => state.todo.sortedList);

  const sortedTodoList = [...todoList];
  if(sortedList === 'date'){
    sortedTodoList.sort((a, b) => new Date(b.time) - new Date(a.time));
  }
  if(sortedList === 'title'){
    sortedTodoList.sort((a, b) => a.title > b.title ? 1 : -1);
  }

  const filteredTodoList = sortedTodoList.filter((item) => {
    if (filterStatus === 'all') {
      return true;
    }else{
      return item.status === filterStatus;
    }
  });

  return (
    <div className={classes['app-content']}>
      {filteredTodoList && filteredTodoList.length > 0 
      ? filteredTodoList.map((item) => (
        <TodoItem 
          id={item.id}
          key={item.id}
          title={item.title}
          status={item.status}
          time={item.time}
        />
      ))
      : <h4 style={{textAlign: 'center'}}>Məlumat tapılmadı!</h4>}
    </div>
  );
};

export default AppContent;