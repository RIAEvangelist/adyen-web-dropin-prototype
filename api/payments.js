import {checkout,config} from './adyen.js';

const getPaymentMethods=async function(){
    try{
        const paymentMethods = await checkout.paymentMethods(
            { 
                merchantAccount: config.merchantAccount,
                countryCode: "NL",
                shopperLocale: "nl-NL",
                amount: { currency: "EUR", value: 1000, },
                channel: "Web"
            }
        );

        return paymentMethods;
    }catch(err){
        console.log(err);
        return false;
    }
}

const makePayment=async function(state){
    const payload=JSON.parse(state);
    try{
        const payment = await checkout.payments({ 
            merchantAccount: config.merchantAccount,
            paymentMethod: payload,
            amount: { currency: "EUR", value: 1000, },
            reference: Math.round(Math.random()*10e5),
            returnUrl: "http://localhost:8080/checkout.html"
        });

        return payment;
    }catch(err){
        console.log(err);
        return false;
    }
}

const old={getPaymentMethods,makePayment}

export {
    old as default,
    getPaymentMethods,
    makePayment
}