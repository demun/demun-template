/**
 * gnb background
 * hover 를 사용해 gnbBg class 추가, 제거
 * 하위메뉴 보이고, 감추고 처리
 */
var gnbFun = {
    init: function() {
        this.gnbBg();
    },
    gnbBg: function() {
        var gnb = $('#gnb'),
            gnbBg = $('#gnb-bg'),
            gnbImg = $('#gnb-bg .gnb-img'),
            gnb_ul = $('#gnb ul');

        gnb.hover(function() {
            gnbBg.addClass('gnbBg');
            gnb_ul.css('display', 'block');
            gnbImg.css('display','block');
        }, function() {
            gnbBg.removeClass('gnbBg');
            gnb_ul.css('display', 'none');
            gnbImg.css('display','none');
        });
    }
};
gnbFun.init();