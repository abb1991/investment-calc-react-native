
import React,{Component} from 'react'
import {Text as ReactText, View}  from 'react-native'
import { Bar } from 'react-native-pathjs-charts';

export default class FundsChart extends Component {
  constructor(props){
    super(props);
  }

render() {
  let e = this.props.funds
  for(var key in e){
    if(!e[key]){
      e[key] = 0
    }
  }

  let data = [
    [{
      "v": e.rebalanced.cash,
      "name": "Cash"
    },{
      "v": e.cash,
      "name": "Cash"
    }], [{
      "v": e.rebalanced.gold,
      "name": "Gold"
    },
    {
      "v": e.gold,
      "name": "Gold"
    }],
    [{
      "v": e.rebalanced.index,
      "name": "Index Funds"
    }, {
      "v": e.rebalanced.intlEquity,
      "name": "Int'l Equity"
    }],
    [{
      "v": e.rebalanced.reits,
      "name": "REITS"
    }, {
      "v": 0,
      "name": "Other"
    }]
  ]

  let options = {
    width: 275,
    height: 300,
    margin: {
      top: 75,
      left: 50,
      bottom: 50,
      right: 20
    },
    color: '#2980B9',
    gutter: 20,
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
        fontFamily: 'Arial',
        fontSize: 12,
        fontWeight: true,
        fill: '#34495E'
      }
    },
    axisY: {
      showAxis: true,
      showLines: true,
      showLabels: true,
      showTicks: true,
      zeroAxis: false,
      orient: 'left',
      label: {
        fontFamily: 'Arial',
        fontSize: 10,
        fontWeight: true,
        fill: '#34495E'
      }
    }
  }

  return (
    <View>
      <Bar data={data} options={options} accessorKey='v'/>
    </View>
  )
}
}