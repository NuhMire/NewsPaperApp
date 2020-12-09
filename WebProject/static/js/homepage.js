function articleLikedBy(articleId){
    $.ajax({
        url : "/articleLikedBy/",
        type : "POST",
		headers: { "X-CSRFToken": window.CSRF_TOKEN },
        data:{ 
            'articleId': articleId,
        },
        success : function(json) {
			$("#LikedList"+articleId+" ul").empty();
			$("#LikedList"+articleId+" ul").append(json.data);
			$("#LikedList"+articleId).collapse('toggle');
        },
    });
}

function buttonLike(articleId){
	    $.ajax({
        url : "/likeArticle/",
        type : "POST",
		headers: { "X-CSRFToken": window.CSRF_TOKEN },
        data:{ 
            'articleId': articleId,
            'userId': JSON.parse(sessionStorage.User).id,
			'type':'like'
        },
        success : function(json) {
			$('#LikeBtn'+articleId).hide();
			$('#UnlikeBtn'+articleId).show();
            console.log("success");
            console.log(json);
			$("#LikedList"+articleId).collapse('hide')
        },
    });
}
function buttonUnlike(articleId){
		$.ajax({
		url : "/likeArticle/",
		type : "POST",
		headers: { "X-CSRFToken": window.CSRF_TOKEN },
		data:{ 
			'articleId': articleId,
			'userId': JSON.parse(sessionStorage.User).id,
			'type':'unlike'
		},
		success : function(json) {
			$('#UnlikeBtn'+articleId).hide();
			$('#LikeBtn'+articleId).show();
			console.log("success");
			console.log(json);
			$("#LikedList"+articleId).collapse('hide')
		}
		})}

function Display(diaplyedArticles,liked){
	console.log(diaplyedArticles);
	for (j=0; j<diaplyedArticles.length;j++){
		if (diaplyedArticles[j][0]=="CAT"){
			$('#groupItem').append("<h3>"+diaplyedArticles[j][1]+"</h3>")
		}
		else{
			$('#groupItem').append("<div class='jumbotron jumbotron-fluid'> <div class='container'><div class='media'> <img src=" +diaplyedArticles[j].image_url+
			" class='mr-3' alt='...'' width='100' height='100'> <div class='media-body'> <h4 class='mt-0'>" + diaplyedArticles[j].name+ 
			"</h4> <button class='btn btn-link'type='button' data-toggle='collapse' data-target='#collapse"+diaplyedArticles[j].id+"' aria-expanded='false' aria-controls='collapseExample'>Click to read more</button> <button type='button' class='btn btn-outline-danger' id='UnlikeBtn"
			+diaplyedArticles[j].id+"' style='display:none;' onclick='buttonUnlike("+diaplyedArticles[j].id+
			")'>Unlike</button>  <button type='button' class='btn btn-outline-success' id='LikeBtn"
			+diaplyedArticles[j].id+"' onclick='buttonLike("+diaplyedArticles[j].id+
			")'>Like</button><button type='button' class='btn btn-outline-info' onclick='articleLikedBy("+diaplyedArticles[j].id+")'>Find who liked this article</button><div id='LikedList"+diaplyedArticles[j].id+"' class='collapse'><ul class='list-group list-group-flush'></ul></div></div></div><div class='collapse' id='collapse"+diaplyedArticles[j].id+"'> <div class='card card-body'>"+diaplyedArticles[j].articleText+
			"</div> </div></div><div>"+getComments(diaplyedArticles[j].id)+"</div></div></div>"
			);
			$('#sendMessageButton'+diaplyedArticles[j].id).on('click',{artId:diaplyedArticles[j].id,prntId:-1},postComment);
			if (liked.includes(diaplyedArticles[j].id)){$('#LikeBtn'+diaplyedArticles[j].id).hide(); $('#UnlikeBtn'+diaplyedArticles[j].id).show();}
		}
	}
}


$(document).ready(function(){
	if (sessionStorage.User != null){
	useid=JSON.parse(sessionStorage.User).id
	console.log(useid)
	$.ajax({
			url : "/retrieve/",
			type : "POST",
			headers: { "X-CSRFToken": window.CSRF_TOKEN },
			data:{iduser:useid},
			success : function(json) {
				console.log(json.homeArt);
				console.log(json.liked);
				Display(json.homeArt,json.liked);
			}
		})
	}
})