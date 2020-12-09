function loginSend() {
    $.ajax({
        url : "/loginPost/",
		headers: { "X-CSRFToken": window.CSRF_TOKEN },
        type : "POST", 
        data : {email : $('#email-login-text').val(),password : $('#password-login-text').val() },
        success : function(json) {
        	console.log($('#password-text').val())
        	if (json.result=="LoginError")
        	{
        		$('#results').html("<div class='alert alert-danger' role='alert'>Incorrect Email or Password </div>"); 
        	}
        	if (json.result=="SuccessfulLogin")
        	{
                sessionStorage.removeItem("User");
                json.userFields["favCategories"]=json.favCategories
                sessionStorage.setItem("User",JSON.stringify(json.userFields));
                console.log(json.favCategories)
                if (json.favCategories.length==0){
                    $('#results').html("<div class='alert alert-success' role='alert'>Welcome "+json.userFields.firstName+"! </div><a href='/selectcategories'>Go to Select Categories</a>");
                }
                else{
                    $('#results').html("<div class='alert alert-success' role='alert'>Welcome "+json.userFields.firstName+"! </div><a href='/homepage'>Go to Home Page</a>");
                }
        	}
            console.log(json);
        },
        error : function(xhr,errmsg,err) {
            $('#results').html("<div class='alert-box alert radius' data-alert>Oops! We have encountered an error: "+errmsg+
                " <a href='#' class='close'>&times;</a></div>"); 
            console.log(xhr.status + ": " + xhr.responseText);
        }
    });
};
$('#loginform').on('submit', function(event){
    event.preventDefault();
    console.log("posting")
    loginSend();
});

