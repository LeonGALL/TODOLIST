function listItem(task, realised) {
  if (typeof task === "string") {
    this.task = task;
  }
  if (typeof realised === "boolean") {
    this.realised = realised;
  }
}

var list = [];

$(document).ready(function () {
  $("#todolist").on("click", "li", function () {
    $(this).toggleClass("done");
  });

  $("form button").click(function () {
    var a = $("#inputval").val();
    if (a !== "") {
      let div = $('<div><button type="button" class="delete">X</button></div>');
      div.prepend($("<li></li>").text(a));
      div.slideUp(1);
      $("#todolist").append(div);
      div.slideDown(function () {
        $("#inputval").val("");
      });
    }
  });

  $("#save").click(function () {
    list = [];
    $("#todolist li").each(function () {
      let b = new listItem($(this).text(), $(this).hasClass("done"));
      list.push(b);
    });

    if (typeof Storage !== "undefined") {
      localStorage.list_todo = JSON.stringify(list);
    } else {
      console.log(
        "Accès impossible au stockage local. Les données n'ont pas pu être sauvegardés."
      );
    }
  });

  $("#restore").click(function () {
    $("#todolist").slideUp(function () {
      let sauvegarde = localStorage.list_todo;
      if (sauvegarde == null) {
        console.log("Pas de données sauvegardées.");
      } else {
        sauvegarde = JSON.parse(sauvegarde);
        $("#todolist div").remove();
        sauvegarde.forEach((e) => {
          let c = new listItem();
          Object.assign(c, e);
          let d = $("<li></li>").text(e.task);
          if (e.realised) {
            d.addClass("done");
          }
          let div = $(
            '<div><button type="button" class="delete">X</button></div>'
          );
          div.prepend(d);
          $("#todolist").append(div);
        });
      }
    });
    $("#todolist").slideDown();
  });

  $("#todolist").on("click", ".delete", function () {
    $(this)
      .parent()
      .slideUp(function () {
        $(this).remove();
      });
  });
});
