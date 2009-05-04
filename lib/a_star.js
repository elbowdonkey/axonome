// AStar courtesy of http://github.com/clindsey/cll_js_iso/tree/master

function AStar(grid, start, goal) {
	// init function, sets Find string as dedicated function to search diagonal nodes
	function AStar(){};
	
	// returns boolean value (Grid cell is available and open)
	function is_cell_open(x, y){
		return grid[y][x] === 0;
	};

	// Node function, returns a new object with Node properties
	function node(parent, point){
		return {
			"parent": parent,
			"value": point.x + (point.y * cols),
			"x": point.x,
			"y": point.y,
			"f": 0,
			"g": 0
		};
	};

	// Path function, executes AStar algorithm operations
	function path() {
		this.start_node = node(null, {"x": start[0], "y": start[1]});	// Start Point
		this.goal_node = node(null, {"x": goal[0], "y": goal[1]});	// Goal Point
		this.a_star = new Array(limit);			// Every undefined Grid cell
		this.open_node = [this.start_node];
		this.closed_node = []; 
		this.result = [];	// open and closed list and result array
		this.successors;
		this.node;
		this.path;
		
		var	length, max, min, i, j;				// integer variables
		while (length = this.open_node.length) {
			max = limit;
			min = -1;
			for (i = 0; i < length; i++) {
				if(this.open_node[i].f < max) {
					max = this.open_node[i].f;
					min = i;
				}
			};
			this.node = this.open_node.splice(min, 1)[0];
			if (this.node.value === this.goal_node.value) {
				this.path = this.closed_node[this.closed_node.push(this.node) - 1];
				do {
					this.result.push([this.path.x, this.path.y]);
				} while(this.path = this.path.parent);
				this.a_star = this.closed_node = this.open_node = [];
				this.result.reverse();
			} else {
				this.successors = Successors(this.node.x, this.node.y);
				for (i = 0, j = this.successors.length; i < j; i++){
					this.path = node(this.node, this.successors[i]);
					if(!this.a_star[this.path.value]){
						this.path.g = this.node.g + Distance(this.successors[i], this.node);
						this.path.f = this.path.g + Distance(this.successors[i], this.goal_node);
						this.open_node.push(this.path);
						this.a_star[this.path.value] = true;
					};
				};
				this.closed_node.push(this.node);
			};
		};
		return this.result;
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
		var	N = y - 1;
		var	S = y + 1;
		var E = x + 1;
		var W = x - 1;
		var $N = N > -1 && is_cell_open(x, N);
		var $S = S < rows && is_cell_open(x, S);
		var $E = E < cols && is_cell_open(E, y);
		var $W = W > -1 && is_cell_open(W, y);
		var result = [];
		
		if ($N)
			result.push({x:x, y:N});
		if ($E)
			result.push({x:E, y:y});
		if ($S)
			result.push({x:x, y:S});
		if ($W)
			result.push({x:W, y:y});
		DiagonalSuccessors($N, $S, $E, $W, N, S, E, W, result);
		return result;
	};
	
	function DiagonalSuccessors($N, $S, $E, $W, N, S, E, W, result){
		if($N) {
			if($E && is_cell_open(E, N))
				result.push({x:E, y:N});
			if($W && is_cell_open(W, N))
				result.push({x:W, y:N});
		};
		if($S){
			if($E && is_cell_open(E, S))
				result.push({x:E, y:S});
			if($W && is_cell_open(W, S))
				result.push({x:W, y:S});
		};
	};
	
	
// Distance functions, returns ideal distance from 2 points

	function Manhattan(Point, goal){	// linear movement
		return abs(Point.x - goal.x) + abs(Point.y - goal.y);
	};

  function Euclidean(Point, Goal){	// diagonal movement using Euclide (AC = sqrt(AB^2 + BC^2))
						//	where AB = x2 - x1 and BC = y2 - y1 and AC will be [x3, y3]
		return sqrt(pow(Point.x - Goal.x, 2) + pow(Point.y - Goal.y, 2));
	};


// Private scope variables
	var
		// Math lib shortcuts
		abs =	Math.abs,
		max =	Math.max,
		pow =	Math.pow,
		sqrt =	Math.sqrt,

		cols =	grid[0].length,	// Grid width
		rows =	grid.length,	// Grid height
		limit =	cols * rows,	// Maximum choices

		// [choosed function] or Manhattan function to know distance between 2 Points
		Distance = Euclidean;
	
	return path(AStar());
};