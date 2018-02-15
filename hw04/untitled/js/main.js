"use strict";

// 2D array of boxes
var boxarray;
// 2D array of hidden values
var values;
// last revealed tile
var last_tile;
// last revealed letter not matched
var last_letter = false;

var score = 0;


function remove(array, e) {
    var idx = array.indexOf(e);
    array.splice(idx, 1);
}


function getRand() {
    return Math.floor(Math.random() * (8));
}


function assignValues() {
    values = new Array(4);

    for (var row=0; row < 4; row++) {
        values[row] = new Array();
    }

    var indices = [0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7];
    var tmp = indices.slice();

    for (var x=0; x < 4; x++) {

        for (var j=0; j < 4; j++) {
            var n = getRand();

            while (!tmp.includes(n)) {
                n = getRand();
            }

            values[x][j] = String.fromCharCode(65 + n);
            remove(tmp, n);
        }
    }
}


// Resets all the pieces
function resetGame() {

    var game = document.getElementById("game");

    for (var oldr = 0; oldr < 4; oldr++) {
        var oldrow = game.childNodes[0];

        for (var oldc = 0; oldc < 4; oldc++) {
            var oldcol = oldrow.childNodes[oldc];
            //oldcol.firstChild.removeChild(oldcol.firstChild.firstChild);
            oldcol.removeChild(oldcol.firstChild);
        }

        game.removeChild(oldrow);
    }

    score = 0;
    document.body.style.backgroundColor = "white";

    newgame();
}


// Resets all the pieces
function resetTile(tile) {

    //var tile = boxarray[(y*4)+x];
    tile.style.backgroundColor = "#6984af";
    // If the <ul> element has any child nodes, remove its first child node
    if (tile.hasChildNodes()) {
        tile.firstChild.removeChild(tile.firstChild.firstChild);
        tile.removeChild(tile.childNodes[0]);
    }
}


document.addEventListener('keydown', function(event) {
    event.preventDefault();
    var key = event.key;

    if (key === 'r') {
        resetGame(key);
    }

    if (key === 't') {
        resetTile(3,3);
    }
});





// Newgame: creates a new grid
function newgame() {

    var game = document.getElementById("game");

    if (game.firstChild) {
        game.removeChild(game.firstChild);
    }


    for (var r=0; r < 4; r++ ) {
        var row = document.createElement("div");
        row.setAttribute("class", "row");

        for (var c=0; c < 4; c++) {
            var col = document.createElement("div");
            col.setAttribute("class", "col-sm-3");
            col.setAttribute("align", "center");
            var box = document.createElement("div");
            box.setAttribute("class", "mybox");
            box.setAttribute("column", c);
            box.setAttribute("row", r);

            col.appendChild(box);
            row.appendChild(col);
        }

        game.appendChild(row);
    }

    // add button functions ##########################

    var boxes = document.getElementsByClassName("mybox");
    boxarray = Array.prototype.slice.call(boxes);

    boxarray.forEach(function (b) {
        b.addEventListener("click", function(ev) {
            ev.target.style.backgroundColor = "#c5cfe0";

            if (!ev.target.firstChild) {
                var label = document.createElement("label");
                var row = ev.target.getAttribute("row");
                var column = ev.target.getAttribute("column");
                var letter = values[row][column];
                label.appendChild(document.createTextNode(letter));

                ev.target.appendChild(label);

                if ((last_letter != letter) && last_letter) {
                    // mismatch
                    resetTile(last_tile);
                    last_letter = letter;
                    last_tile = ev.target;
                } else if (last_letter) {
                    // match
                    last_letter = false;
                    last_tile = false;

                    score++;
                } else {
                    // initial draw
                    last_tile = ev.target;
                    last_letter = letter;
                }

                if (score > 7) {
                    document.body.style.backgroundColor = "#97c651";
                }

                console.log(score);
            }


        }) });

    // Assign Values
    assignValues();
}

window.addEventListener("load", newgame);

