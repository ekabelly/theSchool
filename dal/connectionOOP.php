<?php
class Database {
	private $conn;
	private static $_instance; 
	private $hosr = "localhost";
	private $username = "root";
	private $pass = "";
	private $_db = "school";
	
	public static function getInstance() {
		if(!self::$_instance) { 
			self::$_instance = new self();
		}
		return self::$_instance;
	}//-------------end function-----

	private function __construct() {
		$this->conn = mysqli_connect($this->hosr, $this->username, 
			$this->pass, $this->_db);
	
		if(mysqli_connect_error()) {
			trigger_error("Failed to conencto to MySQL: " . mysql_connect_error(),
				 E_USER_ERROR);
		}
	}//-------------end function-----
	private function __clone() { }
	//-------------end function-----
	public function getConn() {
		return $this->conn;
	}//-------------end function-----

	public function close(){
		unset($connection);
	}//-------------end function-----

}

function conn($sql){
	$db =  Database::getInstance();
	$conn =  $db->getConn();
	$result = mysqli_query($conn, $sql);
	return $result;
}
?>