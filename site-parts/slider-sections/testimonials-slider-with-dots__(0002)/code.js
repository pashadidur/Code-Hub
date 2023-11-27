/* HEADER SECTION */
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@10/swiper-bundle.min.css"/>
/* HEADER SECTION */

/* FOOTER SECTION */
<script src="https://code.jquery.com/jquery-latest.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/swiper@10/swiper-bundle.min.js"></script>

<script>
let checkPlugin = document.querySelectorAll('[data-ghost]');
if (typeof(checkPlugin) != 'undefined' && checkPlugin != null){
  var sliderCount = 1;
  checkPlugin.forEach(function(el) {
    var getSliderContentUrl = el.getAttribute('data-blog-href')
    var getPluginName = el.getAttribute('data-ghost-plugin-name')

    if( getPluginName == 'slider-testimonials' ){
      //main markup
      el.innerHTML = '<div class="'+getPluginName+' swiper-container swiper-'+sliderCount+'"><div class="bottom-controllers"><div class="arrows-wrapper"></div><div class="swiper-pagination"></div></div><div class="swiper-wrapper"></div></div>'
      //vanilla js JSON request
      var request = new XMLHttpRequest();
      request.open('GET', ''+document.location.origin+''+getSliderContentUrl+'?format=json-pretty', true);
      request.onload = function(curEl) {
        if (this.status >= 200 && this.status < 400) {
          /* Success!*/
          var data = JSON.parse(this.response);
          for (var i = 0; i < data.items.length; i++) {
            var getItemTitle = data.items[i].title
            var getItemExcerpt = data.items[i].body
            var getItemImage = data.items[i].assetUrl
            var getItemLink = data.items[i].sourceUrl
            //slide markup
            var createItem = '<div class="swiper-slide"><div class="wrap-inner"><div class="image-wrap"></div><div class="description-wrapper"><div class="desc-inner"><div class="excerpt">'+getItemExcerpt+'</div></div></div></div></div>';
            var getParent = el.querySelector('.swiper-wrapper');
            getParent.innerHTML =  getParent.innerHTML + createItem;
            //when loading is finished than initialize slider
            if(i == data.items.length - 1){
              var findSwiperParent = el.querySelector('.swiper-container')
              findSwiperParent.classList.add('loaded')
              //initialize swiper
              new Swiper(findSwiperParent, {
                loop: false,
                slidesPerView: 1,
                centeredSlides: false,
                roundLengths: false,
                spaceBetween: 20,
                pagination: {
                  el: ".swiper-pagination",
                  clickable: true,
                  type: 'dots'
                },
                breakpoints: {
                  767: {
                    slidesPerView: 1,
                    centeredSlides: false,
                    roundLengths: false,
                    spaceBetween: 20,
                    //centeredSlides: true,
                    //roundLengths: true,
                  }
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
