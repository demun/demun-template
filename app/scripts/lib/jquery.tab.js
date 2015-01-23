/**
 * tab.js
 * 탭을 클릭하면 html 를 로드하는 방식
 * 현재 두개의 js 가 있는 형태
 *
 * http://www.ajaxblender.com/article-sources/jquery/ajax-tabs-example/
 *
 * 탭은 한페이지에 3개까지 표시가능 하다
 * id 에 02 또는 03 형식으로 추구해서 표시한다.
 *
 * 너비관련 ---------------
 * 기본스타일은 @tab-padding 를 유지하지만 너비가 꽉찬 스타일은 li의 갯수가 클래스가 된다.
 * 너비가 100%를 유지하려면 li 의 갯수를 tabs 클래스에 추가한다.
 * 아래는 li 가 4개인 형태이다
 * 예) <ul class="tabs tabs-li-4" id="tabs">
 */

;(function(){
    'use strict';

    var tabFun = {
        init: function() {
            this.tab_01();
        },
        tab_01: function() {
            var containerId = '#tabs-container';
            var tabsId = '#tabs';

            function loadTab(tabObj){
                if(!tabObj || !tabObj.length){ return; }
                $(containerId).addClass('loading');
                $(containerId).fadeOut('fast');
                
                $(containerId).load(tabObj.attr('href'), function(){
                    $(containerId).removeClass('loading');
                    $(containerId).fadeIn('fast');
                });
            }

            $(document).ready(function(){
                // 탭에 페이지를 미리로드
                if($(tabsId + ' li.current a').length > 0){
                    loadTab($(tabsId + ' li.current a'));
                }
                
                $(tabsId + ' a').click(function(){
                    if($(this).parent().hasClass('current')){ return false; }
                    
                    $(tabsId + ' li.current').removeClass('current');
                    $(this).parent().addClass('current');
                    
                    loadTab($(this));       
                    return false;
                });
            });
        }
    };
    tabFun.init();




    /**
     * 사용하고자 하는 탭의 컨테이터의 아이디를 셀렉터로 하는 탭로직
     * 
     * @param  {selecter} selecter 탭을 감싸고 있는 컨테이너 아이디
     * 
     */
    function tabsFun( selecter ) {
        var tabs = $(selecter).find('.tabs');
        var container = $(selecter).find('.tabs-container');

        // 첫번째 보이기
        tabs.children().first().addClass('current');
        var href = tabs.find('.current a').attr('href');

        $(container).load(href, function() {
            container.fadeIn('fast');
        });

        // 클릭시 this 의 href 값으로 컨테이너에 보이기
        tabs.find('a').on('click', function(e) {
            e.preventDefault();
            var url = $(this).attr('href');
            var li = $(this).parent('li');

            // 현재 부모가 current 이면 리턴
            if( li.hasClass('current') ) { return false; }

            // 다른 형제 클래스 제거하고 현재요소에 current 추가
            tabs.find('li').removeClass('current');
            li.addClass('current');

            // container 에 현재 주소값으로 보이기
            $(container).load(url, function() {
                container.fadeIn('fast');
            });
            
        });

    };

    tabsFun('#tabWrap');
    tabsFun('#tabWrap-02');
    tabsFun('#tabWrap-03');

})();