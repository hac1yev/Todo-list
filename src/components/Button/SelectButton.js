import React from 'react';
import { useSelector } from 'react-redux';
import classes from './SelectedButton.module.css';

const SelectButton = (props) => {
  const filterStatus = useSelector(state => state.todo.filterStatus)

  return (
    <select value={filterStatus} onChange={props.updateFilter} className={classes.selectedButton}>
        {props.children}
    </select>
  );
};

export default SelectButton;