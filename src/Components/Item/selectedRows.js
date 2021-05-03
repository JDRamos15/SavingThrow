function GetSelected() {
    //Reference the Table.
    var grid = document.getElementById("Table1");
    
    //Reference the CheckBoxes in Table.
    var checkBoxes = grid.getElementsByTagName("INPUT");
    var message = "Id Name                  Country\n";

    //Loop through the CheckBoxes.
    for (var i = 0; i < checkBoxes.length; i++) {
      if(checkBoxes[i].checked) {
        var row = checkBoxes[i].parentNode.parentNode;
        message += row.cells[1].innerHTML;
        message += "   " + row.cells[2].innerHTML;
        message += "   " + row.cells[3].innerHTML;
        message += "\n";
      }
    }

    //Display selected Row data in Alert Box.
    alert(message);
    }