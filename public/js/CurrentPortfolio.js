import React from 'react';
import {TextInput, View, Text, StyleSheet} from 'react-native';
const CALC = require('./InvestmentDistribution.js')

export default class CurrentPortfolio extends React.Component {
  constructor(props){
    super(props);
  }


rebalance(obj){
  let funds = this.props.funds || {}
  funds = Object.assign(funds, obj)
  funds.rebalanced = CALC.adjust(funds, this.props.riskLevel)
  this.props.calcRedistribution(funds)
}



  render(){
    var f = this.props.funds || {}
    return(
      <View style={{flex: 1}}>
        <Text style={styles.legend} >Cash</Text>
        <TextInput
            style={{ backgroundColor: '#ededed', height: 60 }}
            editable = {true}
            maxLength = {40}
            onChangeText={(num) => this.rebalance({cash: num})}
             />
        <Text style={styles.legend}>Index Funds</Text>
        <TextInput
            style={{ backgroundColor: '#ededed', height: 60 }}
            editable = {true}
            maxLength = {40}
            onChangeText={(num) => this.rebalance({index: num})}
             />
        <Text style={styles.legend}>Gold</Text>
        <TextInput
            style={{ backgroundColor: '#ededed', height: 60 }}
            editable = {true}
            maxLength = {40}
            onChangeText={(num) => this.rebalance({gold: num})}
             />
        <Text style={styles.legend}>Reits</Text>
        <TextInput
            style={{ backgroundColor: '#ededed', height: 60 }}
            editable = {true}
            maxLength = {40}
            onChangeText={(num) => this.rebalance({reits: num})}
             />
        <Text style={styles.legend}>International Equity</Text>
        <TextInput
            style={{ backgroundColor: '#ededed', height: 60 }}
            editable = {true}
            maxLength = {40}
            onChangeText={(num) => this.rebalance({intlEquity: num})}
             />
        <Text style={styles.legend}>Other</Text>
        <TextInput
            style={{ backgroundColor: '#ededed', height: 60 }}
            editable = {true}
            maxLength = {40}
            onChangeText={(num) => this.rebalance({other: num})}
             />
      </View>
    )
  }

}

var styles = StyleSheet.create({
  legend: {
    textAlign: 'center',
    color: '#333333',
  },
});