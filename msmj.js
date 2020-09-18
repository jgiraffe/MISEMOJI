/*
해당 SW의 모든 상호작용
*/

var color = ["#2c75bb", "#2899d4", "#14adc2", "#349043", "#f68d1e", "#e74d25", "#d52e30", "#8a1c1c"];
var whoKorean = ["최고", "좋음", "양호", "보통", "나쁨", "상당히 나쁨", "매우 나쁨", "최악"];
var whoPM10 = [15, 30, 40, 50, 75, 100, 150];
var whoPM25 = [8, 15, 20, 25, 37, 50, 75];
var mask = 0;
var water = 1980;
var tobacco, lifetime;
var i, j; // 현재 미세, 초미세 index 체크용

function setRealTimeInfo() {
  for(i = 0; i < 7; i++){
    if(pm10 < whoPM10[i]) break;
  }
  for(j = 0; j < 7; j++) {
    if(pm25 < whoPM25[j]) break;
  }
  // $("#station").text(측정소); 현재 버전에선 구현하지 않음
  $("#time").text(mtime);
  $("#concentration10").text(pm10);
  $("#condition10").html(whoKorean[i]);
  $("#condition10").css("color", color[i]);
  $("#concentration25").html(pm25);
  $("#condition25").html(whoKorean[j]);
  $("#condition25").css("color", color[j]);
  cal();
  setMojiAndBack();
  randomTip();
};

function cal() {
  // 담배
  tobacco = (pm25 * 0.0444);
  tobacco = tobacco.toFixed(1);
 // 1시간 단축 수명
  lifetime = (tobacco * 11);
  lifetime = lifetime.toFixed(1);
  // 마스크
  if(i > 1 && i < 4) mask = 1;
  if(j > 1 && j < 4) mask = 1;
  if(i > 3) mask = 2;
  if(j > 3) mask = 2;
  //물
  if(pm10 > 30 && pm10 < 81) water += 330 * 1;
  else if(pm10 > 80 && pm10 < 101) water += 330 * 2;
  else if(pm10 > 100) water += 330 * 3;
  // 요소 수정
  $("#tbcc").text(tobacco+"개비");
  $("#lftm").text(lifetime+"분");
  if(mask == 0){
    $("#str1").text("지금은 공기가 좋아서");
    $("#mask").text("마스크 없이");
    $("#mask").css("color", color[1]);
    $("#str2").text("외출하셔도 되겠네요!");
  }
  else if(mask == 1){
    $("#str1").text("지금은");
    $("#mask").text("KF80 등급");
    $("#mask").css("color", color[3]);
    $("#str3").text(" 이상의")
    $("#str2").text("마스크를 하고 외출하세요");
  }
  else if(mask == 2){
    $("#str1").text("굳이 나가시겠다면...");
    $("#mask").text("KF94 등급");
    $("#mask").css("color", color[6]);
    $("#str3").text(" 이상의")
    $("#str2").text("마스크를 하고 외출하세요");
  }

  $("#water").text(water+"ml");
  $("#cup").text(water/330+"잔");
}

function setMojiAndBack() {
  $(".face").css("background", color[i]);
  if(i <= 1) {
    // 눈웃음
    $(".happy-eye-left").css("display", "block");
    $(".happy-eye-right").css("display", "block");
    // 비교적 푸른 그라데이션 배경
    $(".back").css("background", "linear-gradient(to bottom, #eee6ea, #eee6f4)");
  }
  else if(i <= 3) {
    // 노말
    $(".eye-left").css("display", "block");
    $(".eye-right").css("display", "block");
    // 앞 보다 상아색에 가까운 그라데이션 배경
    $(".back").css("background", "linear-gradient(to bottom, #eee6da, #eee6e4)");
  }
  else if(i <= 5) {
    // 노말 + 눈썹이 20도 내려옴
    $(".eye-left").css("display", "block");
    $(".eye-right").css("display", "block");
    $(".eyebrow-left").css("transform", "rotate(-20deg)");
    $(".eyebrow-right").css("transform", "rotate(20deg)");
    // 조금 상아색 그라데이션 배경
    $(".back").css("background", "linear-gradient(to bottom, #eee6ca, #eee6d4)");
  }

  else {
    // X눈 + 눈썹이 20도 내려옴
    $(".x-eye-left1").css("display", "block");
    $(".x-eye-left2").css("display", "block");
    $(".x-eye-right1").css("display", "block");
    $(".x-eye-right2").css("display", "block");
    $(".eyebrow-left").css("transform", "rotate(-20deg)");
    $(".eyebrow-right").css("transform", "rotate(20deg)");
    // 완전 상아색 그라데이션 배경
    $(".back").css("background", "linear-gradient(to bottom, #eee6aa, #eee6c4)");
  }
}

var x = 0, y = 0, swipeGuard = 0;

function translate_hide() {
  swipeGuard = 1;
  $("#sb"+x).attr("class", "sb hide");
  $("#sil"+x).attr("class", "stateInfoLeft hide");
  $("#sir"+x).attr("class", "stateInfoRight hide");

  $("#sb"+x).on("webkitAnimationEnd", translate_show);
  $("#sb"+x).on("mozAnimationEnd", translate_show);
  $("#sb"+x).on("animationend", translate_show);
}

function translate_show() {
  $("#sb"+x).css("display", "none");
  $("#sb"+y).css("display", "block");
  $("#sil"+x).css("display", "none");
  $("#sil"+y).css("display", "block");
  $("#sir"+x).css("display", "none");
  $("#sir"+y).css("display", "block");

  $("#sb"+y).attr("class", "sb show");
  $("#sil"+y).attr("class", "stateInfoLeft show");
  $("#sir"+y).attr("class", "stateInfoRight show");

  $("#sb"+y).on("webkitAnimationEnd", translate_reset);
  $("#sb"+y).on("mozAnimationEnd", translate_reset);
  $("#sb"+y).on("animationend", translate_reset);
}

function translate_reset() {
  $("#sb"+x).css("display", "none");
  $("#sb"+y).css("display", "block");
  $("#sil"+x).css("display", "none");
  $("#sil"+y).css("display", "block");
  $("#sir"+x).css("display", "none");
  $("#sir"+y).css("display", "block");

  $("#sb"+x).attr("class", "sb");
  $("#sb"+y).attr("class", "sb");
  $("#sil"+x).attr("class", "stateInfoLeft");
  $("#sir"+x).attr("class", "stateInfoRight");
  $("#sil"+y).attr("class", "stateInfoLeft");
  $("#sir"+y).attr("class", "stateInfoRight");
  swipeGuard = 0;
}

function blurOn() {
  $(".blur").css("filter", "blur(2px)");
  $(".blur").css("-webkit-filter", "blur(2px)");
  $(".blur").css("-moz-filter", "blur(2px)");
  $(".blur").css("-o-filter", "blur(2px)");
  $(".blur").css("-ms-filter", "blur(2px)");
}

function blurOff() {
  $(".blur").css("filter", "blur(0px)");
  $(".blur").css("-webkit-filter", "blur(0px)");
  $(".blur").css("-moz-filter", "blur(0px)");
  $(".blur").css("-o-filter", "blur(0px)");
  $(".blur").css("-ms-filter", "blur(0px)");
}

function datainfo() {
  blurOn();
  datainfoBlock();
  $("#datainfo").attr("class", "show");
  $("#datainfo").on("webkitAnimationEnd", datainfoBlock);
  $("#datainfo").on("mozAnimationEnd", datainfoBlock);
  $("#datainfo").on("animationend", datainfoBlock);
}

function sbinfo(p) {
  blurOn();
  sbinfoBlock(p);
  $("#sbinfo").attr("class", "show");
  $("#sbinfo").on("webkitAnimationEnd", sbinfoBlock);
  $("#sbinfo").on("mozAnimationEnd", sbinfoBlock);
  $("#sbinfo").on("animationend", sbinfoBlock);
}

function datainfoNone() { $("#datainfo").css("display", "none"); }
function datainfoBlock() { $("#datainfo").css("display", "block"); }
function sbinfoNone() { $("#sbinfo").css("display", "none"); }
function sbinfoBlock(p) {
  $("#sbinfo").css("display", "block");
  switch(p){
    case(1):
      $("#sistr1").html("<br><h1>미세먼지가 일으키는 질환<h1><br>");
      $("#sistr2").html("<h2>폐</h2><h3>기관지염, 폐기종, 천식, 만성호흡기질환</h3><br>");
      $("#sistr3").html("<h2>눈, 코</h2><h3>결막염, 각막염, 비염</h3><br>");
      $("#sistr4").html("<h2>뇌</h2><h3>심혈관질환, 뇌출혈, 뇌경색, 치매</h3><br>");
      $("#sisource").text("출처 : 민트병원(서울시 송파구)");
      break;
    case(2):
      $("#sistr1").html("<br><h1>보건용 마스크 등급(KF)<h1><br>");
      $("#sistr2").html("<h2>KF80</h2><h3>0.6㎛를 80%이상 차단</h3><h3>전염성 질병 차단 X</h3><br>");
      $("#sistr3").html("<h2>KF94</h2><h3>0.4㎛를 94%이상 차단</h3><h3>전염성 질병 차단 O</h3><br>");
      $("#sistr4").html("<h2>KF99</h2><h3>0.4㎛를 99%이상 차단</h3><h3>전염성 질병 차단 O</h3><h3>착용 시 호흡곤란에 유의!</h3>");
      $("#sisource").text("");
      break;
    case(3):
      $("#sistr1").html("<br><h1>미세먼지에 좋은 음식<h1><br>");
      $("#sistr2").html("<h2>해조류, 녹차, 미나리,</h2><h2>비타민C가 풍부한 과일/채소를</h2><h5>(파프리카, 귤, 딸기, 양배추, 케일 등)</h5>");
      $("#sistr3").html("<h2>잘 조리해 섭취 시</h2><h2>중금속 배출에 효과적입니다.</h2><h5>(녹차의 경후 식후 30분 ~ 1시간 뒤 마셔주세요)</h5><br>");
      $("#sistr4").html("");
      $("#sisource").text("출처 : 보건복지부");
      break;
  }
}

var beforeTip = 1, afterTip = 1;
function randomTip() {
  beforeTip = afterTip;
  //if(afterTip == 10) afterTip = 1;
  //else afterTip++;
  while(beforeTip == afterTip) afterTip = Math.floor(Math.random() * 10) + 1;
  tipHide();
}

function tipHide() {
  $("#tip"+beforeTip).attr("class", "tip thide");
  setTimeout(tipShow, 3000);
}

function tipShow() {
  $("#tip"+beforeTip).css("display", "none");
  $("#tip"+afterTip).css("display", "block");
  $("#tip"+afterTip).attr("class", "tip tshow");
  setTimeout(tipReset, 3000);
}

function tipReset() {
  //$("#tip"+beforeTip).css("display", "none");
  //$("#tip"+afterTip).css("display", "block");
  $("#tip"+beforeTip).attr("class", "tip");
  $("#tip"+afterTip).attr("class", "tip");
  randomTip();
}
