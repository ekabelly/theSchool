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


//------students main container




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
    $('#newCourse').toggle();
  });

  //-------------------save new course

  $('#newCourseBtn').click(function(){
    var name = $('#newCourseName').val();
    var description = $('#newCourseDiscription').val();
    var image = $('#newCourseImage').val();
    $('.note').empty();
    if (image == "" || name == "") {
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
      console.log(data)
    }).fail(function(err){
      console.log(err)
   });
  });


//   $('.courseLi').click(function(){
//     console.log('toggle');
//     $('#description').append("");
//   });
// });

//---------- student main container

  $('#studentsBtn').click(function(){
    console.log('toggle');
    $('.studentsUl').toggle();
  });

//-------------------save new course

  // $('#studentsBtn').click(function(){
  //   var name = $('#studenteName').val();
  //   var description = $('#newCourseDiscription').val();
  //   var image = $('#newCourseImage').val();
  //   $('.note').empty();
  //   if (image == "" || name == "") {
  //     console.log("empty input");
  //     $('.note').append("<br><p> please fill the relevant inputs");
  //     return "";
  //   }
  //   $.ajax({
  //     dataType: 'json',
  //     url:'dal/main.php?courseName='+name+'&description='+description+'&courseImage='+image,
  //     type: 'GET',
  //   }).done(function(data){
  //     console.log(data);
  //     if (data) {
  //     }
  //   }).fail(function(err){
  //     console.log(err);
  //   });
  // });