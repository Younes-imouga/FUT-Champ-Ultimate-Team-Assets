// this array i used it to store the positions and the "location" of aesh player

const formations = {
    "1": [
        { top: "80%", left: "45%",position: "Gk" }, 
        { top: "55%", left: "15%",position: "LB" }, 
        { top: "55%", left: "75%",position: "RB" }, 
        { top: "60%", left: "35%",position: "CB" }, 
        { top: "60%", left: "55%",position: "CB" }, 
        { top: "30%", left: "15%",position: "LM" }, 
        { top: "30%", left: "75%",position: "RM" }, 
        { top: "35%", left: "35%",position: "CM" }, 
        { top: "35%", left: "55%",position: "CM" }, 
        { top: "10%", left: "25%",position: "ST" }, 
        { top: "10%", left: "65%",position: "ST" }, 
    ],
    "2": [
        { top: "80%", left: "45%",position: "Gk" }, 
        { top: "55%", left: "15%",position: "LB" }, 
        { top: "55%", left: "75%",position: "RB" }, 
        { top: "60%", left: "35%",position: "CB" }, 
        { top: "60%", left: "55%",position: "CB" }, 
        { top: "32%", left: "15%",position: "LM" }, 
        { top: "32%", left: "75%",position: "RM" }, 
        { top: "37%", left: "45%",position: "CM" }, 
        { top: "15%", left: "15%",position: "LW" }, 
        { top: "15%", left: "75%",position: "RW" }, 
        { top: "10%", left: "45%",position: "ST" }, 
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
    playerinfo.classList.toggle("hidden");
    confirmaddbtn.classList.toggle("hidden");
  });

  
  // then i need to collect the data that the User submited
  
  const nameinput = document.getElementById("name")
  const photoinput = document.getElementById("photo")
  const nationalityinput = document.getElementById("natinality")
  const flaginput = document.getElementById("flag")
  const clubinput = document.getElementById("club")
  const logoinput = document.getElementById("logo")
  const positionselect = document.getElementById("position-select")
  
  positionselect.addEventListener("change", () => {
    let playerstats = document.querySelector(".player-stats");
    let playerinputs = document.querySelectorAll("#player");
    let GKinputs = document.querySelectorAll("#goal-keeper");
    if (positionselect.value === "GK") {
      playerstats.style.display = "block";
      GKinputs.forEach(GKinput => {
        GKinput.style.display = "block"
      })
      playerinputs.forEach(playerinput => {
        playerinput.style.display = "none"

      })
    } else if (positionselect.value !== "Default" ) {
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

  })