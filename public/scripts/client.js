/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 * 
 * takes in a tweet object and is responsible for returning a tweet <article> 
 * element containing the entire HTML structure of the tweet
 */

const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
]

/**
 * Below when I append, I use the shorthand for $( document ).ready()
 * So that it renders the tweets once the document is ready
 */

const renderTweets = function(tweets) {
  for (const tweet of tweets) {
    const $tweet = createTweetElement(tweet);
    $(() => {
      $('#tweets-container').append($tweet);
    });
  }
}

const createTweetElement = tweetObject => {
  let $tweet = `
    <article class="tweet">
      <header>
        <div class="user-tweet">
          <img src="${tweetObject.user.avatars}">
          ${tweetObject.user.name}
        </div>
        <span class="user-tag">${tweetObject.user.handle}</span>
      </header>
      <p>${tweetObject.content.text}</p>
      <footer>
        <span>${tweetObject.created_at}</span>
        <div>
          <i class="fa-solid fa-flag"></i>
          <i class="fa-solid fa-share"></i>
          <i class="fa-solid fa-heart"></i>
        </div>
      </footer>
    </article>
  `;
  return $tweet;
};

renderTweets(data);