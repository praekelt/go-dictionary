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
                                    "includeRelated":"true",
                                    "api_key":self.im.config.apikey
                                }
                            })
                        .then(function(resp) {
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

        self.states.add('states:wordchoice', function(name, opts) {
            // build the list of choices
            // from the closest word and words
            // related to the closest word
            choiceList = [new Choice(opts.word, opts.word)];
            for(var relatedWord in opts.related) {
                for(var word in opts.related[relatedWord].words) {
                    var wordToAdd = opts.related[relatedWord].words[word];
                    choiceList.push(new Choice(wordToAdd, wordToAdd));
                }
            }

            return new ChoiceState(name, {
                question: ["Your word was not found, please select from the ",
                           "following:"].join(''),
                choices: choiceList,
                next: function(choice) {                    
                    return self
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
