function Node(x,y,z,grid,options) {
  this.x = x;
  this.y = y;
  this.z = z;
  this.grid = grid;
  this.width = 104;
  this.height = 52;
  this.iso_height = 0;
  this.iso_width = 0;
  this.walkable = true;
  this.id = this.x + "_" + this.y + "_" + this.z;
  
  if (options) {
    if (options.tile_width && options.tile_height) {
      this.width = options.tile_width;
      this.height = options.tile_height;
    }
    
    if (options.iso_height) {
      this.iso_height = options.iso_height;
    }
    
    if (options.iso_width) {
      this.iso_width = options.iso_width;
    }
    if (options.walkable == false) {
      this.walkable = false;
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
  
  this.zindex = function() {
    var offset = 0;
    var gap = 10;
    var zindex = (((this.x + this.y) * this.width / 2 * gap + (this.x - this.y) * this.width) * gap);
    var zindex_and_offset = zindex + (offset || 0);
    return zindex_and_offset;
  }
  
  this.left = function() {
    return ((this.x - this.y) * this.width / 2);
  }
  
  this.top = function() {
    return ((this.x + this.y) * this.height / 2) - (this.iso_height * this.z);
  }
  
  return {
    x: this.x,
    y: this.y,
    grid: this.grid,
    width: this.width,
    height: this.height,
    z: this.z,
    iso_height: this.iso_height,
    iso_width: this.iso_width,
    walkable: this.walkable,
    depth: this.calculate_depth(),
    zindex: this.zindex(),
    left: this.left(),
    top: this.top(),
    id: this.id
  }
}

//TODO: don't need this anymore?
Node.prototype.index = function() {
  return this.x + this.y * this.grid.width;
}