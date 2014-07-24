var vumigo = require('vumigo_v02');
var fixtures = require('./fixtures');
var AppTester = vumigo.AppTester;

describe("app", function() {
    describe("GoApp", function() {
        var app;
        var tester;

        beforeEach(function() {
            app = new go.app.GoApp();

            tester = new AppTester(app);

            tester
                .setup.config.app({
                    name: 'go-dictionary',
                    apikey: 'a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5',
                    responselength: '160'
                })
                .setup(function(api) {
                    fixtures().forEach(api.http.fixtures.add);
                });
        });

        describe("when the user starts a session", function() {
            it("should ask them want they want to do", function() {
                return tester
                    .start()
                    .check.interaction({
                        state: 'states:start',
                        reply: [
                            'Hi there! What word would you like the definition',
                            ' for?'
                        ].join('')
                    })
                    .run();
            });
        });

        describe("when the user requests a word", function() {
            it("should give them a definition", function() {
                return tester
                    .setup.user.state('states:start')
                    .input('test')
                    .check.interaction({
                        state: 'states:end',
                        reply: [
                            "Definition of test: A cupel or cupelling hearth ",
                            "in which precious metals are melted for trial and",
                            " refinement."
                        ].join('')
                    })
                    .run();
            });
        });

        describe("when the user requests a too long word", function() {
            it("should give them a truncated definition", function() {
                return tester
                    .setup.user.state('states:start')
                    .input('longword')
                    .check.interaction({
                        state: 'states:end',
                        reply: [
                            "Definition of longword: This is a definition that",
                            " is very very very very very very very very very ",
                            "very very very very very very very very very very",
                            " very very..."
                        ].join('')
                    })
                    .check.reply.char_limit(160)
                    .run();
            });
        });

        describe("when the user requests an unknown word", function() {
            it("should give them a list of related words", function() {
                return tester
                    .setup.user.state('states:start')
                    .input('asd')
                    .check.interaction({
                        state: 'states:wordchoice',
                        reply: [
                "Your word was not found, did you mean one of the following?",
                "1. add",
                "2. added",
                "3. adding",
                "4. added",
                "5. adding"
                        ].join('\n')
                    })
                    .check.reply.char_limit(160)
                    .run();
            });
        });

        describe("when the user selects a choice for an unknown word", function() {
            it("should give them the definition of the new word", function() {
                return tester
                    .setup.user.state('states:start')
                    .inputs('asd', '1')
                    .check.interaction({
                        state: 'states:end',
                        reply: [
                            "Definition of add: To give by way of increased ",
                            "possession (to any one); to bestow (on)."
                        ].join('')
                    })
                    .run();
            });
        });


    });
});
