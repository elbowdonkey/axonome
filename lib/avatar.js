function Avatar(grid) {
  this.grid = grid;
  this.position = [0,0,0];
  this.movement_queue;
  
  this.determine_path = function(x1,y1,x2,y2,z) {
    // TODO: this needs to be layer aware at some point - currently assumes layer 0
    var a = new A(grid.width, grid.height, grid);
    a.set_start_node(a.find_node(x1,y1,z));
    a.set_goal_node(a.find_node(x2,y2,z));
    a.find_path();
    this.movement_queue = a.path;
  }
  
  this.step = function() {
    if (this.movement_queue.length > 0) {
      this.position = this.movement_queue.shift();
    }
  }
  
  this.follow = function() {
    for(var x, y, i = 0, j = this.movement_queue.length; i < j; i++) {
      this.step();
    }
  }
  
  this.node = function() {
    var index = this.position[0] + "_" + this.position[1] + "_" + this.position[2]
    return this.grid.nodes[index];
  }
  
  this.zindex = function () {
    var node_zindex = this.node().zindex + 10000;
    
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
    return this.node().left;
  }
  
  this.top = function() {
    return this.node().top;
  }
}