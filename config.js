System.config({
  "paths": {
    "*": "*.js",
    "github:*": "jspm_packages/github/*.js",
    "npm:*": "jspm_packages/npm/*.js",
    "aurelia-skeleton-navigation/*": "lib/*.js"
  },
  "bundles": {
    "dist/bundled": [
      "github:aurelia/logging@0.2.7/index",
      "github:aurelia/metadata@0.3.4/origin",
      "github:aurelia/metadata@0.3.4/resource-type",
      "github:aurelia/metadata@0.3.4/metadata",
      "github:aurelia/dependency-injection@0.5.1/metadata",
      "github:aurelia/dependency-injection@0.5.1/container",
      "github:aurelia/path@0.4.6/index",
      "github:aurelia/loader@0.4.0/loader",
      "github:aurelia/framework@0.9.0/plugins",
      "github:aurelia/templating@0.9.0/util",
      "github:aurelia/binding@0.4.1/value-converter",
      "github:aurelia/binding@0.4.1/event-manager",
      "github:aurelia/task-queue@0.2.5/index",
      "github:aurelia/binding@0.4.1/array-change-records",
      "github:aurelia/binding@0.4.1/collection-observation",
      "github:aurelia/binding@0.4.1/map-change-records",
      "github:aurelia/binding@0.4.1/dirty-checking",
      "github:aurelia/binding@0.4.1/property-observation",
      "github:aurelia/binding@0.4.1/element-observation",
      "github:aurelia/binding@0.4.1/computed-observation",
      "github:aurelia/binding@0.4.1/binding-modes",
      "github:aurelia/binding@0.4.1/lexer",
      "github:aurelia/binding@0.4.1/path-observer",
      "github:aurelia/binding@0.4.1/composite-observer",
      "github:aurelia/binding@0.4.1/binding-expression",
      "github:aurelia/binding@0.4.1/listener-expression",
      "github:aurelia/binding@0.4.1/name-expression",
      "github:aurelia/binding@0.4.1/call-expression",
      "github:aurelia/templating@0.9.0/behavior-instance",
      "github:aurelia/templating@0.9.0/children",
      "github:aurelia/templating@0.9.0/content-selector",
      "github:aurelia/templating@0.9.0/resource-registry",
      "github:aurelia/templating@0.9.0/view",
      "github:aurelia/templating@0.9.0/animator",
      "github:aurelia/templating@0.9.0/binding-language",
      "github:aurelia/templating@0.9.0/template-controller",
      "github:aurelia/templating@0.9.0/view-strategy",
      "github:aurelia/templating@0.9.0/element-config",
      "github:aurelia/templating@0.9.0/composition-engine",
      "github:aurelia/logging-console@0.2.4/index",
      "github:aurelia/templating-binding@0.9.0/syntax-interpreter",
      "github:aurelia/route-recognizer@0.2.4/dsl",
      "github:aurelia/router@0.6.0/navigation-commands",
      "github:aurelia/router@0.6.0/navigation-instruction",
      "github:aurelia/router@0.6.0/route-filters",
      "github:aurelia/router@0.6.0/util",
      "github:aurelia/history@0.2.4/index",
      "github:aurelia/router@0.6.0/pipeline",
      "github:aurelia/router@0.6.0/model-binding",
      "github:aurelia/router@0.6.0/route-loading",
      "github:aurelia/router@0.6.0/activation",
      "github:aurelia/event-aggregator@0.2.4/index",
      "github:aurelia/templating-router@0.10.0/route-loader",
      "github:aurelia/templating-router@0.10.0/router-view",
      "github:aurelia/templating-resources@0.9.2/compose",
      "github:aurelia/templating-resources@0.9.2/if",
      "github:aurelia/templating-resources@0.9.2/with",
      "github:aurelia/templating-resources@0.9.2/repeat",
      "github:aurelia/templating-resources@0.9.2/show",
      "github:aurelia/templating-resources@0.9.2/global-behavior",
      "github:aurelia/templating-resources@0.9.2/sanitize-html",
      "github:aurelia/history-browser@0.2.5/index",
      "dist/app",
      "github:moment/moment@2.9.0/moment",
      "github:aurelia/http-client@0.6.1/headers",
      "github:aurelia/http-client@0.6.1/http-response-message",
      "github:aurelia/http-client@0.6.1/transformers",
      "github:aurelia/http-client@0.6.1/jsonp-request-message",
      "dist/report",
      "github:aurelia/logging@0.2.7",
      "github:aurelia/metadata@0.3.4/index",
      "github:aurelia/path@0.4.6",
      "github:aurelia/task-queue@0.2.5",
      "github:aurelia/binding@0.4.1/array-observation",
      "github:aurelia/binding@0.4.1/map-observation",
      "github:aurelia/binding@0.4.1/ast",
      "github:aurelia/templating@0.9.0/behaviors",
      "github:aurelia/templating@0.9.0/view-slot",
      "github:aurelia/templating@0.9.0/module-analyzer",
      "github:aurelia/logging-console@0.2.4",
      "github:aurelia/templating-binding@0.9.0/binding-language",
      "github:aurelia/route-recognizer@0.2.4/index",
      "github:aurelia/router@0.6.0/navigation-plan",
      "github:aurelia/router@0.6.0/router-configuration",
      "github:aurelia/history@0.2.4",
      "github:aurelia/router@0.6.0/pipeline-provider",
      "github:aurelia/event-aggregator@0.2.4",
      "github:aurelia/templating-resources@0.9.2/index",
      "github:aurelia/history-browser@0.2.5",
      "github:moment/moment@2.9.0",
      "github:aurelia/http-client@0.6.1/request-message-processor",
      "github:aurelia/metadata@0.3.4",
      "github:aurelia/loader@0.4.0/template-registry-entry",
      "github:aurelia/binding@0.4.1/observer-locator",
      "github:aurelia/binding@0.4.1/parser",
      "github:aurelia/templating@0.9.0/attached-behavior",
      "github:aurelia/templating@0.9.0/view-factory",
      "github:aurelia/templating-binding@0.9.0/index",
      "github:aurelia/route-recognizer@0.2.4",
      "github:aurelia/router@0.6.0/navigation-context",
      "github:aurelia/router@0.6.0/app-router",
      "github:aurelia/templating-resources@0.9.2",
      "github:aurelia/http-client@0.6.1/http-request-message",
      "github:aurelia/dependency-injection@0.5.1/index",
      "github:aurelia/loader@0.4.0/index",
      "github:aurelia/binding@0.4.1/index",
      "github:aurelia/templating@0.9.0/view-compiler",
      "github:aurelia/templating-binding@0.9.0",
      "github:aurelia/router@0.6.0/router",
      "github:aurelia/http-client@0.6.1/request-builder",
      "github:aurelia/dependency-injection@0.5.1",
      "github:aurelia/loader@0.4.0",
      "github:aurelia/binding@0.4.1",
      "github:aurelia/templating@0.9.0/view-engine",
      "github:aurelia/router@0.6.0/index",
      "github:aurelia/http-client@0.6.1/http-client",
      "github:aurelia/templating@0.9.0/property",
      "github:aurelia/templating@0.9.0/custom-element",
      "github:aurelia/router@0.6.0",
      "github:aurelia/http-client@0.6.1/index",
      "github:aurelia/templating@0.9.0/index",
      "github:aurelia/templating-router@0.10.0/index",
      "github:aurelia/http-client@0.6.1",
      "github:aurelia/templating@0.9.0",
      "github:aurelia/templating-router@0.10.0",
      "dist/entry",
      "github:aurelia/framework@0.9.0/aurelia",
      "github:aurelia/framework@0.9.0/index",
      "github:aurelia/framework@0.9.0",
      "github:aurelia/bootstrapper@0.10.0/index",
      "github:aurelia/bootstrapper@0.10.0",
      "dist/bundle",
      "dist/main"
    ]
  },
  "baseUrl": "dist"
});

System.config({
  "map": {
    "aurelia-bootstrapper": "github:aurelia/bootstrapper@0.10.0",
    "aurelia-dependency-injection": "github:aurelia/dependency-injection@0.5.1",
    "aurelia-framework": "github:aurelia/framework@0.9.0",
    "aurelia-history": "github:aurelia/history@0.2.4",
    "aurelia-history-browser": "github:aurelia/history-browser@0.2.5",
    "aurelia-http-client": "github:aurelia/http-client@0.6.1",
    "aurelia-router": "github:aurelia/router@0.6.0",
    "aurelia-templating-binding": "github:aurelia/templating-binding@0.9.0",
    "aurelia-templating-resources": "github:aurelia/templating-resources@0.9.2",
    "aurelia-templating-router": "github:aurelia/templating-router@0.10.0",
    "bootstrap": "github:twbs/bootstrap@3.3.4",
    "core-js": "npm:core-js@0.4.10",
    "font-awesome": "npm:font-awesome@4.3.0",
    "moment": "github:moment/moment@2.9.0",
    "traceur": "github:jmcriffey/bower-traceur@0.0.87",
    "traceur-runtime": "github:jmcriffey/bower-traceur-runtime@0.0.87",
    "github:aurelia/binding@0.4.1": {
      "aurelia-dependency-injection": "github:aurelia/dependency-injection@0.5.1",
      "aurelia-metadata": "github:aurelia/metadata@0.3.4",
      "aurelia-task-queue": "github:aurelia/task-queue@0.2.5"
    },
    "github:aurelia/bootstrapper@0.10.0": {
      "aurelia-event-aggregator": "github:aurelia/event-aggregator@0.2.4",
      "aurelia-framework": "github:aurelia/framework@0.9.0",
      "aurelia-history": "github:aurelia/history@0.2.4",
      "aurelia-history-browser": "github:aurelia/history-browser@0.2.5",
      "aurelia-loader-default": "github:aurelia/loader-default@0.5.0",
      "aurelia-logging-console": "github:aurelia/logging-console@0.2.4",
      "aurelia-router": "github:aurelia/router@0.6.0",
      "aurelia-templating": "github:aurelia/templating@0.9.0",
      "aurelia-templating-binding": "github:aurelia/templating-binding@0.9.0",
      "aurelia-templating-resources": "github:aurelia/templating-resources@0.9.2",
      "aurelia-templating-router": "github:aurelia/templating-router@0.10.0"
    },
    "github:aurelia/dependency-injection@0.5.1": {
      "aurelia-logging": "github:aurelia/logging@0.2.7",
      "aurelia-metadata": "github:aurelia/metadata@0.3.4",
      "core-js": "npm:core-js@0.4.10"
    },
    "github:aurelia/framework@0.9.0": {
      "aurelia-binding": "github:aurelia/binding@0.4.1",
      "aurelia-dependency-injection": "github:aurelia/dependency-injection@0.5.1",
      "aurelia-loader": "github:aurelia/loader@0.4.0",
      "aurelia-logging": "github:aurelia/logging@0.2.7",
      "aurelia-metadata": "github:aurelia/metadata@0.3.4",
      "aurelia-path": "github:aurelia/path@0.4.6",
      "aurelia-task-queue": "github:aurelia/task-queue@0.2.5",
      "aurelia-templating": "github:aurelia/templating@0.9.0"
    },
    "github:aurelia/history-browser@0.2.5": {
      "aurelia-history": "github:aurelia/history@0.2.4",
      "core-js": "npm:core-js@0.4.10"
    },
    "github:aurelia/http-client@0.6.1": {
      "aurelia-path": "github:aurelia/path@0.4.6",
      "core-js": "npm:core-js@0.4.10"
    },
    "github:aurelia/loader-default@0.5.0": {
      "aurelia-loader": "github:aurelia/loader@0.4.0",
      "aurelia-metadata": "github:aurelia/metadata@0.3.4"
    },
    "github:aurelia/loader@0.4.0": {
      "aurelia-html-template-element": "github:aurelia/html-template-element@0.1.3",
      "aurelia-path": "github:aurelia/path@0.4.6",
      "core-js": "npm:core-js@0.4.10",
      "webcomponentsjs": "github:webcomponents/webcomponentsjs@0.5.5"
    },
    "github:aurelia/router@0.6.0": {
      "aurelia-dependency-injection": "github:aurelia/dependency-injection@0.5.1",
      "aurelia-event-aggregator": "github:aurelia/event-aggregator@0.2.4",
      "aurelia-history": "github:aurelia/history@0.2.4",
      "aurelia-path": "github:aurelia/path@0.4.6",
      "aurelia-route-recognizer": "github:aurelia/route-recognizer@0.2.4",
      "core-js": "npm:core-js@0.4.10"
    },
    "github:aurelia/templating-binding@0.9.0": {
      "aurelia-binding": "github:aurelia/binding@0.4.1",
      "aurelia-logging": "github:aurelia/logging@0.2.7",
      "aurelia-templating": "github:aurelia/templating@0.9.0"
    },
    "github:aurelia/templating-resources@0.9.2": {
      "aurelia-binding": "github:aurelia/binding@0.4.1",
      "aurelia-dependency-injection": "github:aurelia/dependency-injection@0.5.1",
      "aurelia-logging": "github:aurelia/logging@0.2.7",
      "aurelia-templating": "github:aurelia/templating@0.9.0",
      "core-js": "npm:core-js@0.4.10"
    },
    "github:aurelia/templating-router@0.10.0": {
      "aurelia-dependency-injection": "github:aurelia/dependency-injection@0.5.1",
      "aurelia-metadata": "github:aurelia/metadata@0.3.4",
      "aurelia-path": "github:aurelia/path@0.4.6",
      "aurelia-router": "github:aurelia/router@0.6.0",
      "aurelia-templating": "github:aurelia/templating@0.9.0"
    },
    "github:aurelia/templating@0.9.0": {
      "aurelia-binding": "github:aurelia/binding@0.4.1",
      "aurelia-dependency-injection": "github:aurelia/dependency-injection@0.5.1",
      "aurelia-html-template-element": "github:aurelia/html-template-element@0.1.3",
      "aurelia-loader": "github:aurelia/loader@0.4.0",
      "aurelia-logging": "github:aurelia/logging@0.2.7",
      "aurelia-metadata": "github:aurelia/metadata@0.3.4",
      "aurelia-path": "github:aurelia/path@0.4.6",
      "aurelia-task-queue": "github:aurelia/task-queue@0.2.5",
      "core-js": "npm:core-js@0.4.10"
    },
    "github:jspm/nodelibs-assert@0.1.0": {
      "assert": "npm:assert@1.3.0"
    },
    "github:jspm/nodelibs-buffer@0.1.0": {
      "buffer": "npm:buffer@3.1.2"
    },
    "github:jspm/nodelibs-events@0.1.0": {
      "events-browserify": "npm:events-browserify@0.0.1"
    },
    "github:jspm/nodelibs-http@1.7.1": {
      "Base64": "npm:Base64@0.2.1",
      "events": "github:jspm/nodelibs-events@0.1.0",
      "inherits": "npm:inherits@2.0.1",
      "stream": "github:jspm/nodelibs-stream@0.1.0",
      "url": "github:jspm/nodelibs-url@0.1.0",
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "github:jspm/nodelibs-https@0.1.0": {
      "https-browserify": "npm:https-browserify@0.0.0"
    },
    "github:jspm/nodelibs-os@0.1.0": {
      "os-browserify": "npm:os-browserify@0.1.2"
    },
    "github:jspm/nodelibs-path@0.1.0": {
      "path-browserify": "npm:path-browserify@0.0.0"
    },
    "github:jspm/nodelibs-process@0.1.1": {
      "process": "npm:process@0.10.1"
    },
    "github:jspm/nodelibs-stream@0.1.0": {
      "stream-browserify": "npm:stream-browserify@1.0.0"
    },
    "github:jspm/nodelibs-url@0.1.0": {
      "url": "npm:url@0.10.3"
    },
    "github:jspm/nodelibs-util@0.1.0": {
      "util": "npm:util@0.10.3"
    },
    "github:systemjs/plugin-css@0.1.9": {
      "clean-css": "npm:clean-css@3.1.9",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "path": "github:jspm/nodelibs-path@0.1.0"
    },
    "github:twbs/bootstrap@3.3.4": {
      "jquery": "github:components/jquery@2.1.3"
    },
    "npm:amdefine@0.1.0": {
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "module": "github:jspm/nodelibs-module@0.1.0",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.1"
    },
    "npm:assert@1.3.0": {
      "util": "npm:util@0.10.3"
    },
    "npm:buffer@3.1.2": {
      "base64-js": "npm:base64-js@0.0.8",
      "ieee754": "npm:ieee754@1.1.4",
      "is-array": "npm:is-array@1.0.1"
    },
    "npm:clean-css@3.1.9": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "commander": "npm:commander@2.6.0",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "http": "github:jspm/nodelibs-http@1.7.1",
      "https": "github:jspm/nodelibs-https@0.1.0",
      "os": "github:jspm/nodelibs-os@0.1.0",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.1",
      "source-map": "npm:source-map@0.1.43",
      "url": "github:jspm/nodelibs-url@0.1.0",
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:commander@2.6.0": {
      "child_process": "github:jspm/nodelibs-child_process@0.1.0",
      "events": "github:jspm/nodelibs-events@0.1.0",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.1"
    },
    "npm:core-js@0.4.10": {
      "process": "github:jspm/nodelibs-process@0.1.1"
    },
    "npm:core-util-is@1.0.1": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0"
    },
    "npm:events-browserify@0.0.1": {
      "process": "github:jspm/nodelibs-process@0.1.1"
    },
    "npm:font-awesome@4.3.0": {
      "css": "github:systemjs/plugin-css@0.1.9"
    },
    "npm:https-browserify@0.0.0": {
      "http": "github:jspm/nodelibs-http@1.7.1"
    },
    "npm:inherits@2.0.1": {
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:os-browserify@0.1.2": {
      "os": "github:jspm/nodelibs-os@0.1.0"
    },
    "npm:path-browserify@0.0.0": {
      "process": "github:jspm/nodelibs-process@0.1.1"
    },
    "npm:punycode@1.3.2": {
      "process": "github:jspm/nodelibs-process@0.1.1"
    },
    "npm:readable-stream@1.1.13": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "core-util-is": "npm:core-util-is@1.0.1",
      "events": "github:jspm/nodelibs-events@0.1.0",
      "inherits": "npm:inherits@2.0.1",
      "isarray": "npm:isarray@0.0.1",
      "process": "github:jspm/nodelibs-process@0.1.1",
      "stream": "github:jspm/nodelibs-stream@0.1.0",
      "stream-browserify": "npm:stream-browserify@1.0.0",
      "string_decoder": "npm:string_decoder@0.10.31",
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:source-map@0.1.43": {
      "amdefine": "npm:amdefine@0.1.0",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.1"
    },
    "npm:stream-browserify@1.0.0": {
      "events": "github:jspm/nodelibs-events@0.1.0",
      "inherits": "npm:inherits@2.0.1",
      "readable-stream": "npm:readable-stream@1.1.13"
    },
    "npm:string_decoder@0.10.31": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0"
    },
    "npm:url@0.10.3": {
      "assert": "github:jspm/nodelibs-assert@0.1.0",
      "punycode": "npm:punycode@1.3.2",
      "querystring": "npm:querystring@0.2.0",
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:util@0.10.3": {
      "inherits": "npm:inherits@2.0.1",
      "process": "github:jspm/nodelibs-process@0.1.1"
    }
  }
});

