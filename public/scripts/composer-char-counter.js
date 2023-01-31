$(document).ready(function() {
  $(".new-tweet textarea").on('input', (e) => {
    let tweet = this.querySelector("#tweet-text");
    let charCount = ($(tweet).val()).length;
    let counter = this.querySelector(".new-tweet-footer .counter");
    counter.textContent = 140 - charCount;
    $(".new-tweet-footer .counter:contains('')").removeClass('red');
    $(".new-tweet-footer .counter:contains('-')").addClass('red');
  });
  
});