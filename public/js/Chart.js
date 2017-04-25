'use strict'

import React, { Component } from 'react';
import { View, Text, Navigator, StyleSheet } from 'react-native';
import { Pie } from 'react-native-pathjs-charts';
const CALC = require('./InvestmentDistribution.js');

class Chart extends Component {

  render() {
    var e = CALC.calcRiskPercentage(this.props.riskLevel)
    if(Object.getOwnPropertyNames(this.props.funds).length > 0){
      e = this.props.funds.rebalanced
    }
    let data = [{
      "name": "Index funds",
      "percentage": e.index
    }, {
      "name": "Gold",
      "percentage": e.gold
    }, {
      "name": "REITs",
      "percentage": e.reits
    }, {
      "name": "International Equity",
      "percentage": e.intlEquity
    }, {
      "name": "Cash",
      "percentage": e.cash
    }]

    let options = {
      margin: {
        top: 20,
        left: 20,
        right: 20,
        bottom: 20
      },
      width: 350,
      height: 350,
      color: '#2980B9',
      r: 50,
      R: 150,
      legendPosition: 'center',
      animate: {
        type: 'oneByOne',
        duration: 200,
        fillTransition: 3
      },
      label: {
        fontFamily: 'Arial',
        fontSize: 12,
        fontWeight: true,
        color: '#ECF0F1'
      }
    }

    return (
      <View>
        <Pie data={data}
          options={options}
          accessorKey="percentage"
          margin={{top: 20, left: 20, right: 20, bottom: 20}}
          color="#2980B9"
          pallete={
            [
              {'r':25,'g':99,'b':201},
              {'r':24,'g':175,'b':35},
              {'r':190,'g':31,'b':69},
              {'r':100,'g':36,'b':199},
              {'r':214,'g':207,'b':32},
              {'r':198,'g':84,'b':45}
            ]
          }
          r={50}
          R={150}
          legendPosition="center"
          label={{
            fontFamily: 'Arial',
            fontSize: 18,
            fontWeight: true,
            color: '#ECF0F1'
          }}
          />
            <Text style={styles.legend}>
            cash: {e.cash}
            </Text>
            <Text style={styles.legend}>
            gold: {e.gold}
            </Text>
            <Text style={styles.legend}>
            reits: {e.reits}
            </Text>
            <Text style={styles.legend}>
            International Equity: {e.intlEquity}
            </Text>
            <Text style={styles.legend}>
            index: {e.index}
            </Text>
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

export default Chart;