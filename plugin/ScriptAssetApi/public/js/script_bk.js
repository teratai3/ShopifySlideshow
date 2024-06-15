(function ($) {
    $.ajax({
        url: '/apps/main-img/main_img_setting',
        type: 'GET',
        contentType: 'application/json',
        success: function (response) {
            console.log(response);
        },
        error: function (error) {
            console.log(error);
        }
    });

    $.ajax({
        url: '/apps/main-img/main_imgs',
        type: 'GET',
        contentType: 'application/json',
        success: function (response) {
            if (response?.data) {
                console.log(response);

                const items = response.data;
                console.log(items);
                let html = items.map(item => `
                    <li>
                        ${item.url ? `<a href="${item.url}" ${item.link_flag == 1 ? 'target="_blank"' : ''}>` : ''}
                            ${item.sp_img ? `
                                <span class="pc-show"><img src="${item.pc_img}" alt="${item.alt}"></span>
                                <span class="sp-show"><img src="${item.sp_img}" alt="${item.alt}"></span>
                            ` : `
                                <span><img src="${item.pc_img}" alt="${item.alt}"></span>
                            `}
                        ${item.url ? '</a>' : ''}
                    </li>
                `).join('');

                $("#main_slider").html(html);

                $("#main_slider").slick({
                    speed: 400,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false,
                    dots: true,
                });
            }
        },
        error: function (error) {
            console.log(error);
        }
    });
})(jQuery);