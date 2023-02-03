/**
 * Character Counter
 * 
 * When charCount exceeds 140, adds a new class to turn the counter color to red
 */

$(document).ready(function() {
  $(".new-tweet textarea").on('input', () => {
    let tweet = $("#tweet-text");
    let charCount = ($(tweet).val()).length;
    let counter = this.querySelector(".new-tweet-footer .counter");
    counter.textContent = 140 - charCount;
    $(".new-tweet-footer .counter:contains('')").removeClass('red');
    $(".new-tweet-footer .counter:contains('-')").addClass('red');
  });
});