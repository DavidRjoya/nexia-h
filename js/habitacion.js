var users = [{
    id: 1,
    numero:"110",
    cupo:"1",
    tipo:"Individual",
    sede: "San Cayetano",
},  
{
    id: 2,
    numero:"120",
    cupo:"5",
    tipo:"Suit",
    sede: "Laureles",
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
var numeroInput = $('input[name="numero"]').val().trim();
var cupoInput = $('input[name="cupo"]').val().trim();
var tipoInput = $('input[name="tipo"]').val().trim();
var sedeInput = $('input[name="sede"]').val().trim();

if (numeroInput &&cupoInput &&tipoInput && sedeInput) {
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
                  <label for="numero">Numero de Habitacion</label>
                  <input class="form-control" type="text" name="numero" value="${user.numero}"/>
                  <label for="cupo">Cupo Máximo</label>
                  <input class="form-control" type="text" name="cupo" value="${user.cupo}"/>
                  <label for="tipo">Tipo</label>
                  <input class="form-control" type="text" name="tipo" value="${user.tipo}"/>
                  <label for="sede">Sede</label>
                  <input class="form-control" type="text" name="sede" value="${user.sede}"/>

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
var action = confirm("Esta seguro de Eliminar la Habitación?");
var msg = "Habitación Eliminada con Exito!";
users.forEach(function(user, i) {
    if (user.id == id && action != false) {
        users.splice(i, 1);
        $("#userTable #user-" + user.id).remove();
        flashMessage(msg);
    }
});
}

function updateUser(id) {
var msg = "Habitación Actualizada con Exito!";
var user = {};
user.id = id;
users.forEach(function(user, i) {
    if (user.id == id) {
        $("#updateUser").children("input").each(function() {
            var value = $(this).val();
            var attr = $(this).attr("name");
            if (attr == "numero") {
                user.numero = value;
            } else if  (attr == "cupo"){
                user.cupo = value;
            }else if  (attr == "tipo"){
                user.tipo = value;
            }else if  (attr == "sede"){
                user.sede = value;
            }
        });
        users.splice(i, 1);
        users.splice(user.id - 1, 0, user);
        $("#userTable #user-" + user.id).children(".userData").each(function() {
            var attr = $(this).attr("name");
            if (attr == "numero") {
                $(this).text(user.numero);
            } else if (attr == "cupo") {
                $(this).text(user.cupo);
            }else if (attr == "tipo") {
                $(this).text(user.tipo);
            }else {
                $(this).text(user.sede);
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
          <td class="userData" name="numero">${user.numero}</td>
          '<td class="userData" name="cupo">${user.cupo}</td>
          '<td class="userData" name="tipo">${user.tipo}</td>
          '<td class="userData" name="sede">${user.sede}</td>
          '<td align="center">
              <button class="btn_verde btn-success form-control" onClick="editUser(${user.id})" data-toggle="modal" data-target="#myModal")">EDIT</button>
          </td>
          <td align="center">
              <button class="btn_red btn-danger form-control" onClick="deleteUser(${user.id})">DELETE</button>
          </td>
      </tr>
  `);
}