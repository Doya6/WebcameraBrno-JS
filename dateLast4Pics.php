<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

$sourceDir = 'campics';
$files = glob($sourceDir .'/*.jpg');

$lastFileDate = "";

usort($files, function($a, $b) {
	return filemtime($a) < filemtime($b);
});

$sourceFileDate = filemtime($files[0]);

//echo "EN source file date - " . date("F d Y H:i", $sourceFileDate);
//echo "<br>";
//echo "CZ sourcefile date - " . date("d.m.Y H:i", $sourceFileDate);

$data[0] = date("d.m.Y H:i", $sourceFileDate);
$data[1] = date("F d Y H:i", $sourceFileDate);

echo json_encode($data);

?>