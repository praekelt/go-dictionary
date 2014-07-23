module.exports = function() {
    return [{
        "request": {
            "method": "GET",
            "url": "http://api.wordnik.com/v4/word.json/test/definitions",
            "params": {
                "limit":"1",
                "sourceDictionaries":"webster",
                "useCanonical":"true",
                "api_key":"a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5"
            }
        },
        "response": {
            "code": 200,
            "data": [{
                "textProns":[],
                "sourceDictionary":"gcide",
                "exampleUses":[],
                "relatedWords":[],
                "labels":[{"type":"fld","text":"(Metal.)"}],
                "citations":
                [
                    {
                        "source":"Chaucer.",
                        "cite":"Our ingots, tests, and many mo."
                    }
                ],
                "word":"test",
                "text":[
                    "A cupel or cupelling hearth in which precious metals ",
                    "are melted for trial and refinement."
                    ].join(""),
                "sequence":"0",
                "score":0.0,
                "partOfSpeech":"noun",
                "attributionText":
                [
                    "from the GNU version of the Collaborative International ",
                    "Dictionary of English"].join(""),
                "seqString":"1."
            }]
        }
    }];
};