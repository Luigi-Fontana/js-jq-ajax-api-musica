$(document).ready(function(){

    var source = $('#card-template').html(); // Solito clonaggio del template con Handlebars
    var template = Handlebars.compile(source);

    $('#genre-selector').change(function () { // Funzione sul select
        var selected = $(this).val(); // Faccio la foto del valore del select
        searchGenre(selected); // Richiamo funzione di ricerca per genere
    });

    $.ajax({ // Chiamata Ajax nell'API BOOLEAN
        url: 'https://flynn.boolean.careers/exercises/api/array/music',
        method: 'GET',
        success: function (data) {
            var albums = data.response; // Estrapoliamo solo l'array di oggetti
            for (var i = 0; i < albums.length; i++) { // Ciclo sull'array
                var album = albums[i]; // Divisione per Oggetti singoli
                var albumCard = { // Creazione dell'oggetto da popolare con Handlebars
                    copertina: album.poster,
                    album: album.title,
                    autore: album.author,
                    anno: album.year,
                    genere: album.genre
                };
                var html = template(albumCard); // Popolamento
                $('.container').append(html);
            }
        },
        error: function () {
            alert('Error! BIP BIP');
        }
    });


    function searchGenre(genre) { // Funzione che confronta il genere con il data-genre delle card
        if (genre.toLowerCase() == '') { // Se è vuoto mostrali tutti
            $('.card').show();
        } else { // Altrimenti guardarli tutti e mostra quelli in cui il genere coincide
            $('.card').each(function(){
                if (genre.toLowerCase() == $(this).data('genre').toLowerCase()) {
                    $(this).show();
                } else {
                    $(this).hide();
                }
            });
        }
    }
});
