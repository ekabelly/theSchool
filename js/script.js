//---init session

$.ajax({
    dataType:'json',
    url:'dal/session.php',
    type:'POST'
  }).done(function(data){
    if (!data) {
      window.location.href="login.html";
    }else{console.log("welcome"+data['username']);}
  }).fail(function(err){
    console.log(err);
});

$(document).ready(function(){

  function display(display){
  if($(display).css('display') == 'none'){
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
          console.log(user);
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
            //--------put here web worker!!------
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
        });
      }).fail(function(err){
        console.log(err);
      });

//---------- student main container

  $('#studentsBtn').click(function(){
    console.log('toggle');
    $('#newCourse').hide();
    $('#selectedCourseDescription').hide();
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

//------courses get

      $.ajax({
        dataType:'json',
        url:'dal/main.php?courses=0',
        type: 'GET',
      }).done(function(data){
        var allCourses = data;
        data.forEach(function(course){
          console.log(course);
          var id = course['id'];
          var name = course['name'];
          var image = course['image'];
            $('.coursesUl').append("<li class='courseLi'><img  class='coursePhoto' value="+id+" src="+image+"><ul style='display:inline;' class='courseUl'><li> "+id+" "+name);
        });
        $('.welcomeMessege').append(" and "+data.length+" courses");
        $('.courseLi').click(function(e){
          var courseId = $(e.target).parents('.courseLi').val();
            // console.log($(e.target).parents('.studentsLi').val());
            // console.log(data);
            //--------put here web worker!!------
            $.each(data, function(i, val){
              // console.log(data[i]['id']);
              if (courseId == data[i]['id']) {
                var theCourse = data[i];
              }
            });
           $('#selectedCourseDescription').show();
          $('#newCourse').hide();
          $('#selectedCourseDescription').hide();
          $('#newStudent').hide();
          $('#defualtContainer').toggle(display("#selectedCourseDescription"));
          console.log(theCourse['name']);
          $('.selectedCourseName').html(theCourse['name']);
          $('.selectedCourseDescription').empty().append("<p>"+theCourse['phone']+"<br><p>"+theCourse['email']);
          $('.selectedCoursePhoto').attr('src', theCourse['image']);
        });
      }).fail(function(err){
        console.log(err);
      });

//-------------- show course description

      function toggleSelectedCourse(e){
          console.log("courseLi click");
          $('#selectedCourseDescription').toggle();
          $('#newCourse').hide();
          $('#selectedStudentDescription').hide();
          $('#newStudent').hide();
          $('#defualtContainer').toggle(display("#selectedCourseDescription"));
        }
//--------------course main container

  $('#coureBtn').click(function(){
    console.log('toggle');
    $('#newStudent').hide();
    $('#selectedCourseDescription').hide();
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

});
