import server from 'node-http-server';
import {getPaymentMethods,makePayment} from './api/payments.js';
import getOriginKey from './api/originKey.js';

const api={getPaymentMethods,makePayment,getOriginKey};


//checkout the server in the console
console.log(server);


const beforeServe=async function(request,response,body,encoding,serve){
    const method=request.url.replace('/api/','').replace('.json','');
    
    //if not a valid API request, serve file
    if(!api[method]){
        serve(
            request,
            response,
            body
        );
        return body;
    }

    const resp=await api[method](request.body);

    serve(
        request,
        response,
        JSON.stringify(
            resp
        )
    );

    return;
}


server.beforeServe=beforeServe;

//start the server with a config
server.deploy(
    {
        verbose: true,
        port: 8080,
        root:'./www/'
    }
);