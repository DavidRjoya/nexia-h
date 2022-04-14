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

if (numeroInput && sedeInput) {
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
                  <label for="sede">Numero de Habitacion</label>
                  <input class="form-control" type="text" name="sede" value="${user.numero}"/>
                  <label for="codigo">Cupo Máximo</label>
                  <input class="form-control" type="text" name="codigo" value="${user.cupo}"/>
                  <label for="codigo">Tipo</label>
                  <input class="form-control" type="text" name="regional" value="${user.tipo}"/>
                  <label for="codigo">Sede</label>
                  <input class="form-control" type="text" name="regional" value="${user.sede}"/>

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
            if (attr == "sede") {
                user.regional = value;
            } else if  (attr == "codigo"){
                user.codigo = value;
            }
        });
        users.splice(i, 1);
        users.splice(user.id - 1, 0, user);
        $("#userTable #user-" + user.id).children(".userData").each(function() {
            var attr = $(this).attr("name");
            if (attr == "regional") {
                $(this).text(user.sede);
            } else {
                $(this).text(user.codigo);
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
          <td class="userData" name="sede">${user.numero}</td>
          '<td class="userData" name="codigo">${user.cupo}</td>
          '<td class="userData" name="regional">${user.tipo}</td>
          '<td class="userData" name="regional">${user.sede}</td>
          '<td align="center">
              <button class="btn_verde btn-success form-control" onClick="editUser(${user.id})" data-toggle="modal" data-target="#myModal")">EDIT</button>
          </td>
          <td align="center">
              <button class="btn_red btn-danger form-control" onClick="deleteUser(${user.id})">DELETE</button>
          </td>
      </tr>
  `);
}