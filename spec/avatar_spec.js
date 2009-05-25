var avatar;
var grid;
var node;
Screw.Unit(function() {
  describe('Avatar', function() {
    before(function() {
      grid = new Grid(3,3);
      avatar = new Avatar(grid);
      node = grid.nodes[0];
    });
    
    it('know its position on a grid', function() {
      expect(avatar.position).to(equal,[0,0]);
    });
    
    it('has a zindex', function() {
      expect(avatar.zindex()).to(equal,node.zindex()+10000);
    });
    
    it('can determine its xy pixel coords', function() {
      expect(avatar.left()).to(equal,node.left());
      expect(avatar.top()).to(equal,node.top());
    });
    
    it('belongs to a node on a grid', function() {
      expect(avatar.node()).to(equal,node);
    });
    
    it('can come up with a path if given start and end coordinates', function() {
      avatar.determine_path(0,0,2,2);
      var expected_path = [[0,0], [1,1], [2,2]];
      expect(avatar.movement_queue).to(equal, expected_path);
    });
    
    it('can change its position, one path node at a time, until it reaches the end', function() {
      avatar.determine_path(0,0,2,2);
      avatar.step();
      expect(avatar.node()).to(equal,grid.node(1,1));
      expect(avatar.position).to(equal, [1,1]);
      avatar.step();
      expect(avatar.node()).to(equal,grid.node(2,2));
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
        avatar = new Avatar(grid);
        avatar.grid = grid;
      });
      
      it('can haul ass', function() {
        avatar.determine_path(0,0,22,88);
        avatar.follow();
      })
    });
    
    describe("Multiple avatars", function() {
      var avatar_a;
      var avatar_b;
      before(function() {
        grid = new Grid(3,3);
        avatar_a = new Avatar(grid);
        avatar_b = new Avatar(grid);
      });
      
      it('avatars can be positioned independently', function() {
        expect(avatar_a.position).to(equal,[0,0]);
        expect(avatar_b.position).to(equal,[0,0]);
        
        avatar_a.determine_path(0,0,2,2);
        avatar_a.follow();
        expect(avatar_a.position).to(equal, [2,2]);
        
        avatar_b.determine_path(0,0,0,2);
        avatar_b.follow();
        expect(avatar_b.position).to(equal, [0,2]);
      });
    });
  });
});