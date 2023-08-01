export default class Line {
    constructor(line) {
        this.text = line;
        this.score = 0;
    }

    calculateScore(words) {
        this.score = 0;
        this.text.split(' ').forEach(word => {
            let found = _.find(words, {text: word});
            if (found) {
                this.score += found.weightedFreq;
            }
        });
    }
}
