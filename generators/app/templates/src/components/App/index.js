import React, { Component } from 'react';
import {CMSProvider} from '@trioxis/react-cafe-cms';

import Hero from '../Hero';
import Body from '../Body';

class App extends Component {
  render() {
    return (
      <CMSProvider website='example-spa'>
        <div>
          <Hero />
          <Body />
        </div>
      </CMSProvider>
    );
  }
}

export default App;
