const initialState = {
  riskLevel: 0,
  funds: {
    cash: 0,
    gold: 0,
    reits: 0,
    index: 0,
    intlEquity: 0,
    other: 0
  }
}

function riskApp(state, action){
  if(typeof state === "undefined") {
    return initialState;
  }

  switch(action.type){
    case 'AddRiskLevel':
      return Object.assign({}, state, { riskLevel: action.value  });
    case 'RedistributedFunds':
      return Object.assign({}, state, {funds: action.funds});
    default:
      return state;
  }
}

export default riskApp;