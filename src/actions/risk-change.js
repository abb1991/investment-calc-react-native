export function RiskActions(num){
  return {type: "AddRiskLevel", value: num}
}

export function FundsActions(funds){
  return {type: 'RedistributedFunds', funds: funds}
}