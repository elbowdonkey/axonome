function Avatar(grid) {
  this.grid = grid;
  this.position = [0,0];
  this.movement_queue;
  
  this.determine_path = function(x1,y1,x2,y2) {
    var a = new A(grid.width, grid.height, grid);
    a.set_start_node(a.find_node(x1,y1));
    a.set_goal_node(a.find_node(x2,y2));
    a.find_path()
    this.movement_queue = a.path;
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
  
  this.node = function() {
    return this.grid.node(this.position[0], this.position[1]);
  }
  
  this.zindex = function () {
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
  
  this.left = function() {
    return this.node().left();
  }
  
  this.top = function() {
    return this.node().top();
  }
}