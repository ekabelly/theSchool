<?php
if (session_id() == "") {
	session_start();
}
if(isset($_SESSION['username'])){
	echo json_encode($_SESSION);
}else{
	echo json_encode(false);
}
?>