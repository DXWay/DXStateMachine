const common = require('../generated/common');
module.exports = {
    externalFunction : function(context) {
        return new Promise(function (resolve, reject) {
            var request = require('request');

            var optionsForAuthentification = {
              'method': 'POST',
              'url': 'https://dxway-dev-ed.my.salesforce.com/services/oauth2/token',
              'headers': {
                'Cookie': 'BrowserId=SfGjR306Eeu3e2tiMraCqg; CookieConsentPolicy=0:1; LSKey-c$CookieConsentPolicy=0:1'
              },
              formData: {
                'username': 'faissal.elosman@gmail.com',
                'password': 'Rainbow123lNS6XvXCPkBo1nNYek42CrBj',
                'grant_type': 'password',
                'client_id': '3MVG9SOw8KERNN0.KG642WVnjWWaZ8YNUjQ7I9ZBuxnq0MydPbcoab0taM3MxeT2T7FGVZt9ebM5GUhCDZGvQ',
                'client_secret': 'BD66DA5BBE46463E15376EEFEAF32CFD191DA528EAADB6828D535E0B4A9F8CB9'
              }
            };
            //O-20210312002
            var optionsForGettingStatusOfTheOrder = {
              'method': 'GET',
              'url': 'https://dxway-dev-ed.my.salesforce.com/services/apexrest/fetchOrder?id=O-' + context['GET_THE_ORDER_STATUS'],
              'headers': {
                'Authorization': 'Bearer ',
                'Cookie': 'BrowserId=SfGjR306Eeu3e2tiMraCqg; CookieConsentPolicy=0:1; LSKey-c$CookieConsentPolicy=0:1'
              }
            };
            request(optionsForAuthentification, function (error, response) {
              if (error) throw new Error(error);
              optionsForGettingStatusOfTheOrder['headers']['Authorization'] = optionsForGettingStatusOfTheOrder['headers']['Authorization'] + JSON.parse(response.body)["access_token"];
              request(optionsForGettingStatusOfTheOrder, function (error, response) {
                if (error) throw new Error(error);
                
                
                if(JSON.parse(response.body)["body"]){
                  resolve("L'etat de ta commande est la suivante: " + JSON.parse(response.body)["body"]["state"] + "\n")
                  common.GOTO(context, 'START');
                } else {
                  resolve("Order not found\n");
                  common.GOTO(context, 'GET_THE_ORDER_STATUS');
                }
                
              });
            });
        });
    }
}