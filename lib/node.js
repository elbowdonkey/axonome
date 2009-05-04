function Node(x,y,grid) {
  this.x = x;
  this.y = y;
  this.grid = grid;
  this.width = 104;
  this.height = 52;
}

Node.prototype.xy = function() {
  return [this.x,this.y];
}

Node.prototype.zindex = function() {
  var tile_width = 104;
  var offset = 0;
  var gap = 10;
  var zindex = (((this.x + this.y) * tile_width / 2 * gap + (this.x - this.y) * tile_width) * gap);
  var zindex_and_offset = zindex + (offset || 0);
  
  return zindex_and_offset;
}

Node.prototype.index = function() {
  return this.x + this.y * this.grid.width();
}

Node.prototype.left = function() {
  return ((this.x - this.y) * this.width / 2);
}

Node.prototype.top = function() {
  return ((this.x + this.y) * this.height / 2);
}