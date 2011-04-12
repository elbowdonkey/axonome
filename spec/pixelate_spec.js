Screw.Unit(function(c) { with(c) {
  describe("Map", function() {
    it("makes a map", function() {
      expect(new Map()).to(be_an_instance_of, Map);
    });
    
    it("maps have layers", function() {
      var map = new Map(2);
      expect(map.layers.length).to(equal,2);
      expect(map.layers[0]).to(be_an_instance_of, Layer);
      expect(map.layers[1]).to(be_an_instance_of, Layer);
    });
  });
  
  describe("Layer", function() {
    var layer;
    before(function() {
      layer = new Layer(0,0,2,2);
    });
    
    it("makes a layer", function() {
      expect(layer).to(be_an_instance_of, Layer)
    });
    
    it("has x and y starting points", function() {
      expect(layer.x).to(equal,0);
      expect(layer.y).to(equal,0);
    });
    
    it("has a tile", function() {
      expect(layer.tiles.length).to(equal, 4);
      
      for (var i=0; i < layer.tiles.length; i++) {
        expect(layer.tiles[i]).to(be_an_instance_of, Tile);
      };
    });
    
    it("has a width and height", function() {
      expect(layer.w).to(equal, 2);
      expect(layer.h).to(equal, 2);
    });
    
    it("defines a specific tile width and height", function() {
      expect(layer.tile_width).to(equal, 16);
      expect(layer.tile_height).to(equal, 17);
    });
  });
  
  describe("Tile", function() {
    var tile;
    before(function() {
      tile = new Tile(0,0);
    });
    
    it("makes a tile", function() {
      expect(tile).to(be_an_instance_of, Tile);
    });
    
    it("has and unique identifier", function() {
      expect(tile.id).to(equal, "0_0");
    });
  });
  
  describe("Rendering", function() {
    it("renders a full flat grid", function() {
      $j('body').append('<div class="test_grid" id="full"></div>');
      var r = new Renderer();
      r.full();
    });
    it("renders a partial flat grid", function() {
      $j('body').append('<div class="test_grid" id="partial"></div>');
      var r = new Renderer();
      // remove two rows and two columns
      r.partial(-64,-64);
    });
    
    it("renders a full isometric grid", function() {
      $j('body').append('<div class="test_grid" id="full_iso"></div>');
      console.time('full');
      var r = new Renderer();
      r.iso();
      console.timeEnd('full');
    });
    
    it("renders a partial isometric grid", function() {
      $j('body').append('<div id="crop"><div class="test_grid" id="partial_iso"></div></div>');
      var r = new Renderer();
      r.iso(0,40);
    });
  });
}});

/*
this stuff might come in handy if ever I need to brute force discover the rotation, elevation, etc.

var drag_node = '#iso_' + (r.map.layers[0].w-1) + '_' + (r.map.layers[0].h-1);
 
 
 $j('#iso').append('<div id="params" style="position:absolute;top:200px;"></div>');
 $j('#iso').append('<div id="node_pos" style="position:absolute;top:220px;"></div>');
 $j('#params').html(rotation + ',' + elevation + ',' + spin + ',' + zoom);
 
 var original_left = parseInt($j(drag_node).css('left'));
 var original_top = parseInt($j(drag_node).css('top'));
 var diff_left = parseInt($j(drag_node).css('left')) - original_left;
 var diff_top = parseInt($j(drag_node).css('top')) - original_top;
 
 var re_parser = function() {
   diff_left = parseInt($j(drag_node).css('left')) - original_left;
   diff_top = parseInt($j(drag_node).css('top')) - original_top;
   converted_to_iso = diff_top*0.005549;
   zoom -= -converted_to_iso;
   
   //rotation += parseInt(diff_left*0.5);
   r.iso(rotation,elevation,spin,zoom);
   $j('#params').html(rotation + ',' + elevation + ',' + spin + ',' + zoom);
   $j('#node_pos').html(diff_left + ',' + diff_top);
 }
       
 $j(drag_node).draggable({
   cursor: 'crosshair',
   drag: re_parser,
   stop: re_parser
 });
 
 $j(document).keypress(function (e) {
   if (e.which == 93) {
     spin += 0.05;
     r.iso(rotation,elevation,spin,zoom);
   }
   if (e.which == 91) {
     spin -= 0.05;
     r.iso(rotation,elevation,spin,zoom);
   }
   if (e.which == 119) {
     elevation += 0.001;
     r.iso(rotation,elevation,spin,zoom);
   }        
   if (e.which == 115) {
     elevation -= 0.001;
     r.iso(rotation,elevation,spin,zoom);
   }
   if (e.which == 97) {
     zoom -= 1.0;
     r.iso(rotation,elevation,spin,zoom);
   }
   if (e.which == 100) {
     zoom += 1.0;
     r.iso(rotation,elevation,spin,zoom);
   }
   if (e.which == 101) {
     rotation += 0.001;
     r.iso(rotation,elevation,spin,zoom);
   }
   if (e.which == 113) {
     rotation -= 0.005;
     r.iso(rotation,elevation,spin,zoom);
   }
   $j('#node_pos').html(e.which);
   $j('#params').html(rotation + ',' + elevation + ',' + spin + ',' + zoom);
 });

*/