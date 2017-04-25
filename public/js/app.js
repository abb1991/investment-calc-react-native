import React, { PropTypes } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput
} from 'react-native';
import devToolsEnhancer from 'remote-redux-devtools';
import TabBar from './tabs';
import { connect } from 'react-redux';
import { RiskActions, FundsActions } from './actions';
import Chart from './Chart'

class App extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return(
        <TabBar calcRedistribution={this.props.calcRedistribution} riskLevel={this.props.riskLevel} changeRiskLevel={this.props.changeRiskLevel} funds={this.props.funds}/>
      )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  }
});

const mapDispatchToProps = (dispatch) => {
  return {
    changeRiskLevel:  (num) => dispatch(RiskActions(num)),
    calcRedistribution: (funds)=> dispatch(FundsActions(funds))
  }
}

const mapStateToProps = (state) => {
  return state;
}

const DefaultApp = connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

export default DefaultApp;