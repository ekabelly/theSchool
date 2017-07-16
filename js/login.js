$(document).ready(function(){
	$('#btn1').click(function(){
		// $('#inputsEmpty').hide();
		// $('#btn1').addClass('col-md-offset-2');
		if ($('#username').val() == '' || $('#pass').val() == '') {
			// $('#btn1').removeClass('col-md-offset-2');
			$('#inputsEmpty').html("empty inputs");
			return console.log('login empty');
		}
		console.log($('#username').val()+" "+$('#pass').val());
		$.ajax({
			dataType:'json',
			url:'dal/login.php',
			type:'POST',
			data: {
				username: $('#username').val(),
				pass: $('#pass').val()
			}
		}).done(function(data){
			if (data) {
				window.location.href="index.html";
			}else{
				$('#inputsEmpty').html("wrong inputs");
			}
		}).fail(function(err){
      console.log(err);
  		});
	});
});