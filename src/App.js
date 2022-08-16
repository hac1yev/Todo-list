import React from "react";
import PageTitle from "./components/PageTitle/PageTitle";
import './styles/GlobalStyles.css';
import AppHeader from './components/AppHeader/AppHeader';
import AppContent from "./components/AppContent/AppContent";
import { Toaster } from 'react-hot-toast';
import AppFooter from "./components/AppFooter/AppFooter";
import DeletedTodoButton from "./components/DeletedTodoButton/DeletedTodoButton";

const App = () => {
  return (
    <>
      <div className="app">
        <div className='todo-head'>
          <PageTitle>TODO LIST</PageTitle>
          <DeletedTodoButton />
        </div>
        <div className='add-wrapper'>
          <AppHeader />
          <AppContent />
          <AppFooter />
        </div>
      </div>
      <Toaster position="bottom-right" toastOptions={{
        style: {
          fontSize: '1.1rem',
          padding: '1rem'
        }
      }}/>
    </>
  );
};

export default App;