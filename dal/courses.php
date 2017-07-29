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
		$description = $this->description;
		$photo = $this->image;
		$sql = "INSERT INTO course(name, description, image) VALUES ('$name', '$description', '$photo')";
		$result = conn($sql);
		Database::close();
		return $result;
	}

	public function getCoursesDB($id){
		if ($id == 0) {
			$sql = "select * from course";
		}else{$sql = "select * from course where id = $id";}
		$result = conn($sql);
		$row = mysqli_fetch_assoc($result);
		if ($row) {
			$row['students'] = Courses::getStudentListPerCourse($row['id']);
		}
		if ($id == 0) {
			$courses = [];
			while($row){
				array_push($courses, $row);
				$row = mysqli_fetch_assoc($result);
				if ($row) {
					$row['students'] = Courses::getStudentListPerCourse($row['id']);
				}
			}
		}
		include 'release.php';
		Database::close();
		if ($id == 0) {
			return $courses;
		}
		return $row;
	}

public function getStudentListPerCourse($id){
		$sql = "SELECT students.name, students.id FROM enrollment inner JOIN students on enrollment.student_id = students.id where enrollment.course_id = '$id'";
		$result = conn($sql);
		$row = mysqli_fetch_row($result);
		$students = [];
		while($row){
			array_push($students, $row);
			$row = mysqli_fetch_row($result);
		}
		include 'release.php';
		Database::close();
		// print_r($students);
		return $students;
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
}

?>