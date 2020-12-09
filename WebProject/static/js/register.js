function regSend() {
    $.ajax({
        url : "/register/regPost/",
        type : "POST", 
		headers: { "X-CSRFToken": window.CSRF_TOKEN },
        data : { firstName : $('#firstName-text').val(),lastName : $('#lastName-text').val(),email : $('#email-text').val(),dob : $('#dob-text').val(),password : $('#password-text').val() },
        success : function(json) {
		if (json.result=="Success"){
            $('#regform').trigger("reset");
			$("#regform :input").prop('readonly', true);
			$('#regAlert').fadeOut();
			$("#regAlert").attr('class', 'alert alert-success');
			$('#regAlert').text("Successfully Registered. Please Login.");
			$('#regAlert').fadeIn();
            console.log(json);
		}else
		{
		if(json.result=="AlreadyEmail")
		{
			$('#regAlert').fadeOut();
			$("#regAlert").attr('class', 'alert alert-danger');
			$('#regAlert').text("This Email has already been registered.");
			$('#regAlert').fadeIn();
		}
		}
        },
        error : function(xhr,errmsg,err) {
            $('#results').html("<div class='alert-box alert radius' data-alert>Oops! We have encountered an error: "+errmsg+
                " <a href='#' class='close'>&times;</a></div>"); 
            console.log(xhr.status + ": " + xhr.responseText);
        }
    });
};

$('#regform').on('submit', function(event){
    event.preventDefault();
    console.log("submitting")
    regSend();
});