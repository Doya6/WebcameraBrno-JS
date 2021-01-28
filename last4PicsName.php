<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

$sourceDir = 'campics';
$targetDir = 'lastpics';
$files = glob($sourceDir .'/*.jpg');

usort($files, function($a, $b) {
	return filemtime($a) < filemtime($b);
});

for ($i= 0; $i < 4; $i++) {

	$data[] = (basename($files[$i]));
}

echo json_encode($data);

?>