var topics = [];

const APIKey = 'api_key=dc6zaTOxFJmzC&limit=10';




function displayGif(response) {
    console.log(response);
    var results = response.data;

    for (i = 0; i < results.length; i++) {
        var gif = $('<img>').attr('src', results[i].images.fixed_height.url)
        $('#display-here').append(gif)
    }

}





$('.search').on('click', function () {
    var searchParam = $(this).attr('data-letter')
    var queryURL = `https://api.giphy.com/v1/gifs/search?q=${searchParam}&${APIKey}`;

    // API Call 
    $.ajax({
        url: queryURL,
        method: 'GET'
    }).then(displayGif)

})