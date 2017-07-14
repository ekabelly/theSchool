$(document).ready(function(){

  //--------students get
   $.ajax({
        dataType:'json',
        url:'dal/main.php?students=0',
        type: 'GET',
      }).done(function(data){
        $('#defualtContainer').append("<h3 class='welcomeMessege'> the school has "+data.length+" students");
        data.forEach(function(user){
          console.log(user);
          var id = user['id'];
          var name = user['name'];
          var image = user['image'];
          var phone = user['phone'];
            $('#studentsUl').append("<li class='studentsLi'><img  class='studentPhoto' src="+image+"><ul style='display:inline;' class='studentUl'><li> "+id+" "+name+" <li> "+phone);
        });
        $('.studentsLi').click(function(){
          $('#selectedStudentDescription').toggle();
          $('#newCourse').hide();
          $('#courseDescription').hide();
          $('#newStudent').hide();
          $('#defualtContainer').toggle(display("#selectedStudentDescription"));
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
        var allCourses = data;
        data.forEach(function(course){
          console.log(course);
          var id = course['course_id'];
          var name = course['name'];
          var image = course['photo'];
            $('.coursesUl').append("<li class='courseLi'><img  class='coursePhoto' src="+image+"><ul style='display:inline;' class='courseUl'><li> "+id+" "+name);
        });
        $('.welcomeMessege').append(" and "+data.length+" courses");
        $('.courseLi').click(function(){
          console.log("courseLi click");
          $('#courseDescription').toggle();
          $('#newCourse').hide();
          $('#selectedStudentDescription').hide();
          $('#newStudent').hide();
          $('#defualtContainer').toggle(display("#courseDescription"));
        });
      }).fail(function(err){
        console.log(err);
      });
//--------------course main container

  $('#coureBtn').click(function(){
    console.log('toggle');
    $('#newStudent').hide();
    $('#courseDescription').hide();
    $('#selectedStudentDescription').hide();
    $('#newCourse').toggle();
    $('#defualtContainer').toggle(display("#newCourse"));
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
    $('#courseDescription').hide();
    $('#selectedStudentDescription').hide();
    $('#newStudent').toggle();
    $('#defualtContainer').toggle(display("#newStudent"));
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

function display(display){
  if($(display).css('display') == 'none'){
      return true;
    }else{return false;}

}

  });