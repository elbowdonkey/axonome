/*

add the starting node to the node list
while the open list is not empty
  current_node = node from open list with the lowest cost
  if current_node == goal node then
    path complete
  else
    move current node to the closed list
    examine each node adjacent to the current node
    for each adjacent node
      if it isn't on the open list
        and isn't on the closed list
          and it isn't an obstacle then
            move it to open list and calculate cost

*/


// (C) Andrea Giammarchi
//	Special thanks to Alessandro Crugnola [www.sephiroth.it]

function AStar(	// A* algorithm for a path finder

	Grid,	// Array Grid bi dimensional [[N,N], [N,N]]
	Start,	// Array Start Point [x, y]
	Goal,	// Array End Point [x, y]
	Find	// [String] Distance function "Diagonal" | "DiagonalFree" * | "Euclidean" | "EuclideanFree" * | "Manhattan"
		// default choosed function: Manhattan
		// Free suffix means that algorithm doesn't care about closed squares
		//	---------
		//	|0	1|
		//	|1	0|
		//	---------
		// In this example [x:0, y:0] to [x:1, y:1] is a valid choice

){

// Generic AStar private functions, used to find a path

	// init function, sets Find string as dedicated function to search diagonal nodes
	function AStar(){
		switch(Find){
			case	"Diagonal":
			case	"Euclidean":
					Find = DiagonalSuccessors;
					break;
			case 	"DiagonalFree":
			case	"EuclideanFree":
					Find = DiagonalSuccessors$;
					break;
			default:
					Find = function(){};
					break;
		};
	};
	
	// returns boolean value (Grid cell is available and open)
	function $Grid(x, y){
	  console.log(x,y);
		return Grid[y][x] === 0;
	};

	// Node function, returns a new object with Node properties
	function Node(Parent, Point){
	  var n = {
			Parent:Parent,
			value:Point.x + (Point.y * cols),
			x:Point.x,
			y:Point.y,
			f:0,
			g:0
		};
		
		return n;
	};

	// Path function, executes AStar algorithm operations
	function Path(){
		var	$Start = Node(null, {x:Start[0], y:Start[1]}),	// Start Point
			$Goal = Node(null, {x:Goal[0], y:Goal[1]}),	// Goal Point
			AStar = new Array(limit),			// Every undefined Grid cell
			Open = [$Start], Closed = [], result = [],	// open and closed list and result array
			$Successors, $Node, $Path,			// nodes referers
			length, max, min, i, j;				// integer variables
			
		while(length = Open.length) {
			max = limit;
			min = -1;
			
			for(i = 0; i < length; i++) {
				if(Open[i].f < max) {
					max = Open[i].f;
					min = i;
				}
			};
			
			$Node = Open.splice(min, 1)[0];
			
			if($Node.value === $Goal.value) {
				$Path = Closed[Closed.push($Node) - 1];
				do {
					result.push([$Path.x, $Path.y]);
				} while($Path = $Path.Parent);
				AStar = Closed = Open = [];
				result.reverse();
			} else {
				$Successors = Successors($Node.x, $Node.y);
				for(i = 0, j = $Successors.length; i < j; i++){
					$Path = Node($Node, $Successors[i]);
					if(!AStar[$Path.value]){
						$Path.g = $Node.g + Distance($Successors[i], $Node);
						$Path.f = $Path.g + Distance($Successors[i], $Goal);
						Open.push($Path);
						AStar[$Path.value] = true;
					};
				};
				Closed.push($Node);
			};
		};
		return result;
	};

// Successors functions, used to find adjacent available cells

	// returns every available North, South, East or West cell
	//
	//	-----------------
	//	|	0	 |
	//	|0	P	1|
	//	|	0	 |
	//	-----------------
	//
	// In this example will returns each point around P except for [x:2, y:1]
	// Diagonal points are verified only if Distance function is not Manhattan
	function Successors(x, y){
		var	N = y - 1,
			S = y + 1,
			E = x + 1,
			W = x - 1,
			$N = N > -1 && $Grid(x, N),
			$S = S < rows && $Grid(x, S),
			$E = E < cols && $Grid(E, y),
			$W = W > -1 && $Grid(W, y),
			result = [];
		if($N)
			result.push({x:x, y:N});
		if($E)
			result.push({x:E, y:y});
		if($S)
			result.push({x:x, y:S});
		if($W)
			result.push({x:W, y:y});
		Find($N, $S, $E, $W, N, S, E, W, result);
		return result;
	};
	
	// returns every available North East, South East, South West or North West cell
	//
	//	-----------------
	//	|0	0	0|
	//	|1	P	0|
	//	|0	1	0|
	//	-----------------
	//
	// In this example will returns each point around P except for [x:0, y:2]
	// because South and West cells close movement
	function DiagonalSuccessors($N, $S, $E, $W, N, S, E, W, result){
		if($N) {
			if($E && $Grid(E, N))
				result.push({x:E, y:N});
			if($W && $Grid(W, N))
				result.push({x:W, y:N});
		};
		if($S){
			if($E && $Grid(E, S))
				result.push({x:E, y:S});
			if($W && $Grid(W, S))
				result.push({x:W, y:S});
		};
	};

	// returns every available North East, South East, South West or North West cell
	//
	//	-----------------
	//	|0	0	0|
	//	|1	P	0|
	//	|0	1	0|
	//	-----------------
	//
	// In this example will returns each point around P with [x:0, y:2] too.
	function DiagonalSuccessors$($N, $S, $E, $W, N, S, E, W, result){
		$N = N > -1;
		$S = S < rows;
		$E = E < cols;
		$W = W > -1;
		if($E) {
			if($N && $Grid(E, N))
				result.push({x:E, y:N});
			if($S && $Grid(E, S))
				result.push({x:E, y:S});
		};
		if($W) {
			if($N && $Grid(W, N))
				result.push({x:W, y:N});
			if($S && $Grid(W, S))
				result.push({x:W, y:S});
		};
	};

// Distance functions, returns ideal distance from 2 points

	function Diagonal(Point, Goal){		// diagonal movement
		return max(abs(Point.x - Goal.x), abs(Point.y - Goal.y));
	};
	
	function Euclidean(Point, Goal){	// diagonal movement using Euclide (AC = sqrt(AB^2 + BC^2))
						//	where AB = x2 - x1 and BC = y2 - y1 and AC will be [x3, y3]
		return sqrt(pow(Point.x - Goal.x, 2) + pow(Point.y - Goal.y, 2));
	};
	
	function Manhattan(Point, Goal){	// linear movement
		return abs(Point.x - Goal.x) + abs(Point.y - Goal.y);
	};


// Private scope variables
	var
		// Math lib shortcuts
		abs =	Math.abs,
		max =	Math.max,
		pow =	Math.pow,
		sqrt =	Math.sqrt,
    
    /*
      [0,0,0],[1,0,0],[2,0,0],
      [0,1,0],[1,1,0],[2,1,0]
    */
    
		cols =	2,	// Grid width
		rows =	2,	// Grid height
		limit =	cols * rows,	// Maximum choices

		// [choosed function] or Manhattan function to know distance between 2 Points
		Distance = {
			Diagonal:Diagonal,
			DiagonalFree:Diagonal,
			Euclidean:Euclidean,
			EuclideanFree:Euclidean,
			Manhattan:Manhattan
		}[Find] || Manhattan;
		
	return Path(AStar());
};