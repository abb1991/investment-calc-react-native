
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import App from '../../public/js/app';
import * as RiskActions from '../actions/risk-change';

function mapStateToProps(state) {
  return {
    riskLevel: state.riskLevel
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(RiskActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);