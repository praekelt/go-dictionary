module.exports = function() {
    return [{
        "request": {
            "method": "GET",
            "url": "http://api.wordnik.com/v4/word.json/test/definitions",
            "params": {
                "limit":"1",
                "includeRelated":"true",
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
    },
    {
        "request": {
            "method": "GET",
            "url": "http://api.wordnik.com/v4/word.json/asd/definitions",
            "params": {
                "limit":"1",
                "includeRelated":"true",
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
                "relatedWords":[
                {
                    "words":["added"],
                    "gram":"imp. & p. p.",
                    "relationshipType":"form"},
                {
                    "words":["adding"],
                    "gram":"p. pr. & vb. n.",
                    "relationshipType":"form"},
                {   
                    "words":["added"],
                    "gram":"imp. & p. p.",
                    "relationshipType":"form"},
                {
                    "words":["adding"],
                    "gram":"p. pr. & vb. n.",
                    "relationshipType":"form"}],
                "labels":[],
                "citations":
                [
                    {
                        "source":"Gen. xxx. 24.",
                        "cite":"The Lord shall add to me another son."
                    }
                ],
                "word":"add",
                "text":[
                    "To give by way of increased possession (to any one); to ",
                    "bestow (on)."
                    ].join(""),
                "sequence":"0",
                "score":0.0,
                "partOfSpeech":"verb-transitive",
                "attributionText":
                [
                    "from the GNU version of the Collaborative International ",
                    "Dictionary of English"].join(""),
                "seqString":"1."
            }]
        }
    },
    {
        "request": {
            "method": "GET",
            "url": "http://api.wordnik.com/v4/word.json/add/definitions",
            "params": {
                "limit":"1",
                "includeRelated":"true",
                "sourceDictionaries":"webster",
                "useCanonical":"true",
                "api_key":"a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5"
            }
        },
        "response": {
            "code": 200,
            "data": [{
                "word":"add",
                "text":[
                    "To give by way of increased possession (to any one); to ",
                    "bestow (on)."
                    ].join("")
            }]
        }
    },
    {
        "request": {
            "method": "GET",
            "url": "http://api.wordnik.com/v4/word.json/notaword/definitions",
            "params": {
                "limit":"1",
                "includeRelated":"true",
                "sourceDictionaries":"webster",
                "useCanonical":"true",
                "api_key":"a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5"
            }
        },
        "response": {
            "code": 200,
            "data": []
        }
    },
    {
        "request": {
            "method": "GET",
            "url": "http://api.wordnik.com/v4/word.json/longword/definitions",
            "params": {
                "limit":"1",
                "includeRelated":"true",
                "sourceDictionaries":"webster",
                "useCanonical":"true",
                "api_key":"a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5"
            }
        },
        "response": {
            "code": 200,
            "data": [{
                "word":"longword",
                "text":[
                    "This is a definition that is very very very very very",
                    " very very very very very very very very very very very",
                    " very very very very very very very very very very very",
                    " very very very very very very very very very very very",
                    " very very very very very very very very very very long"
                    ].join("")
            }]
        }
    }];
};
