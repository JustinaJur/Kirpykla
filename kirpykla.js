var reservations;

// make innerText of day red when no available reservations left
 makeRed = clickedDay => {
   if (reservations[clickedDay.innerHTML].every((item) => item.Name != "none")) {
      clickedDay.classList.add("redText");
   }
}

// mark available reservations white
 markWhite = () => {
   let allRows = Array.from(document.querySelector(".dinamicTable2").querySelectorAll("tr"));   
   allRows.filter(row => row.innerHTML.search("none")>0)
   .map(row => row.classList.add("white"));
 } 
 

//first table
document.querySelector(".green").addEventListener("click", function (event){
   let clickedDay = event.target;
   let td = event.target.innerHTML;
   let nameButton = document.querySelector(".nameButton");
   
   //get current day and ban from selecting previous days
   let date = new Date();
   let currentDay = date.getDate();
   if (td < currentDay) {
      var dinamicTable = document.querySelector(".dinamicTable");
      dinamicTable.innerHTML = "";
      return
   }
   //if clicked on DAY, start building  a table 
   if (event.target.tagName.toLowerCase() === 'td') {
      collectHeaders(td);
	  let current = document.getElementsByClassName("active");
          current[0].className = current[0].className.replace(" active", "");
          clickedDay.className += " active"; 

   }

   ///MAKE RESERVATION
   nameButton.onclick = () => {
      makeReservation(td, clickedDay);
   }
});


 makeReservation = (td, clickedDay) => {
	  let radioId;
      let firstName = document.querySelector(".firstName").value;
      let radios = document.querySelectorAll("input");
      for (var i = 0; i < radios.length; i++) {
         if (radios[i].checked) {
            //radio = radios[i];
            radioId = radios[i].id;
         };
         if (firstName == "" || firstName == " ") {
            alert("registruojantis būtina pasirinkti laiką ir įvesti kontaktinius duomenis");
            return
         }
      }
      //td - day, radioID (checked radio id) - dienos objekto indeksas(valanda)
      reservations[td][radioId].Name = firstName;
      makeRed(clickedDay);
      document.querySelector(".firstName").value = " ";

      collectHeaders(td);
	  alert("Rezervacija atlikta sėkmingai"); 
 }



//CREATE TABLE OF APPOINTMENTS
 collectHeaders = td => {
   let col = [];
   for (var i = 0; i < reservations[td].length; i++) {
      //loop through all keys
      for (var key in reservations[td][i]) {
         //if key is not in col yet, push it there			
         if (col.indexOf(key) === -1) {
            col.push(key);
         }
      }
      createHeaders(td, col)
   }
}


///cia reik pasirinkti kad kurtu kita lentele for dinamictable2
 createHeaders = (td, col) => {
   let table = document.createElement("table");
   //create first row in table, insert it for headers section
   var tr = table.insertRow(-1);

   // kiekvienam pavadinimui sukurk langeli lenteleje
   for (var i = 0; i < col.length; i++) {
      //create table header
      let th = document.createElement("th");
      // give next value to table header from col array
      th.innerHTML = col[i];
      //append table header to table row
      tr.appendChild(th);
   }
   addData(td, col, table)
}


 addData = (td, col, table) => {
   let idCounter = 0; 
//for every object(reservation time) of particular day
   for (var i = 0; i < reservations[td].length; i++) {
      //create a row only if "name" is "none"
    if(reservations[td][i].Name === "none"){
      var tr = table.insertRow(-1); 
}
      let input = document.createElement("input");
      input.setAttribute("type", "radio");
      input.setAttribute("id", idCounter);
      input.setAttribute("name", "firstname");
	  input.setAttribute("class", "radio");
      //tr.setAttribute('id', idCounter);
      idCounter += 1;
      // for every tr and header create a cell (i sona, desine )
      for (var j = 0; j < col.length; j++) {
         // if "name" is "none", show it on table
        if (reservations[td][i][col[1]] === "none") {
             //append a cell to tr
            let tabCell = tr.insertCell(-1);
             //insert data from reservations
            tabCell.innerHTML = reservations[td][i][col[j]];
             // append a radio to tr
            tr.appendChild(input);          
        }
      }
      //tr = document.querySelector(".dinamicTable").querySelectorAll("tr");
}
   // add table to HTML div
   let dinamicTable = document.querySelector(".dinamicTable");
   dinamicTable.innerHTML = "";
   //insert data to empty table
   dinamicTable.appendChild(table);
}




//NEVEIKIA IS PIRMO KARTO.WARUM WARUM???
searchNames = () => {
	 // collectHeaders2(td)
   //console.log(e);
   //console.log(this);
    let firstName = document.querySelectorAll(".firstName")[1].value.toLowerCase();
	console.log(Array.from(document.querySelector(".dinamicTable2").querySelectorAll("tr")));
	console.log(firstName);
	
    let allRows = Array.from(document.querySelector(".dinamicTable2").querySelectorAll("tr"));

	if(firstName !== "") {
		//clear class "yellow"
		allRows.map((row) => row.classList.remove("yellow"));
		
		 var ne = allRows
		//.filter(row => row.innerHTML.toLowerCase().search(firstName.toLowerCase()) > -1);	
		.filter(row => row.innerHTML.toLowerCase().indexOf(firstName) >= 0);
		var nes = ne.map(row => row.classList.add("yellow"));
	}

	console.log(ne);
	console.log(nes);
	console.log(allRows);
  
    document.querySelectorAll(".firstName")[1].value = "";
	
}



//// second table
document.querySelectorAll(".green")[1].addEventListener("click", function (event) {
   let td = event.target.innerHTML;
   let clickedDay = event.target;
   let nameButton = document.querySelectorAll(".nameButton")[1];
   let cancelButton = document.querySelector(".cancelButton");
   let searchButton = document.querySelector(".searchButton");
   //var searchButton = document.querySelector(".searchButton");

   //if clicked on td(day), build a table
   if (event.target.tagName.toLowerCase() === "td") {
      collectHeaders2(td);
	  //add active class
	  let current = document.getElementsByClassName("active");
          current[0].className = current[0].className.replace(" active", "");
          clickedDay.className += " active"; 
   }
   markWhite();

   nameButton.onclick = () => {
      let radioId;
      //get input(name)
      let firstName = document.querySelectorAll(".firstName")[1].value;
      //get selected radio id(reservation time)
      let radios = document.querySelectorAll("input");
	  
      for (var i = 0; i < radios.length; i++) {
         if (radios[i].checked) {
            radioId = radios[i].id;
         };
         if (firstName == "" || firstName == " ") {
            alert("registruojantis būtina pasirinkti laiką ir įvesti kontaktinius duomenis");
            return
         }
      }
      //td - day, radioID (id of checked radio)
	  //update reservations variable
      reservations[td][radioId].Name = firstName;

      let clickedDay = event.target;
      makeRed(clickedDay);
      document.querySelectorAll(".firstName")[1].value = " ";
      //refresh data on screen
      collectHeaders2(td);
      markWhite();
	  alert("Rezervacija atlikta sėkmingai");
	  
	  
	  // let allRows = Array.from(document.querySelector(".dinamicTable2").querySelectorAll("tr"));
	   //console.log(allRows);
   }

   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   cancelButton.onclick = () => {
      let radios = document.querySelectorAll("input");
      for (var i = 0; i < radios.length; i++) {
         if (radios[i].checked) {
            var radio = radios[i];
            var radioId = radios[i].id;
         }
      };

      //cancel reservation
      reservations[td][radioId].Name = "none";
      // update table with text
      collectHeaders2(td);
      //update table with colors
      markWhite();
      alert("Rezervacijos atšaukimas atliktas sėkmingai");
   };

   
   searchButton.onclick = () => {
	  searchNames();
}

});


//build a table
 collectHeaders2 = td => {
   let col = [];
   for (var i = 0; i < reservations[td].length; i++) {
      for (var key in reservations[td][i]) {
         if (col.indexOf(key) === -1) {
            col.push(key);
         }
      }
      createHeaders2(td, col)
   }
}

 createHeaders2 = (td, col) => {
   let table = document.createElement("table");
   let tr = table.insertRow(-1);
   for (var i = 0; i < col.length; i++) {
      let th = document.createElement("th");
      th.innerHTML = col[i];
      tr.appendChild(th);
   }
   addData2(td, col, table)
}

 addData2 = (td, col, table) => {
   let idCounter = 0;
   for (var i = 0; i < reservations[td].length; i++) {
      tr = table.insertRow(-1);
      let input = document.createElement("input");
      input.setAttribute("type", "radio");
      input.setAttribute("id", idCounter);
      input.setAttribute("name", "firstname");
      tr.setAttribute('id', idCounter);
      idCounter += 1;
      for (var j = 0; j < col.length; j++) {
         let tabCell = tr.insertCell(-1);
         tabCell.innerHTML = reservations[td][i][col[j]];
         tr.appendChild(input);
      }
   }
   let dinamicTable2 = document.querySelector(".dinamicTable2");
   dinamicTable2.innerHTML = "";
   dinamicTable2.appendChild(table);
}



///first page (tabs)

showPage = (event, page) => {
   var i, tabcontent, tablinks;

   //show no content
   tabcontent = document.getElementsByClassName("tabcontent");
   for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
   }

   tablinks = document.getElementsByClassName("tablinks");
   for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace("active", "");
   }

   //display page upon onclick and hide picture
   document.getElementById(page).style.display = "grid";
   event.currentTarget.className += " active";
   
   let pic = document.querySelector(".pic");
   pic.style.display = "none";
}


var reservations = {
   
   20: [
      {
         "Time": "10:00",
         "Name": "none"
      },
      {
         "Time": "10:15",
         "Name": "none"
      },
      {
         "Time": "10:30",
         "Name": "none"
      },
      {
         "Time": "10:45",
         "Name": "none",
      },
      {
         "Time": "11:00",
         "Name": "none"
      },
      {
         "Time": "11:15",
         "Name": "Eduardas"
      },
      {
         "Time": "11:30",
         "Name": "none"
      },
      {
         "Time": "11:45",
         "Name": "none"
      },
      {
         "Time": "12:00",
         "Name": "none"
      },
      {
         "Time": "12:15",
         "Name": "none"
      },
      {
         "Time": "12:30",
         "Name": "none"
      },
      {
         "Time": "12:45",
         "Name": "Lina"
      },
      {
         "Time": "13:00",
         "Name": "none"
      },
      {
         "Time": "13:15",
         "Name": "Margarita"
      },
      {
         "Time": "13:30",
         "Name": "none"
      },
      {
         "Time": "13:45",
         "Name": "none"
      },
      {
         "Time": "14:00",
         "Name": "none"
      },
      {
         "Time": "14:15",
         "Name": "Ona"
      },
      {
         "Time": "14:30",
         "Name": "none"
      },
      {
         "Time": "14:45",
         "Name": "none"
      },
      {
         "Time": "15:00",
         "Name": "Elė"

      },
      {
         "Time": "15:15",
         "Name": "none"
      },
      {
         "Time": "15:30",
         "Name": "none"
      },
      {
         "Time": "15:45",
         "Name": "Uno"
      },
      {
         "Time": "16:00",
         "Name": "none"
      },
      {
         "Time": "16:15",
         "Name": "none"
      },
      {
         "Time": "16:30",
         "Name": "none"

      },
      {
         "Time": "16:45",
         "Name": "none"
      },
      {
         "Time": "17:00",
         "Name": "none"
      },
      {
         "Time": "17:15",
         "Name": "none"
      },
      {
         "Time": "17:30",
         "Name": "none"

      },
      {
         "Time": "17:45",
         "Name": "Bronė"
      },
      {
         "Time": "18:00",
         "Name": "none"
      },
      {
         "Time": "18:15",
         "Name": "none"
      },
      {
         "Time": "18:30",
         "Name": "none"
      },
      {
         "Time": "18:45",
         "Name": "Kotryna"
      },
      {
         "Time": "19:00",
         "Name": "none",
      },
      {
         "Time": "19:15",
         "Name": "Ugnė"
      },
      {
         "Time": "19:30",
         "Name": "none"
      },
      {
         "Time": "19:45",
         "Name": "none"
      }
   ],
   21: [
      {
         "Time": "10:00",
         "Name": "none"
      },
      {
         "Time": "10:15",
         "Name": "none"
      },
      {
         "Time": "10:30",
         "Name": "none"
      },
      {
         "Time": "10:45",
         "Name": "none",
      },
      {
         "Time": "11:00",
         "Name": "none"
      },
      {
         "Time": "11:15",
         "Name": "none"
      },
      {
         "Time": "11:30",
         "Name": "none"
      },
      {
         "Time": "11:45",
         "Name": "none"
      },
      {
         "Time": "12:00",
         "Name": "none"
      },
      {
         "Time": "12:15",
         "Name": "none"
      },
      {
         "Time": "12:30",
         "Name": "none"
      },
      {
         "Time": "12:45",
         "Name": "none"
      },
      {
         "Time": "13:00",
         "Name": "none"
      },
      {
         "Time": "13:15",
         "Name": "none"
      },
      {
         "Time": "13:30",
         "Name": "none"
      },
      {
         "Time": "13:45",
         "Name": "none"
      },
      {
         "Time": "14:00",
         "Name": "none"
      },
      {
         "Time": "14:15",
         "Name": "none"
      },
      {
         "Time": "14:30",
         "Name": "none"
      },
      {
         "Time": "14:45",
         "Name": "none"
      },
      {
         "Time": "15:00",
         "Name": "none"

      },
      {
         "Time": "15:15",
         "Name": "none"
      },
      {
         "Time": "15:30",
         "Name": "none"
      },
      {
         "Time": "15:45",
         "Name": "none"
      },
      {
         "Time": "16:00",
         "Name": "none"
      },
      {
         "Time": "16:15",
         "Name": "none"
      },
      {
         "Time": "16:30",
         "Name": "none"

      },
      {
         "Time": "16:45",
         "Name": "none"
      },
      {
         "Time": "17:00",
         "Name": "none"
      },
      {
         "Time": "17:15",
         "Name": "none"
      },
      {
         "Time": "17:30",
         "Name": "none"

      },
      {
         "Time": "17:45",
         "Name": "Bronė"
      },
      {
         "Time": "18:00",
         "Name": "none"
      },
      {
         "Time": "18:15",
         "Name": "none"
      },
      {
         "Time": "18:30",
         "Name": "none"
      },
      {
         "Time": "18:45",
         "Name": "Kotryna"
      },
      {
         "Time": "19:00",
         "Name": "none",
      },
      {
         "Time": "19:15",
         "Name": "Ugnė"
      },
      {
         "Time": "19:30",
         "Name": "none"
      },
      {
         "Time": "19:45",
         "Name": "none"
      }

   ],
   22: [
      {
         "Time": "10:00",
         "Name": "Gediminas"
      },
      {
         "Time": "10:15",
         "Name": "none"
      },
      {
         "Time": "10:30",
         "Name": "Ruta"
      },
      {
         "Time": "10:45",
         "Name": "none",
      },
      {
         "Time": "11:00",
         "Name": "none"
      },
      {
         "Time": "11:15",
         "Name": "none"
      },
      {
         "Time": "11:30",
         "Name": "Marcelijus"
      },
      {
         "Time": "11:45",
         "Name": "none"
      },
      {
         "Time": "12:00",
         "Name": "none"
      },
      {
         "Time": "12:15",
         "Name": "none"
      },
      {
         "Time": "12:30",
         "Name": "none"
      },
      {
         "Time": "12:45",
         "Name": "none"
      },
      {
         "Time": "13:00",
         "Name": "none"
      },
      {
         "Time": "13:15",
         "Name": "none"
      },
      {
         "Time": "13:30",
         "Name": "none"
      },
      {
         "Time": "13:45",
         "Name": "none"
      },
      {
         "Time": "14:00",
         "Name": "none"
      },
      {
         "Time": "14:15",
         "Name": "none"
      },
      {
         "Time": "14:30",
         "Name": "none"
      },
      {
         "Time": "14:45",
         "Name": "none"
      },
      {
         "Time": "15:00",
         "Name": "none"

      },
      {
         "Time": "15:15",
         "Name": "none"
      },
      {
         "Time": "15:30",
         "Name": "none"
      },
      {
         "Time": "15:45",
         "Name": "none"
      },
      {
         "Time": "16:00",
         "Name": "none"
      },
      {
         "Time": "16:15",
         "Name": "Eglė G."
      },
      {
         "Time": "16:30",
         "Name": "none"

      },
      {
         "Time": "16:45",
         "Name": "none"
      },
      {
         "Time": "17:00",
         "Name": "none"
      },
      {
         "Time": "17:15",
         "Name": "none"
      },
      {
         "Time": "17:30",
         "Name": "Liudvikas"

      },
      {
         "Time": "17:45",
         "Name": "Bronė"
      },
      {
         "Time": "18:00",
         "Name": "none"
      },
      {
         "Time": "18:15",
         "Name": "Elena"
      },
      {
         "Time": "18:30",
         "Name": "none"
      },
      {
         "Time": "18:45",
         "Name": "Kotryna"
      },
      {
         "Time": "19:00",
         "Name": "none",
      },
      {
         "Time": "19:15",
         "Name": "Ugnė"
      },
      {
         "Time": "19:30",
         "Name": "none"
      },
      {
         "Time": "19:45",
         "Name": "none"
      }],
   23: [
      {
         "Time": "10:00",
         "Name": "Gediminas"
      },
      {
         "Time": "10:15",
         "Name": "gediminas"
      },
      {
         "Time": "10:30",
         "Name": "Napoleonas"
      },
      {
         "Time": "10:45",
         "Name": "gediminas",
      },
      {
         "Time": "11:00",
         "Name": "gediminas G."
      },
      {
         "Time": "11:15",
         "Name": "none"
      },
      {
         "Time": "11:30",
         "Name": "none"
      },
      {
         "Time": "11:45",
         "Name": "Egle"
      },
      {
         "Time": "12:00",
         "Name": "none"
      },
      {
         "Time": "12:15",
         "Name": "none"
      },
      {
         "Time": "12:30",
         "Name": "none"
      },
      {
         "Time": "12:45",
         "Name": "none"
      },
      {
         "Time": "13:00",
         "Name": "none"
      },
      {
         "Time": "13:15",
         "Name": "Jonas"
      },
      {
         "Time": "13:30",
         "Name": "none"
      },
      {
         "Time": "13:45",
         "Name": "none"
      },
      {
         "Time": "14:00",
         "Name": "none"
      },
      {
         "Time": "14:15",
         "Name": "none"
      },
      {
         "Time": "14:30",
         "Name": "Birute"
      },
      {
         "Time": "14:45",
         "Name": "none"
      },
      {
         "Time": "15:00",
         "Name": "none"

      },
      {
         "Time": "15:15",
         "Name": "none"
      },
      {
         "Time": "15:30",
         "Name": "none"
      },
      {
         "Time": "15:45",
         "Name": "none"
      },
      {
         "Time": "16:00",
         "Name": "none"
      },
      {
         "Time": "16:15",
         "Name": "Monika"
      },
      {
         "Time": "16:30",
         "Name": "none"

      },
      {
         "Time": "16:45",
         "Name": "none"
      },
      {
         "Time": "17:00",
         "Name": "none"
      },
      {
         "Time": "17:15",
         "Name": "none"
      },
      {
         "Time": "17:30",
         "Name": "none"

      },
      {
         "Time": "17:45",
         "Name": "Bronė"
      },
      {
         "Time": "18:00",
         "Name": "none"
      },
      {
         "Time": "18:15",
         "Name": "none"
      },
      {
         "Time": "18:30",
         "Name": "none"
      },
      {
         "Time": "18:45",
         "Name": "Kotryna"
      },
      {
         "Time": "19:00",
         "Name": "none",
      },
      {
         "Time": "19:15",
         "Name": "Ugnė"
      },
      {
         "Time": "19:30",
         "Name": "none"
      },
      {
         "Time": "19:45",
         "Name": "none"
      }],
   24: [
      {
         "Time": "10:00",
         "Name": "Gediminas"
      },
      {
         "Time": "10:15",
         "Name": "none"
      },
      {
         "Time": "10:30",
         "Name": "Napoleonas"
      },
      {
         "Time": "10:45",
         "Name": "none",
      },
      {
         "Time": "11:00",
         "Name": "none"
      }],

   25: [
      {
         "Time": "10:00",
         "Name": "none"
      },
      {
         "Time": "10:15",
         "Name": "Jonas"
      },
      {
         "Time": "10:30",
         "Name": "Napoleonas"
      },
      {
         "Time": "10:45",
         "Name": "Akvilė",
      },
      {
         "Time": "11:00",
         "Name": "Van Gogas"
      }],

   26: [
      {
         "Time": "10:00",
         "Name": "none"
      },
      {
         "Time": "10:15",
         "Name": "none"
      },
      {
         "Time": "10:30",
         "Name": "Giedrė"
      },
      {
         "Time": "10:45",
         "Name": "none",
      },
      {
         "Time": "11:00",
         "Name": "none"
      }],
   27: [
      {
         "Time": "10:00",
         "Name": "none"
      },
      {
         "Time": "10:15",
         "Name": "none"
      },
      {
         "Time": "10:30",
         "Name": "Ruta"
      },
      {
         "Time": "10:45",
         "Name": "none",
      },
      {
         "Time": "11:00",
         "Name": "none"
      },
      {
         "Time": "11:15",
         "Name": "none"
      },
      {
         "Time": "11:30",
         "Name": "none"
      },
      {
         "Time": "11:45",
         "Name": "none"
      },
      {
         "Time": "12:00",
         "Name": "none"
      },
      {
         "Time": "12:15",
         "Name": "none"
      },
      {
         "Time": "12:30",
         "Name": "none"
      },
      {
         "Time": "12:45",
         "Name": "none"
      },
      {
         "Time": "13:00",
         "Name": "none"
      },
      {
         "Time": "13:15",
         "Name": "none"
      },
      {
         "Time": "13:30",
         "Name": "none"
      },
      {
         "Time": "13:45",
         "Name": "none"
      },
      {
         "Time": "14:00",
         "Name": "none"
      },
      {
         "Time": "14:15",
         "Name": "none"
      },
      {
         "Time": "14:30",
         "Name": "none"
      },
      {
         "Time": "14:45",
         "Name": "none"
      },
      {
         "Time": "15:00",
         "Name": "Liudvikas"

      },
      {
         "Time": "15:15",
         "Name": "none"
      },
      {
         "Time": "15:30",
         "Name": "none"
      },
      {
         "Time": "15:45",
         "Name": "none"
      },
      {
         "Time": "16:00",
         "Name": "none"
      },
      {
         "Time": "16:15",
         "Name": "Marcelijus"
      },
      {
         "Time": "16:30",
         "Name": "none"

      },
      {
         "Time": "16:45",
         "Name": "none"
      },
      {
         "Time": "17:00",
         "Name": "none"
      },
      {
         "Time": "17:15",
         "Name": "Aldona"
      },
      {
         "Time": "17:30",
         "Name": "none"

      },
      {
         "Time": "17:45",
         "Name": "Bronė"
      },
      {
         "Time": "18:00",
         "Name": "none"
      },
      {
         "Time": "18:15",
         "Name": "Mikhail"
      },
      {
         "Time": "18:30",
         "Name": "none"
      },
      {
         "Time": "18:45",
         "Name": "Kotryna"
      },
      {
         "Time": "19:00",
         "Name": "Hedvika",
      },
      {
         "Time": "19:15",
         "Name": "Ugnė"
      },
      {
         "Time": "19:30",
         "Name": "none"
      },
      {
         "Time": "19:45",
         "Name": "none"
      }

   ],
   28: [
      {
         "Time": "10:00",
         "Name": "Gediminas"
      },
      {
         "Time": "10:15",
         "Name": "none"
      },
      {
         "Time": "10:30",
         "Name": "Napoleonas"
      },
      {
         "Time": "10:45",
         "Name": "none",
      },
      {
         "Time": "11:00",
         "Name": "none"
      }]

}
