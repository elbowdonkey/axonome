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
  });
});