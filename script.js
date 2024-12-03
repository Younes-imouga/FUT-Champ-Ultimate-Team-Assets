// this array i used it to store the positions and the "location" of aesh player

const formations = {
    "1": [
        { top: "80%", left: "44.5%",position: "Gk" }, 
        { top: "55%", left: "15%",position: "LB" }, 
        { top: "55%", left: "75%",position: "RB" }, 
        { top: "60%", left: "35%",position: "CB1" }, 
        { top: "60%", left: "55%",position: "CB2" }, 
        { top: "28%", left: "10%",position: "LM" }, 
        { top: "28%", left: "80%",position: "RM" }, 
        { top: "35%", left: "35%",position: "CM1" }, 
        { top: "35%", left: "55%",position: "CM2" }, 
        { top: "10%", left: "25%",position: "ST1" }, 
        { top: "10%", left: "65%",position: "ST2" }, 
    ],
    "2": [
        { top: "80%", left: "44.5%",position: "Gk" },
        { top: "55%", left: "15%",position: "LB" },
        { top: "55%", left: "75%",position: "RB" },
        { top: "60%", left: "35%",position: "CB1" },
        { top: "60%", left: "55%",position: "CB2" },
        { top: "35%", left: "25%",position: "LM" },
        { top: "35%", left: "65%",position: "RM" },
        { top: "31%", left: "44.5%",position: "CM" },
        { top: "15%", left: "15%",position: "LW" },
        { top: "15%", left: "75%",position: "RW" },
        { top: "10%", left: "44.5%",position: "ST" },
    ]
  };
  
  //here i started working on the formation positioning in its place
  const formatSelect = document.getElementById("format");
  const positions = document.querySelectorAll(".position");
  
  formatSelect.addEventListener("change", (e) => {
    const selectedFormat = e.target.value;
    const formation = formations[selectedFormat];
  
    if (formation) {
      positions.forEach((position, index) => {
        if (formation[index]) {
          position.style.top = formation[index].top;
          position.style.left = formation[index].left;
          position.style.display = "block"; 
        } else {
          position.style.display = "none"; 
        }
      });
    }
  });
  
  function initildisplay() {
        let num = 1;
        positions.forEach((position, index = 1) => {
        if (formations[num][index]) {
          position.style.top = formations[num][index].top;
          position.style.left = formations[num][index].left;
          position.style.display = "block"; 
        } else {
          position.style.display = "none"; 
        }
      });
    }
    initildisplay();


    // here i will work on the drag / drop functionality
    const dropZones = document.querySelectorAll(".dropZone");
    const playerContainer = document.querySelector(".player-cards");
    let draggedElement = null;
    
    
    function dragAndDropEventListener(element) {
      // using the drag start/end event listeners i can get the mouse position and access the closest drop zone
      element.addEventListener("dragstart", (e) => {
        draggedElement = e.target; 
        e.dataTransfer.setData("text/plain", draggedElement.innerHTML); 
        e.dataTransfer.effectAllowed = "move";
        draggedElement.classList.add("dragging"); 
      });
    
      element.addEventListener("dragend", () => {
        if (draggedElement) {
          draggedElement.classList.remove("dragging"); 
          draggedElement = null; 
        }
      });
    
      // and i used the drag over so i can store the data of the dragged on element in case i want to swotch players
      element.addEventListener("dragover", (e) => {
        e.preventDefault(); 
        e.dataTransfer.dropEffect = "move";
      });
    
      // and the drop is the final so i can swap the inner html 
      element.addEventListener("drop", (e) => {
        e.preventDefault();
        const target = e.target.closest(".dropZone"); 
    
        if (draggedElement && target && draggedElement !== target) {
          
          const draggedContent = draggedElement.innerHTML;
          const targetContent = target.innerHTML;
    
          draggedElement.innerHTML = targetContent;
          target.innerHTML = draggedContent;
    
          
          draggedElement.setAttribute("draggable", "true");
          target.setAttribute("draggable", "true");
        }
        clearemptydropzone();
      });
    }
    
    // here i did the drag and drop condition but so i can put th eplayer back in the player container
 
    dropZones.forEach(dragAndDropEventListener);
    
    playerContainer.addEventListener("dragover", (e) => {
      e.preventDefault(); 
      e.dataTransfer.dropEffect = "move";
    });
    
    playerContainer.addEventListener("drop", (e) => {
      e.preventDefault();
    
      if (draggedElement && !playerContainer.contains(draggedElement)) {
        
        const newCard = document.createElement("div");
        newCard.className = "dropZone";
        newCard.innerHTML = draggedElement.innerHTML;
        newCard.setAttribute("draggable", "true"); 
    
        dragAndDropEventListener(newCard);
    
        playerContainer.appendChild(newCard); 
    
        draggedElement.innerHTML = "";
      }
      clearemptydropzone();
    });

    // when i put the player in the container i noticed the empty drop zone is still there and making it an empty zone on th eleft of the container
    function clearemptydropzone() {
      const targets = playerContainer.querySelectorAll(".dropZone");
      targets.forEach((target) => {
        if (target.innerHTML === "") {
          playerContainer.removeChild(target);
        }
      })
    }

    // here i did this function so when a mobile / tablet user want to know the full detail of a player he can do it

    document.querySelectorAll('.position').forEach((e) => {
      e.addEventListener('click', () => {
        if (!iseditmode) {          
          const clickedcontainer = document.querySelector('.clicked-card');
          if (e.innerHTML !== '') {    
              clickedcontainer.innerHTML = e.innerHTML;
              clickedcontainer.classList.remove("hidden");
              clickedcontainer.addEventListener("click", () => {
              clickedcontainer.classList.add("hidden");
              });
          } else {
            clickedcontainer.classList.add("hidden");
          }
        }
      });
  });

  //From here i will start working on the add player fct

  //this is where i will store the data of players that the user will input

  const playersdata = [];
  // im planing on using the same format they gave us one player will be liek this
  // {
  //   "name": "Lionel Messi",
  //   "photo": "https://cdn.sofifa.net/players/158/023/25_120.png",
  //   "position": "RW",
  //   "nationality": "Argentina",
  //   "flag": "https://cdn.sofifa.net/flags/ar.png",
  //   "club": "Inter Miami",
  //   "logo": "https://cdn.sofifa.net/meta/team/239235/120.png",
  //   "rating": 93,
  //   "pace": 85,
  //   "shooting": 92,
  //   "passing": 91,
  //   "dribbling": 95,
  //   "defending": 35,
  //   "physical": 65
  // }

  //first this is the display for it
  const addbtn = document.querySelector('.add-btn');
  const playerinfo = document.querySelector('.player-info');
  const confirmaddbtn = document.querySelector(".confirm-add-btn")

  addbtn.addEventListener("click",() => {
    if (iseditmode == true) {
      reseteditmode();
      resetdeletmode();

      confirmaddbtn.classList.remove('hidden');

  
      playerinfo.classList.toggle("hidden");
      // confirmaddbtn.classList.toggle("hidden");
    } else if (isdeletemode == true) {
      reseteditmode();
      resetdeletmode();

      confirmaddbtn.classList.remove('hidden');

      playerinfo.classList.toggle("hidden");
    } else {
      
      playerinfo.classList.toggle("hidden");
      confirmaddbtn.classList.toggle("hidden");
    }

  });

  
  // then i need to collect the data that the User submited
  
  const nameinput = document.getElementById("name")
  const photoinput = document.getElementById("photo")
  const nationalityinput = document.getElementById("nationality")
  const flaginput = document.getElementById("flag")
  const clubinput = document.getElementById("club")
  const logoinput = document.getElementById("logo")
  const positionselect = document.getElementById("position-select")

  const input1 = document.getElementById("input1");
  const input2 = document.getElementById("input2");
  const input3 = document.getElementById("input3");
  const input4 = document.getElementById("input4");
  const input5 = document.getElementById("input5");
  const input6 = document.getElementById("input6");
  const input7 = document.getElementById("input7");
  
  positionselect.addEventListener("change", () => {
    
    let playerstats = document.querySelector(".player-stats");
    let playerinputs = document.querySelectorAll(".player");
    let GKinputs = document.querySelectorAll(".goal-keeper");
    if (positionselect.value === "GK") {
    

      playerstats.style.display = "block";
      GKinputs.forEach(GKinput => {
        GKinput.style.display = "block"
      })
      playerinputs.forEach(playerinput => {
        playerinput.style.display = "none"

      })
    } else if (positionselect.value !== "Default") {
    

      playerstats.style.display = "block";
      GKinputs.forEach(GKinput => {
        GKinput.style.display = "none"
      })
      playerinputs.forEach(playerinput => {
        playerinput.style.display = "block"

      })
    }
  })

  confirmaddbtn.addEventListener("click", () => {
    if (nameinput.value && photoinput.value && nationalityinput.value && flaginput.value && clubinput.value && logoinput.value && positionselect.value && input1.value && input2.value && input3.value && input4.value && input5.value && input6.value && input7.value) {
      let playername = nameinput.value;
      let playerphoto = photoinput.value;
      let playernationality = nationalityinput.value;
      let playerflag = flaginput.value;
      let playerclub = clubinput.value;
      let playerlogo = logoinput.value;
      let playerposition = positionselect.value;
      let playerstats1 = input1.value;
      let playerstats2 = input2.value;
      let playerstats3 = input3.value;
      let playerstats4 = input4.value;
      let playerstats5 = input5.value;
      let playerstats6 = input6.value;
      let playerstats7 = input7.value;

      const newplayercard = document.createElement("div");
      newplayercard.draggable = "true";
      newplayercard.classList.add("dropZone");
      
      if (playerposition === "GK") {
        newplayercard.innerHTML = `
            <div class="card">
              <div class="rating">${playerstats1}</div>
              <div class="positionn">${playerposition}</div>

              <img src="${playerphoto}" alt="${playername}" class="player-photo" draggable="false"/>

              <div class="player-name">${playername}</div>

              <div class="nationality-club">
                <img src="${playerflag}" alt="${playernationality}" draggable="false"/>
                <img src="${playerlogo}" alt="${playerclub}" draggable="false"/>
              </div>

            <div class="stats">
              <div class="stat">
                <span>DIV</span>
                <span>HAN</span>
                <span>KIC</span>
                <span>REF</span>
                <span>SPE</span>
                <span>POS</span>
              </div>
              <div class="stat">
                  <span>${playerstats2}</span>
                  <span>${playerstats3}</span>
                  <span>${playerstats4}</span>
                  <span>${playerstats5}</span>
                  <span>${playerstats6}</span>
                  <span>${playerstats7}</span>
                </div>
              </div>
            </div>`;
      } else {
        newplayercard.innerHTML = `
                  <div class="card">
              <div class="rating">${playerstats1}</div>
              <div class="positionn">${playerposition}</div>
          
              <img src="${playerphoto}" alt="${playername}" class="player-photo" draggable="false"/>
          
              <div class="player-name">${playername}</div>
          
              <div class="nationality-club">
                <img src="${playerflag}" alt="${playernationality}" draggable="false"/>
                <img src="${playerlogo}" alt="${playerclub}" draggable="false"/>
              </div>
            <div class="stats">
              <div class="stat">
                <span>PAC</span>
                <span>SHO</span>
                <span>PAS</span>
                <span>DRI</span>
                <span>DEF</span>
                <span>PHY</span>
              </div>
              <div class="stat">
                  <span>${playerstats2}</span>
                  <span>${playerstats3}</span>
                  <span>${playerstats4}</span>
                  <span>${playerstats5}</span>
                  <span>${playerstats6}</span>
                  <span>${playerstats7}</span>
                </div>
              </div>
            </div>`;
      }
      playerContainer.appendChild(newplayercard);
      dragAndDropEventListener(newplayercard);
      nameinput.value = "";
      photoinput.value = "";
      nationalityinput.value = "";
      flaginput.value = "";
      clubinput.value = "";
      logoinput.value = "";
      positionselect.value = "Default";
      input1.value = "";
      input2.value = "";
      input3.value = "";
      input4.value = "";
      input5.value = "";
      input6.value = "";
      input7.value = "";

      playerinfo.classList.add("hidden")
      let playerstats = document.querySelector(".player-stats");
      
      playerstats.style.display = "none"

    const errormessages = document.querySelectorAll('.required');
    const errorstatsmessages = document.querySelectorAll(".required-stat");

    errormessages.forEach(message => {
      message.style.display = "none"
    })
    errorstatsmessages.forEach(message => {
      message.style.display = "none"
    })

    confirmaddbtn.classList.toggle("hidden")
    }
  else {
    const errormessages = document.querySelectorAll('.required');
    errormessages.forEach(errormessage => {
      if (errormessage.textContent == "*") {
        const emptyinput = errormessage.parentNode.parentNode.parentNode.querySelector("input");
        if (emptyinput.value == "") {
          errormessage.style.display = "inline";
        } else {
          errormessage.style.display = "none";
        }
      } else {
        const emptyinput = errormessage.parentNode.parentNode.querySelector("input");
        if (emptyinput.value == "") {
          errormessage.style.display = "block";
        } else {
          errormessage.style.display = "none";
        }
      }
    })

    const errorstatsmessages = document.querySelectorAll(".required-stat");
    errorstatsmessages.forEach(errorstatsmessage => {
      if (errorstatsmessage.textContent == "*") {
        const emptystat = errorstatsmessage.parentNode.parentNode.parentNode.querySelector("input");
        if (emptystat.value == "") {
          errorstatsmessage.style.display = "inline";
        } else {
          errorstatsmessage.style.display = "none";
        }
      } else {
        const emptystat = errorstatsmessage.parentNode.parentNode.querySelector("input");
        if (emptystat.value == "") {
          errorstatsmessage.style.display = "block";
        } else {
          errorstatsmessage.style.display = "none";
        }
      }
    })
  }
})


const editBtn = document.querySelector('.edit-btn');
const edittext = document.querySelector('#edit-text');
const editmessage = document.querySelector('#edit-message');

let iseditmode = false; 
let selectedcard = null; 

 
editBtn.addEventListener('click', () => {
  if (!iseditmode) {
    resetdeletmode();
    playerinfo.classList.add("hidden");
    iseditmode = true;
    edittext.classList.remove('hidden');
    
    document.querySelectorAll('.card').forEach(card => {
      card.style.border = "#3498db dashed 3px";
    });
  } else {
    document.querySelectorAll('.card').forEach(card => {
      card.style.border = "none";
    });
    reseteditmode();
  }
});

 
document.querySelectorAll('.dropZone').forEach(card => {
  
  card.addEventListener('click', () => {
    if (iseditmode && !selectedcard) {
      document.querySelectorAll('.card').forEach(e => {
        if (e.parentElement !== card) {                        
          e.style.border = "none";
        }
      });
      selectedcard = card;
      
      edittext.classList.add("hidden");
      editmessage.classList.remove("hidden");

      const name = card.querySelector('.player-name').textContent;
      const photo = card.querySelector('.player-photo').src;
      const nationalityandclub = card.querySelector(".nationality-club").querySelectorAll("img");
      const nationality = nationalityandclub[0].alt;
      const flag = nationalityandclub[0].src;
      const club = nationalityandclub[1].alt;
      const clublogo = nationalityandclub[1].src;

      const position = card.querySelector('.positionn').textContent;
      const rating = card.querySelector('.rating').textContent;

      nameinput.value = name;
      photoinput.value = photo;
      nationalityinput.value = nationality;
      flaginput.value = flag;
      clubinput.value = club;
      logoinput.value = clublogo;


      positionselect.value = position;
      input1.value = rating;

 
      const stats = card.querySelectorAll('.stat:last-child span');
      [input2.value, input3.value, input4.value, input5.value, input6.value, input7.value] = Array.from(stats).map(stat => stat.textContent);

      document.querySelector(".player-stats").style.display = "block";
      playerinfo.classList.remove('hidden'); 
      confirmaddbtn.classList.add('hidden'); 
      document.querySelector('.confirm-edit-btn').classList.remove('hidden'); 
    }
  });
});


document.querySelector('.confirm-edit-btn').addEventListener('click', () => {
  if (selectedcard) {
    const updatedName = nameinput.value;
    const updatedPhoto = photoinput.value;
    const updatedPosition = positionselect.value;
    const updatedRating = input1.value;

    const updatedstats = [
      input2.value,
      input3.value,
      input4.value,
      input5.value,
      input6.value,
      input7.value,
    ];


    selectedcard.querySelector('.player-name').textContent = updatedName;
    selectedcard.querySelector('.player-photo').src = updatedPhoto;
    selectedcard.querySelector('.positionn').textContent = updatedPosition;
    selectedcard.querySelector('.rating').textContent = updatedRating;

    const statsspans = selectedcard.querySelectorAll('.stat:last-child span');
    updatedstats.forEach((stat, index) => {
      statsspans[index].textContent = stat;
    });

    reseteditmode();

    document.querySelector(".player-stats").style.display = "none";
    playerinfo.classList.add('hidden');
  }
});

function reseteditmode() {
  iseditmode = false;
  selectedcard = null;
  edittext.classList.add('hidden');
  editmessage.classList.add('hidden');
  document.querySelector('.confirm-edit-btn').classList.add('hidden');
  document.querySelector(".player-stats").style.display = "none";
  playerinfo.classList.add('hidden');
  // TODO:
  nameinput.value = "";
  photoinput.value = "";
  nationalityinput.value = "";
  flaginput.value = "";
  clubinput.value = "";
  logoinput.value = "";
  positionselect.value = "Default";
  input1.value = "";
  input2.value = "";
  input3.value = "";
  input4.value = "";
  input5.value = "";
  input6.value = "";
  input7.value = "";
}

  const deletebtn = document.querySelector(".remove-btn");
  const confirmdeletbtn = document.querySelector(".confirm-remove-btn");

  
  const startdelet = document.getElementById("delete-start");
  const confirmdeletp = document.getElementById("delete-confirmation-p");
  let isdeletemode = false; 
  let deletcard = null; 

  deletebtn.addEventListener("click",() => {
    if (!isdeletemode) {
      reseteditmode();
      isdeletemode = true;
      startdelet.classList.remove('hidden');
      document.querySelectorAll('.card').forEach(card => {
        card.style.border = "red dashed 3px";
      });
    } else {
      document.querySelectorAll('.card').forEach(card => {
        card.style.border = "none";
      });
      resetdeletmode();
    }
  })
  

  
  document.querySelectorAll('.dropZone').forEach(card => {
    card.addEventListener('click', () => {
      
      if (isdeletemode && !deletcard) {
        document.querySelectorAll('.card').forEach(e => {
            if (e.parentElement !== card) {                        
              e.style.border = "none";
            }
          });
        deletcard = card;
        startdelet.classList.add('hidden');

        confirmdeletp.querySelector("h3").textContent = `The Player You Want To Delete Is : ${card.querySelector(".player-name").textContent}`
        confirmdeletp.classList.remove("hidden");

        confirmdeletbtn.classList.remove("hidden");

        confirmdeletbtn.addEventListener("click", () => {
            if (card.classList.contains("position")) {
              card.removeChild(card.querySelector(".card"))
              document.querySelector(".clicked-card").classList.add("hidden");
            } else {
              card.remove(card);
            }
            resetdeletmode();
          })
        }
      });
    });
    
function resetdeletmode() {

  isdeletemode = false;
  deletcard = null;
  startdelet.classList.add('hidden');
  confirmdeletp.classList.add('hidden');
  document.querySelector('.confirm-remove-btn').classList.add('hidden');
  document.querySelector(".clicked-card").classList.add("hidden");
}