import React from "react"


export default function Datatable({ data }){

    const columns = data[0] && Object.keys(data[0]);

    // function GetSelected() {
    //   //Reference the Table.
    //   var grid = document.getElementById("itemsTable");
      
    //   //Reference the CheckBoxes in Table.
    //   var checkBoxes = grid.getElementsByTagName("INPUT");
    //   var message = "Name effect              description                  Damage\n";
  
    //   //Loop through the CheckBoxes.
    //   for (var i = 0; i < checkBoxes.length; i++) {
    //     if(checkBoxes[i].checked) {
    //       var row = checkBoxes[i].parentNode.parentNode;
    //       message += row.cells[1].innerHTML;
    //       message += "   " + row.cells[2].innerHTML;
    //       message += "   " + row.cells[3].innerHTML;
    //       message += "\n";
    //     }
    //   }
  
    //   //Display selected Row data in Alert Box.
    //   alert(message);
    //   }

      function clickEvent(){
        
        var grid = document.getElementById("itemsTable");
        
        //Reference the CheckBoxes in Table.
        var checkBoxes = grid.getElementsByTagName("INPUT");
        var message = ""
        // var message = "Name                  effect              description                  Damage\n";
        
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
    
  

    return(
        <table cellSpacing={0} id="itemsTable"> 
            <thead>
                {/* Display headers */}
                <tr>
                  <th> </th>
                  {data[0] && columns.map((heading) => <th>{heading}</th>)}
                  </tr>
            </thead>

            <tbody>
                {/* Iterate over data and dislpay each row */}
                {data.map((row) => 
                    <tr>
                      <td> <input type="checkbox" /> </td>
                        {columns.map((column) => 
                            <td>{row[column]}</td>
                        )}
                    </tr>
                )}
            </tbody>
            <button type="button" value="Get Selected" onClick={clickEvent}> Get Selected Rows </button>

            
        </table>
    );
}