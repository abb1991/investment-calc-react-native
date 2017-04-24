const initialState = {
  riskLevel: 0,
  funds: {}
}

function riskApp(state, action){
  if(typeof state === "undefined") {
    return initialState;
  }

  switch(action.type){
    case 'AddRiskLevel':
      return Object.assign({}, state, { riskLevel: action.value });
    case 'RedistributedFunds':
      return Object.assign({}, state, {funds: action.funds});
    default:
      return state;
  }
}

export default riskApp;