# install


grunt, bower, yeoman 한번에 설치하기

```
npm install -g grunt-cli bower yo
```



tem.sh 파일을 콘솔창에서 실행

```
tem.sh projectFolder
```


Gruntfile.js, bower.json, grunt serve 실행됨.


여기서 설치되는 모듈

```
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





# bower





## scripts/vendor.js


scripts 폴더에 vendor.js 로 사용되는 스크립트





- jquery

jquery 는 vender.js 로 사용


```html
<script src="bower_components/jquery/jquery.js"></script>
```




## scripts/plugins.js


scripts 폴더에 plugins.js 로 병합되는 자바스크립트



- bootstrap

fonts 복사해야됨.


```html
<!-- css file -->
<link rel="stylesheet" href="bower_components/bootstrap/dist/css/bootstrap.css">

<!-- js file -->
<script src="bower_components/bootstrap/js/affix.js"></script>
<script src="bower_components/bootstrap/js/alert.js"></script>
<script src="bower_components/bootstrap/js/dropdown.js"></script>
<script src="bower_components/bootstrap/js/tooltip.js"></script>
<script src="bower_components/bootstrap/js/modal.js"></script>
<script src="bower_components/bootstrap/js/transition.js"></script>
<script src="bower_components/bootstrap/js/button.js"></script>
<script src="bower_components/bootstrap/js/popover.js"></script>
<script src="bower_components/bootstrap/js/carousel.js"></script>
<script src="bower_components/bootstrap/js/scrollspy.js"></script>
<script src="bower_components/bootstrap/js/collapse.js"></script>
<script src="bower_components/bootstrap/js/tab.js"></script>
```

Gruntfile.js 에서 이미지 복사해야됨.


```javascript
// bootstrap fonts
{
    expand: true,
    dot: true,
    cwd: 'bower_components/bootstrap/dist',
    src: 'fonts/*',
    dest: '<%= config.dist %>'
}
```







- jquery ui

이미지 복사.


```html
<!-- css file -->
<link rel="stylesheet" href="bower_components/jquery-ui/themes/smoothness/jquery-ui.css">

<!-- js file -->
<script src="bower_components/jquery-ui/jquery-ui.js"></script>
```

Gruntfile.js 에서 이미지 복사해야됨.


```javascript
// jquery ui 사용시
{
    expand: true,
    dot: true,
    cwd: 'bower_components/jquery-ui/themes/smoothness/',
    dest: '<%= config.dist %>/styles',
    src: 'images/*'
}
```








- bxSlider

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


Gruntfile.js 에서 이미지 복사해야됨.


```javascript
{
    expand: true,
    dot: true,
    cwd: 'bower_components/massmans-bxslider/images',
    dest: '<%= config.dist %>/images',
    src: [
        '*.{ico,png,gif}'
    ]
}
```


plugins 를 사용할경우 html 에서 아래구문 추가해야 됨

```html
<script src="bower_components/massmans-bxslider/plugins/jquery.easing.1.3.js"></script>
<script src="bower_components/massmans-bxslider/plugins/jquery.fitvids.js"></script>
```





- colorbox



```html
<!-- css file -->
<link rel="stylesheet" href="bower_components/jquery-colorbox/example5/colorbox.css">

<!-- js file -->
<script src="bower_components/jquery-colorbox/jquery-colorbox.js"></script>
```


Gruntfile.js 에서 이미지 복사해야됨.

```javascript
{
    expand: true,
    dot: true,
    cwd: 'bower_components/jquery-colorbox/example5/images',
    dest: '<%= config.dist %>/images',
    src: [
        '*.{ico,png,gif}'
    ]
}
```







- magnific-popup



```html
<!-- css file -->
<link rel="stylesheet" href="bower_components/magnific-popup/magnific-popup.css">

<!-- js file -->
<script src="bower_components/magnific-popup/jquery.magnific-popup.js"></script>
```











## scripts/scripts.js


scripts 폴더에 scripts.js 로 병합되는 자바스크립트


사이트에서 사용하는 사용자 js 로 빌드후 scripts.js 로 만들어짐.




