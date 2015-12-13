window.onload = function() {
    var createFieldBtn = document.getElementById('createFieldBtn'),
        rowsCountField = document.getElementById('rowsCount'),
        colsCountField = document.getElementById('colsCount'),
        plusBtn = document.getElementById('enlarge'),
        minusBtn = document.getElementById('minimize'),
        maze = document.querySelector('.scrollable'),
        colsCount = 0,
        rowsCount = 0,
        mazeWidth = 500,
        mazeHeight = 500;
    
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
        
        maze.innerHTML = '';
        for (var i=0;i<rowsCount;i++) {
            currRow = document.createElement('tr');
            for (var j=0;j<colsCount;j++) {
                currCell = document.createElement('td');
                currCell.style.width = cellWidth+'px';
                currCell.style.height = cellHeight+'px';
                currRow.appendChild(currCell);
            };
            tbl.appendChild(currRow);
        };
        maze.appendChild(tbl);
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