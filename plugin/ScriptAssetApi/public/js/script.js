(function ($) {
    async function fetchSettings() {
        try {
            const response = await fetch('/apps/main-img/main_img_setting', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`HTTPエラー: ${response.status}`);
            }

            const data = await response.json();
    
            return data;
        } catch (error) {
            console.log('設定取得エラー:', error);
            throw error; // エラーハンドリング
        }
    }

    async function fetchMainImgs(settings) {
        try {
            const response = await fetch('/apps/main-img/main_imgs', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`HTTPエラー: ${response.status}`);
            }

            const data = await response.json();
            if (data?.data) {
                console.log(data);

                const items = data.data;
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

                console.log(settings);
                $("#main_slider").slick({
                    autoplay:true,
                    speed: settings?.data?.speed || 400, // settingsを利用
                    autoplaySpeed:settings?.data?.stop || 3000,
                    fade:settings?.data?.method == 1 ? true : false,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: settings?.data?.arrow == 1 ? true : false,
                    dots: settings?.data?.dots == 1 ? true : false,
                });
            }
        } catch (error) {
            console.log('メイン画像の取得エラー:', error);
        }
    }

    async function init() {
        try {
            const settings = await fetchSettings();
            await fetchMainImgs(settings);
        } catch (error) {
            console.log('アプリの初期化中にエラーが発生しました:', error);
        }
    }

    init();
})(jQuery);
