Screw.Unit(function() {
  describe('Node', function() {
    before(function() {
      grid = new Grid(1,1);
      node_a = new Node(0,0, grid);
      node_b = new Node(1,1, grid);
    });
    
    it('should belong to a grid', function() {
      expect(node_a.grid).to(equal,grid);
    });
    
    it('should have an xy address', function() {
      expect(node_a.xy()).to(equal,[0,0]);
      expect(node_b.xy()).to(equal,[1,1]);
    });
    
    it('should have a zindex', function() {
      // this will need adjustment, as depth is currently brittle;
      expect(node_a.zindex()).to(equal,0);
      expect(node_b.zindex()).to(equal,10400);
    });
            
    it('should have a unique index', function() {
      var node_a_index = node_a.x + node_a.y * grid.width();
      var node_b_index = node_b.x + node_b.y * grid.width();
      
      expect(node_a.index()).to(equal,node_a_index);
      expect(node_b.index()).to(equal,node_b_index);
    });
    
    it('should calculate pixel choordinates', function() {
      expect(node_a.left()).to(equal,0);
      expect(node_a.top()).to(equal,0);
      
      expect(node_b.left()).to(equal,0);
      expect(node_b.top()).to(equal,52);
    });
    
  });
});