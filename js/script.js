$(document).ready(function(){

  //--------students get
   $.ajax({
        dataType:'json',
        url:'dal/main.php?students=0',
        type: 'GET',
      }).done(function(data){
        data.forEach(function(user){
          console.log(user);
          var id = user['id'];
          var name = user['name'];
          var image = user['image'];
          var phone = user['phone'];
            $('#studentsUl').append("<li class='studentsLi'><img  class='studentPhoto' src="+image+"><ul style='display:inline;' class='studentUl'><li> "+id+" "+name+" <li> "+phone);
        });
      }).fail(function(err){
        console.log(err);
      });

//------courses get

      $.ajax({
        dataType:'json',
        url:'dal/main.php?courses=0',
        type: 'GET',
      }).done(function(data){
        data.forEach(function(course){
          console.log(course);
          var id = course['course_id'];
          var name = course['name'];
          var image = course['photo'];
            $('.coursesUl').append("<li class='courseLi'><img  class='coursePhoto' src="+image+"><ul style='display:inline;' class='courseUl'><li> "+id+" "+name);
        });
      }).fail(function(err){
        console.log(err);
      });
//--------------course main container

  $('#coureBtn').click(function(){
    console.log('toggle');
    $('#newStudent').hide();
    $('#newCourse').toggle();
  });

  //-------------------save new course

  $('#newCourseBtn').click(function(){
    $('.note').empty();
    var name = $('#newCourseName').val();
    var description = $('#newCourseDiscription').val();
    var image = $('#newCourseImage').val();
    if (name == "") {
      console.log("empty input");
      $('.note').append("<br><p> please fill the relevant inputs");
      return "";
    }
    $.ajax({
      dataType: 'json',
      url:'dal/main.php?courseName='+name+'&description='+description+'&courseImage='+image,
      type: 'GET',
    }).done(function(data){
      console.log(data);
      if (data) {
      }
      $('#newCourseName').val('');
      $('#newCourseDiscription').val('');
      $('#newCourseImage').val('');
    }).fail(function(err){
      console.log(err);
    });
  });

  //------------delete course
  $('#courseDeleteBtn').click(function(){
    var id = $('#courseIdDelete').val();
     $.ajax({
      dataType: 'json',
      url:'dal/main.php?deleteCourse='+id,
      type:'GET',
    }).done(function(data){
      console.log(data);
      $('#courseIdDelete').val('');
    }).fail(function(err){
      console.log(err);
   });
  });


//---------- student main container

  $('#studentsBtn').click(function(){
    console.log('toggle');
    $('#newCourse').hide();
    $('#newStudent').toggle();
  });

//-------------------save new student

  $('#newStudentBtn').click(function(){
    $('.note').empty();
    var name = $('#newStudentName').val();
    var phone = $('#newStudentPhone').val();
    var email = $('#newstudentEmail').val();
    var image = $('#newstudentImage').val();
    console.log(name, email);
    if (name == "" || email == "") {
      console.log("empty input");
      $('.note').append("<br><p> please fill a name & an email");
      return "";
    }
    $.ajax({
      dataType: 'json',
      url:'dal/main.php?studentName='+name+'&email='+email+'&phone='+phone+'&studentImage='+image,
      type: 'GET',
    }).done(function(data){
      console.log(data);
      // if (data) {
      //   console.log("new student added");
      // }
      $('#newStudentName').val('');
      $('#newStudentPhone').val('');
      $('#newstudentEmail').val('');
      $('#newstudentImage').val('');
    }).fail(function(err){
      console.log(err);
    });
  });

    //------------delete student
  $('#studentDeleteBtn').click(function(){
    var id = $('#studentIdDelete').val();
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


  });