<?php

$db = new SQLite3('okcloveskd.db');
// $db->exec("INSERT INTO foo (bar) VALUES ('This is a test')");
ob_start();
$query = $db->query('SELECT * FROM submissions');
var_dump($query);
ob_get_contents();
$dbh = array();
foreach ($query as $row) {
  $dbh[] = $row;
}
echo json_encode($dbh);
