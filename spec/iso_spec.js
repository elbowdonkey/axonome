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
    
    it('maps iso tile to screen coordinates', function() {
      /*
      var new_xp, new_yp;
      var old_x = 286;
      var old_y = 12;
      
      new_xp = Math.cos(45) * old_x - Math.sin(45) * old_y;
      new_yp = Math.sin(45) * old_x + Math.cos(45) * old_y;
      
      x = Math.cos(30) * new_xp - Math.sin(30) * new_yp;
      y = Math.sin(30) * new_xp + Math.cos(30) * new_yp;
      
      console.log(x, y);
      */
      var rotation = 45.0;
      var elevation = 0.0;
      var spin = 30.0;
      var zoom = 0.0;
      
      var cos = Math.cos;
      var sin = Math.sin;
      
      right_x = (cos(spin) * cos(rotation) - sin(spin) * sin(rotation) * cos(elevation));
      right_y = (sin(spin) * cos(rotation) + cos(spin) * sin(rotation) * cos(elevation));
      front_x = (cos(spin) * sin(rotation) - sin(spin) * -cos(rotation) * cos(elevation));
      front_y = (sin(spin) * sin(rotation) + cos(spin) * -cos(rotation) * cos(elevation));
      up_x = -sin(spin) * sin(elevation);
      up_y = cos(spin) * sin(elevation);
      
      console.log(right_x, right_y, front_x, front_y, up_x, up_y);
      var x = 4;
      var y = 4;
      var z = 0;
      var screen_x = x * right_x + y * front_x + z * up_x;
      var screen_y = x * right_y + y * front_y + z * up_y;
      
      console.log(screen_x*16, screen_y*16);
      
    });
  });
}});