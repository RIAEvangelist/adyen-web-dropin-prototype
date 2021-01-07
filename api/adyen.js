import * as adyen from '@adyen/api-library';
import {apiKey,merchantAccount} from '../creds/credentials.js';

const {Client, Config, CheckoutAPI}=adyen.default;

const config = new Config();

config.apiKey = apiKey;
config.merchantAccount = merchantAccount;

const client = new Client({ config });
client.setEnvironment("TEST");

const checkout = new CheckoutAPI(client);

const old={
    checkout,config
}

export {
    old as default,
    checkout,
    config
}