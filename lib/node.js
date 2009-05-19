function Node(x,y,grid,options) {
  this.x = x;
  this.y = y;
  this.grid = grid;
  this.width = 104;
  this.height = 52;
  this.z = 0;
  this.iso_height = 0;
  
  if (options) {
    if (options.tile_width && options.tile_height) {
      this.width = options.tile_width;
      this.height = options.tile_height;
    }
    
    if (options.z) {
      this.z = options.z;
    }
    
    if (options.iso_height) {
      this.iso_height = options.iso_height;
    }
  }
  
  this.calculate_depth = function() {
    var x,y,z;
    var max_x = 10;
    var max_z = 10;
    var gap = 10; // spaces out depths by increments of 5
    x = Math.abs(this.x) * gap;
    y = Math.abs(this.y);
    z = Math.abs(this.z) * gap;
    
    var floor = max_x * (max_z) + x;
    var depth = max_x * (z) + x + floor * y;
    
    return depth;
  }
  
  this.depth = this.calculate_depth();
}

Node.prototype.xy = function() {
  return [this.x,this.y];
}

Node.prototype.zindex = function() {
  var offset = 0;
  var gap = 10;
  var zindex = (((this.x + this.y) * this.width / 2 * gap + (this.x - this.y) * this.width) * gap);
  var zindex_and_offset = zindex + (offset || 0);
  return zindex_and_offset;
}

Node.prototype.index = function() {
  return this.x + this.y * this.grid.width;
}

Node.prototype.left = function() {
  return ((this.x - this.y) * this.width / 2);
}

Node.prototype.top = function() {
  return ((this.x + this.y) * this.height / 2) - (this.iso_height * this.z);
}