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
        },
    });
}


$('#subscribeSport').on('click', (event) => {
    event.preventDefault();
    setDisabled("subscribeSport");
    postFavourite("Sport");
    setActive("SubmitButton");
});

$('#subscribeFinance').on('click', (event) =>{
    console.log("Finance");
    event.preventDefault();
    postFavourite("Finance");
    setDisabled("subscribeFinance");
    setActive("SubmitButton");
});

$('#subscribeTech').on('click', (event) =>{
    event.preventDefault();
    setDisabled("subscribeTech");
    postFavourite("Tech");
    setActive("SubmitButton");
});

$('#subscribeEducation').on('click', (event) =>{
    event.preventDefault();
    setDisabled("subscribeEducation");
    postFavourite("Education");
    setActive("SubmitButton");
});

$('#subscribeHealth').on('click', (event) =>{
    event.preventDefault();
    setDisabled("subscribeHealth");
    postFavourite("Health");
    setActive("SubmitButton");  
});

$('#subscribePolitics').on('click', (event) =>{
    event.preventDefault();
    setDisabled("subscribePolitics");
    postFavourite("Politics");
    setActive("SubmitButton");
});

$('#SubmitButton').on('click', (event) =>{
    event.preventDefault();
    setTimeout(1000)
    location.href = "/homepage";
});

function setDisabled(x) {
    document.getElementById(x).disabled = true;
}
function setActive(x) {
    document.getElementById(x).removeAttribute('disabled'); 
}
