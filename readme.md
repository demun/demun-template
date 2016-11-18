# install


grunt, bower, yeoman 등이 설치가 안되어 있다면 한번에 설치

```sh
npm install -g grunt-cli bower yo
```


`demun-template` 을 클론 또는 다운로드 받았다면 이 폴더위치에서 `npm install`

```sh
npm install   # 폴더에 있는 package.json 을 바탕으로 플러그인 설치
bowr install  # bower.json 을 바탕으로 플러그인 설치
```


# 실행

`watch` 를 가동해 실시간 감시하면서 `grunt` 실행

```sh
grunt serve
```




## 소개

여기서 설치되는 모듈

```sh
jquery bootstrap jquey-ui bxslider colorbox magnific-popup
```



grunt 에서 설치되는 모듈

```
grunt
grunt-contrib-csslint
grunt-contrib-cssmin
grunt-contrib-clean
grunt-contrib-concat
grunt-contrib-connect
grunt-contrib-copy
grunt-contrib-jshint
grunt-contrib-imagemin
grunt-contrib-less
grunt-contrib-livereload
grunt-contrib-uglify
grunt-contrib-watch
grunt-autoprefixer
grunt-concurrent
grunt-includes
grunt-filerev
grunt-newer
grunt-notify
grunt-usemin
grunt-wiredep
jshint-stylish
load-grunt-tasks
time-grunt
```


bower 에서 설치되는 플러그인

```
jquery
bootstrap
jquery-ui
jquery-colorbox
magnific-popup
massmans-bxslider
```





-------





# 플러그인 사용예제


test 폴더에 예제 파일 있음


### jquery

jquery 는 vender.js 로 사용


```html
<script src="bower_components/jquery/jquery.js"></script>
```




### bxSlider

bxSlider 는 massmans-bxslider 사용    
https://github.com/massimans/bxslider-4    



```html
<!-- css file -->
<link href="bower_components/massmans-bxslider/jquery.bxslider.css" rel="stylesheet" />

<!-- js file -->
<script src="bower_components/massmans-bxslider/jquery.bxslider.js"></script>

<!-- 사용법 -->
<ul class="bxslider">
    <li><img src="/images/pic1.jpg" /></li>
    <li><img src="/images/pic2.jpg" /></li>
    <li><img src="/images/pic3.jpg" /></li>
    <li><img src="/images/pic4.jpg" /></li>
</ul>
```


plugins 를 사용할경우 html 에서 아래구문 추가해야 됨

```html
<script src="bower_components/massmans-bxslider/plugins/jquery.easing.1.3.js"></script>
<script src="bower_components/massmans-bxslider/plugins/jquery.fitvids.js"></script>
```





### colorbox

```html
<!-- css file -->
<link rel="stylesheet" href="bower_components/jquery-colorbox/example5/colorbox.css">

<!-- js file -->
<script src="bower_components/jquery-colorbox/jquery-colorbox.js"></script>
```



### magnific-popup

```html
<!-- css file -->
<link rel="stylesheet" href="bower_components/magnific-popup/magnific-popup.css">

<!-- js file -->
<script src="bower_components/magnific-popup/jquery.magnific-popup.js"></script>
```
