import Line from "./line.js";
import Word from "./word.js";

export default class Article {
    constructor(article) {
        this.article = article.replace(/\n/g, '');
        let i = 0;
        this.lines = article.split('.').map(line => new Line(line, ++i));
        this.words = [];
    }

    calculateFreq() {
        this.article.replace('.', '').split(' ').forEach(word => {
            if (Word.ignoreWords.has(word)) {
                return;
            }
            let found = _.find(this.words, {text: word});
            if (found) {
                found.frequency++;
            } else {
                this.words.push(new Word(word));
            }
        });

        this.words.sort((a, b) => b.frequency - a.frequency);
    }

    calculateWeightedFreq() {
        let most_occurred = this.words[0].frequency;
        this.words.forEach(word => {
            word.weightedFreq = word.frequency / most_occurred;
        });
    }

    calculateLineScore() {
        this.lines.forEach(line => {
            line.calculateScore(this.words);
        });
    }

    getSummary(percent) {
        let count = Math.floor(this.lines.length * (percent / 100));
        this.lines.sort((a, b) => b.score - a.score);
        let summaryLines = [];
        for (let j = 0; j < count; j++) {
            summaryLines.push(this.lines[j]);
        }

        summaryLines.sort((a, b) => a.lineOrder - b.lineOrder);
        let summary = '';
        summaryLines.forEach(line => {
            summary += ' ' + line.text + '.';
        });

        return summary;
    }
}
