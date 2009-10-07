function Grid(width,height,options) {
  var floor = Math.floor
  var random = Math.random;
  this.grid = new Array();
  this.width = width;
  this.height = height;
  
  var node_array = [];
  
  for (var z=0; z < options.layers; z++) {
    for (var y=0; y < height; y++) {
      for (var x=0; x < width; x++) {
        var index = x + "_" + y + "_" + z;
        node_array[index] = new Node(x,y,z,this,options);
      };
    };
  };
  
  this.nodes = node_array;
  
  for (var i=0; i < this.nodes.length; i++) {
   this.grid.push([this.nodes[i].x, this.nodes[i].y, this.nodes[i].z]);
  };
  
  this.node = function(x,y,z) {
    var index = x + "_" + y + "_" + z;
    return this.nodes[index];
  }
  
  this.column = function(x,z) {
    var column = new Array();
    for (var y=0; y < this.height; y++) {
      var index = x + "_" + y + "_" + z;
      column.push(this.nodes[index]);
    }
    return column;
  }
  
  this.row = function(y,z) {
    var row = new Array();
    for (var x=0; x < this.width; x++) {
      var index = x + "_" + y + "_" + z;
      row.push(this.nodes[index]);
    }
    return row;
  }
}

//TODO: don't need this anymore?
Grid.prototype.to_a = function() {
  return this.grid;
}

Grid.prototype.range = function(x1,y1,x2,y2,z) {
  var width = (x2)+1;
  var height = (y2)+1;
  var node_array = [];
  
  for (var y=y1; y < height; y++) {
    for (var x=x1; x < width; x++) {
      var index = x + "_" + y + "_" + z;
      node_array[index] = this.node(x,y,z);
    };
  };

  return node_array;
}