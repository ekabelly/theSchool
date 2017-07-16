<?php
if (isset($_POST['username'])) {
	if($_POST['username'] == '1234'){
	echo json_encode(true);
	}else{
	echo json_encode(false);
	}
}
?>