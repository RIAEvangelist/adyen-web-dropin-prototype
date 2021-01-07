import * as AdyenCheckout from '/node_modules/@adyen/adyen-web/dist/adyen.js';
import {config} from '/config/adyenCheckout.js';
import Is from '/node_modules/strong-type/index.js';

const is=new Is;
let checkout={};
let dropin={};

const init=async function(){
    // Set a same-site cookie for first-party contexts
    document.cookie = '3pcookie=value; SameSite=None; Secure';
    // Set a cross-site cookie for third-party contexts
    document.cookie = '3pcookie-legacy=value; Secure';

    //first get originKey from the server    
    config.clientKey= (
        await (
            await (fetch("/api/getOriginKey.json"))
        ).json()
    ).originKey;
    
    console.log(config.clientKey);

    //then get the paymentMethods  
    config.paymentMethodsResponse= await (
        await (fetch("/api/getPaymentMethods.json"))
    ).json();

    console.log(config.paymentMethodsResponse);
    
    is.object(config.paymentMethodsResponse);

    checkout = new window.AdyenCheckout(config);
    dropin = checkout.create('dropin').mount('#dropin-container');

    return true;
}

const makePayment=async function(paymentMethod){
    console.log(paymentMethod);
    const payment= await (
        await (
            fetch(
                "/api/makePayment.json",
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(paymentMethod)
                }
            )
        )
    ).json();

    console.log(payment);
    
    is.object(payment);

    checkout.createFromAction(payment.action).mount('#dropin-container');
}

const old= {init,makePayment,config,dropin,checkout}

export {
    old as default,
    init,
    makePayment,
    config,
    dropin,
    checkout
}