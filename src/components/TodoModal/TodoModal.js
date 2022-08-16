import React, { useEffect, useState } from 'react';
import classes from './TodoModal.module.css';
import { MdOutlineClose } from 'react-icons/md';
import Button from '../Button/Button';
import { useDispatch, useSelector } from 'react-redux';
import { todoActionSlice } from '../../store/slices/todo-slice';
import { v4 as uuidv4 } from 'uuid';
import toast from 'react-hot-toast';

const TodoModal = (props) => {
    const dispatch = useDispatch();
    const todoList = useSelector(state => state.todo.todoList);
    
    const [title,setTitle] = useState('');
    const [status,setStatus] = useState('incomplete');

    useEffect(() => {
        if(props.type === 'update'){
            setStatus(props.status);
            setTitle(props.title);
        }
    }, [props.status,props.title,props.type]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if(title.trim().length > 0 && status){
            let hasTodo;
            if(props.type === 'add'){
                for(const key in todoList){
                    if(todoList[key].title === title){
                        hasTodo = true;
                    }
                }  
                if(hasTodo){
                    toast.error('Listdə bu başlıqda todo artıq mövcuddur!');
                    return;
                }else{                    
                    dispatch(todoActionSlice.addTodo({
                        id: uuidv4(),
                        title: title,
                        status: status, 
                        time: new Date().toLocaleString(),
                    }));
                    toast.success('Todo uğurla əlavə edildi.');
                    props.setModalOpen(false);
                    setTitle(''); 
                }
            }
            if(props.type === 'update'){
                if(props.title !== title || props.status !== status){
                    dispatch(todoActionSlice.editTodo({
                        id: props.id,
                        title: title,
                        status: status,
                        time: new Date().toLocaleString(),
                    }));
                    toast.success('Todo uğurla yeniləndi.');
                    props.setUpdateModalOpen(false);
                    setTitle('');
                }else{
                    toast.error('Başlıq və ya statusu dəyişin!');
                    return;
                }
            }
        }
        if(title.trim() === ''){
            toast.error('Başlıq boş ola bilməz!')
            return;
        }
    };

    const handleCancel = () => {
        if(props.type === 'update'){
            props.setUpdateModalOpen(false);
        }
        if(props.type === 'add'){
            props.setModalOpen(false);
        }
    };

    return (
        <div className={classes['todo-modal']}>
            <div className={classes['todo-container']}>
                <div onClick={() => handleCancel()} className={classes['close-todo-form']}>
                    <MdOutlineClose/>
                </div>
                <form onSubmit={(e) => handleSubmit(e)} className={classes['todo-form']}>
                    <h2 className={classes['form-title']}>{props.type === 'add' ? "Todo əlavə et" : "Todo'nu yenilə"}</h2>
                    <label htmlFor="title">
                        Başlıq
                        <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" id='title' />
                    </label>
                    <label htmlFor="status">
                        Status
                        <select value={status} onChange={(e) => setStatus(e.target.value)} name="status" id='status'>
                            <option value="incomplete">Tamamlanmamış</option>
                            <option value="complete">Tamamlanmış</option>
                        </select>
                    </label>
                    <div className={classes['todo-modal-button']}>
                        <Button variant='primary' type="submit">{props.type === 'update' ? "Yenilə" : "Əlavə et"}</Button>
                        <Button onClick={() => handleCancel()} variant='secondary' type="button">Ləğv et</Button>
                    </div>
                </form>
            </div>
        </div>
        
    );
};

export default TodoModal;