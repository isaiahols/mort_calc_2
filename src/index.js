const express = require('express');
const conv = require('./controller/Conventional');
const fha = require('./controller/FHA');
const va = require('./controller/VA');
const jumbo = require('./controller/Jumbo');
const rate = require('./controller/Rate');
const cors = require('cors')
const axios = require('axios');

const app = express()
app.use(cors())


app.use(express.json())

app.use((req, res, next) => {
    // console.log(req.query)
    next()
})

/**End Points */

app.get(`/api/rate`, rate.getRate); // this is the 

app.post(`/api/conv/:rate`, conv.startConvCalc)
app.post(`/api/fha/:rate`, fha.startFHACalc)
app.post(`/api/va/:rate`, va.startVACalc)
// app.post(`/api/jumbo`,)

app.get('/api/get-rate', rate.getRate1)
app.post('/api/get-rate2', rate.getRate2)

const PORT = 4343
app.listen(PORT, () => console.log(`here we are at ${PORT}`))