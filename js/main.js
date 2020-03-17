$(document).ready(function(){
    var source = $('#card-template').html();
    var template = Handlebars.compile(source);
    $('#genre-selector').change(function () {
        var selected = $(this).val();
        if (selected.toLowerCase() == '') {
            $('.card').show();
        } else {
            $('.card').each(function(){
                if (selected.toLowerCase() == $(this).data('genre').toLowerCase()) {
                    $(this).show();
                } else {
                    $(this).hide();
                }
            });
        }
    });
    $.ajax({
        url: 'https://flynn.boolean.careers/exercises/api/array/music',
        method: 'GET',
        success: function (data) {
            var albums = data.response;
            for (var i = 0; i < albums.length; i++) {
                var album = albums[i];
                var albumCard = {
                    copertina: album.poster,
                    album: album.title,
                    autore: album.author,
                    anno: album.year,
                    genere: album.genre
                };
                var html = template(albumCard);
                $('.container').append(html);
            }
        },
        error: function () {
            alert('Error! BIP BIP');
        }
    });
});
