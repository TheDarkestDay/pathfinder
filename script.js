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
            for (var j=0;j<graph[i].length;j++) {
                graph[i][j].type = document.getElementById(graph[i][j].x+'-'+graph[i][j].y).className;
                if (graph[i][j].type == 'goal') {
                    goalNode = graph[i][j];
                }
                if (graph[i][j].type == 'start') {
                    startNode = graph[i][j];
                }
            }
        }
        
                
        startNode.f_score = heuristic_cost(startNode,goalNode);
        startNode.g_score = 0;
        
        console.log(graph);
  /*      while(openSet.length) {
            currNode = openSet.sort(byFScore)[0];
            
            if ($(currNode.selector).className == 'goal') {
                drawPath();
                break;
            }
            
            adjacentNodes = getAdjacentNodesOf(currNode);
            
            for (var i=0;i<adjacentNodes.length;i++) {
                if (closedSet.indexOf(adjacentNodes[i]) != -1) {
                    continue;
                }
                
                
            };
        };  */
    });
    
    function getAdjacentNodesOf(node) {
        var result = [],
            nodeFormulas = [];
        
      /*  nodeFormulas[0] = {
            x: node.x,
            y: node.y-1
        };
        
        nodeFormulas[1] = {
            x: node.x-1,
            y: node.y-1
        };
        
        nodeFormulas[2] = {
            x: node.x-1,
            y: node.y
        };
        
        nodeFormulas[3] = {
            x: node.x-1,
            y: node.y+1
        };
        
        nodeFormulas[4] = {
            x: node.x,
            y: node.y+1
        };
        
        nodeFormulas[5] = {
            x: node.x+1,
            y: node.y+1
        };
        
        nodeFormulas[6] = {
            x: node.x+1,
            y: node.y
        };
        
        nodeFormulas[7] = {
            x: node.x+1,
            y: node.y-1
        };
        
        for (var i=0;i<nodeFormulas.length;i++) {
            if (nodeIsElligible(nodeFormulas[i])) {
                result.push(nodeObjBySelector(nodeFormulas[i].x+'-'+nodeFormulas[i].y));
            };
        }; 
           
        return result; */
    };
    
    function nodeIsElligible(node) {
      /*  if (node.x >= 0 && node.x < rowsCount && node.y >= 0 && node.y < colsCount) {
            if ($(node.x+'-'+node.y).className == 'wall') {
                return false;
            } else {
                
            }
        }; */
        
        return false;
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
            graph.push([]);
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
                graph[i].push({
                    x: currCell.id[0],
                    y: currCell.id[2],
                    g_score: 99999,
                    f_score: 99999
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