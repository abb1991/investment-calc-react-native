/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component , PropTypes } from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux'
import riskApp from './public/js/reducers'
import App from './public/js/app'
import configureStore from './src/store/configureStore';

const store = configureStore();


export default class InvestmentCalc extends Component {

  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  }
}




AppRegistry.registerComponent('InvestmentCalc', () => InvestmentCalc);