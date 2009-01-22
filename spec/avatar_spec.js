var avatar;
var grid;
Screw.Unit(function() {
  describe('Avatar', function() {
    before(function() {
      grid = new Grid(3,3);
      avatar = new Avatar();
      avatar.grid = grid;
    });
    
    it('know its position on a grid', function() {
      expect(avatar.position).to(equal,[0,0]);
    });
    
    it('has a zindex', function() {
      expect(avatar.zindex).to(equal,0);
    });
    
    it('can come up with a path if given start and end coordinates', function() {
      avatar.determine_path(0,0,2,2);
      var expected_path = [[0,0], [1,1], [2,2]];
      expect(avatar.movement_queue).to(equal, expected_path);
    });
    
    it('can change its position, one path node at a time, until it reaches the end', function() {
      avatar.determine_path(0,0,2,2);
      avatar.step();
      expect(avatar.position).to(equal, [1,1]);
      avatar.step();
      expect(avatar.position).to(equal, [2,2]);
    });
    
    it('can follow a path, then follow a new one', function() {
      avatar.determine_path(0,0,2,2);
      avatar.follow();
      expect(avatar.position).to(equal, [2,2]);
      avatar.determine_path(2,2,0,0);
      avatar.follow();
      expect(avatar.position).to(equal, [0,0]);
    });
    
    describe('a* performance', function() {
      before(function() {
        grid = new Grid(100,100);
        avatar = new Avatar();
        avatar.grid = grid;
      });
      
      it('can haul ass', function() {
        avatar.determine_path(0,0,22,88);
        avatar.follow();
      })
    });
    
  });
});