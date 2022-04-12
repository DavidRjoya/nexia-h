var users = [{
        id: 1,
        name: "Bob",
        address: "Manila",
        age: "bobslld3",
        rol: "Administrador"
    },
    {
        id: 2,
        name: "Harry",
        address: "Baguio",
        age: "contrsfgg5",
        rol: "Recepcionista"
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
    var addressInput = $('input[name="address"]').val().trim();
    var ageInput = $('input[name="age"]').val().trim();
    var rolInput = $('input[name="rol"]').val().trim();

    if (nameInput && addressInput && ageInput && rolInput) {
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
                      <label for="name">Nombre</label>
                      <input class="form-control" type="text" name="name" value="${user.name}"/>
                      <label for="address">Usuario</label>
                      <input class="form-control" type="text" name="address" value="${user.address}"/>
                      <label for="age">Contraseña</label>
                      <input class="form-control" type="text" name="age" value="${user.age}" />
                      <label for="rol">rol</label>
                      <input class="form-control" type="text" name="rol" value="${user.rol}"/>
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
    var action = confirm("Esta seguro de Eliminar el usuario?");
    var msg = "Usuario Eliminado con Exito!";
    users.forEach(function(user, i) {
        if (user.id == id && action != false) {
            users.splice(i, 1);
            $("#userTable #user-" + user.id).remove();
            flashMessage(msg);
        }
    });
}

function updateUser(id) {
    var msg = "Usuario Actualizado con Exito!";
    var user = {};
    user.id = id;
    users.forEach(function(user, i) {
        if (user.id == id) {
            $("#updateUser").children("input").each(function() {
                var value = $(this).val();
                var attr = $(this).attr("name");
                if (attr == "name") {
                    user.name = value;
                } else if (attr == "address") {
                    user.address = value;
                } else if (attr == "age") {
                    user.age = value;
                }else if (attr == "rol") {
                    user.rol = value;
                }
            });
            users.splice(i, 1);
            users.splice(user.id - 1, 0, user);
            $("#userTable #user-" + user.id).children(".userData").each(function() {
                var attr = $(this).attr("name");
                if (attr == "name") {
                    $(this).text(user.name);
                } else if (attr == "address") {
                    $(this).text(user.address);
                } else if  (attr == "age"){
                    $(this).text(user.age);
                } else {
                    $(this).text(user.rol);
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
              '<td class="userData" name="address">${user.address}</td>
              '<td id="tdAge" class="margincon userData" name="age">${user.age}</td>
              '<td class="userData" name="rol">${user.rol}</td>
              '<td align="center">
                  <button class="btn_verde btn-success form-control" onClick="editUser(${user.id})" data-toggle="modal" data-target="#myModal")">EDIT</button>
              </td>
              <td align="center">
                  <button class="btn_red btn-danger form-control" onClick="deleteUser(${user.id})">DELETE</button>
              </td>
          </tr>
      `);
}