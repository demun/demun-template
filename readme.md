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


# bower



## scripts/vendor.js

- jquery


```
<script src="bower_components/jquery/jquery.js"></script>
```




## scripts/plugins.js




- bootstrap

jquery 종속

```
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




- jquery ui

jquery ui 의 경로의 문제가 있음. images/icon.png
이미지 복사해야됨.


```
<!-- css file -->
<link rel="stylesheet" href="bower_components/jquery-ui/themes/smoothness/jquery-ui.css">

<!-- js file -->
<script src="bower_components/jquery-ui/jquery-ui.js"></script>
```

less 폴더에 경로 수정해서 jquery-ui.less 만들어 놓음


- bxSlider

bxSlider 는 massmans-bxslider 사용    
https://github.com/massimans/bxslider-4    
jquery 종속     


```
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


복사해야할 파일: Gruntfile.js

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






- colorbox

경로의 문제가 있음. images/image.png

less 에 colorbox1 ~ colorbox5 까지 경로 변경해서 만들어놓음



```
<!-- css file -->
<link rel="stylesheet" href="bower_components/jquery-colorbox/example5/colorbox.css">

<!-- js file -->
<script src="bower_components/jquery-colorbox/jquery-colorbox.js"></script>
```


복사해야할 파일: Gruntfile.js

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



```
<!-- css file -->
<link rel="stylesheet" href="bower_components/magnific-popup/magnific-popup.css">

<!-- js file -->
<script src="bower_components/magnific-popup/jquery.magnific-popup.js"></script>
```











## scripts/scripts.js



사이트에서 사용하는 사용자 js     
빌드후 scripts.js 로 만들어짐.




