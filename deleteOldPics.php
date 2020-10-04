<?php

$sourceDir = 'campics';
$files = glob($sourceDir .'/*.jpg');
$now = time();
$pocetDnu = 1;
$pocetDnuSec =  $pocetDnu * 86400;

usort($files, function($a, $b) {
	return filemtime($b) < filemtime($a);
});

$theLatestFile = filemtime($files[0]);

echo "<strong>the latest file: </strong>" . date("d.m.Y H:i:s", $theLatestFile) . "<br>";
echo "<strong> now: </strong>" . date("d.m.Y H:i:s", $now) . "<br>";
echo "<strong> now -$pocetDnu dnu: </strong>" . date("d.m.Y H:i:s", $now - $pocetDnuSec) . "<br>";

echo "<strong> k vymazani: </strong><br>";
foreach ($files as &$file) {
	if (filemtime($file) > ($now - $pocetDnuSec)){
		echo date("d.m.Y H:i:s", filemtime($file)) . "<br>";
//		unlink ($file);
	}
}
?>