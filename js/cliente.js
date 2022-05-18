var users = [{
    id: 1,
    name: "Bob",
    apellido: "Manila" , 
    identification: "1010101010",
    mail: "prueba@gmail.com",
    genero: "Masculino"
},
{
    id: 2,
    name: "Lady",
    apellido: "Baguio",
    identification: "2020202020",
    mail: "prueba2@gmail.com",
    genero: "Femenino"
}
];

$.each(users, function(i, user) {
appendToUsrTable(user);
});

$("form").submit(function(e) {
e.preventDefault();
});

$("form#addUser").submit(function() {
var user = {};
var nameInput = $('input[name="name"]').val().trim();
var apellidoInput = $('input[name="apellidos"]').val().trim();
var identificationInput = $('input[name="identification"]').val().trim();
var mailInput = $('input[name="mail"]').val().trim();
var generoInput = $('input[name="genero"]').val().trim();

if (nameInput && apellidoInput && identificationInput && mailInput && generoInput) {
    $(this).serializeArray().map(function(data) {
        user[data.name] = data.value;
    });
    var lastUser = users[Object.keys(users).sort().pop()];
    user.id = lastUser.id + 1;

    addUser(user);
} else {
    alert("Todos los campos deben tener un valor valido.");
}
});

function addUser(user) {
users.push(user);
appendToUsrTable(user);
}

function editUser(id) {
users.forEach(function(user, i) {
    if (user.id == id) {
        $(".modal-body").empty().append(`
              <form id="updateUser" action="">
                  <label for="name">Nombres</label>
                  <input class="form-control" type="text" name="name" value="${user.name}"/>
                  <label for="apellido">Apellido</label>
                  <input class="form-control" type="text" name="apellido" value="${user.apellido}"/>
                  <label for="identification"># Identificación</label>
                  <input class="form-control" type="number" name="identification" value="${user.identification}" />
                  <label for="mail">Correo</label>
                  <input class="form-control" type="email" name="mail" value="${user.mail}"/>
                  <label for="genero">Genero</label>
                  <input class="form-control" type="text" name="genero" value="${user.genero}"/>
          `);
        $(".modal-footer").empty().append(`
                  <button type="button" type="submit" class="btn btn-primary" onClick="updateUser(${id})">Save changes</button>
                  <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
              </form>
          `);
    }
});
}

function deleteUser(id) {
var action = confirm("Esta seguro de Eliminar el Cliente?");
var msg = "Cliente Eliminado con Exito!";
users.forEach(function(user, i) {
    if (user.id == id && action != false) {
        users.splice(i, 1);
        $("#userTable #user-" + user.id).remove();
        flashMessage(msg);
    }
});
}

function updateUser(id) {
var msg = "Cliente Actualizado con Exito!";
var user = {};
user.id = id;
users.forEach(function(user, i) {
    if (user.id == id) {
        $("#updateUser").children("input").each(function() {
            var value = $(this).val();
            var attr = $(this).attr("name");
            if (attr == "name") {
                user.name = value;
            } else if (attr == "apellido") {
                user.apellido = value;
            } else if (attr == "identification") {
                user.identification = value;
            } else if (attr == "mail") {
                user.mail = value;
            } else if (attr == "genero") {
                user.genero = value;
            }
        });
        users.splice(i, 1);
        users.splice(user.id - 1, 0, user);
        $("#userTable #user-" + user.id).children(".userData").each(function() {
            var attr = $(this).attr("name");
            if (attr == "name") {
                $(this).text(user.name);
            } else if (attr == "apellido") {
                $(this).text(user.apellido);
            } else if (attr == "identification") {
                $(this).text(user.identification);
            } else if  (attr == "mail"){
                $(this).text(user.mail);
            } else {
                $(this).text(user.genero);
            }
        });
        $(".modal");
        flashMessage(msg);
    }
});
}

function flashMessage(msg) {
$(".flashMsg").remove();
$(".row").prepend(`
<div class="col-sm-12"><div class="flashMsg alert alert-success alert-dismissible fade in" role="alert"> <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">×</span></button> <strong>${msg}</strong></div></div>
  `);
}


function appendToUsrTable(user) {
$("#userTable > tbody:last-child").append(`
      <tr id="user-${user.id}">
           <td class="userData" name="name">${user.name}</td>
          '<td class="userData" name="apellido">${user.apellido}</td>
          '<td class="margincon userData" name="identification">${user.identification}</td>
          '<td class="userData" name="mail">${user.mail}</td>
          '<td class="userData" name="genero">${user.genero}</td>
          '<td align="center">
              <button class="btn_verde btn-success form-control" onClick="editUser(${user.id})" data-toggle="modal" data-target="#myModal")">EDIT</button>
          </td>
          <td align="center">
              <button class="btn_red btn-danger form-control" onClick="deleteUser(${user.id})">DELETE</button>
          </td>
      </tr>
  `);
}