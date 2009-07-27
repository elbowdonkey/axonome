function Grid(width,height,options) {
  var	floor = Math.floor
  var random = Math.random;
  this.grid = new Array();
  this.width = width;
  this.height = height;
  
  var node_array = []
  var node_index = 0;
  
  /*
  -       for (var y=0; y < height; y++) {
  -               for (var x=0; x < width; x++) {
  -                 node_array[node_index] = new Node(x,y,this, options);
  -      node_index += 1;
  -               };
  -       };
  */
  
  for (var z=0; z < options.layers; z++) {
    for (var y=0; y < height; y++) {
  		for (var x=0; x < width; x++) {
  		  node_array[node_index] = new Node(x,y,z,this,options);
        node_index += 1;
  		};
  	};
  };
  
  
	
	this.nodes = node_array;
	
  // for (var j, i=0; i < height; i++) {
  //     this.grid[i] = new Array(width);
  //     for (j=0; j < width; j++) {
  //       this.grid[i][j] = 0
  //     };
  //   };
	
	for (var i=0; i < this.nodes.length; i++) {
	 this.grid.push([this.nodes[i].x, this.nodes[i].y, this.nodes[i].z]);
	};
	
	this.node = function(x,y) {
	  var index = x + y * width;
	  return this.nodes[index];
	}
}

Grid.prototype.to_a = function() {
  return this.grid;
}

Grid.prototype.range = function(x1,y1,x2,y2) {
  var width = (x2)+1;
  var height = (y2)+1;
  var node_array = [];
  
  for (var y=y1; y < height; y++) {
    for (var x=x1; x < width; x++) {
      node_array.push(this.node(x,y));
    };
  };
  return node_array;
}