module.exports = {
    getRate: (req, res) => {
        const rate = 0.04
        const data = { rate }
        //save check db for latest saved rate
        // if saved in the last 12 hours then return 
        // else hit api for new rate, save to db and return to 
        res.status(200).send(data)
        // res.status(200).send(rate)
    },
    checkRate: () => {

    },
    getRate1: async (req, res) => {

        var request = require("request");

        var options = {
            method: 'POST',
            url: 'https://login.microsoftonline.com/marketplaceauth.optimalblue.com/oauth2/token',
            headers:
            {
                'cache-control': 'no-cache',
                Connection: 'keep-alive',
                'content-length': '234',
                'accept-encoding': 'gzip, deflate',
                cookie: 'fpc=AkYmxFYjMplBg615Kk4Om62RTjHtAQAAAMU0ltQOAAAA; x-ms-gateway-slice=prod; stsservicecookie=ests',
                Host: 'login.microsoftonline.com',
                'Postman-Token': 'da136cc1-7e13-42a6-872d-1b2b33d77502,31e1612e-57d5-4245-84c3-4e8b29a08e0e',
                'Cache-Control': 'no-cache',
                Accept: '*/*',
                'User-Agent': 'PostmanRuntime/7.13.0',
                Authorization: 'Bearer {{Authorization}}',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            form:
            {
                client_id: '03137832-73ce-43b1-ae99-9f3a2a59bb0a',
                client_secret: 'LqwD9/wazGtjPr7XehGeyxOwgIW7cwqUZSFliMXgJMOa=',
                grant_type: 'client_credentials',
                resource: 'https://marketplaceauth.optimalblue.com/d35ae893-2367-40b5-a9b4-bfab3acb7991'
            }
        };

        request(options, function (error, response, body) {
            if (error) throw new Error(error);

            // console.log(body['access_token']);
            res.status(200).send(body)
        });
        // const firstUrl = 'https://login.microsoftonline.com/marketplaceauth.optimalblue.com/oauth2/token'
        // const firstBody = {
        //     client_id: '03137832-73ce-43b1-ae99-9f3a2a59bb0a',
        //     client_secret: 'LqwD9/wazGtjPr7XehGeyxOwgIW7cwqUZSFliMXgJMOa=',
        //     grant_type: 'client_credentials',
        //     resource: 'https://marketplaceauth.optimalblue.com/d35ae893-2367-40b5-a9b4-bfab3acb7991',

        // }
        // try {
        //     const firstResponse = await axios.post(firstUrl, firstBody)
        //     console.log(firstResponse)
        //     res.sendStatus(200)
        // } catch (error) {
        //     console.error(error)
        //     res.sendStatus(500)
        // }

    },

    getRate2: async (req, res) => {
        var request = require("request");
        console.log("hello");


        var options = {
            method: 'POST',
            url: 'https://marketplace.optimalblue.com/full/api/businesschannels/90019/originators/943018/productgroupsearch',
            headers:
            {
                'cache-control': 'no-cache',
                Connection: 'keep-alive',
                'content-length': '2059',
                'accept-encoding': 'gzip, deflate',
                Host: 'marketplace.optimalblue.com',
                'Postman-Token': '1fc68a86-7385-4ab8-843a-d6719a6ad853,55f33ac2-3f4e-4e0f-a8a8-87f86875a986',
                'Cache-Control': 'no-cache',
                Accept: '*/*',
                'User-Agent': 'PostmanRuntime/7.13.0',
                authorization: `Bearer ${req.body.token}`,
                'Content-Type': 'application/json',
                'api-version': '3'
            },
            body:
            {
                borrowerInformation:
                {
                    assetDocumentation: 'Verified',
                    pledgedAssets: false,
                    citizenship: 'USCitizen',
                    employmentDocumentation: 'Verified',
                    firstTimeHomeBuyer: false,
                    incomeDocumentation: 'Verified',
                    monthsReserves: 24,
                    selfEmployed: false,
                    waiveEscrows: false,
                    mortgageLatesX30: 0,
                    mortgageLatesX60: 0,
                    mortgageLatesX90: 0,
                    mortgageLatesX120: 0,
                    mortgageLatesRolling: 0,
                    bankruptcy: 'Never',
                    foreclosure: 'Never'
                },
                loanInformation:
                {
                    loanPurpose: 'Purchase',
                    lienType: 'First',
                    amortizationTypes: ['ARM', 'Fixed'],
                    armFixedTerms: ['TenYear'],
                    automatedUnderwritingSystem: 'NotSpecified',
                    borrowerPaidMI: 'Yes',
                    buydown: 'None',
                    feesIn: 'No',
                    expandedApprovalLevel: 'NotApplicable',
                    fhaCaseAssigned: '2017-02-06T06:00:00+00:00',
                    fhaCaseEndorsement: '2017-02-06T06:00:00+00:00',
                    interestOnly: false,
                    baseLoanAmount: 300000,
                    loanTerms: ['ThirtyYear', 'TwentyYear'],
                    productTypes: ['StandardProducts', 'AffordableProducts'],
                    loanType: 'Conforming',
                    prepaymentPenalty: 'None',
                    includeLOCompensationInPricing: 'YesLenderPaid',
                    currentServicer: 'ACH Trust',
                    calculateTotalLoanAmount: true
                },
                propertyInformation:
                {
                    appraisedValue: 400000,
                    occupancy: 'PrimaryResidence',
                    county: 'Salt Lake',
                    state: 'UT',
                    zipCode: '84020',
                    propertyType: 'SingleFamily',
                    corporateRelocation: false,
                    salesPrice: 400000,
                    numberOfStories: 1,
                    numberOfUnits: 'OneUnit',
                    construction: false
                },
                representativeFICO: 760,
                loanLevelDebtToIncomeRatio: 38
            },
            json: true
        };

        console.log('hello 2');
        axios(options).then((response) => {
            console.log('hello 3');
            res.status(200).send(response)

        }).catch(err => {
            console.log('error', err);
            res.status(500).send(err)
            // throw new Error(err);

        })
        // request(options, function (error, response, body) {
        //     if (error) {
        //         res.status(500).send(body)
        //         throw new Error(error);

        //     } else {
        //         res.status(200).send(body)
        //     }
        // });



    },
}