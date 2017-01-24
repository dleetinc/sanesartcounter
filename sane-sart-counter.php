<?php

$pt_to_px = 1;// 0.7777777777777778;

$img = imagecreatefrompng( "theme/php-base-image.png" );
$width = 280 * $pt_to_px;
$margin = 10 * $pt_to_px;;

$text_color = imagecolorallocate($img, 236, 236, 236);
$font = 'theme/micross.ttf';
$fontB = 'theme/microssB.ttf';

$date = strtoupper(date('l, F j, Y - G:i:s'));
$footer = "SEXUAL ASSAULTS SINCE ".date("1.01.Y");
$rate = '1.85';

$now = time();
$then = strtotime(date('1/1/Y'));
$diff = $now - $then;

$minutes = $diff / 60;
$count = round($minutes/$rate);
$count = str_pad($count, 6, "0", STR_PAD_LEFT);
$numbers = str_split($count);
$number_box_width = ($width - $margin) / 6;


imagettftext($img, 8, 0, 32, 20, $text_color, $font, $date);
imagettftext($img, 10, 0, 110, 45, $text_color, $fontB, $rate);

foreach ($numbers as $k=>$number) {
	$box = imagettfbbox( 35 , 0 , $fontB , $number );
		
	$x = floor(($number_box_width - $box[2]) / 2);
	imagettftext($img, 35, 0, ($x + ($k * $number_box_width)) + 5, 135, $text_color, $fontB, $number);
}

imagettftext($img, 10, 0, 22, 178, $text_color, $font, $footer);


header('Content-Type: image/png');
imagepng($img);
imagedestroy($img);
/*
*/