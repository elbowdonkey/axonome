Screw.Unit(function() {
  var iso;
  describe('Iso', function() {
    before(function() {
      $('#dom_test').append('<div id="iso_grid"></div>');
      iso = new Iso(10,10, '#iso_grid');
    });
    
    it('creates an object with a grid and avatar', function() {
      iso = new Iso;
      expect(iso.grid).to(be_a, Grid);
      expect(iso.avatar).to(be_an, Avatar);
    });
    
    it('creates a 10x10 object representing an isometric map', function() {
      expect(iso.max_x).to(equal, 10);
      expect(iso.max_y).to(equal, 10);
      expect(iso.grid.width).to(equal, 10);
      expect(iso.grid.height).to(equal, 10);
      expect(iso.nodes.length).to(equal, 100);
    });
  });
  
  describe('options', function() {
    it('accepts tile size options hash', function() {
      $('#dom_test').append('<div id="options_grid"></div>');
      iso = new Iso(5,5, '#options_grid', {tile_width: 32, tile_height: 34});
      iso.render();
      tiles = $('#options_grid > div');
      avatar = $('#avatar');
      
      expect(iso.nodes[0].width).to(equal, 32);
      expect(iso.nodes[0].height).to(equal, 34);
    });
  });
  
  describe('rendering', function() {
    var tiles, avatar;
    before(function() {
      $('#dom_test').append('<div id="iso_grid"></div>');
      iso = new Iso(5,5, '#iso_grid');
      iso.render();
      tiles = $('#iso_grid > div');
      avatar = $('#avatar');
    });
    
    it('renders a 5x5 grid comprised of divs', function() {
      expect(tiles.length).to(equal, 25);
    });
    
    it('renders an avatar', function() {
      expect(avatar.length).to(equal, 1);
      expect(iso.avatar.left()).to(equal, 0);
      expect(iso.avatar.top()).to(equal, 0);
    });
    
    it('step by step walks a 3x3 square', function() {
      iso.change_avatar_y(1);
      expect(iso.avatar.left()).to(equal, -52);
      expect(iso.avatar.top()).to(equal, 26);
      iso.change_avatar_y(1);
      expect(iso.avatar.left()).to(equal, -104);
      expect(iso.avatar.top()).to(equal, 52);
      iso.change_avatar_y(1);
      expect(iso.avatar.left()).to(equal, -156);
      expect(iso.avatar.top()).to(equal, 78);
      
      iso.change_avatar_x(1);
      expect(iso.avatar.left()).to(equal, -104);
      expect(iso.avatar.top()).to(equal, 104);
      iso.change_avatar_x(1);
      expect(iso.avatar.left()).to(equal, -52);
      expect(iso.avatar.top()).to(equal, 130);
      iso.change_avatar_x(1);
      expect(iso.avatar.left()).to(equal, 0);
      expect(iso.avatar.top()).to(equal, 156);
      
      iso.change_avatar_y(-1);
      expect(iso.avatar.left()).to(equal, 52);
      expect(iso.avatar.top()).to(equal, 130);
      iso.change_avatar_y(-1);
      expect(iso.avatar.left()).to(equal, 104);
      expect(iso.avatar.top()).to(equal, 104);
      iso.change_avatar_y(-1);
      expect(iso.avatar.left()).to(equal, 156);
      expect(iso.avatar.top()).to(equal, 78);
      
      iso.change_avatar_x(-1);
      expect(iso.avatar.left()).to(equal, 104);
      expect(iso.avatar.top()).to(equal, 52);
      iso.change_avatar_x(-1);
      expect(iso.avatar.left()).to(equal, 52);
      expect(iso.avatar.top()).to(equal, 26);
      iso.change_avatar_x(-1);
      expect(iso.avatar.left()).to(equal, 0);
      expect(iso.avatar.top()).to(equal, 0);
    });
    
    it('3 steps at a time walks a 3x3 square', function() {
      iso.change_avatar_y(3);
      expect(iso.avatar.left()).to(equal, -156);
      expect(iso.avatar.top()).to(equal, 78);
      
      iso.change_avatar_x(3);
      expect(iso.avatar.left()).to(equal, 0);
      expect(iso.avatar.top()).to(equal, 156);
      
      iso.change_avatar_y(-3);
      expect(iso.avatar.left()).to(equal, 156);
      expect(iso.avatar.top()).to(equal, 78);
      
      iso.change_avatar_x(-3);
      expect(iso.avatar.left()).to(equal, 0);
      expect(iso.avatar.top()).to(equal, 0);
    });
    
    it('disallows attempts to travel beyond grid x', function() {
      var x_limit = iso.max_x-1;
      iso.avatar.position = [0,0];
      
      iso.change_avatar_x(x_limit);
      expect(iso.avatar.position).to(equal, [x_limit,0]);
      
      iso.change_avatar_x(1);
      expect(iso.avatar.position).to(equal, [x_limit,0]);
    });
    
    it('disallows attempts to travel beyond grid y', function() {
      var y_limit = iso.max_y-1;
      iso.avatar.position = [0,0];
      
      iso.change_avatar_y(y_limit);
      expect(iso.avatar.position).to(equal, [0,y_limit]);
      
      iso.change_avatar_y(1);
      expect(iso.avatar.position).to(equal, [0,y_limit]);
    });
  });
});