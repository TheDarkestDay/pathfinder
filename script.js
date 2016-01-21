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
            nodeY,
            cameFrom = node.cameFrom.split('-');
        
        if (domNode.className != 'start') {
            domNode.className = 'path';
            nodeX = parseInt(cameFrom[0]);
            nodeY = parseInt(cameFrom[1]);
            drawPath(graph[nodeX][nodeY]);
        };
    };
    
    function getAdjacentNodesOf(node) {
        var result = [],
            top = graph[node.x-1][node.y],
            right = graph[node.x][node.y+1],
            bot = graph[node.x+1][node.y],
            left = graph[node.x][node.y-1],
            directNodes = [top,right,bot,left];
        
        if (top.type != 'wall' && left.type != 'wall') {
            result.push(graph[node.x-1][node.y-1]);
        };
        
        if (top.type != 'wall' && right.type != 'wall') {
            result.push(graph[node.x-1][node.y+1]);
        };
        
        if (right.type != 'wall' && bot.type != 'wall') {
            result.push(graph[node.x+1][node.y+1]);
        };
        
        if (bot.type != 'wall' && left.type != 'wall') {
            result.push(graph[node.x+1][node.y-1]);
        };
        
        for (var i=0;i<result.length;i++) {
            if (result[i].type == 'wall') {
                result.splice(i,1);
            };
        };
        
        for (var i=0;i<directNodes.length;i++) {
            if (directNodes[i].type != 'wall') {
                result.push(directNodes[i]);
            };
        };
        
        
           
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
    
    // Tests
    
    
    describe('FScore comparator', function() {
    
    it('should return 1 if first argument scrore is greater', function() {
            var a = {
                f_score: 10
            };
            var b = {
                f_score: 9
            };
        
            expect(byFScore(a,b)).toEqual(1);
        });
    
    it('should return 0 if both arguments are equal', function() {
            var a = {
                f_score: 10
            };
            var b = {
                f_score: 10
            };
        
            expect(byFScore(a,b)).toEqual(0);
        });

    it('should return -1 if first argument scrore is lesser', function() {
            var a = {
                f_score: 8
            };
            var b = {
                f_score: 9
            };
        
            expect(byFScore(a,b)).toEqual(-1);
        });
    });
    
    describe('diagonal heuristic cost', function() {
        
        it('(3,5) -> (7,8) = 4', function() {
            var pointA = {
                x: 3,
                y: 5
            };
            var pointB = {
                x: 7,
                y: 8
            };
            expect(heuristic_cost(pointA,pointB)).toEqual(4);
        });
        
        it('(12,2) -> (9,1) = 3', function() {
            var pointA = {
                x: 12,
                y: 2
            };
            var pointB = {
                x: 9,
                y: 1
            };
            expect(heuristic_cost(pointA,pointB)).toEqual(3);
        });
        
        it('(17,11) -> (9,9) = 8', function() {
            var pointA = {
                x: 17,
                y: 11
            };
            var pointB = {
                x: 9,
                y: 9
            };
            expect(heuristic_cost(pointA,pointB)).toEqual(8);
        });
        
    });
    
    describe('distance calc function', function() {
        
        it('(3,4) -> (8,10) = ', function() {
            var pointA = {
                x: 3,
                y: 4
            };
            var pointB = {
                x:8,
                y:10
            };
            
            expect(distance(pointA,pointB)).toEqual(7.810249675906654);
        });
        
        it('(13,24) -> (7,17) = ', function() {
            var pointA = {
                x: 13,
                y: 24
            };
            var pointB = {
                x:7,
                y:17
            };
            
            expect(distance(pointA,pointB)).toEqual(9.219544457292887);
        });
        
        it('(0,0) -> (8,26) = ', function() {
            var pointA = {
                x: 0,
                y: 0
            };
            var pointB = {
                x:8,
                y:26
            };
            
            expect(distance(pointA,pointB)).toEqual(27.202941017470888);
        });
    });
    
    describe('maze width and height', function() {
        
        it('should be 600 after clicking plus', function() {
            plusBtn.click();
            expect(mazeWidth).toEqual(600);
            expect(mazeHeight).toEqual(600);
        });
        
        it('should be 500 after clicking minus', function() {
            minusBtn.click();
            expect(mazeWidth).toEqual(500);
            expect(mazeHeight).toEqual(500);
        });
    });
};