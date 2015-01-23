/**
 * smooth scroll : https://github.com/cferdinandi/smooth-scroll
 * 클릭하면 스무스하게 이동
 * 
 * 아래예제처럼 링크에 data-scroll 를 추가해서 사용
 * <a href="#top" data-scroll>top</a>
 * 
 */
// (function(){
//     $('a[href*=#]:not([href=#])').click(function() {
//         if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
//             var target = $(this.hash);
//             target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
//             if (target.length) {
//                 $('html,body').animate({
//                     scrollTop: target.offset().top
//                 }, 1000);
//             return false;
//             }
//         }
//     });
// })();


(function($) {
    jQuery(document).ready(function($) {
        $(".scroll").click(function(event){ // When a link with the .scroll class is clicked
            event.preventDefault(); // Prevent the default action from occurring
            $('html,body').animate({scrollTop:$(this.hash).offset().top}, 500); // Animate the scroll to this link's href value
        });
    });
})(jQuery);


