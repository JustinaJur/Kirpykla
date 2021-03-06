var reservations;

// mark days that are not available for a reservation
makeRed = clickedDay => {
	 allDays = Array.from(document.querySelectorAll("td"));
     //check if there is no available reservations left in clickedDay
	if (reservations[clickedDay.innerHTML].every((item) => item.Name !== "none")) {
	   //filter days, find all days equal to clickedDay's innertext
      allDays.filter(day => day.innerText == clickedDay.innerText)	  
	         .map(day => day.classList.add("redText"));	
	// if not all 'times' of particular day are reserved, remove redText class		 
	} else {
		allDays.filter(day => day.innerText == clickedDay.innerText)	  
	         .map(day => day.classList.remove("redText"));		 
}}

// mark available reservations white
markWhite = () => {
   let allRows = Array.from(document.querySelector(".dinamicTable2").querySelectorAll("tr"));
   allRows.filter(row => row.innerHTML.search("none") > 0)
      .map(row => row.classList.add("white"));
}

//mark active day with orange color
clearOrange = parentName => {
	if(parentName.parentElement.className == "sectionClient"){
	 let allDays = Array.from(document.querySelector(".auto-jsCalendar").querySelectorAll("td"));
     allDays.map(day => day.classList.remove("orange"));
	} else {
		allDays = Array.from(document.querySelectorAll(".auto-jsCalendar")[1].querySelectorAll("td"));
        allDays.map(day => day.classList.remove("orange"));	
}}


makeReservation = (clickedDay, parentName) => {	
   let firstName;
   let radioId;
   let radios = Array.from(document.querySelectorAll("input"));
   let checkedRadio = radios.filter(radio => radio.checked).map(radio => radio.id);
   if (parentName.parentElement.className == "sectionClient") {
      firstName = document.querySelector(".firstName").value;
   } else {
      firstName = document.querySelectorAll(".firstName")[1].value;
   };  
   if (firstName.length <= 0) {
      alert("registruojantis būtina pasirinkti laiką ir įvesti kontaktinius duomenis");
      return
   }
   //td - day, radioID (checked radio id) - dienos objekto indeksas(valanda)
   reservations[clickedDay.innerText][checkedRadio].Name = firstName;
   document.querySelector(".firstName").value = " ";  
   document.querySelectorAll(".firstName")[1].value = " ";
   makeRed(clickedDay);
   collectHeaders(clickedDay, parentName);
   markWhite();
   alert("Rezervacija atlikta sėkmingai");
}

cancelReservation = (clickedDay, parentName) => {
   let radios = Array.from(document.querySelectorAll("input"));
   let checkedRadio = radios.filter(radio => radio.checked).map(radio => radio.id);
   //cancel reservation
   reservations[clickedDay.innerText][checkedRadio].Name = "none";
   // update table with text
   collectHeaders(clickedDay, parentName);
   //update table with colors
   markWhite();
   makeRed(clickedDay);
   alert("Rezervacijos atšaukimas atliktas sėkmingai");
}
 
//first table
document.querySelector(".green").addEventListener("click", function (event){
   let parentName = this;
   let clickedDay = event.target;
   let nameButton = document.querySelector(".nameButton");
   clearOrange(parentName);

    //if clicked on Day without data in reservations, return
    if(reservations[clickedDay.innerText] === undefined){ 
    document.querySelector(".dinamicTable").innerHTML = "";
    return }
   
   //if clicked on DAY, start building  a table 
   if (event.target.tagName.toLowerCase() === 'td') {
      collectHeaders(clickedDay, parentName);
	  clickedDay.classList.add("orange");
   }
   nameButton.onclick = () => {
      makeReservation(clickedDay, parentName);	  
   }
});



 collectHeaders = (clickedDay, parentName) => {	 
	  let col = [];
      for (var i = 0; i < reservations[clickedDay.innerText].length; i++) {
      for (var key in reservations[clickedDay.innerText][i]) {
         if (col.indexOf(key) === -1) {
            col.push(key);
         }
      }	  
      createHeaders(clickedDay, col, parentName);
   }
 }


 createHeaders = (clickedDay, col, parentName) => {
   let table = document.createElement("table");
   //create first row in table, insert it for headers section
   var tr = table.insertRow(-1); 
   for (var i = 0; i < col.length; i++) {
      //create table header
      let th = document.createElement("th");
      // give next value to table header from col array
      th.innerHTML = col[i];
      // append table header to table row
      tr.appendChild(th);
   }
   addData(clickedDay, col, table, parentName)
}

//// second table
document.querySelectorAll(".green")[1].addEventListener("click", function (event) {
   let parentName = this;
   let clickedDay = event.target;
   let nameButton = document.querySelectorAll(".nameButton")[1];
   let cancelButton = document.querySelector(".cancelButton");
   let searchButton = document.querySelector(".searchButton");
   clearOrange(parentName);
   
    if(reservations[clickedDay.innerText] === undefined){ 
    document.querySelector(".dinamicTable2").innerHTML = "";
    return }
  
   //if clicked on td(day), build a table
   if (event.target.tagName.toLowerCase() === "td") {
       collectHeaders(clickedDay, parentName);
	   clickedDay.classList.add("orange");
   }
   markWhite();
   nameButton.onclick = () => {
	   makeReservation(clickedDay, parentName);
   }
   cancelButton.onclick = () => {
       cancelReservation(clickedDay, parentName);
   };

});

//create tables
addData = (clickedDay, col, table, parentName) => {
   let idCounter = 0;
   
  //create a table for client side
   if (parentName.parentElement.className == "sectionClient") {
      // for every object(reservation time) of particular day
      for (var i = 0; i < reservations[clickedDay.innerText].length; i++) {
         // create a row only if "name" is "none"
         if (reservations[clickedDay.innerText][i].Name === "none") {
            var tr = table.insertRow(-1);
         }
         let input = document.createElement("input");
         input.setAttribute("type", "radio");
         input.setAttribute("id", idCounter);
         input.setAttribute("name", "firstName");
         idCounter += 1;

         //  for every tr and header create a cell 
         for (var j = 0; j < col.length; j++) {
            //if "name" is "none", show it on table
            if (reservations[clickedDay.innerText][i][col[1]] === "none") {
               //append a cell to tr
               let tabCell = tr.insertCell(-1);
               //insert data from reservations
               tabCell.innerHTML = reservations[clickedDay.innerText][i][col[j]];
               // append a radio to tr
               tr.appendChild(input);
            }
         }
      }
      let dinamicTable = document.querySelector(".dinamicTable");
      dinamicTable.innerHTML = "";
      dinamicTable.appendChild(table);
   }

   //create a table for hair salon side
   else {
      for (var i = 0; i < reservations[clickedDay.innerText].length; i++) {
         tr = table.insertRow(-1);
		 
         let input = document.createElement("input");
         input.setAttribute("type", "radio");
         input.setAttribute("id", idCounter);
         input.setAttribute("name", "firstName");
         idCounter += 1;

         for (var j = 0; j < col.length; j++) {
            let tabCell = tr.insertCell(-1);
            tabCell.innerHTML = reservations[clickedDay.innerText][i][col[j]];
            tr.appendChild(input);
         }
      }

      let dinamicTable2 = document.querySelector(".dinamicTable2");
      dinamicTable2.innerHTML = "";
      dinamicTable2.appendChild(table);
   }
}



///first page (tabs)
showPage = (event, page) => {
   var tabContent, tabLinks;
   
   //show no content
    tabContent = Array.from(document.getElementsByClassName("tabContent"));
    tabContent.map(content => content.style.display = "none")
   
    tabLinks = Array.from(document.getElementsByClassName("tabLinks"));
    tabLinks.map(link => link.className = link.className.replace("active", ""));
   
    //display page upon onclick and hide picture
    document.getElementById(page).style.display = "grid";
    event.currentTarget.className += " active";
   
    let pic = document.querySelector(".pic");
    pic.style.display = "none";
}


var reservations = {
	1: [
      {
         "Time": "10:00",
         "Name": "none"
      },
      {
         "Time": "10:15",
         "Name": "Liepa"
      },
      {
         "Time": "10:30",
         "Name": "none"
      },
      {
         "Time": "10:45",
         "Name": "none",
      }],
	2: [
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
      }],
	3: [
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
      }],
	4: [
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
      }],
	5: [
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
      }],
	6: [
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
      }],
	7: [
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
      }],
	8: [
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
      }],
	9: [
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
      }],
	10: [
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
      }],
	11: [
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
      }],
	12: [
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
      }],
	13: [
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
      }],
	14: [
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
      }],
	15: [
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
      }],
	16: [
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
      }],
	17: [
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
      }],
   18: [
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
      }],
   19: [
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
      }],
   
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
      }],
	 

}