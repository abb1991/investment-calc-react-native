import React,{Component} from 'react'
import {Text as ReactText, Text, View, Slider}  from 'react-native'
import { Bar } from 'react-native-pathjs-charts';
const CALC = require('./InvestmentDistribution.js');

export default class FundsChart extends Component {
  constructor(props){
    super(props);
  }

render() {
  let e = this.props.funds
  let showChart = (Object.getOwnPropertyNames(e).length > 0)
  if (showChart) {
  let change = CALC.redistributeInvestments(this.props.funds, this.props.riskLevel)
    for(var key in e.rebalanced){
      if(!e[key]){
        e[key] = '0'
        if (!change[key]) {
          change[key] = 0
        }
      } else if (!e['other']) {
        change['other'] = 0
        e['other'] = '0'
      }
  }
    var data = [
      [{
        "v": parseInt(e.cash),
        "name": "Cash"
      },{
        "v": Math.abs(change.cash),
        "name": " ",
      },{
        "v": e.rebalanced.cash,
        "name": " ",
      },
      {
        "v": parseInt(e.gold),
        "name": "Gold"
      },{
        "v": Math.abs(change.gold),
        "name": " ",
      },
      {
        "v": e.rebalanced.gold,
        "name": " "
      },
      {
        "v": parseInt(e.index),
        "name": `Index\nFunds`
      },{
        "v": Math.abs(change.index),
        "name": " ",
      }, {
        "v": e.rebalanced.index,
        "name": " "
      },
      {
        "v": parseInt(e.intlEquity),
        "name": `Intl\nEquity`
      },{
        "v": Math.abs(change.intlEquity),
        "name": " ",
      }, {
        "v": e.rebalanced.intlEquity,
        "name": " "
      },
      {
        "v": parseInt(e.reits),
        "name": "REITS"
      },{
        "v": Math.abs(change.reits),
        "name": " ",
      }, {
        "v": e.rebalanced.reits,
        "name": " "
      },
      {
        "v": parseInt(e.other),
        "name": "Other"
      },{
        "v": Math.abs(change.other),
        "name": " ",
      }, {
        "v": 0,
        "name": " "
      }]
    ]

    var options = {
      width: 275,
      height: 333,
      margin: {
        top: 75,
        left: 50,
        bottom: 50,
        right: 20
      },
      color: '#2980B9',
      animate: {
        type: 'oneByOne',
        duration: 200,
        fillTransition: 3
      },
      axisX: {
        showAxis: true,
        showLines: true,
        showLabels: true,
        showTicks: true,
        zeroAxis: false,
        orient: 'bottom',
        label: {
          fontFamily: 'Arial Narrow',
          fontSize: 11,
          fontWeight: '100',
          fill: '#002040',
        }
      },
      axisY: {
        // showAxis: true,
        showLines: true,
        showLabels: true,
        showTicks: true,
        zeroAxis: false,
        orient: 'left',
        label: {
          fontFamily: 'Arial Narrow',
          fontSize: 10,
          fill: '#002040',
        },
      }
    }
  }
  return (
    <View style={styles.container}>
      { showChart ?
        <View style={styles.chartContainer}>
          <View style={styles.textContainer}>
            <Text style={[styles.textLegend, {color: 'rgb(25, 99, 201)'}]}>Original</Text>
            <Text style={[styles.textLegend, {color: 'rgb(190, 31, 69)'}]}>Difference</Text>
            <Text style={[styles.textLegend, {color: 'rgb(24, 175, 35)'}]}>Recommended</Text>
          </View>
          <Bar
          data={data}
          options={options}
          accessorKey='v'
          style={styles.bar}
          pallete={
                [
                  {'r':25,'g':99,'b':201},
                  {'r':190,'g':31,'b':69},
                  {'r':24,'g':175,'b':35},
                ]
              }/>
          <Slider
                style={styles.slider}
                minimumValue={0}
                maximumValue={10}
                step={1}
                value={this.props.riskLevel}
                onValueChange={(val) => this.props.risk(val)} />
          <Text style={styles.textRiskLevel}>Risk Level</Text>
        </View>
        :
        <Text style={styles.addFunds} >Add your current funds and risk level to receive a rebalanced portfolio recommendation!</Text>}
    </View>
  )
}
}

var styles = {
  container: {
    flex: 1,
    backgroundColor: '#E5E8EB',
    justifyContent: 'center',
  },
  addFunds: {
    textAlign: 'center',
  },
  slider: {
    width: 300,
  },
  bar: {
    width: 300,
    alignSelf: 'center',
    paddingBottom: 100,
  },
  chartContainer: {
    flex: 1,
    alignItems: 'center',
  },
  textContainer: {
    flexDirection:'row',
    flexWrap:'wrap',
    marginTop: 40,
    marginBottom: 10,
  },
  textLegend: {
    marginHorizontal: 10,
  },
  textRiskLevel: {
    // marginBottom: 40,
  }
}
