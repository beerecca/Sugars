//handler class to handle all api requests. Done this way so we can ensure auth on all requests, and then map repsonses

import * as food from 'api/food';
import * as entry from 'api/entry';

export function handle(req) {
    return new Promise(function(resolve, reject) {
        console.log('Handler: recieved request');
        if (req.params.call == 'food') {
            console.log('Handler REQ_TYPE: food');
            food.handle(req).then(resolve,reject);
        } else if (req.params.call == 'entry') {
            entry.handle(req).then(resolve,reject); 
        } else {
            reject(new Error('Not a valid API call'));
        }
    });
}



