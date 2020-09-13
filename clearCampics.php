<?php
//unlink('campics/DCS-930LB2020082711184301.jpg');

$sourceDir = 'campics';
$files = glob($sourceDir .'/*.jpg');

$lastFileDate = "";

usort($files, function($a, $b) {
	return filemtime($a) < filemtime($b);
});

$sourceFileDate = filemtime($files[0]);

$data[0] = date("d.m.Y H:i", $sourceFileDate);
$data[1] = date("F d Y H:i", $sourceFileDate);

$myDate = date("d.m.Y H:i");
echo $myDate;

$myDate1 = date("d.m.Y H:i", $sourceFileDate);
echo $myDate1;

 calculate the sunset time for Lisbon, Portugal
Latitude: 38.4 North
Longitude: 9 West
Zenith ~= 90
offset: +1 GMT


echo date("D M d Y"). ', sunset time : ' .date_sunset(time(), SUNFUNCS_RET_STRING, 38.4, -9, 90, 1);


//dateDifference();

//function dateDifference($myDate1 , $myDate , $differenceFormat = '%a' )
//{
//    $datetime1 = date_create($myDate1);
//    $datetime2 = date_create($myDate);
   
//    $interval = date_diff( $datetime1,  $datetime2);
   
//    return $interval->format($differenceFormat);
//    echo $interval;
   
//}

?>