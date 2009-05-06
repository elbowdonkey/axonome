function Grid(width,height) {
  var	floor = Math.floor
  var random = Math.random;
  this.grid = new Array(height);
  this.width = width;
  this.height = height;
  
  var node_array = []
  var node_index = 0;

	for (var y=0; y < height; y++) {
		for (var x=0; x < width; x++) {
		  node_array[node_index] = new Node(x,y,this);
      node_index += 1;
		};
	};
	
	this.nodes = node_array;
  
  // do we even need this any more?
  for (var j, i=0; i < height; i++) {
    this.grid[i] = new Array(width);
		for (j=0; j < width; j++) {
      this.grid[i][j] = 0
    }
	};
	
	this.node = function(x,y) {
	  var index = x + y * width;
	  return this.nodes[index];
	}
}

Grid.prototype.to_a = function() {
  return this.grid;
}