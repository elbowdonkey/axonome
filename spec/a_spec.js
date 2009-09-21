Screw.Unit(function(c) { with(c) {
  describe("A", function() {
    var a;
    before(function() {
      a = new A(6,6);
      //a.add_node(0,0);a.add_node(1,0);a.add_node(2,0);a.add_node(3,0);a.add_node(4,0);a.add_node(5,0);
      //a.add_node(0,1);a.add_node(1,1);a.add_node(2,1);a.add_node(3,1);a.add_node(4,1);a.add_node(5,1);
      //a.add_node(0,2);a.add_node(1,2);a.add_node(2,2);a.add_node(3,2);a.add_node(4,2);a.add_node(5,2);
      //a.add_node(0,3);a.add_node(1,3);a.add_node(2,3);a.add_node(3,3);a.add_node(4,3);a.add_node(5,3);
      //a.add_node(0,4);a.add_node(1,4);a.add_node(2,4);a.add_node(3,4);a.add_node(4,4);a.add_node(5,4);
      //a.add_node(0,5);a.add_node(1,5);a.add_node(2,5);a.add_node(3,5);a.add_node(4,5);a.add_node(5,5);
      
      a.toggle_walkability(a.master_list["3_2"]);
      a.toggle_walkability(a.master_list["3_3"]);
      a.toggle_walkability(a.master_list["3_4"]);
      
      var start = a.find_node(1,2);
      a.set_start_node(start);
      var goal = a.find_node(5,2);
      a.set_goal_node(goal);
    });
    
    it("automatically creates nodes to be used for path finding", function() {
      var expected_nodes = {
        "0_0": {"status": 0, "x": 0, "y": 0, "parent": undefined, "f": 0, "g": 0, "h": 0, "walkable": true},
        "1_0": {"status": 0, "x": 1, "y": 0, "parent": undefined, "f": 0, "g": 0, "h": 0, "walkable": true},
        "0_1": {"status": 0, "x": 0, "y": 1, "parent": undefined, "f": 0, "g": 0, "h": 0, "walkable": true},
        "1_1": {"status": 0, "x": 1, "y": 1, "parent": undefined, "f": 0, "g": 0, "h": 0, "walkable": true}
      }
      
      expect(a.master_list["0_0"]).to(equal, expected_nodes["0_0"]);
      expect(a.master_list["1_0"]).to(equal, expected_nodes["1_0"]);
      expect(a.master_list["0_1"]).to(equal, expected_nodes["0_1"]);
      expect(a.master_list["1_1"]).to(equal, expected_nodes["1_1"]);
    });
    
    it("allows a start node to be set", function() {
      var start = a.find_node(1,2);
      a.set_start_node(start);
      expect(a.start_node).to(equal,start);
      start = a.find_node(2,4)
      a.set_start_node(start);
      expect(a.start_node).to(equal,start);
    });
    
    it("allows a goal node to be set", function() {
      var goal = a.find_node(5,2);
      a.set_goal_node(goal);
      expect(a.goal_node).to(equal,goal);
      goal = a.find_node(3,2);
      a.set_goal_node(goal);
      expect(a.goal_node).to(equal,goal);
    });
    
    it("a node can be marked as closed, open, or unchecked", function() {
      var node = a.master_list["0_0"];
                
      expect(node["status"]).to(equal,0);
      
      a.close_node(node);      
      expect(node["status"]).to(equal,-1);
      
      a.open_node(node);
      expect(node["status"]).to(equal,1);
    });
    
    it("a node can have a parent node", function() {
      var node_a = a.master_list["0_0"];
      var node_b = a.master_list["1_0"];
      
      a.add_parent(node_a, node_b);
      expect(node_a.parent).to(equal, node_b);
    });
    
    it("finds a node by xy", function() {
      var expected_node = a.master_list["1_2"];
      expect(a.find_node(1,2)).to(equal,expected_node);
    });
    
    it("determines if one node is diagonally position to another", function() {
      expect(a.is_it_diagonal(a.master_list["1_1"], a.master_list["0_0"])).to(equal,true);
      expect(a.is_it_diagonal(a.master_list["1_1"], a.master_list["1_0"])).to(equal,false);
      expect(a.is_it_diagonal(a.master_list["1_1"], a.master_list["2_0"])).to(equal,true);
      expect(a.is_it_diagonal(a.master_list["1_1"], a.master_list["2_1"])).to(equal,false);
      expect(a.is_it_diagonal(a.master_list["1_1"], a.master_list["2_2"])).to(equal,true);
      expect(a.is_it_diagonal(a.master_list["1_1"], a.master_list["1_2"])).to(equal,false);
      expect(a.is_it_diagonal(a.master_list["1_1"], a.master_list["0_2"])).to(equal,true);
      expect(a.is_it_diagonal(a.master_list["1_1"], a.master_list["0_1"])).to(equal,false);
    });
    
    it("toggles a tile's walkability", function() {
      var node = a.master_list["0_0"];
      expect(a.is_it_walkable(node)).to(equal, true);
      a.toggle_walkability(node);
      expect(a.is_it_walkable(node)).to(equal, false);
      a.toggle_walkability(node);
    });
    
    it("determines if a tile is walkable or not", function() {
      expect(a.is_it_walkable(a.master_list["0_0"])).to(equal, true);
      expect(a.is_it_walkable(a.master_list["3_2"])).to(equal, false);
    });
    
    it("should return a node's neighboring nodes", function() {
      var start_node = a.master_list["1_2"];
      a.neighbors(start_node);
      
      expect(a.master_list["2_1"].parent).to(equal, start_node);
      expect(a.master_list["2_2"].parent).to(equal, start_node);
      expect(a.master_list["2_3"].parent).to(equal, start_node);
      expect(a.master_list["1_3"].parent).to(equal, start_node);
      expect(a.master_list["0_3"].parent).to(equal, start_node);
      expect(a.master_list["0_2"].parent).to(equal, start_node);
      expect(a.master_list["0_1"].parent).to(equal, start_node);
    });
    
    it("neighbor nodes get an h score", function() {
      a.neighbors(a.master_list["1_2"]);
      
      expect(a.master_list["1_1"]["h"]).to(equal, 50);
      expect(a.master_list["2_1"]["h"]).to(equal, 40);
      expect(a.master_list["2_2"]["h"]).to(equal, 30);
      expect(a.master_list["2_3"]["h"]).to(equal, 40);
      expect(a.master_list["1_3"]["h"]).to(equal, 50);
      expect(a.master_list["0_3"]["h"]).to(equal, 60);
      expect(a.master_list["0_2"]["h"]).to(equal, 50);
      expect(a.master_list["0_1"]["h"]).to(equal, 60);
    });
    
    it("neighbor nodes get a g score", function() {
      a.neighbors(a.master_list["1_2"]);
      
      expect(a.master_list["1_1"]["g"]).to(equal, 10);
      expect(a.master_list["2_1"]["g"]).to(equal, 14);
      expect(a.master_list["2_2"]["g"]).to(equal, 10);
      expect(a.master_list["2_3"]["g"]).to(equal, 14);
      expect(a.master_list["1_3"]["g"]).to(equal, 10);
      expect(a.master_list["0_3"]["g"]).to(equal, 14);
      expect(a.master_list["0_2"]["g"]).to(equal, 10);
      expect(a.master_list["0_1"]["g"]).to(equal, 14);
    });
    
    it("the current node should be closed once its neighbors have been checked", function() {
      a.neighbors(a.master_list["1_2"]);
      expect(a.master_list["1_2"]["status"]).to(equal, -1);
      
      a.neighbors(a.master_list["2_2"]);
      expect(a.master_list["2_2"]["status"]).to(equal, -1);
    });
    
    it("should return the cheapest node", function() {
      a.neighbors(a.master_list["1_2"]);
      a.find_cheapest_node();
      expect(a.cheapest_node["x"]).to(equal, 2);
      expect(a.cheapest_node["y"]).to(equal, 2);
    });
    
    it("should list open nodes", function() {
      a.neighbors(a.master_list["1_2"]);
      
      var node_count = 0;
      for (var key in a.open_nodes()) {
        node_count += 1;
      }
      
      expect(node_count).to(equal, 8);
      
      var node_count = 0;
      for (var key in a.master_list) {
        node_count += 1;
      }
      
      expect(node_count).to(equal, 36);
    });
    
    it("should come up with the right path", function() {
      a.find_path();
      expect(a.path[0]).to(equal, [2,2]);
      expect(a.path[1]).to(equal, [3,1]);
      expect(a.path[2]).to(equal, [4,2]);
    });
    
    it("should reset a node's scores and open/closed status", function() {
      a.reset_node(a.master_list["0_0"]);
      expect(a.master_list["0_0"]["status"]).to(equal, "0");
      expect(a.master_list["0_0"]["parent"]).to(equal, undefined);
      expect(a.master_list["0_0"]["f"]).to(equal, 0);
      expect(a.master_list["0_0"]["g"]).to(equal, 0);
      expect(a.master_list["0_0"]["h"]).to(equal, 0);
      expect(a.master_list["0_0"]["walkable"]).to(equal, true);
    });
    
    it("should reset every node's scores and open/closed status", function() {
      a.reset_nodes();
      for (var key in a.master_list) {
        expect(a.master_list[key]["status"]).to(equal, "0");
        expect(a.master_list[key]["parent"]).to(equal, undefined);
        expect(a.master_list[key]["f"]).to(equal, 0);
        expect(a.master_list[key]["g"]).to(equal, 0);
        expect(a.master_list[key]["h"]).to(equal, 0);
      }
      
      expect(a.master_list["3_2"]["walkable"]).to(equal, false);
      expect(a.master_list["3_3"]["walkable"]).to(equal, false);
      expect(a.master_list["3_4"]["walkable"]).to(equal, false);
    });
    
    it("should come up with the right path after being given new start/end", function() {
      a.find_path();
      expect(a.path[0]).to(equal, [2,2]);
      expect(a.path[1]).to(equal, [3,1]);
      expect(a.path[2]).to(equal, [4,2]);
      
      a.reset_nodes();
      
      a.set_start_node(a.master_list["1_2"]);
      a.set_goal_node(a.master_list["5_2"]);
      
      a.find_path();
      expect(a.path[0]).to(equal, [2,2]);
      expect(a.path[1]).to(equal, [3,1]);
      expect(a.path[2]).to(equal, [4,2]);
      
      a.reset_nodes();
      
      a.set_start_node(a.master_list["1_1"]);
      a.set_goal_node(a.master_list["5_1"]);
      
      a.find_path();
      expect(a.path[0]).to(equal, [2,1]);
      expect(a.path[1]).to(equal, [3,1]);
      expect(a.path[2]).to(equal, [4,1]);
      
      a.reset_nodes();
      a.set_start_node(a.master_list["1_1"]);
      a.set_goal_node(a.master_list["4_2"]);
      
      a.find_path();
      
      expect(a.is_it_diagonal(a.master_list["1_1"], a.master_list["2_1"])).to(equal,false);
      expect(a.is_it_diagonal(a.master_list["1_1"], a.master_list["2_2"])).to(equal,true);
      
      expect(a.path[0]).to(equal, [2,2]);
      expect(a.path[1]).to(equal, [3,1]);
      expect(a.path[2]).to(equal, [4,2]);
    });
    
  });
}});