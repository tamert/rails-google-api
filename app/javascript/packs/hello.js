$(document).ready(function () {
    const token = $('#token').val();
    $('#hotel-name').keyup(function () {
        let listDiv = $('.list');
        if($(this).val().length>2) {
            listDiv.html('<div class="list-group-item">Loading...</div>');
            $.post('/search', {
                authenticity_token: token,
                name: $(this).val()
            }, function (response) {
                listDiv.html('');
                if (response.length) {
                    $.each(response, function (i, element) {
                        $('.list').append('<a href="#" data-id="' + element['place_id'] + '" class="list-group-item action-detail list-group-item-action">' + element['name'] + '</a>');
                    });
                } else {
                    listDiv.html('<div class="list-group-item">No Results</div>');
                }

            }, "json");
        } else {
            $('.list').html('');
        }
    });

    $('.list').on('click', '.action-detail', function (e) {
        e.preventDefault();
        let itemDiv = $('.detail-item');
        const template = $('#template .in-template');
        const comment_template = $('#template .comment-template');
        itemDiv.html('Loading...');
        $.get('/detail/'+$(this).data('id'), function (response) {
            itemDiv.html('');
            if (response) {
                itemDiv.append(template.html());
                $('.detail-item .hotel-title').html(response.name);
                $('.detail-item .hotel-description').html(response.formatted_address);
                $('.detail-item .hotel-phone').html(response.international_phone_number);
                $('.detail-item .hotel-phone').attr('href', 'tel:'+response.international_phone_number);
                $('.detail-item .hotel-rating').html(response.rating);
                $('.detail-item .hotel-total').html(response.user_ratings_total);
                $('.detail-item .hotel-website').attr('href',response.website);

                if(response.reviews.length) {
                    $.each(response.reviews, function (i, element) {
                        console.log(element.author_name);
                        itemDiv.append('<div class="review-' + i + '">' +
                            comment_template.html() +
                            '</div>');
                        $('.review-'+i+' .author_name').html(element.author_name);
                        $('.review-'+i+' .author_url').attr('href', element.author_url);
                        $('.review-'+i+' .profile_photo_url').attr('src', element.profile_photo_url);
                        $('.review-'+i+' .text').html(element.text);
                        $('.review-'+i+' .rating').html(element.rating);
                    });
                }

                if(response.photos.length) {
                    let a = [];
                    let b = [];
                    $.each(response.photos, function (i, element) {
                        let active = null;
                        if(i===0) {
                            active = 'active';
                        }

                        a.push('<div class="tab-pane '+active+'" id="pic-'+i+'"><img src="https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=' + element.photo_reference + '&key=AIzaSyBBwRNlt4ELMAg9k46CV6yCT-1xXtiXB_g" class="img-fluid" /></div>');
                        b.push('<li class="'+active+'"><a data-target="#pic-'+i+'" data-toggle="tab" class="preview-thumbnail-small"><img width="200" src="https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=' + element.photo_reference + '&key=AIzaSyBBwRNlt4ELMAg9k46CV6yCT-1xXtiXB_g"/></a></li>');

                    });

                    $('.detail-item .preview-thumbnail').html(b);
                    $('.detail-item .preview-pic').html(a);
                }

            } else {
                itemDiv.html('<div class="alert alert-warning">No Results</div>');
            }

        }, "json");
    });

});