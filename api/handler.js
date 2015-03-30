//handler class to handle all api requests. Done this way so we can ensure auth on all requests, and then map repsonses

import * as food from 'api/food';

export function handle(req) {
    return new Promise(function(resolve, reject) {
    
        if (req.params.call == 'food') {
            
            food.handle(req).then(function(result) {
                resolve(result);
            }, function(err) {
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



