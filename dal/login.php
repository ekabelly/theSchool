<?php
session_start();
require 'connectionOOP.php';
if (isset($_POST['username']) && isset($_POST['pass'])) {
	$username = $_POST['username'];
	$pass = md5($_POST['pass']);
	$sql = "SELECT * FROM admin WHERE name = '$username' and password = '$pass'";
	$result = conn($sql);
	$row = mysqli_fetch_row($result);
	Database::close();
	if (sizeof($row) > 0) {
		$_SESSION['role'] = $row[2];
		$_SESSION['username'] = $username;
		echo json_encode($_SESSION);
	}else{
		echo json_encode(false);
	}
}
?>