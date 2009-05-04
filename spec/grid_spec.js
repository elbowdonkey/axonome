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
        new Node(0,0, grid),
        new Node(1,0, grid),
        new Node(2,0, grid),
        new Node(0,1, grid),
        new Node(1,1, grid),
        new Node(2,1, grid),
        new Node(0,2, grid),
        new Node(1,2, grid),
        new Node(2,2, grid)
      ]
      
      expect(grid.nodes()).to(equal,nodes);
    });
  });
});