function A(x,y,grid) {
  this.master_list = {};
  this.cheapest_node = {};
  this.cheapest_node["f"] = Infinity;
  this.path = [];
  this.start_node;
  this.goal_node;
  this.grid = grid;
  
  this.add_node = function(node) {
    var x = node.x;
    var y = node.y;
    var z = node.z;
    var node_name = x + "_" + y + "_" + z;
    
    this.master_list[node_name] = {"status": 0, "x": x, "y": y, "z": z, "parent": undefined, "f": 0, "g": 0, "h": 0, "walkable": node.walkable, "node": node};
  }
  
  for (var key in this.grid.nodes) {
    this.add_node(this.grid.nodes[key]);
  }

  this.close_node = function(node_to_close) {
    node_to_close["status"] = -1;
  }
  
  this.open_node = function(node_to_open) { 
    node_to_open["status"] = 1;
  }
  
  this.set_start_node = function(node) {
    this.start_node = node;
  }
  
  this.set_goal_node = function(node) {
    this.goal_node = node;
  }
  
  this.add_parent = function(child_node, parent_node) {
    child_node["parent"] = parent_node;
  }

  this.find_node = function(x,y,z) {
    return this.master_list[x + "_" + y + "_" + z];
  }
  
  this.find_cheapest_node = function() {
    function by_score(a,b) {
      return ((a.f < b.f) ? -1 : ((a.f > b.f) ? 1 : 0));
    }
    
    var sorted = this.open_nodes().sort(by_score);
    this.cheapest_node = sorted[0];
    return this.cheapest_node;
  }
  
  this.is_it_diagonal = function(node_a,node_b) {
    if (node_a["x"] != node_b["x"] && node_a["y"] != node_b["y"]) {
      return true;
    } else {
      return false;
    }
  }
  
  this.neighbors = function(current_node) {
    var x = current_node["x"];
    var y = current_node["y"];
    var z = current_node["z"];
    
    // build a list of possible neighbors to check, start above, the clockwise around the current node
    var possible_neighbor_nodes = [
      (x)   + "_" + (y-1) + "_" + z,
      (x+1) + "_" + (y-1) + "_" + z,
      (x+1) + "_" + (y)   + "_" + z,
      (x+1) + "_" + (y+1) + "_" + z,
      (x)   + "_" + (y+1) + "_" + z,
      (x-1) + "_" + (y+1) + "_" + z,
      (x-1) + "_" + (y)   + "_" + z,
      (x-1) + "_" + (y-1) + "_" + z
    ];
    
    for (var i=0; i < possible_neighbor_nodes.length; i++) {
      // get the node from master list
      // if it exists, do our scoring, parent associating, opening and closing
      var neighbor_node = this.master_list[possible_neighbor_nodes[i]];
      
      if (neighbor_node && neighbor_node.walkable == false) {
        this.close_node(neighbor_node);
      }
      
      if (neighbor_node && neighbor_node["status"] != -1) {
        var node_x = neighbor_node["x"];
        var node_y = neighbor_node["y"];
        var node_z = neighbor_node["z"];
        var increment_g_by = this.is_it_diagonal(current_node,neighbor_node) ? 14 : 10;
        
        neighbor_node["g"] = increment_g_by;
        
        if (neighbor_node.status == 0 || neighbor_node.status == 1) {
          this.open_node(neighbor_node); // maybe?
        }
        
        this.add_parent(neighbor_node, current_node);
        
        /* abstract this scoring stuff */
        var a = Math.abs(neighbor_node["x"] - this.goal_node["x"]);
        var b = Math.abs(neighbor_node["y"] - this.goal_node["y"]);
        var c = (a + b);
        neighbor_node["h"] = Math.abs(c) * 10;
        neighbor_node["f"] = neighbor_node["g"] + neighbor_node["h"];
        /* */
      }
    };
    
    this.close_node(current_node);
  };
  
  this.open_nodes = function() {
    var nodes = [];
    for (var key in this.master_list) {
      if (this.master_list[key].status == 1) {
        nodes.push(this.master_list[key]);
      }
    };
    
    return nodes;
  }
  
  this.find_path = function() {
    var current_node = this.start_node;
    var parent_node = undefined;
    var path_found = false;

    while (path_found == false) {
      this.neighbors(current_node);
      this.close_node(current_node);

      current_node = this.find_cheapest_node();
      this.path.push([current_node["x"], current_node["y"], current_node["z"]]);

      if (current_node == this.goal_node) {
        path_found = true;
        break;
      }
    }
  }
  
  this.reset_node = function(node) {
    var x = node["x"];
    var y = node["y"];
    var z = node["z"];
    var node_name = x + "_" + y + "_" + z;
    this.master_list[node_name]["status"] =  0;
    this.master_list[node_name]["parent"] =  undefined;
    this.master_list[node_name]["f"] = 0;
    this.master_list[node_name]["g"] = 0;
    this.master_list[node_name]["h"] = 0;
  }
  
  this.reset_nodes = function() {
    for (var key in this.master_list) {
      this.reset_node(this.master_list[key]);
    }
    this.cheapest_node = {};
    this.cheapest_node["f"] = Infinity;
    this.path = [];
  }
}