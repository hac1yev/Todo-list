import React, { useEffect, useState } from 'react';
import classes from './TodoItem.module.css';
import { MdDelete,MdEdit } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { todoActionSlice } from '../../store/slices/todo-slice';
import toast from 'react-hot-toast';
import TodoModal from '../TodoModal/TodoModal';
import CheckButton from '../CheckButton/CheckButton';

const TodoItem = (props) => {
  const [updateModalOpen,setUpdateModalOpen] = useState(false);
  const [checked, setChecked] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if(props.status === 'complete'){
      setChecked(true);
    }else{
      setChecked(false);
    }
  }, [props.status]);

  const handleDelete = () => {
    dispatch(todoActionSlice.deleteTodo(props.id));
    toast.success('Todo zibil qutusuna göndərildi.')
  };

  const handleEdit = () => {
    setUpdateModalOpen(true);
  };

  const handleCheck = () => {
    setChecked(!checked);
    dispatch(todoActionSlice.editTodo({
      id: props.id,
      title: props.title,
      status: checked ? 'incomplete' : 'complete',
      time: props.time
    }))
  };

  return (
    <>
      <div className={classes['todo-item']}>
          <div className={classes['todo-details']}> 
              <CheckButton checked={checked} handleCheck={handleCheck} />         
              <div className={classes['todo-texts']}>
                  <p className={props.status === 'incomplete' ? classes['incompleted-title'] : classes['completed-title']}>
                    {props.title}
                  </p>
                  <p className={classes['todo-time']}>{props.time}</p>
              </div>
          </div>
          <div className={classes['todo-icons']}>
              <div className={classes['todo-icon-edit']} onClick={handleEdit}>
                <MdEdit />
              </div>
              <div className={classes['todo-icon-delete']} onClick={handleDelete}>
                <MdDelete />
              </div>
          </div>
      </div>
      {updateModalOpen && 
        <TodoModal 
          type='update' 
          id={props.id} 
          status={props.status} 
          title={props.title} 
          setUpdateModalOpen={setUpdateModalOpen} 
        />
      }
    </>
  );
};

export default TodoItem;