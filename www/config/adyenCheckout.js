const config = {
    paymentMethodsResponse: {error:'needs to be populated'}, // The `/paymentMethods` response from the server.
    clientKey: "ORIGEN_KEY_SHOULD_GO_HERE", // Web Drop-in versions before 3.10.1 use originKey instead of clientKey.
    locale: "en-US",
    environment: "test",
    onSubmit:()=>{},
    onAdditionalDetails: ()=>{},
    showPayButton:true,
    amount: {             // Optional. Used to display the amount in the Pay Button.
        value: 1000,
        currency: 'EUR'
    }
};

export {
    config as default,
    config
}