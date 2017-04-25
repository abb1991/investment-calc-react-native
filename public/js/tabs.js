import React from 'react'
import {
  StyleSheet,
  TabBarIOS,
  Text,
  View,
  Slider
} from 'react-native';
import Chart from './Chart';
import CurrentPortfolio from './CurrentPortfolio'
const CALC = require('./InvestmentDistribution.js')

class TabBar extends React.Component {
  // static title = '<TabBarIOS>';
  // static description = 'Tab-based navigation.';
  // static displayName = 'TabBarExample';

  state = {
    selectedTab: 'redTab',
    notifCount: 0,
    presses: 0,
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

  _renderContentRecommended = (color: string, pageText: string, num?: number) => {
    return (
      <CurrentPortfolio calcRedistribution={this.props.calcRedistribution} riskLevel={this.props.riskLevel} funds={this.props.funds} />
    );
  };

  render() {
    return (
      <TabBarIOS
        unselectedTintColor="yellow"
        tintColor="white"
        unselectedItemTintColor="red"
        barTintColor="darkslateblue"
        style={{flex: 1, height: 200}} >
        <TabBarIOS.Item
          title="Risk Level"
          // icon={':0'}
          selected={this.state.selectedTab === 'blueTab'}
          onPress={() => {
            this.setState({
              selectedTab: 'blueTab',
            });
          }}>
          {this._renderContentChart('#414A8C', 'Risk Level')}
        </TabBarIOS.Item>
        <TabBarIOS.Item
          systemIcon="history"
          badge={this.state.notifCount > 0 ? this.state.notifCount : undefined}
          badgeColor="black"
          selected={this.state.selectedTab === 'redTab'}
          onPress={() => {
            this.setState({
              selectedTab: 'redTab',
              notifCount: this.state.notifCount + 1,
            });
          }}>
          {this._renderContentRecommended('#783E33', 'Red Tab', this.state.notifCount)}
        </TabBarIOS.Item>
        <TabBarIOS.Item
          // icon={require('./flux.png')}
          // selectedIcon={require('./relay.png')}
          renderAsOriginal
          title="More"
          selected={this.state.selectedTab === 'greenTab'}
          onPress={() => {
            this.setState({
              selectedTab: 'greenTab',
              presses: this.state.presses + 1
            });
          }}>
          {this._renderContentChart('#21551C', 'Green Tab', this.state.presses)}
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