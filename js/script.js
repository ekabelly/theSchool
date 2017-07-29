//---init session

var user = {};
checkForSession();
function checkForSession(){
  $.ajax({
      dataType:'json',
      url:'dal/session.php',
      type:'POST'
    }).done(function(data){
      if (!data) {
        window.location.href="login.html";
      }else{
        $('body').show();
        console.log("welcome "+data['role']);
        user = data;
        initUserInPage(data);
      }
    }).fail(function(err){
      console.log(err);
  });
}

  //--------init the page depending on user

function initUserInPage(data){
  if (data['role'] == 'sales') {
    $('#adminLink').empty().hide();
  }
  $('#userNavDis').html('welcome, '+data['username']);
}


$(document).ready(function(){

//--------logout

$('#logoutBtn').click(function(){
  logoutClicked();
  window.location.href="login.html";
});

function logoutClicked(){
  $.ajax({
    url:'dal/logout.php',
    type:'POST'
  });
}


  //----------if html obj is showen or hidden
  function display(someHtmlObj){
  if($(someHtmlObj).css('display') == 'none'){
      return true;
    }else{return false;}
}

  //--------students get
var allStudents = {};
var allCourses = {};
initPage();

function initPage(){
  getStudents();
  getCourses();
}

function getStudents(){
   $.ajax({
        dataType:'json',
        url:'dal/main.php?students=0',
        type: 'GET',
      }).done(function(data){
        console.log(data);
        initItems(data, "student", "Student");
        allStudents = data;
      }).fail(function(err){
        console.log(err);
      });
    }

//---------------append courses to new student form

function appendCoursesToStudent(courses){
  $('.coursesCheckbox').empty();
  $.each(courses, function(i, val){
    $('.coursesCheckbox').append("<label class='checkbox-inline'><input type='checkbox' value="+val['name']+" >"+val['name']+"</label>");
  });
}

//---------- student main container

  $('#studentsBtn').click(function(){
    updateItemInputs('','','');
    showNewStudentPage();
    $('.newStudentTitle').html('new student');
    $('.deleteStudentSpan').hide();
  });

  $('#editStudentBtn').click(function(){
    makeNewItem('update', 'student', 'Student');
  });

  function showNewStudentPage(){
    // console.log('toggle');
    $('.note').empty();
    $('#newCourse').hide();
    $('#defualtContainer').hide();
    $('#selectedCourseDescription').hide();
    $('#selectedStudentDescription').hide();
    $('#editStudentBtn').hide();
    $('#newStudentBtn').show();
    $('#newStudent').show();
    appendCoursesToStudent(allCourses);
    // $('#defualtContainer').toggle(display("#newStudent"));
  }
//-------------------save new student

  $('#newStudentBtn').click(function(){
    emptyInputs("student", "Student");
    makeNewItem('new', "student", "Student");
    // showNewMadeItem("student", "Student", "new");
  });

function emptyInputs(itemNameLo, itemNameUp){
    $('.note').empty();
        if ($('#new'+itemNameUp+'Name').val() == "") {
            return messegeForEmptyInput();
        }
        if (itemNameLo == 'student') {
            if ($('#newStudentEmail').val() == "") {
                return messegeForEmptyInput();
            }
        }
        return false;
}

function messegeForEmptyInput(){
    console.log("empty input");
    $('.note').append("<br><p> please fill a name & an email");
    return true;
}

function initNewStudent(theStudent){
  showNewMadeItem("student", "Student", "new");
  appendItemToList(theStudent, "student");
}

function coursesCheckboxes(){
  var courses = [];
  $.each($('input[type=checkbox]'), function(i, val){
    if ($(this).prop("checked")) {
      // console.log("checked "+$(this).val());
      courses.push($(this).val());
    }
  });
  return courses;
}

    //------------delete student
  $('#studentDeleteBtn').click(function(){
      deleteVar("student", "Student");
      showMainContainer();
  });
//------courses get

function getCourses(){
      $.ajax({
        dataType:'json',
        url:'dal/main.php?courses=0',
        type: 'GET',
      }).done(function(data){
        // console.log(data);
        initItems(data, "course", "Course");
        allCourses = data;
      }).fail(function(err){
        console.log(err);
      });
}

function initItems(allItems, itemNameLo, itemNameUp){
  appendAllItemsToList(allItems, itemNameLo);
  $('.'+itemNameLo+'Li').click(function(e){
    itemClicked(e, itemNameLo, itemNameUp, allItems);
  });
}

function itemClicked(e, itemNameLo, itemNameUp, allItems){
  var itemId = $(e.target).parents('.'+itemNameLo+'Li').val();
  console.log("item id "+itemId);
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
    // if (theItem['students_id'] == "") {$('.deleteCourseSpan').show();}
  }
  if (itemNameLo == "student") {
    $('.delete'+itemNameUp+'Span').show();
    showNewStudentPage();
  }
  $('#edit'+itemNameUp+'Btn').show();
  $('#new'+itemNameUp+'Btn').hide();
  // console.log("the item ");
  // console.log(theItem);
  updateItemInputs(theItem, itemNameLo, itemNameUp);
  if (itemNameLo == "course") {
    // console.log(theItem);
    var courses = HowManyCoursesOnEdit(theItem);
    console.log(courses);
    if (courses == 0) {
      $('.delete'+itemNameUp+'Span').show();
    }
  }
}

function HowManyCoursesOnEdit(theItem){
  $('.selectedCourseStudentsP').empty();
      var list = theItem['students'];
      console.log(list);
      var listLength = list.length;
      if (list[0] == "") {listLength = 0;}
      $('.selectedCourseStudentsP').append("<p> there are "+listLength+" students attending this course");
      return listLength;
}

//--------------append list of all courses or students after ajax

function appendAllItemsToList(allItems, itemNameLo){
    $('.'+itemNameLo+'sUl').empty();
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
    append = "<br>"+allItems.length+" courses ";
  }
  if (itemNameLo == "student") {
    append = "<br>"+allItems.length+" students";
  }
   $('.welcomeMessege').append(append);
}

function showSelectedItem(theItem, itemNameLo, itemNameUp){
    $('#newCourse').hide();
    $('#newStudent').hide();
  if (itemNameLo == "course") {
    $('#newCourse').hide();
    $('#newStudent').hide();
    $('#selectedStudentDescription').hide();
    $('#selectedCourseDescription').show();
    // $('#defualtContainer').toggle(display("#selectedCourseDescription"));
      appendItemListToSelectedItem(theItem, "course", "students");
    var description = "<p>"+theItem['description'];
  }
  if (itemNameLo =="student") {
    // console.log("itemNameLo = student");
    $('#selectedCourseDescription').hide();
    $('#selectedStudentDescription').show();
    appendItemListToSelectedItem(theItem, "student", "courses");
    var description = "<p>"+theItem['phone']+"<p>"+theItem['email'];
  }
   $('#defualtContainer').toggle(display("#selected"+itemNameUp+"Description"));
  $('#newCourse').hide();
  $('#newStudent').hide();
  console.log(theItem['name']);
  $('.selected'+itemNameUp+'Name').html(theItem['name']);
  $('.selected'+itemNameUp+'Description').empty().append(description);
  $('.selected'+itemNameUp+'Edit').click(function(){ //---------click edit
    $('.new'+itemNameUp+'Title').html('edit '+itemNameLo);
    selectedItemEdit(theItem, itemNameLo, itemNameUp);
  });
}

function appendItemListToSelectedItem(theItem, theItemNameLo, theListNameLo){
  var ul = whichUl(theItemNameLo);
  $(ul).empty();
  // console.log(theItem);
  if (theItem[theListNameLo]) {
    var list = theItem[theListNameLo];
    for (var i = list.length - 1; i >= 0; i--) {
    $(ul).append("<li>"+list[i][0]);
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

  $('#courseBtn').click(function(){
    $('.deleteCourseSpan').hide();
    $('#editCourseBtn').hide();
    $('.welcomeMessege').hide();
    $('#newCourseBtn').show();
    $('.newCourseTitle').html('new course');
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
      makeNewItem('new', 'course', 'Course');
  });

  $('#editCourseBtn').click(function(){
    makeNewItem('update', 'course', 'Course');
  });

  function updateItemInputs(item, itemNameLo, itemNameUp){
    var id = item['id'];
    var name = item['name'];
    var image = item['image'];
    if (itemNameLo == "student") {
      var phone = item['phone'];
      var email = item['email'];
      $('#new'+itemNameUp+'Email').val(email);
      $('#new'+itemNameUp+'Phone').val(phone);
      updateCheckboxes(item, 'courses');
    }
    if (itemNameLo == "course") {
      var description = item['description'];
      $('#new'+itemNameUp+'Description').val(description);
    }
    $('#'+itemNameLo+'IdDelete').val(id);
    $('#new'+itemNameUp+'Name').val(name);
    $('#new'+itemNameUp+'Image').val(image);
  }

  function makeNewItem(order, itemNameLo, itemNameUp){
    $('.note').empty();
    get = makeGetForNewOrUpdate(order, itemNameLo, itemNameUp);
    console.log(get);
    var url = 'dal/main.php?'+get;
    emptyInputs(itemNameLo, itemNameUp);
    $.ajax({
      dataType: 'json',
      url: url,
      type: 'GET',
    }).done(function(data){
      console.log(data);
      appendAllData(itemNameLo, itemNameUp);
    }).fail(function(err){
      appendAllData(itemNameLo, itemNameUp);
      console.log(JSON.stringify(err));
    });
  }

  function afterEditOrNew(itemNameLo, itemNameUp, data){
    allCourses = data['courses'];
    allStudents = data['students'];
    var name = $('#new'+itemNameUp+'Name').val();
    var item = getSpecificItemByName(data, name, itemNameLo);
    console.log(item);
    showSelectedItem(item, itemNameLo, itemNameUp);
  }

  function makeGetForNewOrUpdate(order, itemNameLo, itemNameUp){
    var get = '';
    var name = $('#new'+itemNameUp+'Name').val();
    var image = $('#new'+itemNameUp+'Image').val();
    if (itemNameLo == "course") {
        var description = $('#new'+itemNameUp+'Description').val();
        get = 'courseName='+name+'&description='+description+'&courseImage='+image;
    }
    if (itemNameLo == "student") {
        var phone = $('#new'+itemNameUp+'Phone').val();
        var email = $('#new'+itemNameUp+'Email').val();
        var courses = coursesCheckboxes();
        courses = transferNameToId(courses, 'course');
        courses = courses.join(", ");
        get = 'studentName='+name+'&email='+email+'&phone='+phone+'&studentImage='+image+'&courses_id='+courses;
        if (order == 'update') {
          get = 'studentName='+name+'&email='+email+'&phone='+phone+'&studentImage='+image+'&coursesUpdate='+courses; 
        }
    }
    if(order == 'update'){
      var id = $('#'+itemNameLo+'IdDelete').val();
      console.log(id);
      get = 'id='+id+"&"+get;
    }
    return get;
  }


  //-----------------transfer Name array To Id array

  function transferNameToId(itemsArr, itemNameLo){
    // console.log("all courses new function "+allCourses);
    if (itemNameLo == 'course') {
      var allItems = allCourses;
    }
    for (var i = itemsArr.length - 1; i >= 0; i--) {
      for (var j = allItems.length - 1; j >= 0; j--) {
        if (itemsArr[i] == allItems[j]['name']) {
          itemsArr[i] = allItems[j]['id'];
        }
      }
    }
    return itemsArr;
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
        appendAllData('delete', "");
      }
    }).fail(function(err){
      console.log(err);
   });     
}

  $('#courseDeleteBtn').click(function(){
      deleteVar("course", "Course");
      showMainContainer();
  });
      
    function findAndHideVarLi(varLower, id){
    $("."+varLower+"Li[value="+id+"]").hide();
    }

    function updateCheckboxes(item, listName){
      console.log("update checkboxes ");
      console.log(item);
      var list =  item[listName];
        for(var j = 0; j < list.length; j++){
            console.log(list[j][0]);
            $.each($('input[type=checkbox]'), function(i, checkboxVal){
                // console.log(list[j][0]+", "+checkboxVal['value']);
                if (list[j][0] == checkboxVal['value']) {
                    checkboxVal.checked = true;
                }
            });
        }
    }

    function appendAllData(itemNameLo, itemNameUp){
        $.ajax({
        dataType:'json',
        url:'dal/main.php?all=0',
        type: 'GET',
      }).done(function(data){
        allCourses = data['courses'];
        allStudents = data['students'];
        console.log(data);
        $('.welcomeMessege').empty();
        initItems(data['students'], 'student', 'Student');
        initItems(data['courses'], 'course', 'Course');
        if (itemNameLo =! 'delete') {
          afterEditOrNew(itemNameLo, itemNameUp, data);
        }
      }).fail(function(err){
        console.log(err);
      });

    }

    function getSpecificItemByName(data, name, itemNameLo){
        if (itemNameLo == "course") {
          allCourses = data['courses'];
            for (var i = allCourses.length - 1; i >= 0; i--) {
                if (allCourses[i]['name'] == name) {
                    return allCourses[i];
                }
            }
                
       }
       if (itemNameLo == "student") {
        allStudents = data['students'];
             for (var i = allStudents.length - 1; i >= 0; i--) {
                if (allStudents[i]['name'] == name) {
                    return allStudents[i];
                }
            }
       }
    }

    function showMainContainer(){
      $('#newCourse').hide();
      $('#newStudent').hide();
      $('#defualtContainer').show();
    }
});
