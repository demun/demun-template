/**
 * lnbFun 
 * 
 * 설명: 현재 주소와 사이드바와의 상태를 비교하여 강조표시한다.
 * 상태는 두단계이며, 사이트에 접속하자마자 보여주는 디폴는 상태와 클릭한후 두가지다.
 * 
 * 가. 상태 : 사이드바의 링크와 현재주소를 비교하여 클래스 추가, 제거
 * 나. 클릭 : 사이드바의 링크를 클릭했을때 현재주소를 포함하고 있는지 체크.
 *
 * -------------------------------------------------------
 *
 * 로직.
 *
 * 가. 상태.
 * 1. 개발시 주소에 ?를 붙는 경우를 생각해서 주소에 ?가 있는경우와 없는 경우로 나뉜다.
 * 2. 주소에 ? 없는 온전한 html 일경우, 현재주소를 포함한 링크가 사이드바에 있는지 체크한다.
 *     3.1 사이드바에 현재 주소를 포함한 링크가 없는 경우,
 *         동일한 카테고리에 속한 링크들을 강조표시한다.
 *         또한 3뎁스인경우는 부모 카테고리(2뎁스)에 배경색 강조표시 한다.
 *     3.2 사이드바에 현재 주소를 포함한 링크가 있는 경우.
 *         4.1 2뎁스인 경우
 *             5.1 형제 관계인 ul 태그가 있다
 *                 자신을 강조표시하고, 자식을 보여준다.
 *             5.2 형제 관계인 ul 태그가 없다
 *                 자신만 강조표시한다.
 *         4.2 3뎁스인 경우
 *             자신을 강조, 자신을 포함한 현재보이기, 부모 배경 강조, 
 *
 *
 * 나. 클릭.
 * 1. 2뎁스
 *     1.1. 일반 링크
 *         일반 링크이므로 이동. 아무 액션 없음.
 *     1.2. 자바스크립트 링크
 *         1.2.1 형재 요소가 블럭 상태인지체크.(block 일때)
 *             형재(ul) 감추기, active 클래스 추가
 *         1.2.2 형제요소가 none 일때
 *             형재(ul) 보이기, off 클래스 추가. 다른 형제(ul) 감추기
 * 2. 3뎁스
 *     3뎁스는 100% 링크 이므로 이동. 아무 액션 없음.
 *
 * -------------------------------------------------------
 * 
 * 클래스.
 * 
 * off 클래스 : 하위메뉴가 있고, 하위메뉴가 열릴때 사용
 * active 클래스 : 하위메뉴가 없거나, 하위메뉴가 닫힐때 사용
 *
 * off 클래스: 하위메뉴를 보여주는 이미지와 배경색을 스타일링 한다
 *
 * active 클래스는 2뎁스와 3뎁스 모두 사용한다
 * 2뎁스에서의 active 는 우측방향 이미지와 배경색을 스타일링 한다
 * 3뎁스에서의 active 는 텍스트를 강조표시한다.
 *
 */


;(function ($) {

    'use strict';

    var lnb = $('#lnb-menu > li'),
        first = lnb.first().children('a'),  // 1depth 강조
        second = lnb.first().next().children('a'),  // 2depth 강조
        third = lnb.first().next().next().children('a'), // 3depth 강조
        fourth = lnb.first().next().next().next().children('a'),
        fifth = lnb.first().next().next().next().next().children('a'),
        // sixth = lnb.first().next().next().next().next().next().children('a'),
        lnb_ul = $('#lnb-menu ul'),
        current = location.href, //현재 주소
        current_link = current.split('/')[current.split('/').length - 1], // 현재주소에서 마지막 부분(클래스)
        lnb_anchor = lnb.find('a'); // 사이드바 링크 요소

        // console.log('first: '+ first.text() );
        // console.log('second: '+ second.text() );


    // 가. 현재주소와 사이드바 링크를 비교
    lnb_anchor.each(function() {
        var current_url = current_link.split('.')[0]; // html 을 제외한 앞주소 추출
        var thisLink = $(this).attr('href');
        var depth_1 = $(this).parent().parent();
        var depth_2 = $(this).parent().parent().parent().parent();
        // var depth_3 = $(this).parent().parent().parent().parent('ul');
        // console.log('current_url: ' + current_url);
        // current_link_string = current_link.split('?');
        // current_link = current_link_string[0];


        // 1.1 현재 링크에 ? 이 없다. 그래서 current_url 를 그대로 사용
        if( current_url.indexOf('?') === -1 ) {
            // console.log('주소에 ? 이 없다',current_url);

            // 2.현재 주소를 포함한 링크가 사이드바에 없다.
            // console.log('현재 링크를 포함하지 않는다');
            if ( $(this).attr('href').indexOf(current_url) === -1) {
                // console.log('현재 링크를 포함하지 않는다');
                // 3.1 현재주소를 포함하지 않지만 같은 카테고리있는 링크에 강조표시한다.
                
                // 1depth, 2depth 확인
                if ( depth_1.attr('id') === 'lnb-menu' ) {
                    // 1depth, 
                    // console.log('1depth', current_url);

                    // 1depth 인경우 우측 아이콘 표시
                    // if ( current_url != 'customer_080000' && current_url != 'seller_020600' ){  //생성 게시판이 아닌경우만 오버표시
                    //     $(this).append('<span class="icon arrow-right"></span>');
                    // }
                    
                    // 게시판 상세보기 강조표시하기
                    // 현재 링크를 포함하지 않지만 리스트 게시판 강조하기
                    if( current_url === 'seller_020101'){
                        // 공지사항보기 seller_020101 일때 강조하기
                        first.addClass('active');
                        first.append('<span class="icon arrow-down"></span>');
                        
                        // lnb.find('a[href="../reference/reference_040101.html"]').addClass('active');
                    } else if ( current_url === 'reference_040202'){
                        // refernce 상세보기 reference_040202 일때 강조하기
                        // 2depth 강조
                        second.addClass('active');
                    } else if ( 
                            // refernce 상세보기 reference_040302 일때 강조하기
                            (current_url === 'reference_040302') || 
                            // 임점안내 , 입점신청시 입점안내 보이기
                            (current_url === 'about_030001') 
                        ){
                        third.addClass('active');
                    } else if ( current_url === 'seller_020401'){
                        // seller_020401 주문교환환불신청 
                        fourth.addClass('active');
                        fourth.append('<span class="icon arrow-down"></span>');
                    } else if ( current_url === 'seller_020501'){
                        // seller_020501 상품문의보기
                        fifth.addClass('active');
                        fifth.append('<span class="icon arrow-down"></span>');
                    }

                } else {
                    // 2depth
                    // console.log('2depth', current_url);
                }

            } 
            // 2. 현재 주소를 포함한 링크가 사이드바에 있다.
            else {
                // console.log('현재 링크를 포함한다');

                // 1depth, 2depth 확인
                if ( depth_1.attr('id') === 'lnb-menu' ) {
                    // 1depth, 
                    // console.log( '1depth 강조', current_url );
                    $(this).attr('class','active');

                    // 1depth 인경우 우측 아이콘 표시
                    $(this).append('<span class="icon arrow-right"></span>');

                    // if ( depth_1.css('display')  === 'block') {
                    //     $(this).append('<span class="icon arrow-down"></span>');
                    // } else {
                    //     $(this).append('<span class="icon arrow-right"></span>');
                    // }
                                        
                } else {
                    // 2depth
                    // console.log('2depth 강조 ', current_url);
                    $(this).addClass('active');
                    depth_1.siblings('a').addClass('active');

                    // 1depth 에서 하위메뉴가 보이면 down. 안보이면 right 아이콘부여
                    if ( depth_1.css('display')  === 'block') {
                        // block - hidden
                        depth_1.siblings('a').append('<span class="icon arrow-down"></span>');
                        console.log('display hedden');
                    } else {
                        // hidden - block
                        depth_1.siblings('a').append('<span class="icon arrow-right"></span>');
                        console.log('display block');
                    }
                    
                    
                    // 1depth 판별,펼쳐있는 경우 사용
                    if ( depth_2.hasClass('goods') ) {
                        depth_1.siblings('a').attr('class','active');
                        
                    } 
                    // else {
                    //     depth_1.siblings('a').attr('class','off');
                    // }
                    // depth_1.slideDown(0);
                }

            }
            

        } 
        // 1.1 현재 링크에 ? 이 있다.
        // 현재주소인 current 를 ?로 문자로 한번 더 자른다.
        else {
            // console.log('주소에 ?이 있다');
            current_url_string = current_url.split('?');
            current_url = current_url_string[0];

            if ( $(this).attr('href').indexOf(current_url) === -1) {
                // console.log('현재 링크를 포함하지 않는다');

            } else {
                // console.log('현재 링크를 포함한다',current_url);

                // 1.3 형제(ul)가 있는지 체크한다
                if ( $(this).next('ul').length === '0' ) {
                    // console.log('형제가 있다');
                    
                    $(this).addClass('active');
                    // $(this).next('ul').slideDown(200);
                } else {
                    // console.log('형제가 없다');
                    $(this).addClass('active');
                }
            } 
           
        }


    });

// ====================================================================================
// 
    // 나. 클릭시 사이드바의 링크와 비교
    lnb_anchor.on('click', function(event) {
        // event.preventDefault();
        // 2depth
        var depth_1 = $(this).parent().parent();
        // 3depth
        var depth_2 = $(this).parent().parent().parent().parent();

        // 1. 1depth
        // $(this).parent().parent().attr('id') === 'lnb-menu'
        if ( depth_1.attr('id') === 'lnb-menu' ) {
            
            // 1.1 일반 링크. 비로 이동
            if ( $(this).attr('[href*=".html"]') ) {
                
                // console.log('2depth html 일반링크');
            } else {
                // 1.2 자바스크립트 링크 로 간주.
                // console.log('2depth javascript 링크');

                // 1.2.1 형제요소의 상태가 block 인지 none 인지 체크
                
                if ( $(this).next('ul').css('display') === 'block') {
                    // block 상태
                    // console.log('block');
                    
                    // $(this).next('ul').slideUp(200);
                    $(this).attr('class','active');

                } else {
                    // 1.2.2 none 일 경우
                    // console.log('none');
                    
                    // 다른 형제 요소 감추기
                    // lnb_ul.slideUp(200);
                    // 다른 형제요소의 클래스 초기화(자식빼고)
                    $(this).parent().siblings('li').children('a').attr('class','');
                    
                    // 현재 자식요소 보이기
                    // $(this).next('ul').slideDown(200);
                    // 현재요소 닫힘 클래스 부여
                    $(this).attr('class','off');
                }
            }

        } else if ( depth_2.attr('id') === 'lnb-menu' ) {
            // 2. 2depth
            // console.log('2depth 이므로 링크 이동');
        } else {
            // 3. 나중을 위한 구문.
            // console.log('2,3 depth 아님');
        }
        
    });
 
}( jQuery ));