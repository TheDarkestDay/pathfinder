window.onload = function() {
    var createFieldBtn = document.getElementById('createFieldBtn'),
        rowsCountField = document.getElementById('rowsCount'),
        colsCountField = document.getElementById('colsCount'),
        plusBtn = document.getElementById('enlarge'),
        minusBtn = document.getElementById('minimize'),
        maze = document.querySelector('.scrollable'),
        goalModeBtn = document.getElementById('goalRadio'),
        startModeBtn = document.getElementById('startRadio'),
        wallModeBtn = document.getElementById('wallRadio'),
        clearModeBtn = document.getElementById('clearRadio'),
        colsCount = 0,
        rowsCount = 0,
        mazeWidth = 500,
        mazeHeight = 500,
        graph,
        mode = 'start';
    
    createFieldBtn.addEventListener('click', function(evt) {
        evt.preventDefault();
        
        var currRow,
            currCell,
            cellWidth,
            cellHeight,
            tbl;
        
        colsCount = parseInt(colsCountField.value);
        rowsCount = parseInt(rowsCountField.value);
        cellWidth = mazeWidth/rowsCount;
        cellHeight = mazeHeight/colsCount;
        tbl = document.createElement('table');
        graph = [];
        
        maze.innerHTML = '';
        for (var i=0;i<rowsCount;i++) {
            currRow = document.createElement('tr');
            graph.push([]);
            for (var j=0;j<colsCount;j++) {
                currCell = document.createElement('td');
                currCell.addEventListener('click', function(evt) {
                    evt.preventDefault();
                    evt.target.className = "";
                    switch(mode) {
                        case 'goal':
                            evt.target.classList.add('goal');
                            break;
                        case 'start':
                            evt.target.classList.add('start');
                            break;
                        case 'wall':
                            evt.target.classList.add('wall');
                            break;
                        default:
                            break;
                    };
                });
                currCell.style.width = cellWidth+'px';
                currCell.style.height = cellHeight+'px';
                currRow.appendChild(currCell);
                graph[i].push(0);
            };
            tbl.appendChild(currRow);
        };
        maze.appendChild(tbl);
        console.log(graph);
    });
    
    goalModeBtn.addEventListener('click', function(evt) {
        mode = 'goal';
    });
    
    startModeBtn.addEventListener('click', function(evt) {
        mode = 'start';
    });
    
    wallModeBtn.addEventListener('click', function(evt) {
        mode = 'wall';
    });
    
    clearModeBtn.addEventListener('click', function(evt) {
        mode = 'clear';
    });
    
    plusBtn.addEventListener('click', function(evt) {
        evt.preventDefault();
        mazeWidth += 100;
        mazeHeight += 100;
        updateField();
    });
    
    minusBtn.addEventListener('click', function(evt) {
        evt.preventDefault();
        mazeWidth -= 100;
        mazeHeight -= 100;
        updateField();
    });
    
    function updateField() {
        maze.style.width = mazeWidth+"px";
        maze.style.height = mazeHeight+"px";
        if (maze.innerHTML != "") {
            createFieldBtn.click();
        };
    };
};