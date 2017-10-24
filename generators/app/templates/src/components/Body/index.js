import React from 'react';
import {compose} from 'recompose';
import injectSheet from 'react-jss';
import { injectContent } from '@trioxis/react-cafe-cms';
import ReactMarkdown from 'react-markdown';

import Section from '../Section';

const styles = {

}

function Hero(props){
  const {
    content
  } = props;

  return <Section contrain>
    <ReactMarkdown source={content['main-text']} />
  </Section>
}

export default compose(
  injectSheet(styles),
  injectContent(
    'main-text'
  )
)(Hero);