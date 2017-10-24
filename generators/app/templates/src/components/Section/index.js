import React from 'react';
import classNames from 'classnames';
import injectSheet from 'react-jss';

const styles = {
  box:{
    padding:'3em'
  },
  constrain:{
    maxWidth:'720px',
    marginLeft:'auto',
    marginRight:'auto'
  }
}

function Section(props){
  const {
    className,
    classes
  } = props;
  
  return <section className={classNames(
    classes.box,
    className,
    {
      [classes.constrain]:props.contrain === true
    }
    )}>
    {props.children}
  </section>;
}

export default injectSheet(
  styles
)(Section);