const express = require('express');
const conv = require('./controller/Conventional');
const fha = require('./controller/FHA');
const va = require('./controller/VA');
const jumbo = require('./controller/Jumbo');

const app = express()


app.use(express.json())

app.use((req, res, next) => {
    console.log('top level', req.query)
    next()
})

const middleware = (req, res, next) => {
    console.log('request level')
    next()
}


/**End Points */

// app.get(`/api/rate`, )

app.post(`/api/conv/:rate`, conv.startConvCalc)
app.post(`/api/fha`, fha.startFHACalc)
// app.post(`/api/va`,)
// app.post(`/api/jumbo`,)



const PORT = 4343
app.listen(PORT, () => console.log(`here we are at ${PORT}`))