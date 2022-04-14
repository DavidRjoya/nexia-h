var users = [{
        id: 1,
        regional: "Cali",
        codigo: "RG-01",
    },
    {
        id: 2,
        regional: "Medellin",
        codigo: "RG-02",
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
    var regionalInput = $('input[name="regional"]').val().trim();
    var codigoInput = $('input[name="codigo"]').val().trim();

    if (regionalInput && codigoInput) {
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
                      <label for="regional">Regional</label>
                      <input class="form-control" type="text" name="regional" value="${user.regional}"/>
                      <label for="codigo">Codigo</label>
                      <input class="form-control" type="text" name="codigo" value="${user.codigo}"/>

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
    var action = confirm("Esta seguro de Eliminar la regional?");
    var msg = "Regional Eliminada con Exito!";
    users.forEach(function(user, i) {
        if (user.id == id && action != false) {
            users.splice(i, 1);
            $("#userTable #user-" + user.id).remove();
            flashMessage(msg);
        }
    });
}

function updateUser(id) {
    var msg = "Regional Actualizada con Exito!";
    var user = {};
    user.id = id;
    users.forEach(function(user, i) {
        if (user.id == id) {
            $("#updateUser").children("input").each(function() {
                var value = $(this).val();
                var attr = $(this).attr("name");
                if (attr == "regional") {
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
                    $(this).text(user.regional);
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
              <td class="userData" name="regional">${user.regional}</td>
              '<td class="userData" name="codigo">${user.codigo}</td>
              '<td align="center">
                  <button class="btn_verde btn-success form-control" onClick="editUser(${user.id})" data-toggle="modal" data-target="#myModal")">EDIT</button>
              </td>
              <td align="center">
                  <button class="btn_red btn-danger form-control" onClick="deleteUser(${user.id})">DELETE</button>
              </td>
          </tr>
      `);
}