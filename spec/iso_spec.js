Screw.Unit(function(c) { with(c) {
  describe('Iso', function() {
    var board;
    before(function() {
      $j('body').append('<div id="board"></div>');
      board = $j('#board').iso({
        tile_width: 32, 
        tile_height: 34,
        avatar_offset: [10,10],
        layers: 2,
        animate:false
      });
    });
    
    after(function() {
      $j('#board').remove();
    });
    
    it('creates an object with a grid', function() {
      expect(board.iso.grid).to(be_an_instance_of, Grid);
    });
    
    it('creates an object with an avatar', function() {
      expect(board.iso.avatar).to(be_an_instance_of, Avatar);
    });
    
    it('creates a 6x6 object representing an isometric map', function() {
      expect(board.iso.defaults.max_x).to(equal, 6);
      expect(board.iso.defaults.max_y).to(equal, 6);
      expect(board.iso.grid.width).to(equal, 6);
      expect(board.iso.grid.height).to(equal, 6);
      expect(board.iso.defaults.layers).to(equal, 2);
      expect(board.iso.nodes.size()).to(equal, 72);
    });
    
    it('accepts tile size options hash', function() {
      expect(board.iso.nodes['0_0_0'].width).to(equal, 32);
      expect(board.iso.nodes['0_0_0'].height).to(equal, 34);
    });
    
    it('accepts avatar offset options', function() {
      expect(board.iso.avatar.offset).to(equal, [10,10]);
    });
    
    it('renders a 6x6 grid comprised of divs', function() {
      expect($j('#board > .layer_0').length).to(equal, 36);
      expect($j('#board > .layer_1').length).to(equal, 36);
    });
    
    it('renders an avatar', function() {
      expect($j('#avatar_0').length).to(equal, 1);
      expect(board.iso.avatar.left()).to(equal, 0);
      expect(board.iso.avatar.top()).to(equal, 0);
    });
    
    it('walks a 3x3 square', function() {
      waypoints = [
        board.iso.grid.node(2,0,1),
        board.iso.grid.node(2,2,1),
        board.iso.grid.node(0,2,1),
        board.iso.grid.node(0,0,1)
      ];
      
      $j('#tile_' + waypoints[0].id).click();
      expect(board.iso.avatar.position).to(equal, [2,0,1]);
      
      // $j('#tile_' + waypoints[1].id).click();
      // expect(board.iso.avatar.position).to(equal, [2,2,1]);
      // 
      // $j('#tile_' + waypoints[2].id).click();
      // expect(board.iso.avatar.position).to(equal, [0,2,1]);
      // 
      // $j('#tile_' + waypoints[3].id).click();
      // expect(board.iso.avatar.position).to(equal, [0,0,1]);
    });
  });
}});