import React from 'react';
import classes from './Button.module.css';

const Button = (props) => {

  return (
    <button onClick={props.onClick} type={props.type} className={props.variant==='primary' ? classes['primary-button'] : classes['secondary-button']}>
        {props.children}
    </button>
  );
};

export default Button;