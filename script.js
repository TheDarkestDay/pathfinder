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
        runBtn = document.getElementById('run'),
        colsCount = 0,
        rowsCount = 0,
        mazeWidth = 500,
        mazeHeight = 500,
        startNode,
        goalNode,
        graph,
        closedSet,
        openSet,
        currNode,
        path,
        mode = 'start';
    
    function $(node) {
        return document.getElementById(node.selector);
    };
    
    function nodeObjBySelector(selector) {
        for (var i=0;i<graph.length;i++) {
            if (graph[i].selector == selector) {
                return graph[i];
            }
        }
    };
    
    function heuristic_cost(start,goal) {
        var dx = Math.abs(start.x-goal.x);
        var dy = Math.abs(start.y-goal.y);
        return dx+dy-Math.min(dx,dy);
    };
    
    function byFScore(a,b) {
        if (a.f_score > b.f_score) {
            return 1;
        };
        if (a.f_score < b.f_score) {
            return -1;
        };
        return 0;
    };
    
    runBtn.addEventListener('click', function(evt) {
        var adjacentNodes;
        evt.preventDefault();
        path = [];
        closedSet = [];
        openSet = [];
        
        for (var i=0;i<graph.length;i++) {
            if ($(graph[i]).className == 'start') {
                openSet.push(graph[i]);
                startNode = graph[i];
            };
            if ($(graph[i]).className == 'goal') {
                goalNode = graph[i];
            };
        };
        
        startNode.f_score = heuristic_cost(startNode,goalNode);
        startNode.g_score = 0;
        
        
        while(openSet.length) {
            currNode = openSet.sort(byFScore)[0];
            
            if ($(currNode).className == 'goal') {
                drawPath();
                break;
            }
            
            adjacentNodes = getAdjacentNodesOf(currNode);
            
            for (var i=0;i<adjacentNodes.length;i++) {
                if (closedSet.indexOf(adjacentNodes[i]) != -1) {
                    continue;
                }
                
                
            };
        }; 
    });
    
    function getAdjacentNodesOf(node) {
        var result = [],
            preRes = [];
        
        if (node.x != 0) {
            for (var i=node.y;i<node.y+3;i++) {
                preRes.push(nodeObjBySelector(node.x-1+'-'+i));
            };
            
            if ($(preRes[i].selector).className != 'wall') {
                for (var i=0;i<preRes.length;i++) {
                    
                }
            }
        };
        
        if (node.x != rowsCount-1) {
            for (var i=node.y;node.y+3;i++) {
                result.push(nodeObjBySelector(node.x+1+'-'+i));
            };
        };
        
        if (node.y != 0) {
            result.push(nodeObjBySelector(node.x+'-'+node.y-1));
        };
        
        if (node.y != colsCount-1) {
            result.push(nodeObjBySelector(node.x+'-'+node.y+1));
        };
                
        return result;
    };
    
    function drawPath() {  
    };
    
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
            for (var j=0;j<colsCount;j++) {
                currCell = document.createElement('td');
                currCell.id = i+'-'+j;
                currCell.addEventListener('click', function(evt) {
                    evt.preventDefault();
                    evt.target.className = "";
                    switch(mode) {
                        case 'goal':
                            if (document.querySelectorAll('.goal').length) {
                                document.querySelector('.goal').className = "";
                            };
                            evt.target.classList.add('goal');
                            break;
                        case 'start':
                            if (document.querySelectorAll('.start').length) {
                                document.querySelector('.start').className = "";
                            };
                            evt.target.classList.add('start');
                            break;
                        case 'wall':
                            evt.target.classList.add('wall');
                            break;
                        default:
                            break;
                    };
                });
                graph.push({
                    x: currCell.id[0],
                    y: currCell.id[2],
                    g_score: 99999,
                    f_score: 99999,
                    selector: i+'-'+j
                });
                currCell.style.width = cellWidth+'px';
                currCell.style.height = cellHeight+'px';
                currRow.appendChild(currCell);
            };
            tbl.appendChild(currRow);
        };
        maze.appendChild(tbl);
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