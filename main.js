//ローディングアニメーション----ここから
//テキストのカウントアップ+バーの設定
var bar = new ProgressBar.Line(splash_text, {//id名を指定
  easing: 'easeInOut',//アニメーション効果linear、easeIn、easeOut、easeInOutが指定可能
  duration: 1000,//時間指定(1000＝1秒)
  strokeWidth: 0.2,//進捗ゲージの太さ
  color: '#555',//進捗ゲージのカラー
  trailWidth: 0.2,//ゲージベースの線の太さ
  trailColor: '#bbb',//ゲージベースの線のカラー
  text: {//テキストの形状を直接指定       
    style: {//天地中央に配置
      position: 'absolute',
      left: '50%',
      top: '50%',
      padding: '0',
      margin: '-30px 0 0 0',//バーより上に配置
      transform:'translate(-50%,-50%)',
      'font-size':'1rem',
      color: '#fcfcfc',
    },
    autoStyleContainer: false //自動付与のスタイルを切る
  },
  step: function(state, bar) {
    bar.setText(Math.round(bar.value() * 100) + ' %'); //テキストの数値
  }
});

//アニメーションスタート
bar.animate(1.0, function () {//バーを描画する割合を指定します 1.0 なら100%まで描画します
  $("#splash").delay(500).fadeOut(800);//アニメーションが終わったら#splashエリアをフェードアウト
});  
//ローディングアニメーション----ここまで

// メインコンテンツをヘッダーの高さ分だけずらす
var headerHeight = $('header').outerHeight();
$('main').css('padding-top', headerHeight + 'px');
$('#menu').css('margin-top', headerHeight + 'px');

// MENUボタンがクリックされたときの処理
$('#menu_btn').on('click', function(){
  if($(this).hasClass('active')) {
    $(this).removeClass('active');
    $(this).text('メニュー');
    $('#menu').removeClass('open');
    $('.menu-background').removeClass('open');
  } else {
    $(this).addClass('active');
    $(this).text('閉じる');
    $('#menu').addClass('open');
    $('.menu-background').addClass('open');
  }
});

// MENUの背景がクリックされたときの処理
$('.menu-background').on('click', function(){
  if($(this).hasClass('open')) {
    $(this).removeClass('open');
    $('#menu_btn').removeClass('active').text('MENU');
    $('#menu').removeClass('open');
  }
});

//main>h2ふわっとロード
$(function(){
  load_effect();
  $(window).scroll(function (){
      scroll_effect();
  });
});

function load_effect(){
    var tt = $(window).scrollTop();
    var hh = $(window).height();
    $('.load-fade').each(function(){
        var yy = $(this).offset().top;
        if (tt > yy - hh){
            $(this).addClass('done');
        }
    });
    $('.load-up').each(function(){
        var yy = $(this).offset().top;
        if (tt > yy - hh){
            $(this).addClass('done');
        }
    });
}

// Skillsの画像が時間差で出現
var scrollAnimationElm = document.querySelectorAll('.sa');
var scrollAnimationFunc = function() {
  for(var i = 0; i < scrollAnimationElm.length; i++) {
    var triggerMargin = 200;
    var elm = scrollAnimationElm[i];
    var showPos = 0;
    if(elm.dataset.sa_margin != null) {
      triggerMargin = parseInt(elm.dataset.sa_margin);
    }
    if(elm.dataset.sa_trigger) {
      showPos = document.querySelector(elm.dataset.sa_trigger).getBoundingClientRect().top + triggerMargin;
    } else {
      showPos = elm.getBoundingClientRect().top + triggerMargin;
    }
    if (window.innerHeight > showPos) {
      var delay = (elm.dataset.sa_delay)? elm.dataset.sa_delay : 0;
      setTimeout(function(index) {
        scrollAnimationElm[index].classList.add('show');
      }.bind(null, i), delay);
    }
  }
}
window.addEventListener('load', scrollAnimationFunc);
window.addEventListener('scroll', scrollAnimationFunc);