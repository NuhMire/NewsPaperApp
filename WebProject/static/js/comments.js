function editComment(event)
{
        tx=$('#editText'+event.data.commid).val()
        $.ajax({
        url : "/commPut/",
		headers: { "X-CSRFToken": window.CSRF_TOKEN },
        type : "PUT", 
        data : JSON.stringify({coid:event.data.commid,txt:tx}),
        success : function(json) {
            console.log(json);
            console.log("success");
            getComments(event.data.artId);
        },
        error : function(xhr,errmsg,err) {
            $('#results').html("<div class='alert-box alert radius' data-alert>Oops! We have encountered an error: "+errmsg+
                " <a href='#' class='close'>&times;</a></div>"); 
            console.log(xhr.status + ": " + xhr.responseText);
        }
    });
}

function deleteComment(event)
{
        tx=$('#editText'+event.data.commid).val()
        $.ajax({
		headers: { "X-CSRFToken": window.CSRF_TOKEN },
        url : "/commDelete/",
        type : "DELETE", 
        data : JSON.stringify({coid:event.data.commid,txt:tx}),
        success : function(json) {
            console.log(json);
            console.log("success");
            getComments(event.data.artId);
        },
        error : function(xhr,errmsg,err) {
            $('#results').html("<div class='alert-box alert radius' data-alert>Oops! We have encountered an error: "+errmsg+
                " <a href='#' class='close'>&times;</a></div>"); 
            console.log(xhr.status + ": " + xhr.responseText);
        }
    });
}

function postComment(event)
{
    if (event.data.prntId==-1)
    {
        tx=$('#baseInput'+event.data.artId).val()
    }
    else
    {
        tx=$('#replyText'+event.data.prntId).val()
    }
    console.log(event.data)
    $.ajax({
        url : "/commPost/",
        type : "POST", 
		headers: { "X-CSRFToken": window.CSRF_TOKEN },
        data : { arId:event.data.artId, parId:event.data.prntId, usId:JSON.parse(sessionStorage.User).id,txt:tx},
        success : function(json) {
            console.log(json);
            console.log("success");
            getComments(event.data.artId);
			$('#baseInput'+event.data.artId).val("");
        },
        error : function(xhr,errmsg,err) {
            $('#results').html("<div class='alert-box alert radius' data-alert>Oops! We have encountered an error: "+errmsg+
                " <a href='#' class='close'>&times;</a></div>"); 
            console.log(xhr.status + ": " + xhr.responseText);
        }
    });
}

function getComments(articleId)
{
    text=""
    $.ajax({
        url : "/GETComments/"+articleId,
        type : "GET",
		headers: { "X-CSRFToken": window.CSRF_TOKEN },
        success : function(json) {
            console.log(json);
            $('#commsList'+articleId).empty()
            for (i = 0; i < json.allComments.length; i++)
            {
            $('#commsList'+articleId).append(`
            <li class="commentLi" style="margin-left:`+(48*(json.allComments[i].step-1).toString())+`px;" data-commentid="`+json.allComments[i].id+`">
                <table class="form-comments-table">
                    <tr>
                        <td><div class="comment-user">`+json.allComments[i].name+`</div></td>
                        <td>
                            <div class="comment-avatar">
                                <img src="/static`+json.allComments[i].profilePicture+`">
                            </div>
                        </td>
                        <td>
                            <div id="comment-`+json.allComments[i].id+`" data-commentid="`+json.allComments[i].id+`" class="comment comment-step1">`+json.allComments[i].commText+`<div id="commentactions-`+json.allComments[i].id+`" class="comment-actions">
                                    <div class="btn-group" role="group" aria-label="...">
                                        <button id="reply-`+json.allComments[i].id+`" data-toggle="collapse" data-target="#replyCollapse`+json.allComments[i].id+`" type="button" class="btn btn-primary btn-sm"><i class="fa fa-edit"></i> Reply</button>
                                        <div id="replyCollapse`+json.allComments[i].id+`" class="collapse">
                                            <input type="text" id="replyText`+json.allComments[i].id+`" class="form-control" placeholder="Reply" aria-describedby="sizing-addon3">
                                            <button id="sendReplyButton`+json.allComments[i].id+`" class="btn btn-primary" type="button"><i class="fa fa-send"></i>Send</button>
                                        </div>
                                        <button id="edit-`+json.allComments[i].id+`" type="button" data-toggle="collapse" data-target="#editCollapse`+json.allComments[i].id+`" class="btn btn-default btn-sm"><i class="fa fa-pencil"></i> Edit</button>
                                        <div id="editCollapse`+json.allComments[i].id+`" class="collapse">
                                            <input type="text" id="editText`+json.allComments[i].id+`" class="form-control" value='`+json.allComments[i].commText+`' aria-describedby="sizing-addon3">
                                            <button id="sendEditButton`+json.allComments[i].id+`" class="btn btn-primary" type="button"><i class="fa fa-send"></i>Send</button>
                                        </div>
                                        <button id="delete-`+json.allComments[i].id+`" type="button" class="btn btn-danger btn-sm"><i class="fa fa-trash"></i >Delete</button>
                                    </div>                                
                                </div>
                            </div>
                        </td>
                    </tr>
                </table>
            </li>`);
            $('#sendReplyButton'+json.allComments[i].id).on('click',{artId:articleId,prntId:json.allComments[i].id},postComment);
            $('#sendEditButton'+json.allComments[i].id).on('click',{commid:json.allComments[i].id,artId:articleId},editComment);
            $('#delete-'+json.allComments[i].id).on('click',{commid:json.allComments[i].id,artId:articleId},deleteComment);
            if (json.allComments[i].writerID!=JSON.parse(sessionStorage.User).id)
            {
                $('#edit-'+json.allComments[i].id).hide();
                $('#delete-'+json.allComments[i].id).hide();
            }
       }
            $(".comment").unbind().click(function(){
        
        var currentComment = $(this).data("commentid");      

        $("#commentactions-" + currentComment).slideDown("fast");
        
    });

    
    $(".commentLi").hover(function(){

        var currentComment = $(this).data("commentid");
            
        $("#comment-" + currentComment).stop().animate({opacity: "1", backgroundColor: "#f8f8f8", borderLeftWidth: "4px"},{duration: 100, complete: function() {}} );     
        
    }, function () {
        
        var currentComment = $(this).data("commentid");
            
        $("#comment-" + currentComment).stop().animate({opacity: "1", backgroundColor: "#fff", borderLeftWidth: "1px"},{duration: 100, complete: function() {}} );   
        
        $("#commentactions-" + currentComment).slideUp("fast");

    });
    }
    });

    return`
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css">
	<link rel="stylesheet" href="/static/styles/comments.css">
    <button class='btn btn-link'type='button' data-toggle='collapse' data-target='#commentDiv`+articleId+`' aria-expanded='false' aria-controls='collapseExample'>View Comments </button>
    <div id="commentDiv`+articleId+`" class="collapse" style>
    <div class="chatTiteClontainer">Comments</div>
    <div class="chatHistoryContainer">
        <ul class="formComments" id="commsList`+articleId+`">
        </ul>
    </div>
    
    <div class="input-group input-group-sm chatMessageControls">
        <span class="input-group-addon" id="sizing-addon3">Comment</span>
        <input type="text" id="baseInput`+articleId+`" class="form-control" placeholder="Type your message here.." aria-describedby="sizing-addon3">    
        <span class="input-group-btn">
            <button id="sendMessageButton`+articleId+`" class="btn btn-primary" type="button"><i class="fa fa-send"></i>Send</button>
        </span>
        <span class="input-group-btn">
        </span>
    </div>`
}