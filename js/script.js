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
var allStudents = {};
   $.ajax({
        dataType:'json',
        url:'dal/main.php?students=0',
        type: 'GET',
      }).done(function(data){
        allStudents = data;
        $('#defualtContainer').append("<h3 class='welcomeMessege'> the school has "+data.length+" students");
        data.forEach(function(user){
          // console.log(user);
          var id = user['id'];
          var name = user['name'];
          var image = user['image'];
          var phone = user['phone'];
            $('#studentsUl').append("<li class='studentLi' value="+id+"><img  class='studentPhoto' src="+image+"><ul style='display:inline;' class='studentUl'><li> "+id+" "+name+" <li> "+phone);
        });
        $('.studentLi').click(function(e){
          itemClicked(e, "student", "Student");
        });
      }).fail(function(err){
        console.log(err);
      });

//---------------append courses to new student form

function appendCoursesToStudent(courses){
  $('.coursesCheckbox').empty();
  $.each(courses, function(i, val){
    $('.coursesCheckbox').append("<label class='checkbox-inline'><input type='checkbox' value="+val['name']+" >"+val['name']+"</label>");
  });
}

//---------- student main container

  $('#studentsBtn').click(function(){
    showNewStudentPage();
  });

  function showNewStudentPage(){
    console.log('toggle');
    $('.note').empty();
    $('#newCourse').hide();
    $('#defualtContainer').hide();
    $('#selectedCourseDescription').hide();
    $('#selectedStudentDescription').hide();
    $('#newStudent').show();
    appendCoursesToStudent(allCourses);
    // $('#defualtContainer').toggle(display("#newStudent"));
  }
//-------------------save new student

  $('#newStudentBtn').click(function(){
    $('.note').empty();
    var name = $('#newStudentName').val();
    var phone = $('#newStudentPhone').val();
    var email = $('#newStudentEmail').val();
    var image = $('#newStudentImage').val();
    var courses = coursesCheckboxes();
    courses = courses.join(", ");
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
      if (data) {
        console.log("init new student");
        initNewStudent();
      }
    }).fail(function(err){
      console.log(err);
    });
  });

  function initNewStudent(theStudent){
    showNewMadeItem("student", "Student");
    // appendItemToList(theStudent, "student");
  }

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
      deleteVar("student", "Student");
  });
//------courses get
var allCourses = {};

      $.ajax({
        dataType:'json',
        url:'dal/main.php?courses=0',
        type: 'GET',
      }).done(function(data){
        allCourses = data;
        console.log(data);
        initCourses(allCourses);
      }).fail(function(err){
        console.log(err);
      });

function initCourses(allCourses){
  appendAllItemsToList(allCourses, "course");
  $('.courseLi').click(function(e){
    itemClicked(e, "course", "Course");
  });
}

function itemClicked(e, itemNameLo, itemNameUp){
  var itemId = $(e.target).parents('.'+itemNameLo+'Li').val();
  // console.log("item id "+itemId);
  var theItem = {};
  if (itemNameLo == "course") {
    var allItems = allCourses; 
  }
  if (itemNameLo == "student") {
    var allItems = allStudents;
  }
  $.each(allItems, function(i, val){
    if (itemId == allItems[i]['id']) {
      theItem = allItems[i];
      // console.log(theItem);
    }
  });
  // console.log("the item "+theItem);
  showSelectedItem(theItem, itemNameLo, itemNameUp);
}

//-----------------edit course

function selectedItemEdit(theItem, itemNameLo,itemNameUp){
  if (itemNameUp == "Course") {
    $('.delete'+itemNameUp+'Span').hide();
    showNewCourseContainer();
    if (theItem['students_id'] == "") {$('.deleteCourseSpan').show();}
  }
  if (itemNameLo == "student") {
    $('.delete'+itemNameUp+'Span').show();
    showNewStudentPage();
  }
  $('#edit'+itemNameUp+'Btn').show();
  $('#new'+itemNameUp+'Btn').hide();
  updateItemInputs(theItem, itemNameLo, itemNameUp);
  if (itemNameLo == "course") {
    HowManyItemsOnEdit(theItem);
  }
}

function HowManyItemsOnEdit(theItem){
  $('.selectedCourseStudentsP').empty();
      var list = theItem['students_id'].split(", ");
      listLength = list.length;
      if (list[0] == "") {listLength = 0;}
      $('.selectedCourseStudentsP').append("<p> there are "+listLength+" students attending this course");
}

//--------------append courses list after ajax

function appendAllItemsToList(allItems, itemNameLo){
  $.each(allItems, function(i, val){
    appendItemToList(val, itemNameLo);
  });
  createWelcomeMessege(allItems, itemNameLo);
}

function appendItemToList(theItem, itemNameLo){
    var id = theItem['id'];
    var name = theItem['name'];
    var image = theItem['image'];
  $('.'+itemNameLo+'sUl').append("<li class='"+itemNameLo+"Li' value="+id+"><img  class='"+itemNameLo+"Photo' src="+image+"><ul style='display:inline;' class='"+itemNameLo+"Ul'><li> "+id+" "+name);
}

function createWelcomeMessege(allItems, itemNameLo){
  var append = "";
  if (itemNameLo == "course") {
    append = " and "+allItems.length+" courses";
  }
  if (itemNameLo == "student") {
    append = "the school has "+allitems.length+"students";
  }
   $('.welcomeMessege').append(append);
}

function showSelectedItem(theItem, itemNameLo, itemNameUp){
  if (itemNameLo == "course") {
    $('#selectedStudentDescription').hide();
    $('#selectedCourseDescription').show();
    // $('#defualtContainer').toggle(display("#selectedCourseDescription"));
    $('')
    // if (theItem['students_id'].length != 0) {
      appendItemListToSelectedItem(theItem, "course", "students");
    // }
    var description = "<p>"+theItem['description'];
  }
  if (itemNameLo =="student") {
    // console.log("itemNameLo = student");
    $('#selectedCourseDescription').hide();
    $('#selectedStudentDescription').show();
    // if (theItem['courses_id'].length != 0) {
      appendItemListToSelectedItem(theItem, "student", "courses");
    // }
    var description = "<p>"+theItem['phone']+"<p>"+theItem['email'];
  }
   $('#defualtContainer').toggle(display("#selected"+itemNameUp+"Description"));
  $('#newCourse').hide();
  $('#newStudent').hide();
  console.log(theItem['name']);
  $('.selected'+itemNameUp+'Name').html(theItem['name']);
  $('.selected'+itemNameUp+'Description').empty().append(description);
  $('.selected'+itemNameUp+'Edit').click(function(){ //---------click edit
    selectedItemEdit(theItem, itemNameLo, itemNameUp);
  });
}

function appendItemListToSelectedItem(theItem, theItemNameLo, theListNameLo){
  var ul = whichUl(theItemNameLo);
  $(ul).empty();
  if (theItem[theListNameLo+'_id']) {
    var list = theItem[theListNameLo+'_id'].split(", ");
    for (var i = list.length - 1; i >= 0; i--) {
    $(ul).append("<li>"+list[i]);
    }
  }
  // console.log(list);
}

function whichUl(theItemNameLo){
    if (theItemNameLo == "student") {
    return ".selectedStudentCoursesUl"
  }
  if (theItemNameLo == "course") {
    return ".selectedCourseStudentsUl"
  }
}
//--------------course main container

  $('#coureBtn').click(function(){
    $('.deleteCourseSpan').hide();
    $('#editCourseBtn').hide();
    $('.welcomeMessege').hide();
    $('#newCourseBtn').show();
    updateItemInputs('');
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

  function updateItemInputs(item, itemNameLo, itemNameUp){
    var id = item['id'];
    var name = item['name'];
    var image = item['image'];
    if (itemNameLo == "student") {
      var phone = item['phone'];
      var email = item['email'];
      $('#new'+itemNameUp+'Email').val(email);
      $('#new'+itemNameUp+'Phone').val(phone)
    }
    if (itemNameLo == "course") {
      var description = item['description'];
      $('#new'+itemNameUp+'Discription').val(description);
    }
    $('#'+itemNameLo+'IdDelete').val(id);
    $('#new'+itemNameUp+'Name').val(name);
    $('#new'+itemNameUp+'Image').val(image);
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
      showNewMadeItem("course", "Course");
    }).fail(function(err){
      console.log(err);
    });
  }

  function showNewMadeItem(itemNameLo, itemNameUp){
    var theItem = {};
      theItem['name'] = $('#new'+itemNameUp+'Name').val();
      theItem['description'] = $('#new'+itemNameUp+'Discription').val();
      theItem['image'] = $('#new'+itemNameUp+'Image').val();
      if (itemNameLo == "course") {
        theItem['students_id'] = "";
      }
      if (itemNameLo == "student") {
        theItem['phone'] = $('#new'+itemNameUp+'Phone').val();
        theItem['email'] = $('#new'+itemNameUp+'Email').val();
        theItem['courses_id'] = coursesCheckboxes().join(", ");
      }
      showSelectedItem(theItem, itemNameLo, itemNameUp);
      appendItemToList(theItem, itemNameLo);
  }

  //------------delete course

function deleteVar(varLower, varUp){
      $('.note').empty();
      var idInput = '#'+varLower+'IdDelete';
      if ($(idInput).val() == ''){
            $('.note').append("<br><p> please fill the relevant inputs");
            return false;
      }
      if (!confirm("are you sure you want to delete that "+varLower+"?")) {
            return false;
      }

      $.ajax({
      dataType: 'json',
      url:'dal/main.php?delete'+varUp+'='+$(idInput).val(),
      type:'GET',
    }).done(function(data){
      if (data) {
            findAndHideVarLi(varLower, $(idInput).val());
      }
    }).fail(function(err){
      console.log(err);
   });     
}

  $('#courseDeleteBtn').click(function(){
      deleteVar("course", "Course");
  });
      function findAndHideVarLi(varLower, id){
            $("."+varLower+"Li[value="+id+"]").hide();
      }
});
