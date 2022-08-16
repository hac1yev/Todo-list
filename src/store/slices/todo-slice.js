import { createSlice } from "@reduxjs/toolkit";

const getInitialTodo = () => {
    const localTodoList = JSON.parse(window.localStorage.getItem('todoList'));

    if(localTodoList){
        return localTodoList;
    }else{
        return [];
    }
};

const getFilterState = () => {
    const filter = window.localStorage.getItem('filter');

    if(filter){
        return filter;
    }else{
        return 'all';
    }
};

const getSortedState = () => {
    const sort = window.localStorage.getItem('sort');

    if(sort){
        return sort;
    }else{
        return 'date';
    }
};

const deletedList = () => {
    const deletedTodoList = JSON.parse(localStorage.getItem('deletedTodos'));

    if(deletedTodoList){
        return deletedTodoList
    }else{
        return [];
    }
};

const initialTodoState = {
    todoList: getInitialTodo(),
    filterStatus: getFilterState(),
    sortedList: getSortedState(),
    deletedTodoList: deletedList()
};               

export const todoSlice = createSlice({
    name: 'todoSlice',
    initialState: initialTodoState,
    reducers: {
        addTodo(state,action) {
            window.localStorage.setItem('todoList', JSON.stringify([...state.todoList, action.payload]));
            state.todoList.push(action.payload);
            let deleteTodo = state.deletedTodoList.filter(item => item.id !== action.payload.id);
            window.localStorage.setItem('deletedTodos', JSON.stringify(deleteTodo));
            state.deletedTodoList = [...deleteTodo];
        },
        deleteTodo(state,action) {
            const filteredTodo = state.todoList.filter((item) => item.id !== action.payload );
            const deletedTodo = state.todoList.find((item) => item.id === action.payload);
            window.localStorage.setItem('todoList', JSON.stringify(filteredTodo));
            state.todoList = [...filteredTodo];
            window.localStorage.setItem('deletedTodos', JSON.stringify([...state.deletedTodoList, deletedTodo]));
            state.deletedTodoList.push(deletedTodo);
        },
        editTodo(state,action) {
            const indexOfItem = state.todoList.findIndex(item => item.id === action.payload.id);
            state.todoList[indexOfItem].title = action.payload.title;
            state.todoList[indexOfItem].status = action.payload.status;
            state.todoList[indexOfItem].time = action.payload.time;
            window.localStorage.setItem('todoList', JSON.stringify([...state.todoList]));
        },
        updateFilterStatus(state,action) {
            window.localStorage.setItem('filter', action.payload);
            state.filterStatus = action.payload;
        },
        sortTodo(state,action) {
            window.localStorage.setItem('sort', action.payload);
            state.sortedList = action.payload;
        },
        deleteChecked(state) {
            const incompletedTodos = state.todoList.filter((item) => item.status === 'incomplete');
            const completedTodos = state.todoList.filter((item) => item.status === 'complete');
            window.localStorage.setItem('todoList', JSON.stringify(incompletedTodos));
            window.localStorage.setItem('deletedTodos', JSON.stringify(completedTodos));
            state.todoList = incompletedTodos;
            state.deletedTodoList = [...completedTodos];
        },
        deleteAll(state) {
            window.localStorage.removeItem('todoList');
            window.localStorage.setItem('deletedTodos', JSON.stringify(state.todoList));
            state.deletedTodoList = state.todoList;     
            state.todoList = [];  
        },
        removeDeletedTodo(state,action) {
            const filteredTodo = state.deletedTodoList.filter(item => item.id !== action.payload);
            window.localStorage.setItem('deletedTodos', JSON.stringify(filteredTodo));
            state.deletedTodoList = [...filteredTodo];
        }
    },
});

export const todoActionSlice = todoSlice.actions;