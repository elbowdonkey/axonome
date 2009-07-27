/*
Function: getPath
Parameters: start, goal, size, capability

push start onto open list.
for each node on the open list
  if current node is the goal,
    return path.
  else,
    for each neighbour of the newly opened node
      if neighbour is on the closed list, skip it
      else,
        if neighbour is already on the open list, update weights
        else,
          if clearance(neighbour, capability) > size,
            push neighbour on the open list
          else, skip neighbour
  push current node on closed list
  if openlist is null, return failure
  
*/


Screw.Unit(function() {
  describe("HOG", function() {
    it("should find a path", function() {
      var grid = [
        [0,0],[1,0],[2,0],[3,0],
        [0,1],[1,1],[2,1],[3,1],
        [0,2],[1,2],[2,2],[3,2],
        [0,3],[1,3],[2,3],[3,3]
      ];
      
      function getPath(start, goal, size, capability) {
        var current_node = start;
        var open_list = [current_node];
        var closed_list = [];
        var path = [];
        var weights = [];
        
        
        for (var o=0; o < open_list.length; o++) {
          if (current_node == goal) {
            return path;
          } else {
            var nabes = neighbors(current_node);
            for (var i=0; i < nabes.length; i++) {
              if (is_closed(nabes[i])) {
                // skip it
              } else {
                if (is_open(nabes[i])) {
                  nabes[i].weight > 0 ? (nabes[i].weight += 1) : 0;
                } else {
                  //if (clearance(nabe[i], capability) > size) {
                    open_list.push(nabes[i]);
                  //}
                }
              }
              closed_list.push(current_node);
              for (var x=0; x < nabes.length; x++) {
                console.log(nabes[i].weight);
              };
            };
          };
          
          if (o > 27) {
            break;
          }
        };
        
        function neighbors(node) {
          var x = node[0];
          var y = node[1];

          return [
            [x,y-1],
            [x+1,y],
            [x,y+1],
            [x-1,y]
          ]
        }

        function is_closed(node) {
          return (closed_list.indexOf(node) > 0 ? true : false)
        }

        function is_open(node) {
          return (is_closed ? false : true)
        }
        return path;
      };
      
      
      
      var calculated_path = getPath([0,0],[3,3],1,1);
      console.log(calculated_path);
      
    });
  });
});