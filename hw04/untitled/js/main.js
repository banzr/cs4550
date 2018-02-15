"use strict";

// 2D array of boxes
var boxarray;
// 2D array of hidden values
var values;


function remove(array, e) {
    var idx = array.indexOf(e);
    array.splice(idx, 1)
}



function assignValues() {

    values = new Array(4);

    for (var row=0; row < 4; row++) {
        values[row] = new Array();
    }

    var indicies = Array.from(Array(15).keys());

    var tmp = indicies.slice();

    for (var x=0; x < 16; x++) {
        var n = Math.floor(Math.random() * (16));

        while (tmp.includes(n)) {
            var label = String.fromCharCode(97 + n);
            values[x][n]= label;
            remove(tmp, n);
        }
    }

    console.log(values);
}

// Resets all the pieces
function resetGame() {
    boxarray.forEach(function (b) {
        b.style.backgroundColor = "green";
    });
}

//document.addEventListener('keydown', resetGame(event));

document.addEventListener('keydown', function(event) {
    event.preventDefault();
    var key = event.key;
    if (key === 'r') {
        resetGame(key);
    }
});



// Newgame: creates a new grid
function newgame() {
    var game = document.getElementById("game");
    for (var r=0; r < 4; r++ ) {
        var row = document.createElement("div");
        row.setAttribute("class", "row");

        for (var c=0; c < 4; c++) {
            var col = document.createElement("div");
            col.setAttribute("class", "col-sm-3");
            col.setAttribute("align", "center");
            var box = document.createElement("div");
            box.setAttribute("class", "mybox");

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
            ev.target.style.backgroundColor = "blue";
        }) });

    // Assign Values

    assignValues();
}

window.addEventListener("load", newgame);
