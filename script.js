// Define the formations with positions
const formations = {
    "1": [
        { top: "80%", left: "45%" }, // GK
        { top: "55%", left: "15%" }, // LB
        { top: "55%", left: "75%" }, // RB
        { top: "60%", left: "35%" }, // CB1
        { top: "60%", left: "55%" }, // CB2
        { top: "30%", left: "15%" }, // LM
        { top: "30%", left: "75%" }, // RM
        { top: "35%", left: "35%" }, // CM
        { top: "35%", left: "55%" }, // LW
        { top: "10%", left: "25%" }, // RW
        { top: "10%", left: "65%" }, // ST
    ],
    "2": [
        { top: "80%", left: "45%" }, // GK
        { top: "55%", left: "15%" }, // LB
        { top: "55%", left: "75%" }, // RB
        { top: "60%", left: "35%" }, // CB1
        { top: "60%", left: "55%" }, // CB2
        { top: "32%", left: "15%" }, // LM
        { top: "32%", left: "75%" }, // RM
        { top: "37%", left: "45%" }, // CM
        { top: "15%", left: "15%" }, // LW
        { top: "15%", left: "75%" }, // RW
        { top: "10%", left: "45%" }, // ST
    ],
    "3": [
        { top: "80%", left: "45%" }, // GK
        { top: "53%", left: "15%" }, // LB
        { top: "53%", left: "75%" }, // RB
        { top: "62%", left: "45%" }, // CB1
        { top: "32%", left: "15%" }, // LM
        { top: "32%", left: "75%" }, // RM
        { top: "40%", left: "35%" }, // CM
        { top: "40%", left: "55%" }, // LW
        { top: "15%", left: "15%" }, // LW
        { top: "15%", left: "75%" }, // RW
        { top: "10%", left: "45%" }, // ST
    ]
  };
  
  // This is the formation part
  const formatSelect = document.getElementById("format");
  const positions = document.querySelectorAll(".position");
  
  // Listen for changes on the select element
  formatSelect.addEventListener("change", (e) => {
    const selectedFormat = e.target.value;
    const formation = formations[selectedFormat];
  
    // Update position styles
    if (formation) {
      positions.forEach((position, index) => {
        if (formation[index]) {
          position.style.top = formation[index].top;
          position.style.left = formation[index].left;
          position.style.display = "block"; // Ensure visibility
          localStorage.setItem("formation", selectedFormat);
        } else {
          position.style.display = "none"; // Hide unused positions
        }
      });
    }
  });
  
  function initildisplay() {
        let num = localStorage.getItem("formation") || 1;
        positions.forEach((position, index = 1) => {
        if (formations[num][index]) {
          position.style.top = formations[num][index].top;
          position.style.left = formations[num][index].left;
          position.style.display = "block"; // Ensure visibility
        } else {
          position.style.display = "none"; // Hide unused positions
        }
      });
    }
    initildisplay();

    const dropZones = document.querySelectorAll(".dropZone");
    const playerContainer = document.querySelector(".player-cards");
    let draggedElement = null;
    
    // Function to add drag-and-drop event listeners to elements
    function attachDragAndDropListeners(element) {
      element.addEventListener("dragstart", (e) => {
        draggedElement = e.target; // Reference the dragged element
        e.dataTransfer.setData("text/plain", draggedElement.innerHTML); // Save the inner HTML of the card
        e.dataTransfer.effectAllowed = "move"; // Indicate move operation
        draggedElement.classList.add("dragging"); // Add visual feedback
      });
    
      element.addEventListener("dragend", () => {
        if (draggedElement) {
          draggedElement.classList.remove("dragging"); // Remove visual feedback
          draggedElement = null; // Reset dragged element
        }
      });
    
      element.addEventListener("dragover", (e) => {
        e.preventDefault(); // Necessary to allow drop
        e.dataTransfer.dropEffect = "move";
      });
    
      element.addEventListener("drop", (e) => {
        e.preventDefault();
        const target = e.target.closest(".dropZone"); // Ensure drop is on a valid drop zone
    
        if (draggedElement && target && draggedElement !== target) {
          // Swap inner HTML between dragged element and target
          const draggedContent = draggedElement.innerHTML;
          const targetContent = target.innerHTML;
    
          draggedElement.innerHTML = targetContent;
          target.innerHTML = draggedContent;
    
          // Reattach draggable attribute (ensure drag works after swapping)
          draggedElement.setAttribute("draggable", "true");
          target.setAttribute("draggable", "true");
        }
        clearemptydropzone();
      });
    }

    function clearemptydropzone() {
      const targets = playerContainer.querySelectorAll(".dropZone");
      targets.forEach((target) => {
        if (target.innerHTML === "") {
          playerContainer.removeChild(target);
        }
      })
    }
    
    // Attach listeners to existing drop zones
    dropZones.forEach(attachDragAndDropListeners);
    
    // Handle dropping into the player container
    playerContainer.addEventListener("dragover", (e) => {
      e.preventDefault(); // Allow dropping into the player container
      e.dataTransfer.dropEffect = "move";
    });
    
    playerContainer.addEventListener("drop", (e) => {
      e.preventDefault();
    
      if (draggedElement && !playerContainer.contains(draggedElement)) {
        // Create a new card element and append it to the player container
        const newCard = document.createElement("div");
        newCard.className = "dropZone";
        newCard.innerHTML = draggedElement.innerHTML;
        newCard.setAttribute("draggable", "true"); // Ensure the new card is draggable
    
        // Attach drag-and-drop listeners to the new card
        attachDragAndDropListeners(newCard);
    
        playerContainer.appendChild(newCard); // Append the new card to the player container
    
        // Clear the original drop zone where the card was taken from
        draggedElement.innerHTML = "";
      }
      clearemptydropzone();
    });