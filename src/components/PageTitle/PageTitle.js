import React from 'react';
import classes from './PageTitle.module.css';

const PageTitle = (props) => {
  return (
    <p className={classes.title}>
        {props.children}
    </p>
  );
};

export default PageTitle;