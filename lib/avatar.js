function Avatar() {
  this.position = [0,0];
  this.zindex = 0;
  this.movement_queue;
  
  this.determine_path = function(x1,y1,x2,y2) {
    this.movement_queue = AStar(grid.to_a(),[x1,y1],[x2,y2]);
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