Screw.Unit(function() {
  describe('Iso', function() {
    var board;
    before(function() {
      $('body').append('<div id="board"></div>');
      board = $('#board').iso();
    });
    
    after(function() {
      $('#board').remove();
    });
    
    it('creates an object with a grid and avatar', function() {
      expect(board.iso.grid).to(be_a, Grid);
      expect(board.iso.avatar).to(be_an, Avatar);
    });
    
    it('creates a 6x6 object representing an isometric map', function() {
      expect(board.iso.defaults.max_x).to(equal, 6);
      expect(board.iso.defaults.max_y).to(equal, 6);
      expect(board.iso.grid.width).to(equal, 6);
      expect(board.iso.grid.height).to(equal, 6);
      expect(board.iso.nodes.length).to(equal, 36);
    });
  });
  
  describe('options', function() {
    var board;
    before(function() {
      $('body').append('<div id="board"></div>');
    });
    
    after(function() {
      $('#board').remove();
    });
    
    it('accepts tile size options hash', function() {
      board = $('#board').iso({tile_width: 32, tile_height: 34});
      expect(board.iso.nodes[0].width).to(equal, 32);
      expect(board.iso.nodes[0].height).to(equal, 34);
    });
    
    it('accepts avatar offset options', function() {
      board = $('#board').iso({avatar_offset: [10,10]});
      expect(board.iso.defaults.avatar_offset).to(equal, [10,10]);
    });
  });
  
  describe('rendering', function() {
    var board;
    before(function() {
      $('body').append('<div id="board"></div>');
      board = $('#board').iso({animate:false});
    });
    
    after(function() {
      $('#board').remove();
    });
    
    it('renders a 6x6 grid comprised of divs', function() {
      expect($('#board > div').length).to(equal, 36);
    });
    
    it('renders an avatar', function() {
      expect($('#avatar_0').length).to(equal, 1);
      expect(board.iso.avatar.left()).to(equal, 0);
      expect(board.iso.avatar.top()).to(equal, 0);
    });
    
    it('walks a 3x3 square', function() {
      waypoints = [
        board.iso.grid.node(2,0),
        board.iso.grid.node(2,2),
        board.iso.grid.node(0,2),
        board.iso.grid.node(0,0)
      ];
      
      $('#tile_' + waypoints[0].index()).click();
      expect(board.iso.avatar.position).to(equal, [2,0]);
      
      $('#tile_' + waypoints[1].index()).click();
      expect(board.iso.avatar.position).to(equal, [2,2]);
      
      $('#tile_' + waypoints[2].index()).click();
      expect(board.iso.avatar.position).to(equal, [0,2]);
      
      $('#tile_' + waypoints[3].index()).click();
      expect(board.iso.avatar.position).to(equal, [0,0]);
    });
    
    it('disallows attempts to travel beyond grid x', function() {
      var x_limit = board.iso.defaults.max_x-1;      
      expect(x_limit).to(equal, 5);
      
      board.iso.avatar.position = [0,0];
      
      board.iso.change_avatar(x_limit,'x');
      expect(board.iso.avatar.position).to(equal, [x_limit,0]);
      
      board.iso.change_avatar(1,'x');
      expect(board.iso.avatar.position).to(equal, [x_limit,0]);
    });
    
    it('disallows attempts to travel beyond grid y', function() {
      var y_limit = board.iso.defaults.max_y-1;
      expect(y_limit).to(equal, 5);
      
      board.iso.avatar.position = [0,0];
      
      board.iso.change_avatar(y_limit,'y');
      expect(board.iso.avatar.position).to(equal, [0,y_limit]);
      
      board.iso.change_avatar(1,'y');
      expect(board.iso.avatar.position).to(equal, [0,y_limit]);
    });
  });
});