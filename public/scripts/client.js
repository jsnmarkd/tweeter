/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 * 
 * takes in a tweet object and is responsible for returning a tweet <article> 
 * element containing the entire HTML structure of the tweet
 */

/**
 * Prepends a tweet
 * @param {array} tweets - Array of user data
 */

const renderTweets = function(tweets) {
  $("#tweets-container").empty();
  for (const tweet of tweets) {
    const $tweet = createTweetElement(tweet);
    $('#tweets-container').prepend($tweet);
  }
}

/**
 * Cross-Site Scripting - XSS
 * @param {string} str - Text area content
 * @returns string
 */

const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

/**
 * Creates a Tweet element
 * @constructor
 * @param {object} tweetObject - User data and contents of the tweet
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
      <p>${escape(tweetObject.content.text)}</p>
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
 * AJAX GET request
 */

$(() => {
  
  $("#error-char-count").hide();

  $("#post-tweet").on('submit', event => {
    event.preventDefault();
    const tweet = document.querySelector("#tweet-text");
    const charCount = ($(tweet).val()).length;

    if (charCount > 140) {
      $("#error-char-count").show("fast");
      $("#error-char-message").text("Tweet exceeds character count!");
    } else if (charCount === 0) {
      $("#error-char-count").show("fast");
      $("#error-char-message").text("You did not tweet anything!");
    } else {
      $.post("/tweets", $("#tweet-text").serialize());
      $("#tweet-text").val('');
      $(".counter").val(140);
      $("#error-char-count").hide("slow");
      loadTweets();
    }
    
  });

  const loadTweets = () => {
    $.get("http://localhost:8080/tweets", (data) => {
      renderTweets(data);
    })
  }
  
  loadTweets();
})
