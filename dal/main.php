<?php
require 'connectionOOP.php';
include 'students.php';
include 'courses.php';
include 'admins.php';
//---init
if (isset($_GET['students'])) {		
	$students = Student::getStudentDB($_GET['students']);
	echo json_encode($students);
}

if (isset($_GET['courses'])) {		
	$courses = Courses::getCoursesDB($_GET['courses']);
	// print_r($courses);
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
		$course = new Courses($_GET['courseName'], $_GET['description'], $_GET['courseImage']);
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
	Database::close();
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
	Database::close();
	if ($result) {
		return true;
	}
	return false;
}

//-------------new student and update student

if (isset($_GET['studentName']) && isset($_GET['email'])) {
	if (!isset($_GET['id'])) {
			$student = new Student($_GET['studentName'], $_GET['phone'], $_GET['email'], $_GET['studentImage']);
		$result2 = $student->sendToDB();
		$id = $student->getId($student->getEmail());
		echo $id;
		$result = insertCoursesToEnrollment($_GET['courses_id'], $id);
		echo json_encode($result2);
	}else{
		echo json_encode(updateStudent());
	}
}

//--------------------update student on course
if (isset($_GET['coursesUpdate'])) {
	if ($_GET['coursesUpdate'] != []) {
		$result2 = deleteCourses($_GET['coursesUpdate'], $_GET['id']);
	}
	$result1 = insertCoursesToEnrollment($_GET['coursesUpdate'], $_GET['id']);
	echo json_encode($result2);
}

function deleteCourses($coursesId, $studentId){
	$coursesIdList = explode(", ", $coursesId);
	$coursesToDelete = coursesToDelete($coursesIdList, $studentId);
	// print_r($coursesToDelete);
	$result = [];
	foreach ($coursesToDelete as $key => $value) {
		array_push($result, deleteEnrollment($value, $studentId));
	} Database::close();
	return $result;
}

function coursesToDelete($coursesIdList, $studentId){
	$student = Student::getStudentDB($studentId);
	$coursesToDelete = [];
	$flag = true;
	foreach ($student['courses'] as $key => $old) {
		foreach ($coursesIdList as $key => $update) { //-- $update points to an id
			if ($update == $old[1]) { //---------$old is an array [name, id]
				$flag = false;
			}
		}
		if ($flag) {
			array_push($coursesToDelete, $old[1]);
		} $flag = true;
	} return $coursesToDelete;
}

function insertCoursesToEnrollment($coursesId, $studentId){
	$coursesIdList = explode(", ", $coursesId);
	// print_r($coursesIdList);
	$array = [];
	foreach ($coursesIdList as $key => $value) {
		array_push($array, insertACourseIntoEnrollment($value, $studentId));
	} Database::close();
	return $array;
}

function insertACourseIntoEnrollment($course, $studentId){
	$sql = "INSERT INTO enrollment(student_id, course_id) VALUES ('$studentId', '$course')";
	$result = conn($sql);
	return $result;
}

//------------delete enrollment
function deleteEnrollment($courseId, $studentId){
	$sql = "DELETE FROM enrollment WHERE student_id = '$studentId' and course_id = '$courseId'";
	$result = conn($sql);
	return $result;
}

//-----------update student

function updateStudent(){
	$id = $_GET['id'];
	$name = $_GET['studentName'];
	$phone = $_GET['phone'];
	$email = $_GET['email'];
	$image = $_GET['studentImage'];
	$sql = "UPDATE students SET id='$id',name='$name',phone='$phone',email='$email',image='$image' WHERE id='$id'";
	$result = conn($sql);
	Database::close();
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
	Database::close();
	if ($result) {
		return true;
	}
	return false;
}

//-----------------admins

if (isset($_GET['admins'])) {		
	$admins = Admin::getadminsDB($_GET['admins']);
	// print_r($admins);
	echo json_encode($admins);
}


// $course = new Courses('bible', '', '1', '');	
// echo $course->sendToDB();
?>