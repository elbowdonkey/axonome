Screw.Unit(function() {
  var grid;
  describe('Grid', function() {
    before(function() {
      grid = new Grid(3,3);
    });
    
    it('should have a width and height', function() {
      expect(grid.width()).to(equal,3);
      expect(grid.height()).to(equal,3);
    });
    
    it('should have nodes', function() {
      var nodes = [
      [0,0],[1,0],[2,0],
      [0,1],[1,1],[2,1],
      [0,2],[1,2],[2,2]
      ]
      
      expect(grid.nodes()).to(equal,nodes);
    });
  });
});