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
    
    function distance(a, b) {
        return Math.sqrt(Math.pow(b.x-a.x,2)+Math.pow(b.y-a.y,2));
    };
    
    runBtn.addEventListener('click', function(evt) {
        var adjacentNodes,
            exp_g_score;
        
        evt.preventDefault();
        path = [];
        closedSet = [];
        openSet = [];
        
        for (var i=1;i<=rowsCount;i++) {
            for (var j=1;j<=colsCount;j++) {
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
        
        openSet.push(startNode);
        while(openSet.length) {
            currNode = openSet.sort(byFScore)[0];
            console.log(currNode);
            
            if (currNode.type == 'goal') {
                drawPath(currNode);
                break;
            }
            
            openSet.splice(openSet.indexOf(currNode),1);
            closedSet.push(currNode);
            
            adjacentNodes = getAdjacentNodesOf(currNode);
            console.log(adjacentNodes);
            
            for (var i=0;i<adjacentNodes.length;i++) {
                if (closedSet.indexOf(adjacentNodes[i]) != -1) {
                    continue;
                }
            
                exp_g_score = currNode.g_score + distance(currNode,adjacentNodes[i]);
                if (openSet.indexOf(adjacentNodes[i]) == -1) {
                    openSet.push(adjacentNodes[i]);
                } else {
                    if (exp_g_score > adjacentNodes[i].g_score) {
                        continue;
                    }
                }
                
                adjacentNodes[i].cameFrom = currNode.x+'-'+currNode.y;
                adjacentNodes[i].g_score = exp_g_score;
                adjacentNodes[i].f_score = adjacentNodes[i].g_score + heuristic_cost(adjacentNodes[i],goalNode);
            };
        };   
    });
    
    function drawPath(node) {
        var domNode = document.getElementById(node.cameFrom),
            nodeX,
            nodeY;
        
        if (domNode.className != 'start') {
            domNode.className = 'path';
            nodeX = parseInt(node.cameFrom[0]);
            nodeY = parseInt(node.cameFrom[2]);
            drawPath(graph[nodeX][nodeY]);
        };
    };
    
    function getAdjacentNodesOf(node) {
        var result = [],
            prevIncludedElemIndex,
            wasWall = false;
        
        if (graph[node.x-1][node.y].type != 'wall') {
            for (var i=node.y-1;i<node.y+2;i++) {
                if (graph[node.x-1][i].type != 'wall') {
                    result.push(graph[node.x-1][i]);
                };
            };
        } else {
            wasWall = true;
        };
        
        if (graph[node.x][node.y-1].type != 'wall') {
            for (var i=node.x-1;i<node.x+2;i++) {
                if (graph[i][node.y-1].type != 'wall' && result.indexOf(graph[i][node.y-1]) == -1) {
                    result.push(graph[i][node.y-1]);
                };
            };
            if (wasWall) {
                prevIncludedElemIndex = result.indexOf(graph[node.x-1][node.y-1]);
                if (prevIncludedElemIndex != -1) {
                    result.splice(prevIncludedElemIndex,1);
                };
            };
            wasWall = false;
        } else {
            prevIncludedElemIndex = result.indexOf(graph[node.x-1][node.y-1]);
            if (prevIncludedElemIndex != -1) {
                result.splice(prevIncludedElemIndex,1);
            };
            wasWall = true;
        }
        
        if (graph[node.x+1][node.y].type != 'wall') {
            for (var i=node.y-1;i<node.y+2;i++) {
                if (graph[node.x+1][i].type != 'wall' && result.indexOf(graph[node.x+1][i]) == -1) {
                    result.push(graph[node.x+1][i]);
                };
                if (wasWall) {
                    prevIncludedElemIndex = result.indexOf(graph[node.x+1][node.y-1]);
                    if (prevIncludedElemIndex != -1) {
                        result.splice(prevIncludedElemIndex,1);
                    };
                };
                wasWall = false;
            };         
        } else {
            prevIncludedElemIndex = result.indexOf(graph[node.x+1][node.y-1]);
            if (prevIncludedElemIndex != -1) {
                result.splice(prevIncludedElemIndex,1);
            };
            wasWall = true;
        };
        
        if (graph[node.x][node.y+1].type != 'wall') {
            for (var i=node.x-1;i<node.x+2;i++) {
                if (graph[i][node.y+1].type != 'wall' && result.indexOf(graph[i][node.y+1]) == -1) {
                    result.push(graph[i][node.y+1]);
                };
                if (wasWall) {
                    prevIncludedElemIndex = result.indexOf(graph[node.x+1][node.y+1]);
                    if (prevIncludedElemIndex != -1) {
                        result.splice(prevIncludedElemIndex,1);
                    };
                };
            
                if (graph[node.x-1][node.y].type == 'wall') {
                    prevIncludedElemIndex = result.indexOf(graph[node.x-1][node.y+1]);
                    result.splice(prevIncludedElemIndex,1);
                };
            };         
        } else {
            prevIncludedElemIndex = result.indexOf(graph[node.x+1][node.y+1]);
            if (prevIncludedElemIndex != -1) {
                result.splice(prevIncludedElemIndex,1);
            };
            
            prevIncludedElemIndex = result.indexOf(graph[node.x-1][node.y+1]);
            if (prevIncludedElemIndex != -1) {
                result.splice(prevIncludedElemIndex,1);
            };
        }
           
        return result;
    };
    

    createFieldBtn.addEventListener('click', function(evt) {
        evt.preventDefault();
        
        var currRow,
            splittedId,
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
        graph.push([]);
        for (var j=0;j<=colsCount+1;j++) {
              graph[0].push({
                 type:'wall'
              });
        };
        
        maze.innerHTML = '';
        for (var i=1;i<=rowsCount;i++) {
            currRow = document.createElement('tr');
            graph.push([]);
            graph[i].push({
                type: 'wall'
            });
            for (var j=1;j<=colsCount;j++) {
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
                splittedId = currCell.id.split('-');
                graph[i].push({
                    x: parseInt(splittedId[0]),
                    y: parseInt(splittedId[1]),
                    g_score: 99999,
                    f_score: 99999
                });
                currCell.style.width = cellWidth+'px';
                currCell.style.height = cellHeight+'px';
                currRow.appendChild(currCell);
            };
            tbl.appendChild(currRow);
            graph[i].push({
                type:'wall'
            });
        };
        graph.push([]);
        for (var j=0;j<=colsCount+1;j++) {
                graph[graph.length-1].push({
                    type:'wall'
                });
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