function A(start_xy, goal_xy) {
  // open_list = [node, parent, g_cost]
  // [[0,0],undefined]  <- the starting node IS the parent
  // [[0,1],[0,0]] <- the node 1 space to the right of the start, with the parent
  //
  
  /*
    searching
  
    1. take a node (the starting node first), check out its neighbors
    2. if they are walkable, add them to the open list along with the node we're dealing with as their parent
    3. we're done with this node once we've checked its neighbors - add it to the closed list
    4. next we grab a node from the open_list, but not just any node. we need the one with the lowest F score
      F = G + H
      G is the movement cost? from point A to a given node
      H is the estimated movement cost to move from the our current node to the final node. often called heuristic, a guess.
    
      movement cost is calculated by taking the node (neighbor?), get the parent's G value, add 10 or 14
    
      H is the manhattan method - total num of squares moved horizontally and vertically to reach target from current position
      then multiplied by 10 (cost of a non diagonal move) (does not include start and end)
      
    
    
      var grid = [
        [0,0],[1,0],[2,0],[3,0],[4,0],[5,0],[6,0],
        [0,1],[1,1],[2,1],[3,1],[4,1],[5,1],[6,1],
        [0,2],[1,2],[2,2],[3,2],[4,2],[5,2],[6,2],
        [0,3],[1,3],[2,3],[3,3],[4,3],[5,3],[6,3],
        [0,4],[1,4],[2,4],[3,4],[4,4],[5,4],[6,4]
      ];

    
  */
  
  this.master_list = {};
  this.start_xy = start_xy;
  this.goal_xy = goal_xy;
  this.cheapest_node;
  this.path = [];
  
  /* utility methods, likely good to make private once complete */
  this.add_node = function(x,y) {
    var node_name = x + "_" + y;
    this.master_list[node_name] = {"status": 0, "x": x, "y": y, "parent": undefined, "f": 0, "g": 0, "h": 0, "walkable": true};
  }
  
  this.close_node = function(node_to_close) { 
    node_to_close["status"] = -1;
  }
  
  this.open_node = function(node_to_open) { 
    node_to_open["status"] = 1;
  }
  
  this.add_parent = function(child_node, parent_node) {
    child_node["parent"] = parent_node;
  }
  
  /* end utils */
  
  this.find_node = function(x,y) {
    return this.master_list[x + "_" + y];
  }
  
  this.find_cheapest_node = function() {
    if (this.cheapest_node == undefined) {
      this.cheapest_node = {};
      this.cheapest_node["f"] = Infinity;
    }
    
    // MB: July 26, 2009; this doesn't seem to be working correctly.
    for (var key in this.open_nodes()) {
      if (this.open_nodes()[key]["f"] < this.cheapest_node["f"]) {
      }
    }
    
    return this.cheapest_node;
  }
  
  this.is_it_diagonal = function(node_a,node_b) {
    if (node_a["x"] != node_b["x"] && node_a["y"] != node_b["y"]) {
      return true;
    } else {
      return false;
    }
  }
  
  this.is_it_walkable = function(node) {
    if (node["walkable"] == true) {
      return true;
    } else {
      return false;
    }
  }
  
  this.toggle_walkability = function(node) {
    if (this.is_it_walkable(node)) {
      node["walkable"] = false;
    } else {
      node["walkable"] = true;
    }
  }
  
  this.neighbors = function(current_node) {
    var x = current_node["x"];
    var y = current_node["y"];
    
    // build a list of possible neighbors to check, start above, the clockwise around the current node
    var possible_neighbor_nodes = [
      (x)   + "_" + (y-1),
      (x+1) + "_" + (y-1),
      (x+1) + "_" + (y)  ,
      (x+1) + "_" + (y+1),
      (x)   + "_" + (y+1),
      (x-1) + "_" + (y+1),
      (x-1) + "_" + (y)  ,
      (x-1) + "_" + (y-1)
    ];
    
    for (var i=0; i < possible_neighbor_nodes.length; i++) {
      // get the node from master list
      // if it exists, do our scoring, parent associating, opening and closing
      var neighbor_node = this.master_list[possible_neighbor_nodes[i]];
      
      if (neighbor_node && this.is_it_walkable(neighbor_node) == false) {
        this.close_node(neighbor_node);
      }
      
      if (neighbor_node && neighbor_node["status"] != -1) {
        var node_x = neighbor_node["x"];
        var node_y = neighbor_node["y"];
        var increment_g_by = this.is_it_diagonal(current_node,neighbor_node) ? 14 : 10;
        
        neighbor_node["g"] = increment_g_by;
        
        if (neighbor_node.status == 0 || neighbor_node.status == 1) {
          this.open_node(neighbor_node); // maybe?
        }
        
        this.add_parent(neighbor_node, current_node);
        
        /* abstract this scoring stuff */
        var a = Math.abs(neighbor_node["x"] - this.goal_xy[0]);
        var b = Math.abs(neighbor_node["y"] - this.goal_xy[1]);
        var c = (a + b);
        neighbor_node["h"] = Math.abs(c) * 10;
        neighbor_node["f"] = neighbor_node["g"] + neighbor_node["h"];
        /* */
      }
    };
    
    this.close_node(current_node);
  };
  
  this.open_nodes = function() {
    var nodes = {};
    for (var key in this.master_list) {
      if (this.master_list[key].status == 1) {
        nodes[key] = this.master_list[key];
      };
    }
    return nodes;
  }
  
  this.find_path = function() {
    var starting_node = this.find_node(start_xy[0], start_xy[1]);
    var goal_node = this.find_node(goal_xy[0], goal_xy[1]);
    
    this.path.push([start_xy[0], start_xy[1]]);
    this.neighbors(starting_node);
    
    this.path.push(goal_node);
    var parent_node = goal_node;
    var path_found = false;
    
    var total_pushin = 0;
    while (path_found == false) {
      this.neighbors(this.find_cheapest_node());
      
      if (this.cheapest_node == goal_node) {
        path_found = true;
        break;
      };
      
      parent_node = this.cheapest_node.parent;
      this.path.push(parent_node);
      this.close_node(this.cheapest_node);
      
      // MB: July 26, 2009; This really doesn't make sense...
      // if (parent_node == starting_node) {
      //   path_found = true;
      //   break;
      // }
      
      // MB: July 26, 2009; Breaking for dev only
      total_pushin += 1;
      if (total_pushin == 5) {
        break;
      }
      
    }
    
    console.log(this.path);
    
    // for (var key in this.open_nodes()) {
    //   this.neighbors(this.find_cheapest_node());
    //   if (this.cheapest_node == goal_node) {
    //     //this.path.push([this.cheapest_node["x"], this.cheapest_node["y"]]);
    //     // path complete, we're done!
    //     break;
    //   }
    // }
    
    function by_score(a,b) {
      return ((a.f < b.f) ? -1 : ((a.f > b.f) ? 1 : 0));
    }
    
    // console.log(this.path);
    // console.log(this.path.sort(by_score)[0]);
    // console.log(this.path.sort(by_score)[1]);
    // console.log(this.path.sort(by_score)[2]);
  
    
    // 
    
  }
}

Screw.Unit(function() {
  describe("A", function() {
    var a;
    before(function() {
      a = new A([1,2],[5,2]);
      a.add_node(0,0);a.add_node(1,0);a.add_node(2,0);a.add_node(3,0);a.add_node(4,0);a.add_node(5,0);
      a.add_node(0,1);a.add_node(1,1);a.add_node(2,1);a.add_node(3,1);a.add_node(4,1);a.add_node(5,1);
      a.add_node(0,2);a.add_node(1,2);a.add_node(2,2);a.add_node(3,2);a.add_node(4,2);a.add_node(5,2);
      a.add_node(0,3);a.add_node(1,3);a.add_node(2,3);a.add_node(3,3);a.add_node(4,3);a.add_node(5,3);
      a.add_node(0,4);a.add_node(1,4);a.add_node(2,4);a.add_node(3,4);a.add_node(4,4);a.add_node(5,4);
      a.add_node(0,5);a.add_node(1,5);a.add_node(2,5);a.add_node(3,5);a.add_node(4,5);a.add_node(5,5);
      
      a.toggle_walkability(a.master_list["3_2"]);
      a.toggle_walkability(a.master_list["3_3"]);
      a.toggle_walkability(a.master_list["3_4"]);
      
    });
    
    it("creates a node to be used for path finding", function() {
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
    
    it("should keep track of the start and goal coordinates", function() {
      expect(a.start_xy).to(equal,[1,2]);
      expect(a.goal_xy).to(equal,[5,2]);
    });
    
    it("finds a node by xy", function() {
      var expected_node = a.master_list["1_2"];
      expect(a.find_node(1,2)).to(equal,expected_node);
    });
    
    it("determines if one node is diagonally position to another", function() {
      var node_a = a.master_list["1_2"];
      var node_b = a.master_list["2_1"];
      var expected_to_be_true = a.is_it_diagonal(node_a, node_b);
      
      expect(expected_to_be_true).to(equal,true);
      
      var node_c = a.master_list["1_2"];
      var node_d = a.master_list["2_2"];
      var expected_to_be_false = a.is_it_diagonal(node_c, node_d);
      
      expect(expected_to_be_false).to(equal,false);
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
    
    it("should come up with the right path, nodes sorted", function() {
      a.find_path();
      
      // expect(a.path[0]).to(equal, [1,2]);
      expect(a.path[1]).to(equal, [2,2]);
      // expect(a.path[2]).to(equal, [3,2]);
      // expect(a.path[3]).to(equal, [4,2]);
      // expect(a.path[4]).to(equal, [5,2]);
    });
    
  });
});