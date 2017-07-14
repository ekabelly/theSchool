<?php
// require 'connectionOOP.php';

class Student {
	private $name;
	private $id;
	private $phone;
	private $email;
	private $image;
	private $courses_id;
	static $student;

	public function __construct($courses_id, $name, $phone, $email, $image){
		$this->courses_id = $courses_id;
		$this->name = $name;
		$this->phone = $phone;
		$this->email = $email;
		$this->image = $image;
	}

	public function getStudent(){
		$student1['id'] = $this->id;
		$student1['name'] = $this->name;
		$student1['courses'] = $this->courses;
		$student1['phone'] = $this->phone;
		$student1['email'] = $this->email;
		$student1['image'] = $this->image;
		$student1['courses_id'] = $this->courses_id;
		return $student1;
	}

	public function getStudentDB($id){
		if ($id == 0) {
			$sql = "select * from students";
		}else{$sql = "select * from students where id = $id";}
		$result = conn($sql);
		$row = mysqli_fetch_assoc($result);
		if ($id == 0) {
			$students = [];
			while($row){
				array_push($students, $row);
				$row = mysqli_fetch_assoc($result);
			}
		}
		include 'release.php';
		Database::close();
		if ($id == 0) {
			return $students;
		}
		return $row;

	}

	// public function getAllStudentsDB(){
	// 	$sql = "select * from students";
	// 	$result = conn($sql);
	// 	$row = mysqli_fetch_row($result);
	// 	$students = [];
	// 	while($row){
	// 		array_push($students, $row);
	// 		$row = mysqli_fetch_assoc($result);
	// 	}
	// 	include 'release.php';
	// 	Database::close();
	// 	return $students;
	// }

	public function getId(){
		return $this->id;
	}

	public function sendToDB(){
		$name = $this->name;
		$courses_id = $this->courses_id;
		$phone = $this->phone;
		$email = $this->email;
		$image = $this->image;
		$sql = "INSERT INTO students(name, phone, email, image, courses_id) VALUES ('$name', '$phone', '$email', '$image', '$courses_id')";
		$result = conn($sql);
		Database::close();
		if ($result) {
			return true;
		}else{ return false;}
		Database::close();
	}
}


// $courses_id = ['1', '2'];
// $ido = new Student($courses_id, 'ido', '3243', 'erew@ewrr', 'fdsfds');

// $student = Student::getStudentDB(0);
// var_dump($student);
// echo $student['name']." ".$student['id'];

?>