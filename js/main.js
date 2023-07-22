var BookmarkName = document.getElementById("BookmarkName");
var SiteURL = document.getElementById("SiteURL");
var updateIndex = 0;

var BookmarkContainer = [];

if (getFromLocal() != null) {
    BookmarkContainer = getFromLocal();
    displayData();
}

/********fff */

function SubmitWebsite() {
    if (isAlreadyFound())
        return;

    var url = SiteURL.value;
    if (!url.startsWith("https://"))
        url = "https://" + url;
    var Submit = {
        BookmarkName: BookmarkName.value,
        URL: url
    };

    BookmarkContainer.push(Submit);

    addToLocal();
    displayData();
}

function isAlreadyFound() {
    var isFound = false;
    for (var i = 0; i < BookmarkContainer.length; i++) {
        if (BookmarkName.value === BookmarkContainer[i].BookmarkName) {
            isFound = true;
            break;
        }
    }
    return isFound;
}

function displayData() {
    var Containerbox = ``;
    for (var i = 0; i < BookmarkContainer.length; i++) {
        Containerbox += `  
       <tr>
       <td>${[i + 1]}</td>
       <td>${BookmarkContainer[i].BookmarkName}</td>
       <td> 
        <button class="clicks1 btn btn-md  text-white" onclick="window.open( '${BookmarkContainer[i].URL}', '_blank' )"><i class="fa-solid fa-eye" style="color: #ffffff;"></i> Visit</button> </td>
        <td><button class="clicks2 btn btn-md text-white" onclick="deleteBookmark( ${i} )"><i class="fa-solid fa-trash-can" style="color: #ffffff;"></i>Delete</button>
        </td>
    </tr>
       `;
    }

    document.getElementById("tableData").innerHTML = Containerbox;
}

function deleteBookmark(index) {
    BookmarkContainer.splice(index, 1);

    displayData();
    addToLocal();
}
function addToLocal() {
    localStorage.setItem("Bookmarks", JSON.stringify(BookmarkContainer));
}
function getFromLocal() {
    return JSON.parse(localStorage.getItem("Bookmarks"));
}

function clearForm() {
    BookmarkName.value = "";
    SiteURL.value = "";
}

addBtn.onclick = function () {
    SubmitWebsite();
    displayData();
    clearForm();
};

/*function setBookmarkData(indexUpdate) {
   updateIndex = indexUpdate;
 
   var currentBookmark = Container[indexUpdate];
 
   BookmarkName.value = currentBookmark.;
   SiteURL.value = curentProduct.price;
 
   updateBtn.classList.remove("d-none");
   addBtn.classList.add("d-none");
}*/
