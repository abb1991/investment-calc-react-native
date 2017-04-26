'use strict'

import React, { Component } from 'react';
import { View, Text, Navigator, StyleSheet } from 'react-native';
import { Pie } from 'react-native-pathjs-charts';
const CALC = require('./InvestmentDistribution.js');

class Chart extends Component {

  render() {
    var e = CALC.calcRiskPercentage(this.props.riskLevel)
    var showDollarAmount = (Object.getOwnPropertyNames(this.props.funds).length > 0)
    if(showDollarAmount){
      e = this.props.funds.rebalanced
    }
    let data = [{
      "name": "I",
      "percentage": e.index
    }, {
      "name": "G",
      "percentage": e.gold
    }, {
      "name": "R",
      "percentage": e.reits
    }, {
      "name": "IE",
      "percentage": e.intlEquity
    }, {
      "name": "C",
      "percentage": e.cash
    }]

    let options = {
      width: 350,
      height: 350,
      color: '#2980B9',
      r: 0,
      R: 150,
      legendPosition: 'center',
      animate: {
        type: 'oneByOne',
        duration: 400,
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
        <View style={{marginTop: 50}}>
          <Pie data={data}
            options={options}
            accessorKey="percentage"
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
            legendPosition="center"
            label={{
              color: 'rgba(238, 238, 238, 0)'
            }}
            />
          </View>
            <Text style={[styles.legend, {color: 'rgb(214, 207, 32)'}]}>
            cash: {showDollarAmount ? '$' + e.cash: e.cash + '%'}
            </Text>
            <Text style={[styles.legend, {color: 'rgb(24, 175, 35)'}]}>
            gold: {showDollarAmount ? '$' + e.gold: e.gold + '%'}
            </Text>
            <Text style={[styles.legend, {color: 'rgb(190, 31, 69)'}]}>
            reits: {showDollarAmount ? '$' + e.reits: e.reits + '%'}
            </Text>
            <Text style={[styles.legend, {color: 'rgb(100, 36, 199)'}]}>
            International Equity: {showDollarAmount ? '$' + e.intlEquity: e.intlEquity + '%'}
            </Text>
            <Text style={[styles.legend, {color: 'rgb(25, 99, 201)'}]}>
            index: {showDollarAmount ? '$' + e.index: e.index + '%'}
            </Text>
      </View>
    )
  }
}

var styles = StyleSheet.create({
  legend: {
    textAlign: 'center',
    color: '#333333',
    fontSize: 14,
    lineHeight: 25,
  },
  cash: {
    color: '#F100FF'
  }
});

export default Chart;