export default class Word {
    static ignoreWords = new Set([
        'the',
        'and',
        'is',
        'of',
        'a',
        '()',
        'for',
        'it',
        'in',
        'our',
        'as',
        'to',
        'are',
        'on',
    ]);

    constructor(word) {
        this.text = word;
        this.frequency = 1;
        this.weightedFreq = 0;
    }
}
