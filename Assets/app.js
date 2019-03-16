var topics = ['Dog Fails', 'Snowboarding Fails', 'Basketball Fails', 'Drunk Fails'];

const APIKey = 'api_key=dc6zaTOxFJmzC&limit=10';




function capitalizeGif(event) {
    return event.charAt(0).toUpperCase() + event.slice(1).toLowerCase();

};


function addButton() {
    $('#gif-buttons').empty();
    for (i = 0; i < topics.length; i++) {

        var button = $('<button>').addClass('btn btn-outline-danger ml-1 gif').attr('data-letter', topics[i])
        // button.text(topics[i].charAt(0).toUpperCase() + topics[i].slice(1).toLowerCase());
        button.text(topics[i])

        $('#gif-buttons').append(button);

    }


};



function newGif() {
    var gif = $('#gif-search').val().trim();

    capitalizeGif(gif);

    topics.push(gif);

    $('#gif-search').val(' ');
    console.log(topics)

};




function displayGif(response) {
    console.log(response);
    var results = response.data;

    for (i = 0; i < results.length; i++) {
        var gifCard = $('<div>').addClass('card bg-dark my-3 gifCard')

        var gif = $('<img>').attr('src', results[i].images.fixed_height.url).addClass('card-img-top').css('width', '100%')

        var gifBody = $('<div>').addClass('card-body d-flex justify-content-center')

        var favorite = $('<button>').addClass('btn btn-outline-danger favorite').attr('data-letter', results[i].images.fixed_height.url).text('Favorite')

        gifBody.append(favorite);

        gifCard.prepend(gif)
        gifCard.append(gifBody)


        $('#display-here').prepend(gifCard)
    }

};


function favoriteCard(event) {
    var gifCard = $('<div>').addClass('card bg-dark my-3 gifCard float-right')
    var gif = $('<img>').attr('src', event).addClass('card-img-top').css('width', '100%');
    var gifBody = $('<div>').addClass('card-body d-flex justify-content-center')



    gifCard.prepend(gif)



    $('#fav-display').append(gifCard)
}





$(document).ready(function () {

    addButton();




    $(document).on('click', '.gif', function () {
        event.preventDefault();
        $('body').css('background-size', 'contain');
        var searchParam = $(this).attr('data-letter')
        var queryURL = `https://api.giphy.com/v1/gifs/search?q=${searchParam}&${APIKey}`;



        // API Call 
        $.ajax({
            url: queryURL,
            method: 'GET'
        }).then(displayGif)

    })

    $('#search-button').click(function () {
        newGif();
        addButton();
    });

    $(document).on('click', '.favorite', function () {
        $('#fav-head').removeClass('d-none')
        var favGif = $(this).attr('data-letter')

        var event = $(this).parent();
        event.parent().empty();

        favoriteCard(favGif)

    })


});