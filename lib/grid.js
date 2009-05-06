function Grid(width,height) {
  
  // making some serious assumptions here
  if (arguments.length == 1) {
    height = arguments[0].height;
    width = arguments[0].width;
  }
  
  var	floor = Math.floor
  var random = Math.random;
  this.grid = new Array(height);
  
  for (var j, i=0; i < height; i++) {
    this.grid[i] = new Array(width);
		for (j=0; j < width; j++) {
      this.grid[i][j] = 0
    }
	};
}

Grid.prototype.width = function() {
  return this.grid[0].length;
}

Grid.prototype.height = function() {
  return this.grid.length;
}

Grid.prototype.to_a = function() {
  return this.grid;
}

Grid.prototype.nodes = function(range) {
  var node_array = []
  var node_index = 0;
  
	for (var y=0; y < this.width(); y++) {
		for (var x=0; x < this.height(); x++) {
		  if (range) {
		    if ((x >= range.x1 && x <= range.x2) && (y >= range.y1 && y <= range.y2)) {
		      node_array[node_index] = new Node(x,y,this);
		      node_index += 1;
		    }
		  } else {
		    node_array[node_index] = new Node(x,y,this);
		    node_index += 1;
		  }
		};
	};
	
  return node_array;
}