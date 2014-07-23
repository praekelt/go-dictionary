// WARNING: This is a generated file.
//          If you edit it you will be sad.
//          Edit src/app.js instead.

var go = {};
go;

go.app = function() {
    var vumigo = require('vumigo_v02');
    var App = vumigo.App;
    var FreeText = vumigo.states.FreeText;
    var EndState = vumigo.states.EndState;
    var JsonApi = vumigo.http.api.JsonApi;

    var GoApp = App.extend(function(self) {

        App.call(self, 'states:start');

        self.states.add('states:start', function(name) {
            return new FreeText(name, {
                question: [
                    'Hi there! What word would you like the definition for?'
                ].join(''),
                next: function(content) {
                    self.http = new JsonApi(self.im);
                    return self
                        .http.get([
                                "http://api.wordnik.com/v4/word.json/",
                                content,
                                "/definitions"
                            ].join(""),
                            {
                                params: {
                                    "limit":"1",
                                    "sourceDictionaries":"webster",
                                    "useCanonical":"true",
                                    "api_key":self.im.config.apikey
                                }
                            })
                        .then(function(resp) {
                            return {
                                name: 'states:end',
                                creator_opts: {
                                    query: content,
                                    definition: resp.data[0].text
                                }    
                            };
                        });
                    }
                });
        });

        self.states.add('states:end', function(name, opts) {
            //truncate the response if it's too long
            var response = 'Definition of ' + opts.query + ": " 
                + opts.definition;
            if(response.length > self.im.config.responselength) {
                response = response.substring(0, self.im.config.responselength 
                    - 3) + "...";
            }

            return new EndState(name, {
                text: response,
                next: 'states:start'
            });
        });
    });

    return {
        GoApp: GoApp
    };
}();

go.init = function() {
    var vumigo = require('vumigo_v02');
    var InteractionMachine = vumigo.InteractionMachine;
    var GoApp = go.app.GoApp;


    return {
        im: new InteractionMachine(api, new GoApp())
    };
}();
