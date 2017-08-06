// studentIdDelete
// itemNameLo+"IdDelete"


// getSpecificItemByName(data, name, itemNameLo)
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
        console.log(data)
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

//----------------init page--------------

var globalId = '';
var globalName = ""
var imageName = '123';
var allStudents = {};
var allCourses = {};
var allAdmins = {};
initPage();

function initPage(){
  getStudents();
  getCourses();
  getAdmins();
}

//------------------------ajaxes----------

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
        if (itemNameLo != 'delete') {
          afterEditOrNew(itemNameLo, itemNameUp, data);
        }
      }).fail(function(err){
        console.log(err);
      });

    }

  //--------students get

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

//----------students only functions----------
//---------------append courses to new student form

function appendCoursesToStudent(courses){
  $('.coursesCheckbox').empty();
  $.each(courses, function(i, val){
    $('.coursesCheckbox').append("<label class='checkbox-inline'><input type='checkbox' value="+val['name']+" >"+val['name']+"</label>");
  });
}

//---------- student main container

  $('#studentsBtn').click(function(){
    updateItemInputs('','student','Student');
    showNewStudentPage();
    $('.newStudentTitle').html('new student');
    $('.deleteStudentSpan').hide();
  });

  $('#editStudentBtn').click(function(){
    if(!checkInputForNull("student", "Student")){
      // if(!checkValidNameForNewItem('student','Student')){
        makeNewItem('update', 'student', 'Student');
      // }
    }
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
    if(!checkInputForNull("student", "Student")){
      makeNewItem('new', "student", "Student");
    // showNewMadeItem("student", "Student", "new");
    }
  });

//-------------put the courses into checkboxes on student edit

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

//------------courses only function-----------
//-----------------edit course

function HowManyCoursesOnEdit(theItem){
  $('.selectedCourseStudentsP').empty();
      var list = theItem['students'];
      // console.log(list);
      var listLength = list.length;
      if (list[0] == "") {listLength = 0;}
      $('.selectedCourseStudentsP').append("<p> there are "+listLength+" students attending this course");
      return listLength;
}


//--------------course main container

  $('#courseBtn').click(function(){
    $('.deleteCourseSpan').hide();
    $('#editCourseBtn').hide();
    $('.welcomeMessege').hide();
    $('#newCourseBtn').show();
    $('.newCourseTitle').html('new course');
    updateItemInputs('', 'course', 'Course');
    showNewCourseContainer();
  });

  function showNewCourseContainer(){
    // console.log('toggle');
    $('.note').empty();
    $('#newStudent').hide();
    $('#selectedCourseDescription').hide();
    $('#selectedStudentDescription').hide();
    $('#newCourse').show();
  }

  //-------------------save new course

  $('#newCourseBtn').click(function(){
    if(!checkValidNameForNewItem('course', 'Course')){
      makeNewItem('new', 'course', 'Course');
    }
  });

  $('#editCourseBtn').click(function(){
    if(!checkValidNameForNewItem('course', 'Course')){
      makeNewItem('update', 'course', 'Course');
    }
  });

  function updateItemInputs(item, itemNameLo, itemNameUp){
    var id = item['id'];
    var name = item['name'];
    var image = item['image'];
    if (itemNameLo == 'admin' || itemNameLo == 'student') {
      var phone = item['phone'];
      var email = item['email'];
      $('#new'+itemNameUp+'Email').val(email);
      $('#new'+itemNameUp+'Phone').val(phone);
      // $('.filePathA').prop('files')[0] = image;
    }
    if (itemNameLo == "student") {
      updateCheckboxes(item, 'courses');
      // $('.filePathS').prop('files')[0] = image;
    }
    if (itemNameLo == "course") {
      // $('.filePathC').prop('files')[0] = image;
      var description = item['description'];
      $('#new'+itemNameUp+'Description').val(description);
    }
    $('#newAdminPass').val('');
    $('#new'+itemNameUp+'Name').val(name);
    $('#new'+itemNameUp+'Image').val(image);
    $('.selected'+itemNameUp+'Photo').attr('src', '');
  }

  function makeNewItem(order, itemNameLo, itemNameUp){
    $('.note').empty();
    get = makeGetForNewOrUpdate(order, itemNameLo, itemNameUp);
    // console.log(get);
    var url = 'dal/main.php?'+get;
    $.ajax({
      dataType: 'json',
      url: url,
      type: 'GET',
    }).done(function(data){
      // console.log(data);
      appendAllData(itemNameLo, itemNameUp);
    }).fail(function(err){
      appendAllData(itemNameLo, itemNameUp);
      console.log('error '+JSON.stringify(err));
    });
  }

  function afterEditOrNew(itemNameLo, itemNameUp, data){
    allCourses = data['courses'];
    allStudents = data['students'];
    var nameOrEmail = (itemNameLo == 'course')?'Name':'Email';
    var name = $('#new'+itemNameUp+nameOrEmail).val();
    var item = getSpecificItemByName(data, name, itemNameLo);
    // console.log(item);
    showSelectedItem(item, itemNameLo, itemNameUp);
  }

  function makeGetForNewOrUpdate(order, itemNameLo, itemNameUp){
    var get = '';
    var name = $('#new'+itemNameUp+'Name').val();
    // consoel.log(imageName);
    var image = imageName;
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
      // var data = {};
      // data['courses'] = allCourses;
      // data['students'] = allStudents;
      // var name2 = (itemNameLo == 'course')?name:email;
      // console.log(email);
      // var item = getSpecificItemByName(data, name2, itemNameLo);
      get = 'id='+globalId+"&"+get;
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

function deleteVar(itemNameLo, itemNameUp){
      $('.note').empty();
      if (itemNameLo == 'course') {
        var name = $('#new'+itemNameUp+'Name').val();
      }else{
        var name = $('#new'+itemNameUp+'Email').val();
      }
      var data = {};
      data['courses'] = allCourses;
      data['students'] = allStudents;
      data['admins'] = allAdmins;
      var item = getSpecificItemByName(data, name, itemNameLo);
      var idInput = item['id'];
      if (!confirm("are you sure you want to delete that "+itemNameLo+"?")) {
            return false;
      }
      deleteAjax(idInput, itemNameLo, itemNameUp);
}

function deleteAjax(idInput, itemNameLo, itemNameUp){
  $.ajax({
      dataType: 'json',
      url:'dal/main.php?delete'+itemNameUp+'='+idInput,
      type:'GET',
    }).done(function(data){
      if (data) {
        findAndHideVarLi(itemNameLo, idInput);
        if (itemNameLo == 'admin') {
          $('#newAdmin').hide();
          $('#defualtContainer').show();
          getAdmins();
        }else{
          appendAllData('delete', "");
        }
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
      // console.log("update checkboxes ");
      // console.log(item);
      if (item == "") {
        $('input[type=checkbox]').checked = false;
        return;
      }
      var list =  item[listName];
        for(var j = 0; j < list.length; j++){
            // console.log(list[j][0]);
            $.each($('input[type=checkbox]'), function(i, checkboxVal){
                // console.log(list[j][0]+", "+checkboxVal['value']);
                if (list[j][0] == checkboxVal['value']) {
                    checkboxVal.checked = true;
                }
            });
        }
    }







  //------------------------------admin--------------

  function getAdmins(){
    $.ajax({
      dataType:'json',
      url:'dal/main.php?admins=0',
      type: 'GET',
    }).done(function(data){
      console.log(data);
      initItems(data, "admin", "Admin");
      allAdmins = data;
    }).fail(function(err){
      console.log(err);
    });
  }

  $('#adminLink').click(function(){
    initAdminPage();
  });

  $('#adminBtn').click(function(){
    $('#selectedAdminDescription').hide();
    updateItemInputs('','admin','Admin');
    showNewAdminPage();
    showOrHideIfNewAdmin();
  });

function showOrHideIfNewAdmin(){
  $('.passDiv').show();
  $('.deleteAdminSpan').hide();
  $('#editAdminBtn').hide();
  $('#newAdminBtn').show();
  $('.newAdminTitle').html('new admin');
}

function initAdminPage(){
  hideSchool();
  showAdminPage();
  showIfOwner();
}

function hideSchool(){
  $('#coursesList').hide();
  $('#studentsList').hide();
  $('#newStudent').hide();
  $('#newCourse').hide();
  $('#selectedCourseDescription').hide();
  $('#selectedStudentDescription').hide();
  $('#defualtContainer').show();
}

function showAdminPage(){
  $('#adminList').show();
  $('#selectedAdminDescription').hide();
}

function showIfOwner(){
  if (user['role'] == 'owner') {
    $('#adminBtn').show();
    $('.selectedAdminEdit').show();
  }
}

function showNewAdminPage(){
  if (user['role'] == 'owner') {
    $('.deleteAdminSpan').show();
  }
  $('#selectedAdminDescription').hide();
  // console.log('toggle');
  $('.note').empty();
  $('#newAdmin').show();
}

  $('#adminDeleteBtn').click(function(){
    deleteVar('admin', 'Admin');
  });

  $('#editAdminBtn').click(function(){
    if(!checkInputForNull('admin', 'Admin')){
      newOrUpdateAdmin('update');
      var data = {};
      data['admins'] = allAdmins;
      var admin = getSpecificItemByName(data, globalName, 'admin');
      showSelectedItem(admin ,'admin', 'Admin');
    }
  });

  $('#newAdminBtn').click(function(){
    if(!checkInputForNull('admin', 'Admin')){
      newOrUpdateAdmin('new');
    }
  })

  function newOrUpdateAdmin(order){
    $.ajax({
      dataType: 'json',
      url: 'dal/main.php',
      type: 'POST',
      data: makeNewAdminData(order)
    }).done(function(data){
      getAdmins();
    }).fail(function(err){
      console.log(err);
      getAdmins();
    });
  }

  function makeNewAdminData(order){
    var admin = {};
    admin['name'] = $('#newAdminName').val();
    admin['email'] = $('#newAdminEmail').val();
    admin['role'] = $('#newAdminRole').val();
    admin['pass'] = (order!='update')?'':$('#newAdminPass').val();
    admin['image'] = imageName;
    admin['phone'] = $('#newAdminPhone').val();
    if (order == 'update') {
      admin['id'] = globalId;
    }
    console.log(admin);
    return admin;
  }

  ///////------------end admins-----------

  //----------------general functions--------------

  //--------------append list of all items after ajax

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
  var description = (itemNameLo != 'course')?"<li>"+theItem['email']:"";
  $('.'+itemNameLo+'sUl').append("<li class='"+itemNameLo+"Li' value="+id+"><img  class='"+itemNameLo+"Photo' src='uploads/"+image+"'><ul style='display:inline;' class='"+itemNameLo+"Ul'><li>"+name+description);
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
  $('#selectedStudentDescription').hide();
  $('#selectedCourseDescription').hide();
  $('#selected'+itemNameUp+'Description').show();
  if (itemNameLo == 'admin') {
    $('#newAdmin').hide();
    // console.log(theItem['role']);
    if (theItem['role'] == 'owner') {
        $('.selectedAdminEdit').hide();
    }else{
        $('.selectedAdminEdit').show();
    }
    var description = "<p>"+theItem['phone']+"<p>"+theItem['email']+"<p>"+theItem['role'];
  }
  if (itemNameLo == "course") {
    // $('#defualtContainer').toggle(display("#selectedCourseDescription"));
      appendItemListToSelectedItem(theItem, "course", "students");
    var description = "<p>"+theItem['description'];
  }
  if (itemNameLo =="student") {
    // console.log("itemNameLo = student");
    appendItemListToSelectedItem(theItem, "student", "courses");
    var description = "<p>"+theItem['phone']+"<p>"+theItem['email'];
  }
   $('#defualtContainer').toggle(display("#selected"+itemNameUp+"Description"));
  console.log(theItem['name']);
  $('.selected'+itemNameUp+'Name').html(theItem['name']);
  $('.selected'+itemNameUp+'Description').empty().append(description);
  if (theItem['image']) {
    imageName = theItem['image'];
    $('.selected'+itemNameUp+'Photo').attr('src', 'uploads/'+theItem['image']);
  }else{
    $('.selected'+itemNameUp+'Photo').attr('src', '');
  }
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

  function selectedItemEdit(theItem, itemNameLo, itemNameUp){
    globalId = theItem['id'];
    if (itemNameUp == "Course") {
      globalName = theItem['name'];
      $('.delete'+itemNameUp+'Span').hide();
      showNewCourseContainer();
    }
    if (itemNameLo == "student") {
      globalName = theItem['email'];
      $('.delete'+itemNameUp+'Span').show();
      showNewStudentPage();
    }
    if (itemNameLo == 'admin') {
      globalName = theItem['email'];
      $('.passDiv').hide();
      showNewAdminPage();
    }
    $('#edit'+itemNameUp+'Btn').show();
    $('#new'+itemNameUp+'Btn').hide();
    updateItemInputs(theItem, itemNameLo, itemNameUp);
    if (itemNameLo == "course") {
      var courses = HowManyCoursesOnEdit(theItem);
      if (courses == 0 && user['role'] != 'sales') {
        $('.delete'+itemNameUp+'Span').show();
      }
    }
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
  if (itemNameLo == 'admin') {
    var allItems = allAdmins;
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

  function checkInputForNull(itemNameLo, itemNameUp){
    $('.note').empty();
        if ($('#new'+itemNameUp+'Name').val() == "") {
            return messegeForEmptyInput();
        }
        if (itemNameLo != 'course') {
            if ($('#new'+itemNameUp+'Email').val() == "") {
                return messegeForEmptyInput();
            }
            if(!isEmail($('#new'+itemNameUp+'Email').val())){
              return messegeForEmptyInput();
            }
            if (!isUsername($('#new'+itemNameUp+'Name').val())) {
              return messegeForEmptyInput();
            }
        }
        if (itemNameLo == 'admin') {
          if ($('#newAdminPass').val() == "") {
            return messegeForEmptyInput();
          }
          if ($('#newAdminRole').val() == null) {
            return messegeForEmptyInput();
          }
        }
        return false;
}

function isUsername(username){ 
  var regex = /^[a-z][a-z0-9_.-]{4,19}$/;
  return regex.test(username); 
}

function isEmail(email) {
  var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return regex.test(email);
}

function messegeForEmptyInput(){
    console.log("empty input");
    $('.note').empty().append("<br><p> please fill a name & an email");
    return true;
}

  //----------if html obj is showen or hidden
function display(someHtmlObj){
if($(someHtmlObj).css('display') == 'none'){
    return true;
  }else{return false;}
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
      console.log(allStudents[i]['email']+"  "+name);
      if (allStudents[i]['email'] == name) {
        return allStudents[i];
      }
    }
  }
  if (itemNameLo == 'admin') {
    allAdmins = data['admins'];
    for (var i = allAdmins.length - 1; i >= 0; i--) {
      if(allAdmins[i]['email'] == name){
        return allAdmins[i];
      }
    }
  }
  return false;
}

function showMainContainer(){
  $('#newCourse').hide();
  $('#newStudent').hide();
  $('#defualtContainer').show();
}

  function checkValidNameForNewItem(itemNameLo, itemNameUp){
    var name = $('#new'+itemNameUp+'Name').val();
    var data = {};
    data['courses'] = allCourses;
    data['admins'] = allAdmins;
    data['students'] = allStudents;
    var item = getSpecificItemByName(data, name, itemNameLo);
    if(item){
      if (item['id'] == globalId) {return false;}
      return noteNameExists();
    } return false;
  }

  function noteNameExists(){
    $('.note').empty().append("<p> name is taken.");
    return true;
  }

  //--------------------pictures and upload-----------

  $('.upload').click(function(){
  uploadPic();
});


  function uploadPic(){
      // console.log('upload');
      var filePath = whichPath();
      var fileData = $(filePath).prop('files')[0];
      var formData = new FormData();
      formData.append('file', fileData);
      $.ajax({
          type: 'post',
          cache: false,
          contentType: false,
          processData: false,
          url: 'upload.php',
          dataType: 'text',
          data: formData
      }).done(function(data){
        var parsedResponse = JSON.parse(data);
          if(parsedResponse.status === 'success'){
            var path = window.location.href.split('/index.html')[0];
            $('.img').attr('src',path + '/uploads/' + parsedResponse.fileName );
            imageName = parsedResponse.fileName;
          }
      });
  }

  function whichPath(){
    if($('.filePathC').prop('files')[0] != null){
      return '.filePathC';
    }
    if ($('.filePathS').prop('files')[0] != null) {
      return '.filePathS';
    }
    if ($('.filePathA').prop('files')[0] != null) {
      return '.filePathA';
    }
  }

  //--------logout------------------

$('#logoutBtn').click(function(){
  logoutClicked();
});

function logoutClicked(){
  $.ajax({
    url:'dal/logout.php',
    type:'POST'
  }).done(function(data){
    console.log(data);
    window.location.href = data;
  });
}
});
