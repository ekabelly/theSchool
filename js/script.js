//---init session

$.ajax({
    dataType:'json',
    url:'dal/session.php',
    type:'POST'
  }).done(function(data){
    if (!data) {
      window.location.href="login.html";
    }else{
      $('body').show();
      console.log("welcome "+data);
    }
  }).fail(function(err){
    console.log(err);
});

$(document).ready(function(){

  function display(someHtmlObj){
  if($(someHtmlObj).css('display') == 'none'){
      return true;
    }else{return false;}

}

  //--------students get
var allStudents;
var allCourses;

   $.ajax({
        dataType:'json',
        url:'dal/main.php?students=0',
        type: 'GET',
      }).done(function(data){
        $('#defualtContainer').append("<h3 class='welcomeMessege'> the school has "+data.length+" students");
        data.forEach(function(user){
          // console.log(user);
          var id = user['id'];
          var name = user['name'];
          var image = user['image'];
          var phone = user['phone'];
            $('#studentsUl').append("<li class='studentsLi' value="+id+"><img  class='studentPhoto' src="+image+"><ul style='display:inline;' class='studentUl'><li> "+id+" "+name+" <li> "+phone);
        });
        $('.studentsLi').click(function(e){
          var studentId = $(e.target).parents('.studentsLi').val();
            // console.log($(e.target).parents('.studentsLi').val());
            // console.log(data);
            $.each(data, function(i, val){
              // console.log(data[i]['id']);
              if (studentId == data[i]['id']) {
                theStudent = data[i];
              }
            });
           $('#selectedStudentDescription').show();
          $('#newCourse').hide();
          $('#selectedCourseDescription').hide();
          $('#newStudent').hide();
          $('#defualtContainer').toggle(display("#selectedStudentDescription"));
          console.log(theStudent['name']);
          $('.selectedStudentName').html(theStudent['name']);
          $('.selectedstudentDescription').empty().append("<p>"+theStudent['phone']+"<br><p>"+theStudent['email']);
          $('.selectedStudentPhoto').attr('src', theStudent['image']);
          var courses = theStudent['courses_id'].split(",");
          $('.selectedStudentCoursesUl').empty();
          $.each(courses, function(i, val){
            $('.selectedStudentCoursesUl').append("<li>"+val);
          }); 
        });
      }).fail(function(err){
        console.log(err);
      });

//---------- student main container

  $('#studentsBtn').click(function(){
    showNewStudentPage();
  });

  function showNewStudentPage(){
    console.log('toggle');
    $('.note').empty();
    $('#newCourse').hide();
    $('#selectedCourseDescription').hide();
    $('#selectedStudentDescription').hide();
    $('#newStudent').toggle();
    $('#defualtContainer').toggle(display("#newStudent"));
  }

//-------------------save new student

  $('#newStudentBtn').click(function(){
    $('.note').empty();
    var name = $('#newStudentName').val();
    var phone = $('#newStudentPhone').val();
    var email = $('#newStudentEmail').val();
    var image = $('#newStudentImage').val();
    var courses = coursesCheckboxes();
    courses = courses.toString();
    console.log(courses);
    // console.log(name, email);
    if (name == "" || email == "") {
      console.log("empty input");
      $('.note').append("<br><p> please fill a name & an email");
      return ;
    }
    $.ajax({
      dataType: 'json',
      url:'dal/main.php?studentName='+name+'&email='+email+'&phone='+phone+'&studentImage='+image+'&courses_id='+courses,
      type: 'GET',
    }).done(function(data){
      // console.log(data);
      // if (data) {
      //   console.log("new student added");
      // }
      $('#newStudentName').val('');
      $('#newStudentPhone').val('');
      $('#newStudentEmail').val('');
      $('#newStudentImage').val('');
    }).fail(function(err){
      console.log(err);
    });
  });

function coursesCheckboxes(){
  var courses = [];
  $.each($('input[type=checkbox]'), function(i, val){
    if ($(this).prop("checked")) {
      console.log("checked "+$(this).val());
      courses.push($(this).val());
    }
  });
  return courses;
}

    //------------delete student
  $('#studentDeleteBtn').click(function(){
    var id = $('#studentIdDelete').val();
    if (!id) {console.log("please fill in an id");
    return;}
     $.ajax({
      dataType: 'json',
      url:'dal/main.php?deleteStudent='+id,
      type:'GET',
    }).done(function(data){
      console.log(data);
      $('#studentIdDelete').val('');
    }).fail(function(err){
      console.log(err);
   });
  });

//------courses get

      $.ajax({
        dataType:'json',
        url:'dal/main.php?courses=0',
        type: 'GET',
      }).done(function(data){
        var allCourses = data;
        data.forEach(function(course){
          // console.log(course);
          var id = course['id'];
          var name = course['name'];
          var image = course['image'];
            $('.coursesUl').append("<li class='courseLi' value="+id+"><img  class='coursePhoto' src="+image+"><ul style='display:inline;' class='courseUl'><li> "+id+" "+name);
        });
        $('.welcomeMessege').append(" and "+data.length+" courses");
        
//------------click on courseLi

        $('.courseLi').click(function(e){
          var courseId = $(e.target).parents('.courseLi').val();
            console.log(courseId);
            $.each(data, function(i, val){
              if (courseId == data[i]['id']) {
                theCourse = data[i];
              }
            });
            
          //----------show selected course
          var studentsArr = showSelectedCourse(theCourse);
          function showSelectedCourse(theCourse){
            $('#selectedCourseDescription').show();
            $('#newCourse').hide();
            $('#selectedStudentDescription').hide();
            $('#newStudent').hide();
            $('#defualtContainer').toggle(display("#selectedCourseDescription"));
            console.log(theCourse['name']);
            $('.selectedCourseName').html(theCourse['name']);
            $('.selectedCourseDescription').empty().append("<p>"+theCourse['description']);
            $('.selectedCoursePhoto').attr('src', theCourse['image']);
            var studentsArr = theCourse['students_id'].split(",");
            $('.selectedCourseStudentsUl').empty();
            if (studentsCount(studentsArr) > 0) {
              $.each(studentsArr, function(i, val){
                $('.selectedCourseStudentsUl').append("<li>"+val);
              });
            } return studentsArr;
          }
           
            //-----------------edit course

            $('.selectedCourseEdit').click(function(){
              selectedCourseEdit(theCourse, studentsArr);
            });

            function selectedCourseEdit(theCourse, studentsArr){
              $('.deleteCourseSpan').hide();
              if (studentsCount(studentsArr) == 0) {$('.deleteCourseSpan').show();}
              $('#editCourseBtn').show();
              $('#newCourseBtn').hide();
              showNewCourseContainer();
              updateCourseInputs(theCourse);
              $('.selectedCourseStudentsP').empty();
              $('.selectedCourseStudentsP').append("<p> there are "+studentsCount(studentsArr)+" students attending this course");
            }

            function studentsCount(studentsArr){
              if (studentsArr[0] == ''){
                return 0;
              }else{return studentsArr.length;}
            }
        });
        appendCourses(data);
      }).fail(function(err){
        console.log(err);
      });

//---------------append courses to new student form

function appendCourses(courses){
  $.each(courses, function(i, val){
    $('.coursesCheckbox').append("<label class='checkbox-inline'><input type='checkbox' value="+val['name']+" >"+val['name']+"</label>");
  });
}

//-------------- show course description

//       function toggleSelectedCourse(e){
//           console.log("courseLi click");
//           $('#selectedCourseDescription').toggle();
//           $('#newCourse').hide();
//           $('#selectedStudentDescription').hide();
//           $('#newStudent').hide();
//           $('#defualtContainer').toggle(display("#selectedCourseDescription"));
//         }
//--------------course main container

  $('#coureBtn').click(function(){
    $('.deleteCourseSpan').hide();
    $('#editCourseBtn').hide();
    $('.welcomeMessege').hide();
    $('#newCourseBtn').show();
    updateCourseInputs('');
    showNewCourseContainer();
  });

  function showNewCourseContainer(){
    console.log('toggle');
    $('.note').empty();
    $('#newStudent').hide();
    $('#selectedCourseDescription').hide();
    $('#selectedStudentDescription').hide();
    $('#newCourse').show();
  }


  //-------------------save new course

  $('#newCourseBtn').click(function(){
      makeNewCourse('makenew');
  });

  $('#editCourseBtn').click(function(){
    makeNewCourse('update');
  });

  function updateCourseInputs(course){
    if (course == '') {
      var name = '';
      var description = '';
      var image = '';
    }else{
      var id = course['id'];
      var name = course['name'];
      var description = course['description'];
      var image = course['image'];
      $('#courseIdDelete').val(id);
    }
    $('#newCourseName').val(name);
    $('#newCourseDiscription').val(description);
    $('#newCourseImage').val(image);
  }

  function makeNewCourse(order){
    $('.note').empty();
    var name = $('#newCourseName').val();
    var description = $('#newCourseDiscription').val();
    var image = $('#newCourseImage').val();
    var url = 'dal/main.php?courseName='+name+'&description='+description+'&courseImage='+image;
    if(order == 'update'){
      var id = $('#courseIdDelete').val();
      console.log(id);
      url = 'dal/main.php?id='+id+'&courseName='+name+'&description='+description+'&courseImage='+image;
    }
    if (name == "") {
      console.log("empty input");
      $('.note').append("<br><p> please fill the relevant inputs");
      return;
    }
    $.ajax({
      dataType: 'json',
      url: url,
      type: 'GET',
    }).done(function(data){
      console.log(data);
      var theCourse = [];
      theCourse['name'] = name;
      theCourse['description'] = description;
      theCourse['image'] = image;
      showSelectedCourse(theCourse);
      function showSelectedCourse(theCourse){
            $('#selectedCourseDescription').show();
            $('#newCourse').hide();
            $('#selectedStudentDescription').hide();
            $('#newStudent').hide();
            $('#defualtContainer').toggle(display("#selectedCourseDescription"));
            console.log(theCourse['name']);
            $('.selectedCourseName').html(theCourse['name']);
            $('.selectedCourseDescription').empty().append("<p>"+theCourse['description']);
            $('.selectedCoursePhoto').attr('src', theCourse['image']);
            $('.selectedCourseStudentsUl').empty();
            $('.selectedCourseStudentsP').append("there are 0 students attending this course");
          }

      $('.selectedCourseEdit').click(function(){
              selectedCourseEdit(theCourse);
            });

            function selectedCourseEdit(theCourse){
              $('.deleteCourseSpan').show();
              $('#editCourseBtn').show();
              $('#newCourseBtn').hide();
              showNewCourseContainer();
              updateCourseInputs(theCourse);
              $('.selectedCourseStudentsP').empty();
              $('.selectedCourseStudentsP').append("<p> there are 0 students attending this course");
            }
function updateCourseInputs(course){
      var name = course['name'];
      var description = course['description'];
      var image = course['image'];    
    $('#newCourseName').val(name);
    $('#newCourseDiscription').val(description);
    $('#newCourseImage').val(image);
  }

    }).fail(function(err){
      console.log(err);
    });
  }

  //------------delete course
  $('#courseDeleteBtn').click(function(){
    $('.note').empty();
    console.log($('#courseIdDelete').val());
    if ($('#courseIdDelete').val() == '') {
      $('.note').append("<br><p> please fill the relevant inputs");
      console.log("please fill in an id");
      return;
    }
    if (!confirm("are you sure you want to delete that course?")) {
      return;
    }
     $.ajax({
      dataType: 'json',
      url:'dal/main.php?deleteCourse='+$('#courseIdDelete').val(),
      type:'GET',
    }).done(function(data){
      console.log(data);
      if (data) {
        findAndHideCourseLi($('#courseIdDelete').val());

      }
      $('#courseIdDelete').val('');

      function findAndHideCourseLi(id){
        $(".courseLi[value="+id+"]").hide();
      }

    }).fail(function(err){
      console.log(err);
   });
  });

});
