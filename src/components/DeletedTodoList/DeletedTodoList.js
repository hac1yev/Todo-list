import React from 'react';
import classes from './DeletedTodoList.module.css';
import { MdOutlineClose } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { todoActionSlice } from '../../store/slices/todo-slice';
import toast from 'react-hot-toast';
import { MdDelete } from 'react-icons/md';

const DeletedTodoList = ({setIsDeletedListVisible}) => {
  const deletedTodos = useSelector(state => state.todo.deletedTodoList);
  const todoList = useSelector(state => state.todo.todoList);
  const dispatch = useDispatch();

  const handleLoadTodo = (deletedTodo) => {
    let hasTodo; 
    for(const key1 in deletedTodos){
      for(const key2 in todoList){
        if(todoList[key2].title === deletedTodos[key1].title){
          toast.error('Listde bu başlıqda todo mövcud olduğu üçün geri yükləmək olmur!');
          hasTodo = true;
          return;
        }
      }
    }
    if(!hasTodo){
      dispatch(todoActionSlice.addTodo(deletedTodo));
    }
  };

  const handleDelete = (id) => {
    dispatch(todoActionSlice.removeDeletedTodo(id));
    toast.success('Todo zibil qutusundan silindi');
  };

  const deletedTodoList = deletedTodos.map((item) => (
    <div className={classes['deleted-todo']} key={item.id}>
        <span style={{font: '20px sans-serif'}}>{item.title}</span>
        <span className={classes['button-span']}>
          <button onClick={handleLoadTodo.bind(null,item)}>Geri Yüklə</button>
          <div className={classes['delete-icon']} onClick={handleDelete.bind(null,item.id)}>
            <MdDelete />
          </div>
        </span>
    </div>
  ))

  return (
    <div className={classes['deleted-list']}>
        <div className={classes['close-icon']} onClick={() => setIsDeletedListVisible(false)}>
          <MdOutlineClose/>
        </div>
        <div className={classes['deleted-list-container']}>
            <h2>Silinmiş Todolar</h2>
            {deletedTodos && deletedTodoList.length > 0 && <div className={classes['deleted-todos']}>
              {deletedTodoList}
            </div>}
            {deletedTodos.length === 0 && 
            <h4 style={{color: '#000'}}>Məlumat yoxdur!</h4>}
        </div>    
    </div>
  );
};

export default DeletedTodoList;