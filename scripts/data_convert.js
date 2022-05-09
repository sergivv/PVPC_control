// Convert the data downloaded from ESIOS into a new JSON with the correctly formatted price

/*  OUT FORMAT
  { "date": "YYYYMMDD",
    "PCB": [hour_price, hour_price, ...., hour_price],
    "CYM": [hour_price, hour_price, ...., hour_price]
  }
*/
module.exports = async function dataConvert (originalData, date) {
  let textPCB = '['
  let textCYM = '['

  for (let i = 0; i < 24; i++) {
    const hourPricePCB = (Number(originalData.PVPC[i].PCB.replace(/,/g, '.')) / 1000).toFixed(5)
    const hourPriceCYM = (Number(originalData.PVPC[i].CYM.replace(/,/g, '.')) / 1000).toFixed(5)
    textPCB += (' ' + hourPricePCB + ',')
    textCYM += (' ' + hourPriceCYM + ',')
  }

  let JSONtextPCB = (textPCB.slice(0, textPCB.length - 1))
  JSONtextPCB += ' ]'

  let JSONtextCYM = (textCYM.slice(0, textCYM.length - 1))
  JSONtextCYM += ' ]'

  const finalJSON = `{"date": "${date}", "PCB": ${JSONtextPCB}, "CYM": ${JSONtextCYM}}`
  return finalJSON
}
