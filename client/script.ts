let dat: string;
function userCreatedDate() {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
      let d: Date = new Date();
      let dt =
        d.getDate() +
        " " +
        d.toLocaleString("en-US", { month: "long" }) +
        " " +
        d.getFullYear() +
        " Time: " +
        d.getHours() +
        ":" +
        d.getMinutes();
        dat = dt.toString();
  }
}

interface UserAction <T> {
  UsersData: Array<Array<string>>;
  addUser(refer: any): void;
  buttons(e:T):void;
  removeTr(e: T):void;
}

class User<T> implements UserAction<T> {
  
  constructor(public UsersData: Array<Array<string>>) {}
  @userCreatedDate()
  addUser(arr: any) {
    console.log(arr.target[1].value);
    let newUser : any=[];
    for(let i=0;i<arr.target.length;i++){
      newUser.push(arr.target[i].value)
    }
    newUser.push(dat);
    UsersData.push(newUser);
    let placeholder = document.querySelector("#data-output");
    var out = "";
    out = `<tr>
<td>${newUser[0]} </td>
<td>${newUser[1]}</td>
<td>${newUser[2]}</td>
<td>${newUser[3]}</td>
<td>${newUser[4]}</td>
<td>${newUser[5]}</td>
<td>${newUser[6]}</td>
<td>${dat}</td>

<td id="buttons"><button onclick="buttons(this)">Edit</button> <button onclick="removeTr(this)">Delete</button></button></td>
</tr>`;
    placeholder!.innerHTML += out;
    console.log(out);
    console.log(user);
  }
  buttons(e: any) {
    var ide = e.parentNode.parentNode;
    var prevData = ide;
    console.log(ide);
    ide.contentEditable = "true";
    ide.id = "edit";
    console.log("edit");
  
    document.getElementById("buttons")!.contentEditable = "false";
  
    //  var editElem = document.getElementById("edit");
    var saveBtn = document.getElementById("saveid");
    if (!saveBtn) {
      //#myElementID element DOES NOT exist
      var savebutton = document.createElement("button");
      savebutton.innerHTML = "Save";
      savebutton.className = "save";
      savebutton.id = "saveid";
  
      document.getElementById("btn")!.appendChild(savebutton);
      savebutton.onclick = function () {
        saveEdits();
      };
    }
  
    var cancelBtn = document.getElementById("cancelid");
    if (!cancelBtn) {
      //#myElementID element DOES NOT exist
  
      var cancelButton = document.createElement("button");
      cancelButton.innerHTML = "Cancel";
      cancelButton.className = "cancel";
      cancelButton.id = "cancelid";
      document.getElementById("btn")!.appendChild(cancelButton);
  
      cancelButton.onclick = function () {
        cancelTr(prevData, this, cancelButton, savebutton);
      };
    }
  
    function saveEdits() {
      console.log("saveEdits");
  
      //get the editable element
      var editElem = document.getElementById("edit");
  
      //get the edited element content
      var userVersion = editElem!.innerHTML;
  
      //save the content to local storage
      localStorage.userEdits = userVersion;
  
      //write a confirmation to the user
      //   document.getElementById("update").innerHTML="Edits saved!";
      document.getElementById("btn")!.removeChild(savebutton);
  
      document.getElementById("btn")!.removeChild(cancelButton);
  
      savebutton.addEventListener("click", saveEdits);
    }
  }
  removeTr(e: any) {
    var ide = e.parentNode.parentNode;
    console.log(ide);
    var p = ide.parentNode;
    p.removeChild(ide);
  
    // document.getElementById("btn").removeChild(savebutton);
  }

}

enum Role {
  SuperAdmin = "SuperAdmin",
  Admin = "Admin",
  Subscriber = "subscriber",
}

let UsersData: Array<Array<string>> = [];
let columnData: Array<string> = [];

function hideTable() {
  document.getElementById("table")!.style.visibility = "hidden";
}

function load() {
  document.getElementById("load")!.innerText = "Refresh Data";
  document.getElementById("table")!.style.visibility = "visible";
  fetch("/server/src/users/data.json")
    .then(function (response) {
      return response.json();
    })
    .then(function (users) {
      var placeholder = document.querySelector("#data-output");
      let out = "";
      let i = 0;

      var myData:any = Object.values(users);
    for(let i=0;i<myData.length;i++){
      let columnData:any=Object.values(myData[i]);
      UsersData.push(columnData);

    }
    console.log(UsersData);

      for (let userItem of myData) {
        let data:any;
        data=Object.values(userItem);
        console.log(data);
        out += `
             <tr id="t${i}">
                <td>${data[1]} </td>
                <td>${data[2]}</td>
                <td>${data[3]}</td>
                <td>${data[4]}</td>
                <td>${data[5]}</td>
                <td>${data[6]}</td>
                <td>${data[7]}</td>
                <td>${data[8]}</td>
                <td id="buttons"><button onclick="user.buttons(this)">Edit</button> <button onclick="user.removeTr(this)">Delete</button></button></td>
               
             </tr>
          `;
        i++;
       
      }
      placeholder!.innerHTML = out;
      console.log("loaded");
    });
}

let user = new User(UsersData);

document.getElementById("form")?.addEventListener("submit", (e: any) => {
  e.preventDefault();
  if (e.target[5].value in Role) {
    user.addUser(e);
  } else {
    alert(
      e.target[5].value +
        " role is not valid . Please choose from the given role : SuperAdmin , Admin , Subscriber"
    );
    return;
  }
});


function cancelTr(p: any, e: any, btn: any, sbtn: any) {
  var index = p.rowIndex;
  console.log(UsersData[index]);

  // console.log(p.cells);
  console.log(UsersData);

  for (let i = 0; i < UsersData[index].length; i++) {
    p.cells[i].innerHTML = UsersData[index][i];
  }
  document.getElementById("btn")!.removeChild(sbtn);
  document.getElementById("btn")!.removeChild(btn);
}


