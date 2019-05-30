document.getElementById('myForm').addEventListener('submit', saveBookmark);
window.addEventListener('DOMContentLoaded', showBookmarks, false);

function showBookmarks() {
    let okResult = document.getElementById('bookmarkResults');
    let myBookmarksJSON = localStorage.getItem('bookmarks');
    myBookmarks = JSON.parse(myBookmarksJSON);
    for ( i = 0; i < myBookmarks.length; i++){
        okResult.innerHTML = showBookmarkHTML(myBookmarks[i]);
        return;
    }
};

function saveBookmark(e){
    e.preventDefault();

    let siteName = document.getElementById('websiteName').value;
    let siteUrl = document.getElementById('websiteUrl').value;

    let myObject = {
        name: siteName,
        url: siteUrl
    };

    let myBookmarks = [];
    let myBookmarksJSON = localStorage.getItem('bookmarks');
    if(localStorage.getItem('bookmarks') !== null){
        myBookmarks = JSON.parse(myBookmarksJSON);
        for(let i=0; i < myBookmarks.length; i++ ){
            if(myBookmarks[i].name === myObject.name || myBookmarks[i].url === myObject.url){
                addNotOkResult(myObject);
                return;
            }
        }
    }
    myBookmarks.push(myObject);
    localStorage.setItem('bookmarks', JSON.stringify(myBookmarks));
    addOkResult(myObject);
};

function addOkResult (myObject){
    let okResult = document.getElementById('bookmarkResults');
    let title = `name = ${myObject.name} url = ${myObject.url}`;
    let message = "Bookmark Added Successfully";
    okResult.innerHTML += addResult(title, message, 'alert-success');
};

function addNotOkResult (myObject){
    let notOkResult = document.getElementById('bookmarkResults');
    let title = `name = ${myObject.name} url = ${myObject.url}`; 
    let message = "Bookmark Not Added, or Duplicate Exists";
    notOkResult.innerHTML += addResult(title, message, 'alert-danger'); 
};

function showBookmarkHTML (myObject){
    return `
    <div class="card text-white bg-primary mb-3 col-md-4 offset-md-4 text-center" >
        <div class="card-body">
            <p class="card-text">${myObject.name} / ${myObject.url}</p>
        </div>
    </div>
`
};

function addResult(title, message, color) {
    return `
    <div class="alert alert-dismissible ${color} fade show" role="alert">
        <h5>${title}</h5>
        <p>${message}</p>
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>
    </div>
    `
};