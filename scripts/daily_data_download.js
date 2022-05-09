// https://api.esios.ree.es/archives/70/download_json?locale=es&date=dd-mm-yyyy

const fetch = require('node-fetch')
const fs = require('fs')
const dataConvert = require('./data_convert')

const date = new Date()
console.log(date) // Delete this line when adjust the data download hour.
// date.setDate(date.getDate() + 1)
const year = date.getFullYear()
const month = `${date.getMonth() + 1}`.padStart(2, '0')
const day = `${date.getDate()}`.padStart(2, '0')
const FileNameDate = `${year}${month}${day}`
const URLdate = `${day}-${month}-${year}`

const PREFIX_URL = 'https://api.esios.ree.es/archives/70/download_json?locale=es&date='
const url = `${PREFIX_URL}${URLdate}`

const PREFIX_DATAFILE_NAME = 'data_'
const DATAFILE_EXT = '.json'

fetch(url)
  .then(res => res.json())
  .then(async data => {
    const jsonFileName = `${PREFIX_DATAFILE_NAME}${FileNameDate}${DATAFILE_EXT}`
    await fs.promises.writeFile(`./public/data/original/${jsonFileName}`, JSON.stringify(data))

    const formattedJSON = await dataConvert(data, FileNameDate)
    const formattedJSOnFileName = `f${jsonFileName}`
    await fs.promises.writeFile(`./public/data/formatted/${formattedJSOnFileName}`, formattedJSON)
  })
  .catch(err => {
    console.log(`ERROR. ${url} does not exist.`)
    console.log(err)
  })
