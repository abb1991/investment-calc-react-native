import React from 'react'
import {
  StyleSheet,
  TabBarIOS,
  Text,
  View,
  Slider
} from 'react-native';
import Chart from './Chart';
import FundsChart from './FundsChart'
import CurrentPortfolio from './CurrentPortfolio'
import {base64IconFunds, base64IconPieChart, base64IconBarChart} from './base64icons'
const CALC = require('./InvestmentDistribution.js')



class TabBar extends React.Component {
  // static title = '<TabBarIOS>';
  // static description = 'Tab-based navigation.';
  // static displayName = 'TabBarExample';

  state = {
    selectedTab: 'blueTab'
  };

  risk(val){
    this.props.changeRiskLevel(val)
    if(Object.getOwnPropertyNames(this.props.funds).length > 0){
      let funds = this.props.funds
      funds.rebalanced = CALC.adjust(funds, val)
      this.props.calcRedistribution(funds)
    }
  }

  _renderContentChart = (color: string, pageText: string, num?: number) => {
    return (
      <View style={[styles.tabContent]}>
        <Chart calcRedistribution={this.props.calcRedistribution} funds={this.props.funds} riskLevel={this.props.riskLevel} />
        <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={10}
            step={1}
            onValueChange={(val) => this.risk(val)} />
      </View>
    );
  };

  _renderContentCurrent = (color: string, pageText: string, num?: number) => {
    return (
      <CurrentPortfolio calcRedistribution={this.props.calcRedistribution} riskLevel={this.props.riskLevel} funds={this.props.funds} />
    );
  };

  _renderContentRecommended = (color: string, pageText: string, num?: number) => {
    return (
      <FundsChart funds={this.props.funds} />
    );
  };

  render() {
    return (
      <TabBarIOS
        unselectedTintColor='white'
        tintColor="red"
        unselectedItemTintColor="white"
        barTintColor="#002040"
        style={{flex: 1, height: 200}} >
        <TabBarIOS.Item
          title="Funds"
          icon={{uri: base64IconFunds(), scale: 4}}
          selected={this.state.selectedTab === 'redTab'}
          onPress={() => {
            this.setState({
              selectedTab: 'redTab'
            });
          }}>
          {this._renderContentCurrent()}
        </TabBarIOS.Item>
        <TabBarIOS.Item
          title="Risk Level"
          style={{backgroundColor: '#E5E8EB'}}
          icon={{uri:base64IconPieChart(), scale: 8}}
          selected={this.state.selectedTab === 'blueTab'}
          onPress={() => {
            this.setState({
              selectedTab: 'blueTab',
            });
          }}>
          {this._renderContentChart()}
        </TabBarIOS.Item>
        <TabBarIOS.Item
          title="Recommendations"
          icon={{uri:base64IconBarChart(), scale: 13}}
          selected={this.state.selectedTab === 'greenTab'}
          onPress={() => {
            this.setState({
              selectedTab: 'greenTab'
            });
          }}>
          {this._renderContentRecommended('#21551C', 'Green Tab')}
        </TabBarIOS.Item>
      </TabBarIOS>
    );
  }
}

var styles = StyleSheet.create({
  tabContent: {
    flex: 1,
    alignItems: 'center',
  },
  tabText: {
    color: 'white',
    margin: 50,
  },
  slider: {
    flex: 1,
    width: 300
  },
  legend: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  }
});

export default TabBar;