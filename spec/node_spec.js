Screw.Unit(function(c) { with(c) {
  describe('Node', function() {
    before(function() {
      defaults.layers = 2;
      grid = new Grid(2,2,defaults);
      node_a = grid.nodes["0_0_0"];
      node_b = grid.nodes["0_1_0"];
      node_c = grid.nodes["0_0_1"];
      node_d = grid.nodes["0_1_1"];
    });
    
    it('should have a unique index', function() {
      expect(node_a.x).to(equal,0);
      expect(node_a.y).to(equal,0);
      expect(node_a.z).to(equal,0);
      
      expect(node_b.x).to(equal,0);
      expect(node_b.y).to(equal,1);
      expect(node_b.z).to(equal,0);
      
      expect(node_c.x).to(equal,0);
      expect(node_c.y).to(equal,0);
      expect(node_c.z).to(equal,1);
      
      expect(node_d.x).to(equal,0);
      expect(node_d.y).to(equal,1);
      expect(node_d.z).to(equal,1);
      
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
    
    it('should have x, y, and z attributes', function() {
      expect(node_a.x).to(equal,0);
      expect(node_a.y).to(equal,0);
      expect(node_a.z).to(equal,0);
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
      expect(node_a.zindex).to(equal,0);
      expect(node_b.zindex).to(equal,4160);
    });
    
    it('should calculate pixel choordinates', function() {
      expect(node_a.left).to(equal,0);
      expect(node_a.top).to(equal,0);
      
      expect(node_b.left).to(equal,-52);
      expect(node_b.top).to(equal,26);
      
      var node = new Node(node_b.x,node_b.y,1, 'fake_grid', {iso_height:4});
      expect(node.left).to(equal,-52);
      expect(node.top).to(equal,22);
      
      var node = new Node(node_b.x,node_b.y,2, 'fake_grid', {iso_height:4});
      expect(node.left).to(equal,-52);
      expect(node.top).to(equal,18);
    });
    
    it('should be walkable (or not)', function() {
      var walkable_node1 = new Node(0,0,0, 'fake_grid');
      var walkable_node2 = new Node(0,0,0, 'fake_grid', {walkable: true});
      var unwalkable_node = new Node(0,0,0, 'fake_grid', {walkable: false});
      
      expect(walkable_node1.walkable).to(equal,true);
      expect(walkable_node2.walkable).to(equal,true);
      expect(unwalkable_node.walkable).to(equal,false);
    });
  });
}});