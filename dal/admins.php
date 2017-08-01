<?php

class admin {
	private $name;
	private $id;
	private $phone;
	private $email;
	private $image;
	private $role;
	private $pass;
	static $admin;

	public function __construct($name, $role, $phone, $email, $image, $pass){
		$this->name = $name;
		$this->role = $role;
		$this->phone = $phone;
		$this->email = $email;
		$this->image = $image;
		$this->pass = $pass;
	}

	public function getAdmin(){
		$admin1['id'] = $this->id;
		$admin1['name'] = $this->name;
		$admin1['phone'] = $this->phone;
		$admin1['email'] = $this->email;
		$admin1['image'] = $this->image;
		$admin1['role'] = $this->image;
		return $admin1;
	}

	public function getEmail(){
		return $this->email;
	}

	public function getAdminsDB($id){
		if ($id == 0) {
			$sql = "SELECT * FROM admin";
		}else{$sql = "SELECT * FROM admin where id = '$id'";}
		$result = conn($sql);
		$row = mysqli_fetch_assoc($result);
		if ($id == 0) {
			$admins = [];
			while($row){
				array_push($admins, $row);
				$row = mysqli_fetch_assoc($result);
			}
		}
		include 'release.php';
		Database::close();
		if ($id == 0) {
			return $admins;
		}
		return $row;
	}

	public function getId($email){
		$sql = "select id from admin where email = '$email'";
		$result = conn($sql);
		$row = mysqli_fetch_row($result);
		include 'release.php';
		Database::close();
		return $row[0];
	}

	public function sendToDB(){
		$name = $this->name;
		$phone = $this->phone;
		$email = $this->email;
		$image = $this->image;
		$role = $this->role;
		$pass = $this->pass;
		$sql = "INSERT INTO admin(name, role, phone, email, image, password) VALUES ('$name', '$role', '$phone', '$email', '$image', '$pass')";
		$result = conn($sql);
		Database::close();
		return $result;
	}
}

?>