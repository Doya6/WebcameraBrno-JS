<?php

$sourceDir = 'campics';
$targetDir = 'lastpics';
$files = glob($sourceDir .'/*.jpg');

$lastFileDate = "";

usort($files, function($a, $b) {
	return filemtime($a) < filemtime($b);
});

for ($i= 0; $i < 4; $i++) {
	//copy ($files[$i], $targetDir . "/" . strval($i + 1) . ".jpg");
	copy ($files[$i], $targetDir . "/" . strval(time()) . $i . ".jpg");
//	echo $files[$i] . "<br>";
}

//echo "<br>";

$targetFileDate = filemtime($targetDir . "/" . "1.jpg");
$sourceFileDate = filemtime($files[0]);

//echo "EN target file date - " . date("F d Y H:i", $targetFileDate);
//echo "<br>";
//echo "CZ target file date - " . date("d.m.Y H:i", $targetFileDate);
//echo "<br>";
//echo "<br>";
//echo "EN source file date - " . date("F d Y H:i", $sourceFileDate);
//echo "<br>";
//echo "CZ sourcefile date - " . date("d.m.Y H:i", $sourceFileDate);


$data = date("d.m.Y H:i", $sourceFileDate);

echo json_encode($data);

?>