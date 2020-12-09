$('#logoutButton').on('click', function(event){
	sessionStorage.removeItem("User")
	window.location.href = "http://localhost:8000/register/";
	alert("You have been logged out")
});
