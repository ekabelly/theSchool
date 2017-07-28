 delete course btn
 //     $('.note').empty();
  //     var idInput = '#'+var+'IdDelete';
  //     console.log($('#courseIdDelete').val());
  //     if ($(idInput).val() == '') {
  //           $('.note').append("<br><p> please fill the relevant inputs");
  //           console.log("please fill in an id");
  //           return;
  //     }
  //   }
  //    $.ajax({
  //     dataType: 'json',
  //     url:'dal/main.php?delete'+var+'='+$('#courseIdDelete').val(),
  //     type:'GET',
  //   }).done(function(data){
  //     console.log(data);
  //     if (data) {
  //       findAndHideCourseLi($('#courseIdDelete').val());

  //     }
  //     $('#courseIdDelete').val('');
  //   }).fail(function(err){
  //     console.log(err);
  //  });

  // function studentsCount(studentsArr){    ///--------- may delete
//     if (studentsArr[0] == ''){
//       return 0;
//     }else{return studentsArr.length;}
// }

//-------------- show course description ------ may delete

//       function toggleSelectedCourse(e){
//           console.log("courseLi click");
//           $('#selectedCourseDescription').toggle();
//           $('#newCourse').hide();
//           $('#selectedStudentDescription').hide();
//           $('#newStudent').hide();
//           $('#defualtContainer').toggle(display("#selectedCourseDescription"));
//         }


//----------show selected course
          
// function showSelectedCourse(theItem, itemNameLo, itemNameUp){
//   if (itemNameLo == "course") {
//     $('#selectedStudentDescription').show();
//     $('#selectedCourseDescription').hide();
//     $('#defualtContainer').toggle(display("#selectedStudentDescription"));
//   }
//   if (itemNameLo =="student") {
//     $('#selectedCourseDescription').show();
//     $('#selectedStudentDescription').hide();
//     $('#defualtContainer').toggle(display("#selectedCourseDescription"));
//   }
//   $('#newCourse').hide();
//   $('#newStudent').hide();
//   console.log(theItem['name']);
//   $('.selected'+itemNameUp+'Name').html(theItem['name']);
//   $('.selected'+itemNameUp+'Description').empty().append("<p>"+theItem['description']);
//   // if (theItem['students_id']) {
//   //   // console.log("appending students");
//   //   $('.selectedCoursePhoto').attr('src', theItem['image']);
//   // }
//   //-----------------------------stopped here
//   $('.selectedCourseStudentsUl').empty();
//   if (theItem['students_id'].length != 0) {
//     appendItemListToSelectedItem(theItem, "course", "students");
//   }
//   $('.selectedCourseEdit').click(function(){ //---------click edit
//     selectedCourseEdit(theItem);
//   });
// }

delete student
   //  var id = $('#studentIdDelete').val();
   //  if (!id) {console.log("please fill in an id");
   //  return;}
   //   $.ajax({
   //    dataType: 'json',
   //    url:'dal/main.php?deleteStudent='+id,
   //    type:'GET',
   //  }).done(function(data){
   //    console.log(data);
   //    $('#studentIdDelete').val('');
   //  }).fail(function(err){
   //    console.log(err);
   // });

   student li clicked

             // var studentId = $(e.target).parents('.studentsLi').val();
          //   // console.log($(e.target).parents('.studentsLi').val());
          //   // console.log(data);
          //   $.each(data, function(i, val){
          //     // console.log(data[i]['id']);
          //     if (studentId == data[i]['id']) {
          //       theStudent = data[i];
          //     }
          //   });
          //  $('#selectedStudentDescription').show();
          // $('#newCourse').hide();
          // $('#selectedCourseDescription').hide();
          // $('#newStudent').hide();
          // $('#defualtContainer').toggle(display("#selectedStudentDescription"));
          // console.log(theStudent['name']);
          // $('.selectedStudentName').html(theStudent['name']);
          // $('.selectedstudentDescription').empty().append("<p>"+theStudent['phone']+"<br><p>"+theStudent['email']);
          // $('.selectedStudentPhoto').attr('src', theStudent['image']);
   
          // }); 

//           function appendCourses(allCourses){
//   allCourses.forEach(function(course){
//     // console.log(course);
//     var id = course['id'];
//     var name = course['name'];
//     var image = course['image'];
//     $('.coursesUl').append("<li class='courseLi' value="+id+"><img  class='coursePhoto' src="+image+"><ul style='display:inline;' class='courseUl'><li> "+id+" "+name);
//   });
//   createWelcomeMessege(allItems, itemNameLo);
// }

// function selectedCourseEdit(theCourse){
//   $('.deleteCourseSpan').hide();
//   // console.log()
//     if (theCourse['students_id'] == "") {$('.deleteCourseSpan').show();}
//       $('#editCourseBtn').show();
//       $('#newCourseBtn').hide();
//       showNewCourseContainer();
//       updateCourseInputs(theCourse);
//       HowManyItemsOnEdit(theCourse);
//   }

// function courseClicked(e){
//   var courseId = $(e.target).parents('.courseLi').val();
//   console.log(courseId);
//   var theCourse = {};
//   $.each(allCourses, function(i, val){
//     if (courseId == allCourses[i]['id']) {
//       theCourse = allCourses[i];
//     }
//   });        
//   showSelectedItem(theCourse, "course", "Course");
// }

  // function updateCourseInputs(course){
  //     var id = course['id'];
  //     var name = course['name'];
  //     var description = course['description'];
  //     var image = course['image'];
  //     $('#courseIdDelete').val(id);
  //   // }
  //   $('#newCourseName').val(name);
  //   $('#newCourseDiscription').val(description);
  //   $('#newCourseImage').val(image);
  // }

  // newCourseBtn

  //     $('.note').empty();
  //   var name = $('#newStudentName').val();
  //   var phone = $('#newStudentPhone').val();
  //   var email = $('#newStudentEmail').val();
  //   var image = $('#newStudentImage').val();
  //   var courses = coursesCheckboxes();
  //   courses = courses.join(", ");
  //   console.log(courses);
  //   // console.log(name, email);
  //   if (name == "" || email == "") {
  //     console.log("empty input");
  //     $('.note').append("<br><p> please fill a name & an email");
  //     return ;
  //   }
  //   $.ajax({
  //     dataType: 'json',
  //     url:'dal/main.php?studentName='+name+'&email='+email+'&phone='+phone+'&studentImage='+image+'&courses_id='+courses,
  //     type: 'GET',
  //   }).done(function(data){
  //     // console.log(data);
  //     if (data) {
  //       console.log("init new student");
  //       initNewStudent();
  //     }
  //   }).fail(function(err){
  //     console.log(err);
  //   });

  sudents get

     // allStudents = data;
        // $('#defualtContainer').append("<h3 class='welcomeMessege'> the school has "+data.length+" students");
        // data.forEach(function(user){
        //   // console.log(user);
        //   var id = user['id'];
        //   var name = user['name'];
        //   var image = user['image'];
        //   var phone = user['phone'];
        //     $('#studentsUl').append("<li class='studentLi' value="+id+"><img  class='studentPhoto' src="+image+"><ul style='display:inline;' class='studentUl'><li> "+id+" "+name+" <li> "+phone);
        // });
        // $('.studentLi').click(function(e){
        //   itemClicked(e, "student", "Student");
        // });