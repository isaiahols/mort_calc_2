const express = require('express');
const conv = require('./controller/Conventional');
const fha = require('./controller/FHA');
const va = require('./controller/VA');
const jumbo = require('./controller/Jumbo');

const app = express()


app.use(express.json())

app.use((req, res, next) => {
    // console.log(req.query)
    next()
})

/**End Points */

app.get(`/api/rate`, (req, res) => res.status(200).send({ rate: .04 })); // this is the 

app.post(`/api/conv/:rate`, conv.startConvCalc)
app.post(`/api/fha/:rate`, fha.startFHACalc)
app.post(`/api/va/:rate`, va.startVACalc)
// app.post(`/api/jumbo`,)



const PORT = 4343
app.listen(PORT, () => console.log(`here we are at ${PORT}`))