import Article from "../models/article.js";

export default class FetchWikiData {
    constructor(articleName) {
        this.articleName = articleName;
    }

    fetch() {
        const wikipediaAPI = "https://en.wikipedia.org/w/api.php";

        const params = {
            action: "query",
            format: "json",
            prop: "extracts",
            titles: this.articleName,
            exintro: "",
            explaintext: "",
            origin: "*"
        };

        const apiUrl = wikipediaAPI + "?" + new URLSearchParams(params);
        const request = new XMLHttpRequest();
        request.open('GET', apiUrl, false);
        request.send(null);

        if (request.status === 200) {
            const data = JSON.parse(request.responseText);
            const pageId = Object.keys(data.query.pages)[0];

            return new Article(data.query.pages[pageId].extract);
        }

        throw Error('Unable to fetch Data');
    }
}
