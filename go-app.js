// WARNING: This is a generated file.
//          If you edit it you will be sad.
//          Edit src/app.js instead.

var go = {};
go;

go.app = function() {
    var vumigo = require('vumigo_v02');
    var App = vumigo.App;
    var FreeText = vumigo.states.FreeText;
    var Choice = vumigo.states.Choice;
    var ChoiceState = vumigo.states.ChoiceState;
    var EndState = vumigo.states.EndState;
    var JsonApi = vumigo.http.api.JsonApi;

    var GoApp = App.extend(function(self) {

        App.call(self, 'states:start');

        self.init = function() {
            self.http = new JsonApi(self.im);
        };

        // This is the initial state that the user is presented with. It fetches
        // the definition for the word and sends it to the end state if the word
        // is found, otherwise it sends a list of related words to the
        // wordchoice state.
        self.states.add('states:start', function(name) {
            return new FreeText(name, {
                question:
                    'Hi there! What word would you like the definition for?',

                next: function(content) {
                    return self
                        // Send the request to the API
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
                                    "includeRelated":"true",
                                    "api_key":self.im.config.apikey
                                }
                            })
                        .then(function(resp) {
                            // If the searched word isn't found, give the user a
                            // choice of related words to choose from
                            if(content != resp.data[0].word) {
                                return {
                                    name: 'states:wordchoice',
                                    creator_opts: {
                                        query: content,
                                        word: resp.data[0].word,
                                        related: resp.data[0].relatedWords
                                    }
                                };
                            }
                            // If the searched word is found, return the
                            // definition
                            else return {
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

        // This state will give the user a list of words if what they searched
        // for wasn't found. It then gets the definition of the word they choose
        // and sends it to the end state.
        self.states.add('states:wordchoice', function(name, opts) {
            // Build a list of choices from the 'nearest' word as well as
            // related words.
            var choiceList = [new Choice(opts.word, opts.word)];
            for(var relatedWord in opts.related) {
                for(var word in opts.related[relatedWord].words) {
                    var wordToAdd = opts.related[relatedWord].words[word];
                    choiceList.push(new Choice(wordToAdd, wordToAdd));
                }
            }

            return new ChoiceState(name, {
                question: ["Your word was not found, did you mean one of the ",
                           "following?"].join(''),
                choices: choiceList,
                next: function(choice) {
                    return self
                        // Now get the definition for the chosen correct word
                        // and then return the definition to the user.
                        .http.get([
                                "http://api.wordnik.com/v4/word.json/",
                                choice.value,
                                "/definitions"
                            ].join(''),
                            {
                                params: {
                                    "limit":"1",
                                    "sourceDictionaries":"webster",
                                    "useCanonical":"true",
                                    "includeRelated":"true",
                                    "api_key":self.im.config.apikey
                                }
                            })
                        .then(function(resp) {
                                return {
                                    name: 'states:end',
                                    creator_opts: {
                                        query: choice.value,
                                        definition: resp.data[0].text
                                    }
                                };
                            });

                }
            });
        });

        // This state is the end states that recieves the word 'query' and the
        // definition 'definition' and displays it to the user. If the response
        // is too long, it will truncate it.
        self.states.add('states:end', function(name, opts) {
            // Build the response, then truncate if it is too long
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
