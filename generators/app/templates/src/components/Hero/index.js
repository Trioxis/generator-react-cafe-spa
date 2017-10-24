import React from 'react';
import {compose} from 'recompose';
import injectSheet from 'react-jss';
import { injectContent } from '@trioxis/react-cafe-cms';

import Section from '../Section';
import logo from './logo.svg';

const styles = {
  section:{
    display:'flex',
    flexDirection:'row',
    flexWrap:'wrap',
    justifyContent:'center',
    backgroundColor:'#eee'
  },
  logo:{
    height:125,
    width:125
  }
}

function Hero(props){
  const {
    classes,
    content
  } = props;

  return <Section className={classes.section}>
    <img src={logo} alt="logo" className={classes.logo} />
    <div>
      <h1>{content['site-title']}</h1>
      <h3>{content['hero-text']}</h3>
    </div>
  </Section>
}

export default compose(
  injectSheet(styles),
  injectContent(
    'site-title',
    'hero-text'
  )
)(Hero);