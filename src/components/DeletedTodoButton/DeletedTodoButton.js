import React, { useState } from 'react';
import classes from './DeletedTodoButton.module.css';
import { AiFillDelete } from 'react-icons/ai';
import DeletedTodoList from '../DeletedTodoList/DeletedTodoList';

const DeletedTodoButton = () => {
  const [isDeletedListVisible,setIsDeletedListVisible] = useState(false);

  const handleDeletedButton = () => {
    setIsDeletedListVisible(true);
  };

  return (
    <>
      <button className={classes['deleted-button']} onClick={handleDeletedButton}>
        Zibil Qutusu
        <AiFillDelete />
      </button>
      {isDeletedListVisible && <DeletedTodoList setIsDeletedListVisible={setIsDeletedListVisible}/>}
    </>
  );
};

export default DeletedTodoButton;