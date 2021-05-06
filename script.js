// Code written by Léon GALL
// No copyright on code

// Class constructor of a list item
function listItem(task, realised) {
  if (typeof task === "string") {
    this.task = task;
  }
  if (typeof realised === "boolean") {
    this.realised = realised;
  }
}

// The list to save our to do list
var list = [];

// JQuery code
$(document).ready(function () {
  // Event on click on realised task.
  $("#todolist").on("click", "li", function () {
    $(this).toggleClass("done");
  });

  // Event on click to add a task
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

  // Event by clicking the save button
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

  // Event on click on the restore button
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

  // Event on click to delete a task
  $("#todolist").on("click", ".delete", function () {
    $(this)
      .parent()
      .slideUp(function () {
        $(this).remove();
      });
  });

  // Event on submit to add a task 
  $("form").on("submit", function () {
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
    return false;
  });
});
