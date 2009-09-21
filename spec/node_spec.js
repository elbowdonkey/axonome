Screw.Unit(function(c) { with(c) {
  describe('Node', function() {
    before(function() {
      grid = new Grid(2,2,defaults);
      node_a = grid.nodes[0];
      node_b = grid.nodes[3];
    });
    
    it('should belong to a grid', function() {
      expect(node_a.grid).to(equal,grid);
    });
    
    it('should have a default tile size', function() {
      expect(node_a.width).to(equal,104);
      expect(node_a.height).to(equal,52);
    });
    
    it('should accept options for tile size', function() {
      var node = new Node(0,0,0,grid,{tile_width: 20, tile_height: 20})
      expect(node.width).to(equal,20);
      expect(node.height).to(equal,20);
    });
    
    it('should have an xy address', function() {
      expect(node_a.xy()).to(equal,[0,0]);
      expect(node_b.xy()).to(equal,[1,1]);
    });
    
    it('should have a default iso_height', function() {
      expect(node_a.iso_height).to(equal,0);
    });
    
    it('should accept options for iso_height', function() {
      var node = new Node(0,0,0,grid,{iso_height: 4})
      expect(node.iso_height).to(equal,4);
    });
    
    it('should have a default z', function() {
      expect(node_a.z).to(equal,0);
    });
    
    it('should accept argument for z', function() {
      var node = new Node(0,0,1,grid, defaults)
      expect(node.z).to(equal,1);
    });
    
    it('should have a calculated depth', function() {
      var node = new Node(0,0,1, 'fake_grid', defaults);
      expect(node.depth).to(equal,100);
      var node = new Node(0,0,2, 'fake_grid', defaults);
      expect(node.depth).to(equal,200);
      var node = new Node(1,0,2, 'fake_grid', defaults);
      expect(node.depth).to(equal,210);
    });
    
    it('should have a screen zindex', function() {
      // this will need adjustment, as depth is currently brittle;
      expect(node_a.zindex()).to(equal,0);
      expect(node_b.zindex()).to(equal,10400);
    });
            
    it('should have a unique index', function() {
      var node_a_index = node_a.x + node_a.y * grid.width;
      var node_b_index = node_b.x + node_b.y * grid.width;
      
      expect(node_a.index()).to(equal,node_a_index);
      expect(node_b.index()).to(equal,node_b_index);
    });
    
    it('should calculate pixel choordinates', function() {
      expect(node_a.left()).to(equal,0);
      expect(node_a.top()).to(equal,0);
      
      expect(node_b.left()).to(equal,0);
      expect(node_b.top()).to(equal,52);
      
      var node = new Node(node_b.x,node_b.y,1, 'fake_grid', {iso_height:4});
      expect(node.left()).to(equal,0);
      expect(node.top()).to(equal,48);
      
      var node = new Node(node_b.x,node_b.y,2, 'fake_grid', {iso_height:4});
      expect(node.left()).to(equal,0);
      expect(node.top()).to(equal,44);
    });
    
  });
}});