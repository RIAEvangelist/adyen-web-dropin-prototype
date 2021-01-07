import {init, config as checkoutConfig, makePayment} from '/js/api.js';
import Is from '/node_modules/strong-type/index.js';

const is=new Is;

init();

checkoutConfig.onSubmit= async function(state, dropin){
  is.object(state);
  is.object(dropin);

  // Your function calling your server to make the `/payments` request
  const paymentResult=await makePayment(state.data.paymentMethod);
  
  if (paymentResult.action) {
    // Drop-in handles the action object from the /payments response
    dropin.handleAction(response.action);
  } else {
    // Your function to show the final result to the shopper
    // showFinalResult(response);

    console.log(paymentResult);
  }
};
