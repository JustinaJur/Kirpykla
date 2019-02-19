var reservations;

//first table
document.querySelector(".green").addEventListener("click", function (event) {
   var clickedDay = event.target;
   var td = event.target.innerHTML;

   //highlight selected day on calendar
   var tds = document.querySelector(".green").querySelectorAll("td");
   tds = Array.from(tds);
   for (var i = 0; i < tds.length; i++) {
      tds[i].addEventListener("click", function () {
         var current = document.getElementsByClassName("active");
         current[0].className = current[0].className.replace(" active", "");
         this.className += " active";
      })
   };


   var nameButton = document.querySelector(".nameButton");
   //get current day and ban from selecting previous days
   var date = new Date();
   var currentDay = date.getDate();
   if (td < currentDay) {
      var dinamicTable = document.querySelector(".dinamicTable");
      dinamicTable.innerHTML = "";
      return
   }
   //if clicked on DAY, start building  a table 
   if (event.target.tagName.toLowerCase() === 'td') {
      collectHeaders(td);

   }

   ///ADD RESERVATION
   nameButton.onclick = function () {
      var radioId;
      var firstName = document.querySelector(".firstName").value;
      var radios = document.querySelectorAll("input");
      for (var i = 0; i < radios.length; i++) {
         if (radios[i].checked) {
            radio = radios[i];
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

      //removeRow(td, radioId);
      //collectHeaders(td);
   }
   collectHeaders(td);
});


//CREATE TABLE OF APPOINTMENTS
function collectHeaders(td) {
   var col = [];
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

function createHeaders(td, col) {
   var table = document.createElement("table");

   //create first row in table, insert it for headers section
   var tr = table.insertRow(-1);

   // kiekvienam pavadinimui sukurk langeli lenteleje
   for (var i = 0; i < col.length; i++) {
      //create table header
      var th = document.createElement("th");
      // give next value to table header from col array
      th.innerHTML = col[i];
      //append table header to table row
      tr.appendChild(th);
   }
   //addData(td, col, table)
   addData(td, col, table)
}
function addData(td, col, table) {
   var idCounter = 0;

   for (var i = 0; i < reservations[td].length; i++) {
      tr = table.insertRow(-1);

      var input = document.createElement("input");
      input.setAttribute("type", "radio");
      input.setAttribute("id", idCounter);
      input.setAttribute("name", "firstname");

      tr.setAttribute('id', idCounter);
      idCounter += 1;
      // cells add horizontally
      for (var j = 0; j < col.length; j++) {

         // if "name" is "none", dont show it on table
         if (reservations[td][i][col[1]] == "none") {
            var tabCell = tr.insertCell(-1);
            tr.appendChild(input);
            tabCell.innerHTML = reservations[td][i][col[j]];
         }
      }

      var tr = document.querySelector(".dinamicTable").querySelectorAll("tr");

   }
   // add table to HTML div
   var dinamicTable = document.querySelector(".dinamicTable");
   dinamicTable.innerHTML = "";
   dinamicTable.appendChild(table);
}


// make innerText of day red when no available reservations left
function makeRed(clickedDay) {
   if (reservations[clickedDay.innerHTML].every((item) => item.Name != "none")) {
      clickedDay.classList.add("redText");
   }
}


// mark available reservations white
function markWhite() {
   var allRows = Array.from(document.querySelector(".dinamicTable2").querySelectorAll("tr"));
   for (var i = 1; i < allRows.length; i++) {
      if ((allRows[i].innerHTML.search("none") > 0)) {
         { allRows[i].classList.add("white") }
      }
   }
}


//// second table
document.querySelectorAll(".green")[1].addEventListener("click", function (event) {
   var td = event.target.innerHTML;
   var nameButton = document.querySelectorAll(".nameButton")[1];
   var cancelButton = document.querySelector(".cancelButton");
   //var searchButton = document.querySelector(".searchButton");

   //if clicked on td(day), build a table
   if (event.target.tagName.toLowerCase() === "td") {
      collectHeaders2(td);
   }

   markWhite();

   // show active element (day) of calendar   
   var tds = document.querySelectorAll(".green")[1].querySelectorAll("td");
   tds = Array.from(tds);
   console.log(tds);
   for (var i = 0; i < tds.length; i++) {
      tds[i].addEventListener("click", function () {
         var current = document.getElementsByClassName("active");
         current[0].className = current[0].className.replace(" active", "");
         this.className += " active";
      })
   };


   nameButton.onclick = function () {
      var radioId;
      //get input(name)
      var firstName = document.querySelectorAll(".firstName")[1].value;
      //get selected radio id(reservation time)
      var radios = document.querySelectorAll("input");
      for (var i = 0; i < radios.length; i++) {
         if (radios[i].checked) {
            var radio = radios[i];
            radioId = radios[i].id;
         };
         if (firstName == "" || firstName == " ") {
            alert("registruojantis būtina pasirinkti laiką ir įvesti kontaktinius duomenis");
            return
         }
      }
      //td - day, radioID (checked radio id) - dienos objekto indeksas(valanda)
      reservations[td][radioId].Name = firstName;

      var clickedDay = event.target;
      makeRed(clickedDay);
      document.querySelectorAll(".firstName")[1].value = " ";
      //refresh data on screen
      collectHeaders2(td);
      markWhite();
   }

   cancelButton.onclick = function () {
      var radios = document.querySelectorAll("input");
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

});



//build a table
function collectHeaders2(td) {
   var col = [];
   for (var i = 0; i < reservations[td].length; i++) {
      for (var key in reservations[td][i]) {
         if (col.indexOf(key) === -1) {
            col.push(key);
         }
      }
      createHeaders2(td, col)
   }
}

function createHeaders2(td, col) {
   var table = document.createElement("table");
   var tr = table.insertRow(-1);
   for (var i = 0; i < col.length; i++) {
      var th = document.createElement("th");
      th.innerHTML = col[i];
      tr.appendChild(th);
   }
   addData2(td, col, table)
}

function addData2(td, col, table) {
   var idCounter = 0;
   for (var i = 0; i < reservations[td].length; i++) {
      tr = table.insertRow(-1);
      var input = document.createElement("input");
      input.setAttribute("type", "radio");
      input.setAttribute("id", idCounter);
      input.setAttribute("name", "firstname");
      tr.setAttribute('id', idCounter);
      idCounter += 1;
      for (var j = 0; j < col.length; j++) {
         var tabCell = tr.insertCell(-1);
         tabCell.innerHTML = reservations[td][i][col[j]];
         tr.appendChild(input);
      }
   }
   var dinamicTable2 = document.querySelector(".dinamicTable2");
   dinamicTable2.innerHTML = "";
   dinamicTable2.appendChild(table);
}

///first page (tabs)

function showPage(event, page) {
   var i, tabcontent, tablinks;

   tabcontent = document.getElementsByClassName("tabcontent");
   for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
   }

   tablinks = document.getElementsByClassName("tablinks");
   for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace("active", "");
   }

   document.getElementById(page).style.display = "grid";
   event.currentTarget.className += " active";
   var pic = document.querySelector(".pic");
   pic.style.display = "none";
}


var reservations = {
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
         "Name": "none"
      },
      {
         "Time": "10:30",
         "Name": "Napaleonas"
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
         "Name": "Napaleonas"
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
         "Name": "Gediminas"
      },
      {
         "Time": "10:15",
         "Name": "Jonas"
      },
      {
         "Time": "10:30",
         "Name": "Napaleonas"
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
         "Name": "Lina"
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
         "Name": "Gediminas"
      },
      {
         "Time": "10:15",
         "Name": "Dovydas"
      },
      {
         "Time": "10:30",
         "Name": "Dalia"
      },
      {
         "Time": "10:45",
         "Name": "Jurga",
      },
      {
         "Time": "11:00",
         "Name": "Kazys"
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
         "Name": "Napaleonas"
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
