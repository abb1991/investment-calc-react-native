import React from 'react';
import {TextInput, View, Text, StyleSheet} from 'react-native';
const CALC = require('./InvestmentDistribution.js')

export default class CurrentPortfolio extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      showFocus: false
    }
    this.focus = this.focus.bind(this)
    this._fundsInput = this._fundsInput.bind(this)
  }


rebalance(obj){
  let funds = this.props.funds || {}
  funds = Object.assign(funds, obj)
  funds.rebalanced = CALC.adjust(funds, this.props.riskLevel)
  this.props.calcRedistribution(funds)
}

focus(){
  this.setState({ showFocus: true})
}

_fundsInput = (name, fullName) => {
  var obj = {}
  return (
        <View style={{height: 80}}>
          <Text style={styles.legend} >{fullName}</Text>
          <TextInput
              style={ this.state.showFocus ? styles.inputTextFocus : styles.inputText}
              editable = {true}
              keyboardType = {'number-pad'}
              onFocus={this.focus}
              maxLength = {40}
              placeholder={'.00'}
              onChangeText={(num) => {
                obj[name] = num
                this.rebalance(obj)
                }
              }
               />
        </View>
    )
}

  render(){
    return(
      <View style={styles.container}>
        <Text style={styles.header} >Enter dollar amounts for current investments to recieve rebalanced portfolio</Text>
        {this._fundsInput('cash', 'Cash')}
        {this._fundsInput('index', 'Index Funds')}
        {this._fundsInput('gold', 'Gold')}
        {this._fundsInput('intlEquity', 'International Equity')}
        {this._fundsInput('reits', 'REITs')}
        {this._fundsInput('other', 'Other')}
      </View>
    )
  }

}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#4C6279',
  },
  legend: {
    textAlign: 'center',
    color: 'white',
    height: 40,
    textDecorationLine: 'underline',
    paddingTop: 10,
    fontSize: 16,
  },
  inputText: {
    backgroundColor: '#CED0D3',
    height: 50,
    textAlign: 'right',
    paddingRight: 40,
    marginHorizontal: 10,
  },
  inputTextFocus: {
    backgroundColor: 'white',
    height: 50,
    textAlign: 'right',
    paddingRight: 40,
    marginHorizontal: 10,
  },
  header: {
    textAlign: 'center',
    fontSize: 16,
    color: 'white',
    fontWeight: '600',
  }
});