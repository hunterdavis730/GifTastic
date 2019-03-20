var topics = ['Dog Fails', 'Snowboarding Fails', 'Basketball Fails', 'Drunk Fails'];

const APIKey = 'api_key=dc6zaTOxFJmzC&limit=10';

var numOfFavorites = localStorage.getItem('numGifs');

var gifKeys = [];


var config = {
    apiKey: "AIzaSyBlejNIPjQHU2gpMUooMC1Lv0XiV6H6SqY",
    authDomain: "new-project-f1c59.firebaseapp.com",
    databaseURL: "https://new-project-f1c59.firebaseio.com",
    projectId: "new-project-f1c59",
    storageBucket: "new-project-f1c59.appspot.com",
    messagingSenderId: "118880562717"
};
firebase.initializeApp(config);

var database = firebase.database();




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

        var gif = $('<img>').attr({
            'src': results[i].images.original_still.url,
            'data-state': 'still',
            'data-still': results[i].images.original_still.url,
            'data-animate': results[i].images.fixed_height.url
        }).addClass('card-img-top playGif').css('width', '100%')

        var gifBody = $('<div>').addClass('card-body d-flex justify-content-center')
        var rating = $('<p>').addClass('card-text d-block mt-3 mb-0 text-center text-light').text('Rated: ' + results[i].rating.toUpperCase());
        var instructions = $('<p>').addClass('card-text d-block mt-1 mb-0 text-center text-light').text('Click above to play the GIF')
        var favorite = $('<button>').addClass('btn btn-outline-danger mx-2 favorite').attr('data-letter', results[i].images.fixed_height.url).text('Favorite')

        gifBody.append(favorite);

        gifCard.prepend(rating).prepend(instructions).prepend(gif)
        gifCard.append(gifBody)


        $('#display-here').prepend(gifCard)
    }

};


function favoriteCard(event) {
    var gifCard = $('<div>').addClass('card bg-dark my-3 gifCard float-right')
    var gif = $('<img>').attr('src', event).addClass('card-img-top').css('width', '100%');
    var gifBody = $('<div>').addClass('card-body d-flex justify-content-center')



    gifCard.prepend(gif)





    $('#fav-display').append(gifCard).fadeIn('slow');
}






$(document).ready(function () {

    addButton();

    console.log(numOfFavorites)

    if (numOfFavorites > 0) {
        gifKeys = localStorage.getItem('key').split(',')

    }

    console.log(gifKeys)
    database.ref('/favorites').on('value', function (snapshot) {
        console.log(snapshot.val())
        var arr = snapshot.val().gifUrl
        $('#fav-head').removeClass('d-none');
        $('#fav-display').empty();

        for (var i = 0; i < arr.length; i++) {

            var result = arr[i];
            console.log(result)

            favoriteCard(result)




        }

    });





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
        numOfFavorites++;
        // console.log(favGif)


        var event = $(this).parent();
        console.log(event)
        event.parent().remove();

        // favoriteCard(favGif)

        gifKeys.push(favGif)

        console.log(gifKeys)






        var newGif = database.ref('/favorites').set({
            gifUrl: gifKeys
        })






        localStorage.setItem('key', gifKeys)

        localStorage.setItem('numGifs', numOfFavorites)

        // localStorage.getItem('key')


    })

    $(document).on('click', '.playGif', function () {
        var state = $(this).attr('data-state');


        if (state === 'still') {
            $(this).attr('src', $(this).attr('data-animate'))
            $(this).attr('data-state', 'animate')

        }

        if (state === 'animate') {
            $(this).attr('src', $(this).attr('data-still'))
            $(this).attr('data-state', 'still')
        }
    })


});