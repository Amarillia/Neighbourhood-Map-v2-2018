<?php
header('Content-type : application/json');
$c = $_GET['a'];
if ($c != ""){
$url = 'https://en.wikipedia.org/w/api.php?action=query&prop=extracts&rvprop=content=rvsection=0format=json&titles='.$c;
} else {
echo "no data received";
}
$handle = fopen($url, "r");
if($handle){
    while(!feof($handle)) {
        $buffer = fgets($handle, 4096);
        echo $buffer;
        }
}
fclose($handle);
?>