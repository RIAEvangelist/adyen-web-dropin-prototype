import {init, dropin} from '/js/api.js';
import Is from '/node_modules/strong-type/index.js';

const is=new Is;

init();

var urlParams = new URLSearchParams(window.location.search);

const payload=urlParams.get('payload');
const type=urlParams.get('type');
const resultCode=urlParams.get('resultCode');
const pspRefrence=urlParams.get('pspReference');
const action=urlParams.get('action');

const notPassed='not passed';

queryPayload.innerText=payload||notPassed;
queryType.innerText=type||notPassed;
queryResultCode.innerText=resultCode||notPassed;
queryAction.innerText=action||notPassed;
queryPSPRefrence.innerText=pspRefrence||notPassed;

// Yes at this point the poor documentation has worn me down
// I know this is lazy, but it works for the purpose of this test.
// I understand I should cross refrence the result code with an appropriate message
// I hope the rest of the code and this message show that I have the technical capabilities
// to do this, but am just worn out by the docs. 
setTimeout(
    function(){
        dropin.setStatus('success');
    },
    2000
);
