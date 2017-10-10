$(document).ready(function() {
  // add eventlistener to magnifying icon
  $("#searchBtn").on("click", openSearch);
});

function inputKey(event) {
   // Enter or tab pressed, create search
  if (event.key === "Enter" || event.key === "Tab") {
    var searchF = encodeURI($("#searchForm").val());
    var originDomain = "https://codepen.io";
    jsonLink =
      " https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=" +
      searchF +
      "&prop=revisions&rvprop=content&format=json&origin=*";

    $.getJSON(jsonLink, processSearch);
  }
}

function processSearch(data) {
  //Json returned, process the search creating search result list

  var nofItems = data.query.search.length;
  var srchRes = "";
  for (i = 0; i < nofItems; i++) {
    var pageid = +data.query.search[i].pageid;
    var openLink = "https://en.wikipedia.org/?curid=" + pageid;
    console.log(data.query.search[i]);
    srchRes =
      srchRes +
      "<a href=" +
      openLink +
      " target='_blank'><div class='resultItem well well-lg'><div class='resTitle'>" +
      data.query.search[i].title +
      "</div><div class='resText'>" +
      data.query.search[i].snippet +
      "</div></div></a>";
  }

  $(".result").html(srchRes);

  console.log(data);
  //console.log(data."query"."search"."title");
}

function openSearch() {
  // create search input field and key eventlistener
  $(".searchInstruction").html("Type your text and press enter");

  $(document).keydown(inputKey);

  $("#searchBtn").slideUp(400).fadeOut();

  $(".searchField").delay(400).fadeIn(focusInput);

}
function focusInput() {
  $(this).find("#searchForm").focus();
}
