$( "#modalSave" ).click(function() {
	 loadCats();
	 $("#sucAlert2").fadeIn("slow");
	 $('#sucAlert2').delay(1900).fadeOut('slow');
});
function postFavourite(item){
$.ajax({
	url : "/postFavourite",
	type : "POST",
	headers: { "X-CSRFToken": window.CSRF_TOKEN },
	data:{ 
		'item': item,
		'useid': JSON.parse(sessionStorage.User).id
	},
	success : function(json) {
		console.log("success");
		console.log(json);
		sessionStorage.removeItem("User");
		json.userFields["favCategories"]=json.favCategories
		json.userFields["imagesrc"]=json.imgsrc
		json.userFields["completeArticles"]=json.completeArticles
		sessionStorage.setItem("User",JSON.stringify(json.userFields));
		document.getElementById("subscribe"+item).disabled = true;
	},
});
}
function unFavourite(item){
$.ajax({
	url : "/unFavourite",
	type : "POST",
	headers: { "X-CSRFToken": window.CSRF_TOKEN },
	data:{ 
		'item': item,
		'useid': JSON.parse(sessionStorage.User).id
	},
	success : function(json) {
		console.log("success");
		console.log(json);
		sessionStorage.removeItem("User");
		json.userFields["favCategories"]=json.favCategories
		json.userFields["imagesrc"]=json.imgsrc
		json.userFields["completeArticles"]=json.completeArticles
		sessionStorage.setItem("User",JSON.stringify(json.userFields));
		document.getElementById("unsubscribe"+item).disabled = true;
	},
});
}
document.getElementById("firstName").value=JSON.parse(sessionStorage.User).firstName
document.getElementById("lastName").value=JSON.parse(sessionStorage.User).lastName
document.getElementById("email").value=JSON.parse(sessionStorage.User).email
document.getElementById("dpimg").src=static_url+"images/"+JSON.parse(sessionStorage.User).profilePicture
loadCats();
function unCommonArray(first, second){
	const res = [];
	for(let i = 0; i < first.length; i++){
		if(second.indexOf(first[i]) === -1){
		res.push(first[i]);
		}
	};
	
	for(let j = 0; j < second.length; j++){
		if(first.indexOf(second[j]) === -1){
		res.push(second[j]);
		}
	}
	return res;
}
	
function loadCats(){
		$('#listFavourites').empty();
		$('#likedArticle').empty();
		$('#listNonFavourites').empty();
		category = JSON.parse(sessionStorage.User).favCategories;
		for (i=0; i<category.length; i++){
			$('#listFavourites').append("<h4>"+ category[i]+ "</h4>");
			$('#likedArticle').append(" <div class='class='card-group'> <div class='card'>"
						  + " <div class='card-body'> <h4 class='card-title' >" + category[i] + " </h4>"
						  + "<button class='btn btn-danger' id =unsubscribe" +category[i]+ " onClick='unFavourite(`"+category[i]+"`)'> Remove From Subscription </button> </div></div></div>");
		}
		favCategory = JSON.parse(sessionStorage.User).favCategories;
		allCategories = ["Politics","Finance","Sport","Tech","Health","Education"];
		nonFavCategories = unCommonArray(favCategory,allCategories);
		console.log(nonFavCategories);
		for (j=0; j<nonFavCategories.length; j++){
			$('#listNonFavourites').append(" <div class='class='card-group'> <div class='card'>"
						  + " <div class='card-body'> <h4 class='card-title' >" + nonFavCategories[j] + " </h4>"
						  + "<button class='btn btn-primary' id =subscribe" +nonFavCategories[j]+ " onClick='postFavourite(`"+nonFavCategories[j]+"`)'> Add to subscription </button> </div></div></div>");
	}
}
var active=true
$("#DeleteProfilePicture").click(function()
{
	active=false;
	$('#profilePictureUpload').val("");
	active=true;
	$.ajax({
	url : "updateProfile/",
	type : "DELETE",
	headers: { "X-CSRFToken": window.CSRF_TOKEN },
	data : JSON.stringify({useid:JSON.parse(sessionStorage.User).id}),
	success : function(json) {
				if (json.result=="SuccessfulDeletePP")
				{
					sessionStorage.removeItem("User");
					json.userFields["favCategories"]=json.favCategories
					json.userFields["imagesrc"]=json.imgsrc
					sessionStorage.setItem("User",JSON.stringify(json.userFields));
					imgLink=static_url+"images/blankimg.png"
					if ((JSON.parse(sessionStorage.User).profilePicture)!=null)
					{
						imgLink=static_url+"images/"+JSON.parse(sessionStorage.User).profilePicture
					}
					try{document.getElementById("dpimg").src=imgLink}
					finally{
					 $("#delAlert").fadeIn("slow");
					 $('#delAlert').delay(1900).fadeOut('slow');
					}
				}
	}})
}
)

$("#profilePictureUpload").change(function()
{
if (!active) {
	return;
}
var fd = new FormData();
if ($('#profilePictureUpload').get(0).files.length === 0) {
		console.log("empty")
	}
	else
	{
	var zfile = $('#profilePictureUpload')[0].files[0];
	fd.append('theFile', zfile);
	}
	var userid=JSON.parse(sessionStorage.User).id;
	fd.append('useid',userid);
	$.ajax({
		url : "updateProfile/",
		type : "POST", 
		headers: { "X-CSRFToken": window.CSRF_TOKEN },
		data : fd,
		contentType: false,
		processData: false,
		success : function(json) {
					if (json.result=="SuccessfulUpdatePP")
					{
						console.log(json.result)
						sessionStorage.removeItem("User");
						json.userFields["favCategories"]=json.favCategories
						json.userFields["imagesrc"]=json.imgsrc
						sessionStorage.setItem("User",JSON.stringify(json.userFields));
						imgLink=static_url+"images/blankimg.png"
						if ((JSON.parse(sessionStorage.User).profilePicture)!=null)
						{
							imgLink=static_url+"images/"+JSON.parse(sessionStorage.User).profilePicture
						}
						try{document.getElementById("dpimg").src=imgLink}
						finally{
						 $("#updAlert").fadeIn("slow");
						 $('#updAlert').delay(1900).fadeOut('slow');
						}
					}
		},
		error : function(xhr,errmsg,err) {
			$('#results').html("<div class='alert-box alert radius' data-alert>Oops! We have encountered an error: "+errmsg+" <a href='#' class='close'>&times;</a></div>"); 
			console.log(xhr.status + ": " + xhr.responseText);
		}
	})
})

$("#updateProfileButton").click(function() {
var fd = new FormData();
	var userid=JSON.parse(sessionStorage.User).id;
	fd.append('useid',userid);
	fd.append('firstName',$('#firstName').val())
	fd.append('lastName', $('#lastName').val())
	fd.append('email',$('#email').val())
	fd.append('useid',userid);
	$.ajax({
		url : "updateProfile/",
		type : "POST", 
		headers: { "X-CSRFToken": window.CSRF_TOKEN },
		data : fd,
		contentType: false,
		processData: false,
		success : function(json) {
					if (json.result=="SuccessfulUpdate")
					{
						console.log(json.result)
						sessionStorage.removeItem("User");
						json.userFields["favCategories"]=json.favCategories
						json.userFields["imagesrc"]=json.imgsrc
						json.userFields["completeArticles"]=json.completeArticles
						sessionStorage.setItem("User",JSON.stringify(json.userFields));
						console.log(json.favCategories)
						imgLink=static_url+"images/blankimg.png"
						if ((JSON.parse(sessionStorage.User).profilePicture)!=null)
						{
							imgLink=static_url+"images/"+JSON.parse(sessionStorage.User).profilePicture
						}
						try{document.getElementById("dpimg").src=imgLink}
						finally{
						 $("#sucAlert").fadeIn("slow");
						 $('#sucAlert').delay(1900).fadeOut('slow');
						}
					}
		},
		error : function(xhr,errmsg,err) {
			$('#results').html("<div class='alert-box alert radius' data-alert>Oops! We have encountered an error: "+errmsg+" <a href='#' class='close'>&times;</a></div>"); 
			console.log(xhr.status + ": " + xhr.responseText);
		}
	})
})



