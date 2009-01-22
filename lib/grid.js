function Grid(width,height) {
  var	floor = Math.floor
  var random = Math.random;
  this.grid = new Array(height);
  
  for (var j, i=0; i < height; i++) {
    this.grid[i] = new Array(width);
		for (j=0; j < width; j++) {
      this.grid[i][j] = 0 /// I think all this insanity was for unwalkable tiles (j * i) % 7 ? floor(random() * 200) % 2 : 0;
    }
	};
}

Grid.prototype.width = function() {
  return this.grid[0].length;
}

Grid.prototype.height = function() {
  return this.grid.length;
}

Grid.prototype.to_a = function() {
  return this.grid;
}