import './bundle';

import {bootstrap} from 'aurelia-bootstrapper';

bootstrap(aurelia => {
  aurelia.use
    .defaultBindingLanguage()
    .defaultResources()
    .router();
  aurelia.start().then(a => a.setRoot('dist/app', document.body));
});

