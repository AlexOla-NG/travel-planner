const Mailjet = require('node-mailjet');

const mailjet = new Mailjet({
  apiKey: process.env.MJ_API_KEY,
  apiSecret: process.env.MJ_SECRET_KEY,
});

const request = mailjet
  .post("sender", { 'version': 'v3' })
  .request({
    "Name": "Travel Planner Inc",
    "Email": "*@travel-planner.com"
  })
request
  .then((result) => {
    console.log(result.body)
  })
  .catch((err) => {
    console.log(err.statusCode)
  })