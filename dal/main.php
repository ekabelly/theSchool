<?php
require 'connectionOOP.php';
include 'students.php';
include 'courses.php';
//---init
if (isset($_GET['students'])) {		
	$students = Student::getStudentDB($_GET['students']);
	echo json_encode($students);
}

if (isset($_GET['courses'])) {		
	$courses = Courses::getCoursesDB($_GET['courses']);
	echo json_encode($courses);
}


//----------new course
if (isset($_GET['courseName']) && isset($_GET['description']) && isset($_GET['courseImage'])) {
	$course = new Courses($_GET['courseName'], $_GET['description'], $_GET['courseImage'], "");
	if (isset($_GET['students_id'])) {
		$students_id = $_GET['students_id'];
		$course = new Courses($_GET['courseName'], $_GET['description'], $_GET['courseImage'], $_GET['students_id']);	
	}
	echo json_encode($course->sendToDB());
}

//------------delete course

if (isset($_GET['deleteCourse'])) {
	echo json_encode(deleteCourse($_GET['deleteCourse']));
}

function deleteCourse($id){
	$sql = "delete from course where course_id = '$id'";
	$result = conn($sql);
	if ($result) {
		return true;
	}
	return false;
}

//-------------new student

if (isset($_GET['studentName']) && isset($_GET['email']) && isset($_GET['studentImage'])) {
	$student = new Student("3, 4, 5", $_GET['studentName'], $_GET['email'], $_GET['studentImage'], "");
	if (isset($_GET['courses_id'])) {
		$student = new Student($_GET['courses_id'], $_GET['studentName'], $_GET['email'], $_GET['studentImage']);	
	}
	echo json_encode($student->sendToDB());
}

//------------delete student

if (isset($_GET['deleteStudent'])) {
	echo json_encode(deleteStudent($_GET['deleteStudent']));
}

function deleteStudent($id){
	$sql = "delete from students where id = '$id'";
	$result = conn($sql);
	if ($result) {
		return true;
	}
	return false;
}

// $course = new Courses('bible', '', '1', '');	
// echo $course->sendToDB();
?>