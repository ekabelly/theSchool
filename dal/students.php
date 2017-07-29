<?php
// require 'connectionOOP.php';

class Student {
	private $name;
	private $id;
	private $phone;
	private $email;
	private $image;
	static $student;

	public function __construct($name, $phone, $email, $image){
		$this->name = $name;
		$this->phone = $phone;
		$this->email = $email;
		$this->image = $image;
	}

	public function getStudent(){
		$student1['id'] = $this->id;
		$student1['name'] = $this->name;
		$student1['phone'] = $this->phone;
		$student1['email'] = $this->email;
		$student1['image'] = $this->image;
		return $student1;
	}

	public function getEmail(){
		return $this->email;
	}

	public function getStudentDB($id){
		if ($id == 0) {
			$sql = "SELECT * FROM students";
		}else{$sql = "SELECT * FROM students where id = '$id'";}
		$result = conn($sql);
		$row = mysqli_fetch_assoc($result);
		if ($id == 0) {
			$students = [];
			while($row){
				$row['courses'] = Student::getCourseListForStudent($row['id']);
				array_push($students, $row);
				$row = mysqli_fetch_assoc($result);
			}
		}
		include 'release.php';
		Database::close();
		if ($id == 0) {
			return $students;
		}
		$row['courses'] = Student::getCourseListForStudent($row['id']);
		return $row;
	}

	public function getCourseListForStudent($id){
		$sql = "SELECT course.name, course.id FROM enrollment inner JOIN course on enrollment.course_id = course.id where enrollment.student_id = '$id'";
		$result = conn($sql);
		$row = mysqli_fetch_row($result);
		$courses = [];
		while($row){
			array_push($courses, $row);
			$row = mysqli_fetch_row($result);
		}
		include 'release.php';
		Database::close();
		return $courses;
	}

	public function getId($email){
		$sql = "select id from students where email = '$email'";
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
		$sql = "INSERT INTO students(name, phone, email, image) VALUES ('$name', '$phone', '$email', '$image')";
		$result = conn($sql);
		Database::close();
		return $result;
	}
}

?>