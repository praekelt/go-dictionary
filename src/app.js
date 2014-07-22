go.app = function() {
    var vumigo = require('vumigo_v02');
    var App = vumigo.App;
    //var Choice = vumigo.states.Choice;
    //var ChoiceState = vumigo.states.ChoiceState;
    var FreeText = vumigo.states.FreeText;
    var EndState = vumigo.states.EndState;

    var GoApp = App.extend(function(self) {
        App.call(self, 'states:start');

        self.states.add('states:start', function(name) {
            return new FreeText(name, {
                question: [
                    'Hi there! What word would you like the definition for?'
                ].join(''),

                next: function(content) {
                    return {
                        name: 'states:end',
                        creator_opts: {
                            query: content
                        }
                    };
                }
            });
        });

        self.states.add('states:end', function(name, opts) {
            return new EndState(name, {
                text: 'Definition of ' + opts.query + ": Not yet implemented.",
                next: 'states:start'
            });
        });
    });

    return {
        GoApp: GoApp
    };
}();
