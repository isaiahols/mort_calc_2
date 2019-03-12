module.exports = {
    getRate: (req, res) => {
        const rate = 4
        //save check db for latest saved rate
        // if saved in the last 12 hours then return 
        // else hit api for new rate, save to db and return to 

        res.status(200).send(rate)
    }
}