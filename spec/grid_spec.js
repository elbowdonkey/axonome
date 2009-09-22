Screw.Unit(function(c) { with(c) {
  var grid;
  var nodes;
  describe('Grid', function() {
    before(function() {
      grid = new Grid(3,3,defaults);
      nodes = [
        new Node(0,0,0, grid, defaults),
        new Node(1,0,0, grid, defaults),
        new Node(2,0,0, grid, defaults),
        new Node(0,1,0, grid, defaults),
        new Node(1,1,0, grid, defaults),
        new Node(2,1,0, grid, defaults),
        new Node(0,2,0, grid, defaults),
        new Node(1,2,0, grid, defaults),
        new Node(2,2,0, grid, defaults)
      ]
    });
    
    it('should have a width and height', function() {
      expect(grid.width).to(equal,3);
      expect(grid.height).to(equal,3);
    });
    
    it('should have nodes', function() {
      expect(grid.nodes).to(equal,nodes);
    });
    
    it('should be able to return a single node when given xy coords', function() {
      expect(grid.node(0,0)).to(equal,grid.nodes[0]);
    });
  });
  
  describe('Grid; with options', function() {
    // it('should be able to created using options hash', function() {
    //   grid = new Grid({width:3, height:3});
    //   
    //   expect(grid.width()).to(equal,3);
    //   expect(grid.height()).to(equal,3);
    // });
    
    // TODO: some nodes should be walkable, some should not be
    it('should return a range of nodes', function() {
      grid = new Grid(6,6,defaults);
      var nodes = grid.range(1,1,2,2);
      
      expect(nodes.length).to(equal,4);
      expect(nodes[0].x).to(equal,1);
      expect(nodes[0].y).to(equal,1);
      
      expect(nodes[1].x).to(equal,2);
      expect(nodes[1].y).to(equal,1);
      
      expect(nodes[2].x).to(equal,1);
      expect(nodes[2].y).to(equal,2);
       
      expect(nodes[3].x).to(equal,2);
      expect(nodes[3].y).to(equal,2);
    });
  });
  
  describe("Grid layers", function() {
    it("should obey the layers option", function() {
      grid = new Grid(1,1, {layers: 2});
      expect(grid.to_a()).to(equal, [[ 0, 0, 0 ], [ 0, 0, 1 ]]);
    });
  });
  
}});