/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 * 
 * takes in a tweet object and is responsible for returning a tweet <article> 
 * element containing the entire HTML structure of the tweet
 */

/**
 * Appends a tweet
 * @param {Array} tweets - Array of user data
 */

const renderTweets = function(tweets) {
  for (const tweet of tweets) {
    const $tweet = createTweetElement(tweet);
    $('#tweets-container').append($tweet);
  }
}

/**
 * Creates a Tweet element
 * @constructor
 * @param {Object} tweetObject - User data and contents of the tweet
 * @returns {HTMLElement} $tweet
 */

const createTweetElement = tweetObject => {
  let $tweet = 
  `
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
        <span>${timeago.format(tweetObject.created_at)}</span>
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

/** 
 * DOM work - jQuery's document ready function
 * 
 * AJAX POST request
 * 
 * Function loadTweets - AJAX GET request
 */

$(() => {

  $("#post-tweet").on('submit', event => {
    event.preventDefault();
    $.post("/tweets", $("#tweet-text").serialize());
  });

  const loadTweets = () => {
    $.get("http://localhost:8080/tweets", (data) => {
      renderTweets(data);
    })
  }

  loadTweets();
})
