const fetch = require('node-fetch');
async function postData(url = '', data = {}) {
    const response = await fetch(url, {
      method: 'GET',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
        'order_date': '2016/12/18',
        'token': "?jrTGbLNA%26jxWL*%26Y/$*Q:2]v=hGpH-"
      }
    });
    return response.json();
  }
  
  postData('https://devback.ventasremotas.com/orders/technical-admission-test/', { answer: 42 })
    .then(data => {
      console.log(data);
    });