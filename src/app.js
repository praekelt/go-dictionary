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
            return new EndState(name, {
                text: 'Definition of ' + opts.query + ": " + opts.definition,
                next: 'states:start'
            });
        });
    });

    return {
        GoApp: GoApp
    };
}();
