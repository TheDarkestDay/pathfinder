window.onload = function() {
    var createFieldBtn = document.getElementById('createFieldBtn'),
        rowsCountField = document.getElementById('rowsCount'),
        colsCountField = document.getElementById('colsCount'),
        plusBtn = document.getElementById('enlarge'),
        minusBtn = document.getElementById('minimize'),
        maze = document.getElementById('maze'),
        colsCount = 0,
        rowsCount = 0;
    
    createFieldBtn.addEventListener('click', function(evt) {
        evt.preventDefault();
        
        var currRow,
            currCell,
            cellWidth,
            cellHeight;
        
        colsCount = parseInt(colsCountField.value);
        rowsCount = parseInt(rowsCountField.value);
        cellWidth = 500/rowsCount;
        cellHeight = 500/colsCount;
        
        maze.innerHTML = '';
        for (var i=0;i<rowsCount;i++) {
            currRow = document.createElement('tr');
            for (var j=0;j<colsCount;j++) {
                currCell = document.createElement('td');
                currCell.style.width = cellWidth+'px';
                currCell.style.height = cellHeight+'px';
                currRow.appendChild(currCell);
            };
            maze.appendChild(currRow);
        };
    });
    
    plusBtn.addEventListener('click', function() {
        var currWidth = maze.getAttribute('width');
        currWidth = parseInt();
    });
    
    minusBtn.addEventListener('click', function() {
        
    });
};