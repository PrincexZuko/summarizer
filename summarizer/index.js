import FetchWikiData from "./actions/fetchWikiData.js";

let articleName = document.getElementById('articleName');
document.getElementById('search').addEventListener('click', function () {
    let wikiFetcher = new FetchWikiData(articleName.value);
    let article = wikiFetcher.fetch();

    article.calculateFreq();
    article.calculateWeightedFreq();
    article.calculateLineScore();

    document.getElementById('summary').innerText = article.getSummary(document.getElementById('percentage').value);
    document.getElementById('summary-title').textContent = "Summary";

    // Save searched article to local storage
    articleStorage.saveArticle(articleName.value);

    // Retrieve all searched articles from local storage and display them
    const allArticles = articleStorage.getAllArticles();
    let previousSearches = document.getElementById('previous-searches');
    previousSearches.innerHTML = '';
    allArticles.forEach(article => {
      let searchItem = document.createElement('li');
      searchItem.innerText = article;
      previousSearches.appendChild(searchItem);
    });
});


class ArticleStorage {
    constructor() {
      this.searchedArticles = [];
    }
  
    saveArticle(articleName) {
      // Check if article already exists in the array
      if (!this.searchedArticles.includes(articleName)) {
        this.searchedArticles.push(articleName);
        // Save the updated array to local storage
        localStorage.setItem('searchedArticles', JSON.stringify(this.searchedArticles));
      }
    }
  
    getAllArticles() {
      // Retrieve the array from local storage
      const articlesString = localStorage.getItem('searchedArticles');
      if (articlesString) {
        // If the array exists, parse and return it
        this.searchedArticles = JSON.parse(articlesString);
      }
      return this.searchedArticles;
    }
  

  }
  
  

  


    

