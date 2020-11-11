const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
    response.send('Hello from Firebase!');
});


const stripe = require('stripe')('sk_test_L7QYs4A4CoQ7FILOqmGZSWBN00IOWCxUyB');

exports.payWithStripe = functions.https.onRequest((request, response) => {

    stripe.charges.create({
        amount: request.body.amount,
        currency: request.body.currency,
        source: request.body.token,
    }).then((charge) => {
            response.send(charge);
        })
        .catch(err =>{
            console.log(err);
        });

});

exports.createCustomer = functions.https.onRequest((request, response) => {

    stripe.customers.create({
        source: request.body.token,
        email: 'paying.user@example.com',
    }).then((customer) => {
        console.log('customer ',customer)
        response.send(customer)
    }).catch(err =>{
        console.log(err)
    });

});

exports.chargeWithCustomer = functions.https.onRequest((request, response) => {

    // Charge the Customer instead of the card:
    stripe.charges.create({
        amount: 4000,
        currency: 'brl',
        customer: "cus_HLf8sA15f0fq1M",
    }).then((charge) => {
        console.log(charge)
        response.send(charge)
    }).catch(err => {
        console.log(err)
    });

});