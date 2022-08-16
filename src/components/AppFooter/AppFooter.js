import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { todoActionSlice } from '../../store/slices/todo-slice';
import classes from './AppFooter.module.css';
import toast from 'react-hot-toast';

const AppFooter = () => {
    const todoList = useSelector(state => state.todo.todoList);
    const dispatch = useDispatch();

    let isHasCompleted = false;
    let isHasTodo = false;

    for(const key in todoList){
        if(todoList[key].status === 'complete'){
            isHasCompleted = true;
        }
        if(todoList.length > 0){
            isHasTodo = true;
        }
    }

    const deleteCompletedTodos = () => {
        dispatch(todoActionSlice.deleteChecked());
        toast.success('Tamamlanmış todolar zibil qutusuna göndərildi.');
    };

    const deleteAllTodos = () => {
        dispatch(todoActionSlice.deleteAll());
        toast.success('Todolar zibil qutusuna göndərildi.');
    };

    return (
        <div className={classes['app-footer']}>
            <div className={classes['footer-buttons']}>
                <button type='button' className={classes['complete-button']} disabled={!isHasCompleted} onClick={deleteCompletedTodos}>Tamamlanmış todoları sil</button>
                <button type='button' className={classes['all-button']} onClick={deleteAllTodos} disabled={!isHasTodo} >Hamısını sil</button>
            </div>
        </div>
    );
};

export default AppFooter;