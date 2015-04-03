//handler class to handle all api requests. Done this way so we can ensure auth on all requests, and then map repsonses

import * as food from 'api/food';

export function handle(req) {
    return new Promise(function(resolve, reject) {
        console.log('Handler: recieved request');
        if (req.params.call == 'food') {
            console.log('Handler REQ_TYPE: food');
            food.handle(req).then(function(result) {
                resolve(result);
            }, function(err) {
                console.log(err);
                reject('food handler error. Stack Trace: ' + err);
            });

            //return the response
        } else if (req.params.call == 'entry') {
            
            resolve({ status: 'other stuffs'});   
        } else {
            //not a valid api call
            reject(new Error('Not a valid API call'));
        }
    });
}



