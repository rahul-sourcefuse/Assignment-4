var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var _a;
var dat;
function userCreatedDate() {
    return function (target, propertyKey, descriptor) {
        var d = new Date();
        var dt = d.getDate() +
            " " +
            d.toLocaleString("en-US", { month: "long" }) +
            " " +
            d.getFullYear() +
            " Time: " +
            d.getHours() +
            ":" +
            d.getMinutes();
        dat = dt.toString();
    };
}
var User = /** @class */ (function () {
    function User(UsersData) {
        this.UsersData = UsersData;
    }
    User.prototype.addUser = function (arr) {
        console.log(arr.target[1].value);
        var newUser = [];
        for (var i = 0; i < arr.target.length; i++) {
            newUser.push(arr.target[i].value);
        }
        newUser.push(dat);
        UsersData.push(newUser);
        var placeholder = document.querySelector("#data-output");
        var out = "";
        out = "<tr>\n<td>" + newUser[0] + " </td>\n<td>" + newUser[1] + "</td>\n<td>" + newUser[2] + "</td>\n<td>" + newUser[3] + "</td>\n<td>" + newUser[4] + "</td>\n<td>" + newUser[5] + "</td>\n<td>" + newUser[6] + "</td>\n<td>" + dat + "</td>\n\n<td id=\"buttons\"><button onclick=\"buttons(this)\">Edit</button> <button onclick=\"removeTr(this)\">Delete</button></button></td>\n</tr>";
        placeholder.innerHTML += out;
        console.log(out);
        console.log(user);
    };
    User.prototype.buttons = function (e) {
        var ide = e.parentNode.parentNode;
        var prevData = ide;
        console.log(ide);
        ide.contentEditable = "true";
        ide.id = "edit";
        console.log("edit");
        document.getElementById("buttons").contentEditable = "false";
        //  var editElem = document.getElementById("edit");
        var saveBtn = document.getElementById("saveid");
        if (!saveBtn) {
            //#myElementID element DOES NOT exist
            var savebutton = document.createElement("button");
            savebutton.innerHTML = "Save";
            savebutton.className = "save";
            savebutton.id = "saveid";
            document.getElementById("btn").appendChild(savebutton);
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
            document.getElementById("btn").appendChild(cancelButton);
            cancelButton.onclick = function () {
                cancelTr(prevData, this, cancelButton, savebutton);
            };
        }
        function saveEdits() {
            console.log("saveEdits");
            //get the editable element
            var editElem = document.getElementById("edit");
            //get the edited element content
            var userVersion = editElem.innerHTML;
            //save the content to local storage
            localStorage.userEdits = userVersion;
            //write a confirmation to the user
            //   document.getElementById("update").innerHTML="Edits saved!";
            document.getElementById("btn").removeChild(savebutton);
            document.getElementById("btn").removeChild(cancelButton);
            savebutton.addEventListener("click", saveEdits);
        }
    };
    User.prototype.removeTr = function (e) {
        var ide = e.parentNode.parentNode;
        console.log(ide);
        var p = ide.parentNode;
        p.removeChild(ide);
        // document.getElementById("btn").removeChild(savebutton);
    };
    __decorate([
        userCreatedDate()
    ], User.prototype, "addUser");
    return User;
}());
var Role;
(function (Role) {
    Role["SuperAdmin"] = "SuperAdmin";
    Role["Admin"] = "Admin";
    Role["Subscriber"] = "subscriber";
})(Role || (Role = {}));
var UsersData = [];
var columnData = [];
function hideTable() {
    document.getElementById("table").style.visibility = "hidden";
}
function load() {
    document.getElementById("load").innerText = "Refresh Data";
    document.getElementById("table").style.visibility = "visible";
    fetch("/server/src/users/data.json")
        .then(function (response) {
        return response.json();
    })
        .then(function (users) {
        var placeholder = document.querySelector("#data-output");
        var out = "";
        var i = 0;
        var myData = Object.values(users);
        for (var i_1 = 0; i_1 < myData.length; i_1++) {
            var columnData_1 = Object.values(myData[i_1]);
            UsersData.push(columnData_1);
        }
        console.log(UsersData);
        for (var _i = 0, myData_1 = myData; _i < myData_1.length; _i++) {
            var userItem = myData_1[_i];
            var data = void 0;
            data = Object.values(userItem);
            console.log(data);
            out += "\n             <tr id=\"t" + i + "\">\n                <td>" + data[1] + " </td>\n                <td>" + data[2] + "</td>\n                <td>" + data[3] + "</td>\n                <td>" + data[4] + "</td>\n                <td>" + data[5] + "</td>\n                <td>" + data[6] + "</td>\n                <td>" + data[7] + "</td>\n                <td>" + data[8] + "</td>\n                <td id=\"buttons\"><button onclick=\"user.buttons(this)\">Edit</button> <button onclick=\"user.removeTr(this)\">Delete</button></button></td>\n               \n             </tr>\n          ";
            i++;
        }
        placeholder.innerHTML = out;
        console.log("loaded");
    });
}
var user = new User(UsersData);
(_a = document.getElementById("form")) === null || _a === void 0 ? void 0 : _a.addEventListener("submit", function (e) {
    e.preventDefault();
    if (e.target[5].value in Role) {
        user.addUser(e);
    }
    else {
        alert(e.target[5].value +
            " role is not valid . Please choose from the given role : SuperAdmin , Admin , Subscriber");
        return;
    }
});
function cancelTr(p, e, btn, sbtn) {
    var index = p.rowIndex;
    console.log(UsersData[index]);
    // console.log(p.cells);
    console.log(UsersData);
    for (var i = 0; i < UsersData[index].length; i++) {
        p.cells[i].innerHTML = UsersData[index][i];
    }
    document.getElementById("btn").removeChild(sbtn);
    document.getElementById("btn").removeChild(btn);
}
