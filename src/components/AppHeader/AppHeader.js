import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { todoActionSlice } from '../../store/slices/todo-slice';
import Button from '../Button/Button';
import SelectButton from '../Button/SelectButton';
import TodoModal from '../TodoModal/TodoModal';
import classes from './AppHeader.module.css';

const AppHeader = () => {
  const [modalOpen,setModalOpen] = useState(false);
  const dispatch = useDispatch();
  const sortedList = useSelector(state => state.todo.sortedList);

  const updateFilter = (e) => {
    dispatch(todoActionSlice.updateFilterStatus(e.target.value));
  };

  const handleSortTodoList = (e) => {
    dispatch(todoActionSlice.sortTodo(e.target.value));
  };
  
  return (
    <div className={classes['app-header']}>
        <Button onClick={() => setModalOpen(true)} variant='primary' type='button'>Todo əlavə et</Button>
        <SelectButton updateFilter={updateFilter}>
          <option value="all">Hamısı</option>
          <option value="incomplete">Tamamlanmamış</option>
          <option value="complete">Tamamlanmış</option>
        </SelectButton>
        <select className={classes['sort-todo']} onChange={handleSortTodoList} value={sortedList}>
          <option value="date">Son tarixə görə sırala</option>
          <option value="title">Başlığa görə sırala</option>
        </select>
        {modalOpen && <TodoModal type="add" setModalOpen={setModalOpen} />}
    </div>
  );
};

export default AppHeader;