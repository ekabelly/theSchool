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

if (isset($_GET['all'])) {	
	$all = [];	
	$courses = Courses::getCoursesDB($_GET['all']);
	$students = Student::getStudentDB($_GET['all']);
	$all['students'] = $students;
	$all['courses'] = $courses;
	echo json_encode($all);
}


//----------new course & edit course
if (isset($_GET['courseName'])) {
	if (!isset($_GET['id'])) {
		$course = new Courses($_GET['courseName'], $_GET['description'], $_GET['courseImage'], "");
		$course->sendToDB();
		echo json_encode($course);
	}else{
		echo json_encode(updateCourse());
	}	
}

//---------update course
function updateCourse(){
	$id = $_GET['id'];
	$name = $_GET['courseName'];
	$description = $_GET['description'];
	$image = $_GET['courseImage'];
	$sql = "UPDATE course SET id='$id',name='$name',description='$description',image='$image' WHERE id='$id'";
	$result = conn($sql);
	if ($result) {
		return true;
	}
	return false;
}

//------------delete course

if (isset($_GET['deleteCourse'])) {
	echo json_encode(deleteCourse($_GET['deleteCourse']));
}

function deleteCourse($id){
	$sql = "delete from course where id = '$id'";
	$result = conn($sql);
	if ($result) {
		return true;
	}
	return false;
}

//-------------new student and update student

if (isset($_GET['studentName']) && isset($_GET['email'])) {
	if (!isset($_GET['id'])) {
		if (isset($_GET['courses_id'])) {
			$student = new Student($_GET['studentName'], $_GET['phone'], $_GET['email'], $_GET['studentImage'], $_GET['courses_id']);	
		}else{
			$student = new Student($_GET['studentName'], $_GET['phone'], $_GET['email'], $_GET['studentImage'], "");
		}
		echo json_encode($student->sendToDB());
	}else{
		echo json_encode(updateStudent());
	}
}

//-----------update student

function updateStudent(){
	$id = $_GET['id'];
	$name = $_GET['studentName'];
	$phone = $_GET['phone'];
	$email = $_GET['email'];
	$image = $_GET['studentImage'];
	$courses = $_GET['courses_id'];
	$sql = "UPDATE students SET id='$id',name='$name',phone='$phone',email='$email',courses_id='$courses',image='$image' WHERE id='$id'";
	$result = conn($sql);
	if ($result) {
		return true;
	}
	return false;
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