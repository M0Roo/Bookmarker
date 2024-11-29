var siteName = document.getElementById("name");
var siteUrl = document.getElementById("url");

var tableBody = document.getElementById("tbody");
var allSites = [];

allSites = JSON.parse(localStorage.getItem("site"));
display();

function saveUrl() {
    if (validation(siteName) && validation(siteUrl) ) {
        var oneSite = {
            name: siteName.value,
            url: siteUrl.value,
        };
        allSites.push(oneSite);
        localStorage.setItem("site", JSON.stringify(allSites));
        display();
        clearInputs();
    }
    else{
      Swal.fire({
        title: "Site Name or Url is not valid, Please follow the rules below :",
        html:`<p><i class="fa-solid fa-circle-arrow-right text-danger"></i> Site name must contain at least 3 characters</p>
              <p><i class="fa-solid fa-circle-arrow-right text-danger"></i> Site URL must be a valid one</p>`,    
        showCloseButton: true,

    });
    }
}

//display
function display() {
    var content = "";
    for (var i = 0; i < allSites.length; i++) {
        content += `
                    <tr>
                <td>${i + 1}</td>
                <td>${allSites[i].name}</td>
                <td >
                    <button type="button" class="btn btn-success" onclick="visitUrl(${i})">
                        <i class="fa-solid fa-eye"></i>
                        Visit</button>
                </td>
    
                <td >
                    <button type="button" class="btn btn-danger"  onclick="deleteUrl(${i})" >
                        <i class="fa-solid fa-trash-can"></i>
                        Delete</button>
                </td>
            </tr>
        `;
    }
    tableBody.innerHTML = content;
}

//delete button
function deleteUrl(index) {
    allSites.splice(index, 1);
    localStorage.setItem("site", JSON.stringify(allSites));
    display();
}
"".includes()
//visit button
function visitUrl(index){
  if(allSites[index].url.includes("https://") ){

    window.open(allSites[index].url, "_blank");
  }
  else{
    window.open('https://'+allSites[index].url, "_blank");
  }
  
  
}

//clear inputs field
function clearInputs() {
    siteName.value = null;
    siteUrl.value = null;
}

var regex = {
    name: /^\w{3,}$/,
    url: /^(https?:\/\/)?([\w.-]+)\.([a-z]{2,})(:\d+)?(\/[\w.-]*)*\/?(\?[^\s]*)?(#[^\s]*)?$/i,
};

function validation(input) {
    if (regex[input.id].test(input.value)) {
        input.classList.add("is-valid");
        input.classList.remove("is-invalid");
        return true;
    } else {
        input.classList.add("is-invalid");
        input.classList.remove("is-valid");
        return false;
    }
}




