/*

add the starting node to the node list
while the open list is not empty
  current_node = node from open list with the lowest cost
  if current_node == goal node then
    path complete
  else
    move current node to the closed list
    examine each node adjacent to the current node
    for each adjacent node
      if it isn't on the open list
        and isn't on the closed list
          and it isn't an obstacle then
            move it to open list and calculate cost

*/


function AStar(grid, starting_node, goal_node) {
  var unchecked_neighbors = [];
  var nodes = {};
  for (var i=0; i < grid.length; i++) {
    nodes['node_' + grid[i][0] + '_' + grid[i][1]] = {"x": grid[i][0], "y": grid[i][1], "visited": true, "parent_x": undefined, "parent_y": undefined};
  };
  
  this.path = findPath();
  
  function findPath() {
    path = {};
    path.done = false;
    path.name = "node_"+ starting_node[0] + "_" + starting_node[1];    
    path[path.name] = {"x": starting_node[0], "y": starting_node[1], "visited": true, "parent_x": undefined, "parent_y": undefined};
    
    unchecked_neighbors[unchecked_neighbors.length] = path[path.name];
    
    while(unchecked_neighbors.length > 0) {
      console.log(unchecked_neighbors);
      var node = unchecked_neighbors.shift();
      if (node.x == goal_node[0] && node.y == goal_node[1]) {
        make_path(node);
        path.done = true;
        break;
      } else {
        node.visited = true;
        addNode(node, node.x+1, node.y);
        addNode(node, node.x-1, node.y);
        addNode(node, node.x, node.y+1);
        addNode(node, node.x, node.y-1);
      }
    }
      
    return path;
  }
  
  function addNode(node, x, y) {
    var node_name = "node_" + x + "_" + y;
    console.log(node);
    //if(grid[x,y].walkable) {
      if (nodes[node_name] != undefined && nodes[node_name].visited != true) {
        var node_to_add = {}
        node_to_add[node_name] = {"x": x, "y": y, "visited": false, "parent_x": node.x, "parent_y": node.y};
        unchecked_neighbors[unchecked_neighbors.length] = node_to_add;
      }
    //}
  }
  
  /* --------------- */
  function make_path(node) {
    console.log("here");
    this.steps = [];
    console.log(node.parent_x);
    while (node.parent_x != undefined) {
      this.steps[this.steps.length] = node.x;
      this.steps[this.steps.length] = node.y;
      node = this.path["node_"+ node.parent_x + "_" + node.parent_y];
    }
  }
}

Screw.Unit(function() {
  describe("A*", function() {
    it("returns a list of nodes adjacent to the current_node", function() {
      var grid = [
        [0,0],[1,0],[2,0],
        [0,1],[1,1],[2,1],
        [0,2],[1,2],[2,2]
      ];
      
      var path = new AStar(grid, [0,0], [1,1]);
      console.log(path.path);
    });
  });
});
