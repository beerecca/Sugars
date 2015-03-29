//handler class to handle all api requests. Done this way so we can ensure auth on all requests, and then map repsonses

import * as db from 'api/db';

export function handle(req) {
    return new Promise(function(resolve, reject) {
    
        if (req.params.call == 'food') {
            //load db call here 

            //return the response
            resolve({ status: 'success'});
        } else {
            //not a valid api call
            reject(Error('Not a valid API call'));
        }
    });
}



