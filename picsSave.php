<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");


$url_to_image = "http://89.103.181.53:83/image3?res=full&x0=X0&y0=Y0&x1=X1&y1=Y1&quality=21&doublescan=0.jpg";
   $my_save_dir = 'campics/';
   $filename = basename(time() . "_1" . ".jpg");
   $complete_save_loc = $my_save_dir.$filename;
   file_put_contents($complete_save_loc,file_get_contents($url_to_image));
$url_to_image = "http://89.103.181.53:83/image2?res=full&x0=X0&y0=Y0&x1=X1&y1=Y1&quality=21&doublescan=0.jpg";
   $my_save_dir = 'campics/';
   $filename = basename(time() . "_2" . ".jpg");
   $complete_save_loc = $my_save_dir.$filename;
   file_put_contents($complete_save_loc,file_get_contents($url_to_image));
$url_to_image = "http://89.103.181.53:83/image4?res=full&x0=X0&y0=Y0&x1=X1&y1=Y1&quality=21&doublescan=0.jpg";
   $my_save_dir = 'campics/';
   $filename = basename(time() . "_3" . ".jpg");
   $complete_save_loc = $my_save_dir.$filename;
   file_put_contents($complete_save_loc,file_get_contents($url_to_image));
$url_to_image = "http://89.103.181.53:83/image1?res=full&x0=X0&y0=Y0&x1=X1&y1=Y1&quality=21&doublescan=0.jpg";
   $my_save_dir = 'campics/';
   $filename = basename(time() . "_4" . ".jpg");
   $complete_save_loc = $my_save_dir.$filename;
   file_put_contents($complete_save_loc,file_get_contents($url_to_image));

// copy pictures to 'lastpics' dir 

   $sourceDir = 'campics';
   $targetDir = 'lastpics';
   $files = glob($sourceDir .'/*.jpg');
   
   $lastFileDate = "";
   
   usort($files, function($a, $b) {
      return filemtime($a) < filemtime($b);
   });
   
   for ($i= 0; $i < 4; $i++) {
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