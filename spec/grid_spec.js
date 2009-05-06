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
  
  describe('Grid; with options', function() {
    it('should be able to created using options hash', function() {
      grid = new Grid({width:3, height:3});
      
      expect(grid.width()).to(equal,3);
      expect(grid.height()).to(equal,3);
    });
    
    it('should return a range of nodes', function() {
      grid = new Grid({width:6, height:6});
      var range = {x1: 0, y1: 0, x2: 1, y2: 1};
      var nodes = grid.nodes(range);
      
      expect(nodes.length).to(equal,4);
      expect(nodes[0].x).to(equal,0);
      expect(nodes[0].y).to(equal,0);
      
      expect(nodes[1].x).to(equal,1);
      expect(nodes[1].y).to(equal,0);
      
      expect(nodes[2].x).to(equal,0);
      expect(nodes[2].y).to(equal,1);
       
      expect(nodes[3].x).to(equal,1);
      expect(nodes[3].y).to(equal,1);
    });
  });
});