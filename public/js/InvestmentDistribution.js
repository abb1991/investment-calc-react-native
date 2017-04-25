var _ = require("underscore")

// this module takes risk level and user investment portfolio and returns an ideal portfolio as a perctentage, as well as dollar amounts
module.exports =  {
  calcRiskPercentage: (num) => {
    let cash, index, reits, gold, intlEquity, indexReits, goldIntlEquity;
    let total = 100

    // cash's variability is a linear inverse relationship to risk
    cash = 10 - num;
    total -= cash;
    // index funds and reits as well as intlEquity and gold are grouped together into indexReits and goldIntlEquity because those two groupings have a relationship to each based on risk, and the individual investments within them have a relationship based on risk for the given percentage of total funds

    indexReits = Math.floor(total * (.6 - (2 * num)/100));
    total -= indexReits
    goldIntlEquity = total

    // indexFunds, even with a risk level of 10 will still comprise half of the indexReits total
    index = Math.floor((indexReits * .5) + (indexReits * (10 - num)/20));
    indexReits -= index
    reits = indexReits

    // favor gold overall with a base distribution of 20% of the goldIntlEquity at a risk level of 10, and a max propotion of ~97% at a risk level of 0
    gold = Math.floor((goldIntlEquity * .2) + (goldIntlEquity * ((10 - num)**2)/130))
    goldIntlEquity -= gold
    intlEquity = goldIntlEquity

    return {cash, index, reits, gold, intlEquity}
  },
  adjust(funds, riskLevel){
    let recommendedTotals;
    // get all the values for current investments and sum their total
    let arr = this.validateInput(funds);
    let total = _.reduce(arr, (start, num) => { return start + num; }, 0);
    let riskPercentages = this.calcRiskPercentage(riskLevel);

    // Multiply the recommended percentage for each investment by the sum total of user's current investments
    recommendedTotals = _.mapObject(riskPercentages, (percentage, fund) => {
        return Math.round(percentage * (total/100));
    })
    return recommendedTotals;
  },
  // test for non integer and malformed input
  validateInput(funds){
    let ints = [];
    let vals = _.values(funds)
    ints = vals.map((v)=>{
        // remove $ and commas from user input
        if (v !== '' && typeof v === "string") {
            v = v.replace("$", "").replace(",", "")
            // /\W.()/
            if ( !isNaN(parseInt(v)) ) {
                return parseInt(v);
            }
        } else {
            return 0;
        }
    })
    return ints
  },
  redistributeInvestments(funds, risk){
    let adjustments = {};
    let arr = this.validateInput(funds)
    let total = _.reduce(arr, (start, num) => { return start + num; }, 0);
    let recommended = this.adjust(funds, risk);
    for(var f in funds) {
        // create new properties on the adjustments object with the specific investment type as a key, and the difference between the ideal and current invesment as its value
        let t = recommended[f] - funds[f]
        if(!isNaN(t)){
            adjustments[f] = t;
        }
    }
    return adjustments
  }
}