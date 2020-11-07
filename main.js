/*
Code written by Will Baginski for the Capital One coding challenge
*/

// save the apiKey
const apiKey = 'apiKey=78b9d599c4f94f8fa3afb1a5458928d6';

// store some elements for ease of use
const entButton = document.getElementById('ent');
const sportsButton = document.getElementById('sports');
const techButton = document.getElementById('tech');
const resultSection = document.getElementById('grid');

// appends an element of type 'type' and innerhtml 'html' to element
function addChild(type, html, element) {
    let child = document.createElement(type);
    child.innerHTML = html;
    element.appendChild(child);
}

// given a url, the url to an image, and an element,
// adds an image as a child to the supplied element that serves as a clickable link to the supplied url
function addImage(url, urlToImage, element) {
    // use placeholder image if urlToImage is invalid
    if (urlToImage == null) { urlToImage = 'placeholder.png' }

    // create the link
    let wrapper = document.createElement('a');
    wrapper.href = url;
    wrapper.target = '_blank';

    // create the image
    let image = document.createElement('img');
    image.classList.add('image');
    image.src = urlToImage;

    // wrap up
    wrapper.appendChild(image);
    element.appendChild(wrapper);
}

// given a url, title, and element, adds the title as a clickable link to the supplied url as child to the supplied element
function addTitle(url, title, element) {
    // create the link
    let titleText = document.createElement('a');

    // set properties of the link
    titleText.href = url;
    titleText.target = '_blank';
    titleText.classList.add('headline');  // add a tag
    titleText.innerHTML = title;

    // wrap up
    element.appendChild(titleText);
}

// helper function to getNews
// grabs the data we want from the JSON object returned from the HTTP request to newsapi
function parseResults(results) {
    // clear out the old results by deleting everything with class "article"
    // result is that only 20 results are displayed at a time
    document.querySelectorAll('.article').forEach(function(article) {
        article.remove();
    })
    
    // display the new search results
    let articles = results.articles;
    for (let i=0; i<articles.length; i++) {

        // create a div for the article ... content will go inside it
        let block = document.createElement('div');
        block.classList.add('article');  // tag the block for easy manipulation
        resultSection.appendChild(block);
        
        // add image as a link
        addImage(articles[i].url, articles[i].urlToImage, block);

        // add the title as a link
        addTitle(articles[i].url, articles[i].title, block);

        // add the source and the date (substring of the publishedAt field to extract date without time)
        addChild('h5', articles[i].source['name'] + ', ' + articles[i].publishedAt.substring(0, 10), block);

        // add description
        addChild('p', articles[i].description, block);
    }
}

// make an HTTP request to newsapi for news belonging to a specified category
// follows template from here: https://newsapi.org/docs/get-started
function getNews(category) {
    let cat = 'category=' + category + '&';
    let url = 'http://newsapi.org/v2/top-headlines?' +
    'country=us&' + cat + apiKey;
    
    let req = new Request(url);
    fetch(req)
        .then(response => response.json())
        .then(data => parseResults(data));
}

// handles user button presses
function buttonPress(category, buttonID) {
    document.querySelectorAll('.button').forEach(function(button) {
        button.style.backgroundColor = 'white';
    })
    document.getElementById(buttonID).style.backgroundColor = 'lightgrey';
    getNews(category);
}