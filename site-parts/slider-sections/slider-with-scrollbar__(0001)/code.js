/* HEADER SECTION */
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@10/swiper-bundle.min.css"/>
/* HEADER SECTION */

/* FOOTER SECTION */
<script src="https://code.jquery.com/jquery-latest.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/swiper@10/swiper-bundle.min.js"></script>

<script>
let checkPlugin3 = document.querySelectorAll('[data-ghost]');
if (typeof(checkPlugin3) != 'undefined' && checkPlugin3 != null){
  var sliderCount = 1;
  checkPlugin3.forEach(function(el){
    var getSliderContentUrl = el.getAttribute('data-blog-href')
    var getPluginName = el.getAttribute('data-ghost-plugin-name')
    if( getPluginName == 'slider-our-team' ){
      //main markup
      el.innerHTML = '<div class="'+getPluginName+' swiper-container swiper-'+sliderCount+'"><div class="bottom-controllers"><div class="arrows-wrapper"><div class="swiper-button-prev"></div><div class="swiper-button-next"></div></div><div class="swiper-scrollbar"></div><div class="about-button"><a href="about">Learn more about US</a></div></div><div class="swiper-wrapper"></div></div>'
      //vanilla js JSON request
      var request = new XMLHttpRequest();
      request.open('GET', ''+document.location.origin+''+getSliderContentUrl+'?format=json-pretty', true);
      request.onload = function(curEl) {
        if (this.status >= 200 && this.status < 400) {
          /* Success!*/
          var data = JSON.parse(this.response);
          for (var i = 0; i < data.items.length; i++) {
            var getItemTitle = data.items[i].excerpt
            var getItemTitle2 = data.items[i].title
            var getItemExcerpt = data.items[i].body
            var getItemImage = data.items[i].assetUrl
            //slide markup
            var createItem = '<div class="swiper-slide"><div class="wrap-inner"><div class="image-wrap"><div class="img-div"><img src="'+getItemImage+'"></div></div> <h1>'+getItemTitle2+'</h1><div class="description-wrapper"><div class="desc-inner"><div class="desc-inner-2"><div class="excerpt">'+getItemTitle+'</div></div></div></div></div></div>';
            var getParent = el.querySelector('.swiper-wrapper');
            getParent.innerHTML =  getParent.innerHTML + createItem;
            //when loading is finished than initialize slider
            if(i == data.items.length - 1){
              var findSwiperParent = el.querySelector('.swiper-container')
              findSwiperParent.classList.add('loaded')
              //initialize swiper
              new Swiper(findSwiperParent, {
                loop: false,
                slidesPerView: 1.25,
                spaceBetween: 20,
                draggable: true,
                navigation: {
                  nextEl: '.swiper-button-next',
                  prevEl: '.swiper-button-prev',
                },
                direction: 'horizontal',
                scrollbar: {
                  el: '.swiper-scrollbar',
                  hide: false,
                  draggable: true,
                },
                breakpoints: {
                  640: {
                    slidesPerView: 2.2,
                    spaceBetween: 20,
                    centeredSlides: false,
                    roundLengths: false,
                  },
                  900: {
                    slidesPerView: 3.2,
                    spaceBetween: 20,
                    centeredSlides: false,
                    roundLengths: false,
                  },
                  1100: {
                    slidesPerView: 3.185,
                    spaceBetween: 32,
                  },
                  2000: {
                    slidesPerView: 4.15,
                    spaceBetween: 32,
                  },
                },
                pagination: {
                  el: '.swiper-pagination',
                  clickable: true
                },
              });
              //finish initizlize swiper
            }
            //end if
          }
        } else {}
      };
      request.onerror = function() {};
      request.send(); 
      //end vanilla js JSON request
      sliderCount++;
    }
  })    
}
</script>


/* FOOTER SECTION */
