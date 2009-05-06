function Avatar(grid) {
  this.grid = grid;
  this.position = [0,0];
  this.movement_queue;
  this.node = grid.nodes[0];
  
  
  this.determine_path = function(x1,y1,x2,y2) {
    this.movement_queue = AStar(this.grid.to_a(),[x1,y1],[x2,y2]);
  }
  
  this.step = function() {
    this.movement_queue.shift();
    this.position = this.movement_queue[0];
  }
  
  this.follow = function() {
    for(var x, y, i = 0, j = this.movement_queue.length -1; i < j; i++) {
      this.step();
    }
  }
}

Avatar.prototype.zindex = function () {
  return this.node.zindex();
}

Avatar.prototype.left = function() {
  return this.node.left();
}

Avatar.prototype.top = function() {
  return this.node.top();
}