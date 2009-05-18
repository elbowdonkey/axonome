function Avatar(grid) {
  this.grid = grid;
  this.position = [0,0];
  this.movement_queue;
  
  this.determine_path = function(x1,y1,x2,y2) {
    this.movement_queue = AStar(this.grid.to_a(),[x1,y1],[x2,y2]);
  }
  
  this.step = function() {
    this.movement_queue.shift();
    if (this.movement_queue[0]) {
      this.position = this.movement_queue[0];
    }
  }
  
  this.follow = function() {
    for(var x, y, i = 0, j = this.movement_queue.length -1; i < j; i++) {
      this.step();
    }
  }
}

Avatar.prototype.node = function() {
  return this.grid.node_test(this.position[0], this.position[1]);
}


Avatar.prototype.zindex = function () {
  var node_zindex = this.node().zindex() + 10000;
  if (this.movement_queue && this.movement_queue.length > 1) {
		var next_move = this.movement_queue[1];
		var next_node = this.grid.node(next_move[0], next_move[1]);
		var next_zindex = next_node.zindex();
		
		if (next_zindex < node_zindex) {
			return node_zindex;
		} else {
			return next_zindex + 10000;
		}
	} else {
		return node_zindex;
	}
}

Avatar.prototype.left = function() {
  
  return this.node().left();
}

Avatar.prototype.top = function() {
  
  return this.node().top();
}