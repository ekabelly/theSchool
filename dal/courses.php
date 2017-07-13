<?php
// require 'connectionOOP.php';
// include 'students.php';

class Courses {

	private $name;
	private $description;
	private $image;
	private $students_id;
	static $course;

	public function __construct($name, $description, $image, $students_id){
		$this->name = $name;
		$this->description = $description;
		$this->image = $image;
		$this->students_id = $students_id;
	}

	public function sendToDB(){
		$name = $this->name;
		// $students_id = $this->students_id;
		// $students_id = implode(", ", $students_id);
		$description = $this->description;
		$photo = $this->image;
		$sql = "INSERT INTO course(name, description, photo, students_id) VALUES ('$name', '$description', '$photo', '1')";
		$result = conn($sql);
		if ($result) {
			return true;
		}else{ return false;}
		Database::close();
	}

	public function getCoursesDB($id){
		if ($id == 0) {
			$sql = "select * from course";
		}else{$sql = "select * from course where id = $id";}
		$result = conn($sql);
		$row = mysqli_fetch_assoc($result);
		if ($id == 0) {
			$courses = [];
			while($row){
				array_push($courses, $row);
				$row = mysqli_fetch_assoc($result);
			}
		}
		include 'release.php';
		Database::close();
		if ($id == 0) {
			return $courses;
		}
		return $row;

	}
}

// function getCourseDB($id){
// 	$sql = "select * from course where course_id = $id";
// 	$result = conn($sql);
// 	$row = mysqli_fetch_array($result);
// 	include 'release.php';
// 	Database::close();
// 	return $row;
// }
// var_dump(getCourseDB(1));
// $students = explode(", ", getCourseDB(1)['students_id']); echo "<br>";
// $student = Student::getStudentDB($students[0]);
// var_dump($student);

?>