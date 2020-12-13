<?php
air_korea_realtime();

function air_korea_realtime(){
  // 서비스 : ArpltnInforInqireSvc
  // 오퍼레이션 : getMsrstnAcctoRltmMesureDnsty
  // 측정소별 실시간 측정정보 조회
  $key = ''; // 만료로 삭제
  $station = '상대동'; // 위치정보 사용 제한으로 get_station();는 구현하지 않음
  $url = 'http://openapi.airkorea.or.kr/openapi/services/rest/ArpltnInforInqireSvc/';
  $operation = 'getMsrstnAcctoRltmMesureDnsty';
  $full_url = $url . $operation . '?';
  $full_url = $full_url . ('stationName=' . $station);
  $full_url = $full_url . ('&dataTerm=' . 'month');
  $full_url = $full_url . ('&pageNo=' . '1');
  $full_url = $full_url . ('&numOfRows=' . '1');
  $full_url = $full_url . ('&ServiceKey=' . $key);
  $full_url = $full_url . ('&ver=' . '1.3');
  $full_url = $full_url . ('&_returnType=' . 'json');

  $data = file_get_contents($full_url);
  echo $data;
}
?>
