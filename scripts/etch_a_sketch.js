const INITIAL_SIDES = 16;
const containerDiv = document.querySelector("#container");

function setupGrid(numSides) {
    // setup the grid
    for (let i = 0; i < numSides * numSides; i++) {
        let gridSquare = document.createElement("div");
        gridSquare.classList.add("grid-square");

        // calculate the height and width of each square
        // use the window height - buffer as the side for the square container
        containerDiv.style["width"] = containerDiv.style["height"] = `${window.innerHeight - 60}px`;
        gridSquare.style["height"] = gridSquare.style["flex-basis"] = `${100 / numSides}%`;
        containerDiv.appendChild(gridSquare);
    }
}

function setupSquares() {
    // add handler for hovering on each square
    let gridSquares = document.querySelectorAll(".grid-square");
    gridSquares.forEach((square) => {
        square.addEventListener("mouseenter", (e) => {
            if (!Array.from(e.target.classList).includes("hovered")) {
                // if the square has not been coloured yet, set
                // an initial opacity of 10%
                e.target.style["opacity"] = 0.1;
            }
            e.target.classList.add("hovered");

            // increase opacity by 0.1 on each hover
            e.target.style["opacity"] = 0.1 + Number(getComputedStyle(e.target)["opacity"]);
        })
    });
}

// add handler to "recreate sketchpad" button
const recreateButton = document.querySelector("button");
recreateButton.addEventListener("click", () => {
    let numSides = parseInt(prompt("How many sides would you like the new sketchpad to have?"));

    // check input validity
    if (numSides > 100) alert("Please use a value less than or equal to 100.");
    else if (numSides < 1) alert("Please use a value above 0.");
    else if (isNaN(numSides)) alert("Please enter a number.");
    else {
        // clear exisitng sketchpad and setup again
        containerDiv.innerHTML = "";
        setupGrid(numSides);
        setupSquares();
    };
});

// initial grid setup
setupGrid(INITIAL_SIDES);
setupSquares();
