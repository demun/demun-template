/**
 * common.js
 * 사이트 전역에 사용되는 스크립트
 * 
 */



(function(){
	'use strict';

	console.log('site.js test');

	/**
	 * 부드러운 스크롤 이동
	 */
	// smoothScroll.init();
	// 
	// smoothScroll.init({
	// 	speed: 1000,
	// 	easing: 'easeInOutCubic',
	// 	offset: 0,
	// 	updateURL: true,
	// 	callbackBefore: function ( toggle, anchor ) {},
	// 	callbackAfter: function ( toggle, anchor ) {}
	// });


	// /**
	//  * 이미지 뷰어
	//  * 이미지를 클릭하면 크게 보기
	//  * 
	//  */
	// var imgViewFun = {
	//     init: function() {
	//         this.imgFun();
	//     },
	//     imgFun: function() {
	//         var imgView = $('#box-left .img-view').find('img'),
	//         	imgList = $('#box-left .img-list').find('img');

	//         imgList.on('click', function(e) {
	//         	var imgSrc = $(this).attr('src');

	//         	imgView.attr('src', imgSrc).css({'width':'330px','height':'250px'});

	//         	// imgView.attr('src', imgSrc.substr(0, imgSrc.length-3) + '.jpg');
	//         	// if (e.target.tagName === 'IMG') {
	//         	// 	var imgSrc = e.target.src;
	//         	// 	console.log(imgSrc);
	//         	// }
	//         });
	//     }
	// };
	// imgViewFun.init();


	// /**
	//  * popup plugins
	//  * http://dimsemenov.com/plugins/magnific-popup/
	//  *
	//  * 사용법:
	//  *
	//  * 팝업열기
	//  * <a href="../member/member_020006_pop_01.html" class="popup-link-05">탈퇴신청</a>
	//  *
	//  * 팝업닫기:
	//  * <a href="javascript:;" class=".popup-close">취소</a>
	//  * 
	//  */
	// function popupFun(select) {
		
	//     $(select).magnificPopup({
	//         type: 'ajax',
	//         overflowY: 'scroll'
	//     });

	//     $(document).on('click', '.popup-close', function (e) {
	// 		e.preventDefault();
	// 		$.magnificPopup.close();
	// 	});
		
	// }

	// // subpage.html 옵션복수구매
	// popupFun('.popup-link-01');
	// // subpage.html 위시리스트
	// popupFun('.popup-link-02');
	// // subpage.html 위시리스트
	// popupFun('.popup-link-03');
	// // subpage.html 상품평 리스트
	// popupFun('.popup-link-04');

	// // member_020006.html 회원탈퇴신청
	// popupFun('.popup-link-05');

	// // mypage_010004.html 입금확인취소
	// popupFun('.popup-link-06');
	// popupFun('.popup-link-07');
	// popupFun('.popup-link-08');

	// $.magnificPopup.open({});
	// $('.popup-link-07').magnificPopup('open');

	// $('.popup-link-07').magnificPopup({
	//   items: {
	//     src: '../main/popup-link-07.html',
	//     type: 'ajax'
	//   }
	//   // (optionally) other options
	// }).magnificPopup('open');

	// // main page
	// $(document).ready(function() {

	// 	// $('.popup-link-07').magnificPopup({
	// 	// 	preloader: true,
	// 	// 	type: 'ajax',
	// 	// 	callbacks: {
	// 	// 		beforeOpen: function() {
	// 	// 			console.log('Start of popup initialization');
	// 	// 		},
	// 	// 		open: function() {
	// 	// 		    console.log('Popup is opened');
	// 	// 		  }
	// 	// 	}
	// 	// });
	// 	// $('.popup-link-08').magnificPopup({
	// 	// 	type: 'ajax'
	// 	// });
	// });
	

	


	// /**
	//  * 
	//  * 임업인 메인페이지에 사용되는 카테고리 메뉴 스크립트
	//  * 
	//  * seller_main_03.html
	//  * 
	//  */
	// var cMenuFun = {
	//     init: function() {
	//         this.cMenu();
	//     },
	//     cMenu: function() {
	//         var cMenu = $('.c-menu'),
	//         	link = cMenu.find('li');

	//         link.hover(function() {
	//         		$(this).children('ul').show();
	//         }, function() {
	//         	$(this).children('ul').hide();
	//         });
	//     }
	// };
	// cMenuFun.init();


	// /**
	//  * bxslider
	//  *
	//  * 
	//  * 
	//  */
	// $('.bx-slider-01 .bxslider').bxSlider({
	// 	auto: true, 			// 자동시작
	// 	autoControls: false, 	// 시작,멈춤버튼
	// 	// captions: true,			// 캡션
	// 	pager: false, 			// 페이징버튼
	// 	controls: false
	// 	// minSlides: 5,
	// 	// maxSlides: 5,
	// 	// moveSlides: 1, 			// 1개씩 이동
	// 	// slideWidth: 250,
	// 	// slideMargin: 0
	// 	// infiniteLoop: false
	// });

	
	
})();


