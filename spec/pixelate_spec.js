/* http://awiki.tomasu.org/index.php?title=Pixelate:Issue_1/Tile_Maps */

function random_color(format)
{
 var rint = Math.round(0xffffff * Math.random());
 return ('#0' + rint.toString(16)).replace(/^#0([0-9a-f]{6})$/i, '#$1');
}

function Map() {
  this.layers = [
    new Layer(0,0,5,5)
  ];
}

function Layer(x,y,w,h) {
  // where to start drawing layer relative to Map's xy
  this.x = x; 
  this.y = y;
  // layers can have their own widths and heights
  this.w = w; 
  this.h = h;
  
  this.tiles = new Array();
  
  for (var x=this.x; x < this.w; x++) {
    for (var y=this.y; y < this.h; y++) {
      this.tiles.push(new Tile(x,y))
    };
  };
  
  this.tile_width = 16;
  this.tile_height = 17;
}

function Tile(x,y) {
  this.id = x + '_' + y;
}

function Renderer() {
  this.map = new Map();
  var map = this.map;
  
  this.full = function() {
    for (var l=0; l < map.layers.length; l++) {
      var layer = map.layers[l];
      for (var j=0; j < layer.h; j++) {
        for (var i=0; i < layer.w; i++) {
          // builds a list of top/left coordinates
          var top = (layer.y + layer.tile_height*j);
          var left = (layer.x + layer.tile_width*i);
          var node = '<div id="' + i + '_' + j + '" style="position:absolute;width:16px;height:16px;top:' + top + 'px;left:' + left + 'px;background-color:' + random_color() + '"></div>'

          $j('#full').append(node);
        };
      };
    };
  };
  this.partial = function(x1,y1) {
    var tile_height = 16;
    var tile_width = 16;
    var screen_w = 160;
    var screen_h = 100;
    $j('#partial').css({
      width: screen_w,
      height: screen_h
    });
    
    var x_inverted = -(x1);
    var y_inverted = -(y1);
    var first_tile_in_map_to_draw_x = parseInt(x_inverted/tile_width);
    var first_tile_in_map_to_draw_y = parseInt(y_inverted/tile_height); // results are first visible tile.
    var draw_first_tile_here_x = (x1) % tile_width;
    var draw_first_tile_here_y = (y1) % tile_height;
    var last_tile_in_map_to_draw_x = parseInt((screen_w - draw_first_tile_here_x)/tile_width)+1;
    var last_tile_in_map_to_draw_y = parseInt((screen_h - draw_first_tile_here_y)/tile_height)+1;
        
    for (var j = first_tile_in_map_to_draw_y; j < last_tile_in_map_to_draw_y; j++) {
      for (var i = first_tile_in_map_to_draw_x; i < last_tile_in_map_to_draw_x; i++) {
        var left = ((i * tile_width) + draw_first_tile_here_x);
        var top = ((j * tile_height) + draw_first_tile_here_y);
        var node = '<div style="width:' + tile_width + 'px;height:' + tile_height + 'px;top:' + top + 'px;left:' + left + 'px;background-color:' + random_color() + '">' + i + ',' + j + '</div>';
        $j('#partial').append(node);
      };
    };
  };
  
  /* http://awiki.tomasu.org/index.php?title=Pixelate:Issue_12/Isometric_Projection */
  this.iso = function(x1,y1) {
    var layer = this.map.layers[0];
    var screen_w = 600;
    var screen_h = 700;
    
    if (arguments.length == 0) {
      var id_prefix = 'full_iso';
      var crop = $j('#crop');
      var container = $j('#' + id_prefix);
      var last_tile_in_map_to_draw_x = layer.w-1;
      var first_tile_in_map_to_draw_x = 0;
      var last_tile_in_map_to_draw_y = layer.h-1;
      var first_tile_in_map_to_draw_x = 0;
    } else {
      /* rolling in partial rendering */
      var id_prefix = 'partial_iso';
      var crop = $j('#crop');
      var container = $j('#' + id_prefix);
      var tile_height = (layer.tile_height); // (layer.tile_height/2)
      var tile_width = layer.tile_width;
      
      container.css({
        width: screen_w,
        height: parseInt(screen_h/2)+parseInt(tile_height/2)
      });

      var x_inverted = -(x1);
      var y_inverted = -(y1);
      var first_tile_in_map_to_draw_x = parseInt(x_inverted/tile_width);
      var first_tile_in_map_to_draw_y = parseInt(y_inverted/tile_height); // results are first visible tile.
      var draw_first_tile_here_x = (x1) % tile_width;
      var draw_first_tile_here_y = (y1) % tile_height;
      var last_tile_in_map_to_draw_x = parseInt((screen_w - draw_first_tile_here_x)/tile_width)+1;
      var last_tile_in_map_to_draw_y = parseInt((screen_h - draw_first_tile_here_y)/tile_height)+1;
    }
    
    var starting_left_offset = parseInt(screen_w/4);
    var starting_top_offset = parseInt(screen_h/8);
    
    crop.css({
      width: parseInt(screen_w/2),
      height: parseInt(screen_h/4),
    });
    
    /* 
      this is just one of the infinite possible perspectives.
      these numbers were derived by brute force, and are viewing
      the map from the southeast (if the upper right edge of the map is north)
    */
    var rotation = 2.3559999999999994;
    var elevation = 1.0469999999999988;
    var spin = 0.0;
    var zoom = 11.31399999999999119;
    var cos = Math.cos;
    var sin = Math.sin;
    var floor = Math.floor;
    var z = 0;
    
    console.time('trig');
    var right_x = (cos(spin) * cos(rotation) - sin(spin) * sin(rotation) * cos(elevation)) * zoom;
    var right_y = (sin(spin) * cos(rotation) + cos(spin) * sin(rotation) * cos(elevation)) * zoom;
    var front_x = (cos(spin) * sin(rotation) - sin(spin) * -cos(rotation) * cos(elevation)) * zoom;
    var front_y = (sin(spin) * sin(rotation) + cos(spin) * -cos(rotation) * cos(elevation)) * zoom;
    var up_x = -sin(spin) * sin(elevation) * zoom;
    var up_y = cos(spin) * sin(elevation) * zoom;
    console.timeEnd('trig');
    
    var nodes = '';
    var node_template = document.createElement('div');
    node_template.setAttribute('class','cube');
    node_template.style.width = tile_width + "px";
    node_template.style.height = tile_height + "px";
    node_template.style.position = 'absolute';
    
    
    console.time('loop');
    for (var l=0; l < map.layers.length; l++) {
      var layer = map.layers[l];
      for (var x=first_tile_in_map_to_draw_x; x < last_tile_in_map_to_draw_y; x++) {
        for (var y=first_tile_in_map_to_draw_x; y < last_tile_in_map_to_draw_x; y++) {
          var iso_left = floor(x * right_x + y * front_x + z * up_x) + starting_left_offset;
          var iso_top = floor(x * right_y + y * front_y + z * up_y) - starting_top_offset;
          
          if ($j('#' + id_prefix + '_' + x + '_' + y)[0] == undefined) {
            //nodes += '<div class="cube" id="' + id_prefix + '_' + x + '_' + y + '" style="font-size:8px;position:absolute;width:' + layer.tile_width + 'px;height:' + layer.tile_height + 'px;top:' + iso_top + 'px;left:' + iso_left + 'px;"></div>';
            var d = node_template.cloneNode(true);
            d.setAttribute('id',id_prefix + '_' + x + '_' + y);
            d.style.left = iso_left + "px";
            d.style.top = iso_top + "px";
            container[0].appendChild(d);
          } else {
            $j('#' + id_prefix + '_' + x + '_' + y).css({
              left: iso_left,
              top: iso_top
            });
          };
        };
      };
    };
    console.timeEnd('loop');
    //if (nodes != '') {
    //  console.time('nodes');
    //  container.html(nodes);
    //  console.timeEnd('nodes');
    //};
  };
};

Screw.Unit(function(c) { with(c) {
  describe("Map", function() {
    it("makes a map", function() {
      expect(new Map()).to(be_an_instance_of, Map);
    });
    
    //it("maps have layers", function() {
    //  var map = new Map();
    //  expect(map.layers.length).to(equal,2);
    //  expect(map.layers[0]).to(be_an_instance_of, Layer);
    //  expect(map.layers[1]).to(be_an_instance_of, Layer);
    //});
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
    //it("renders a full flat grid", function() {
    //  $j('body').append('<div class="test_grid" id="full"></div>');
    //  var r = new Renderer();
    //  r.full();
    //});
    //it("renders a partial flat grid", function() {
    //  $j('body').append('<div class="test_grid" id="partial"></div>');
    //  var r = new Renderer();
    //  // remove two rows and two columns
    //  r.partial(-64,-64);
    //});
    //
    //it("renders a full isometric grid", function() {
    //  $j('body').append('<div class="test_grid" id="full_iso"></div>');
    //  console.time('full');
    //  var r = new Renderer();
    //  r.iso();
    //  console.timeEnd('full');
    //});
    
    it("renders a partial isometric grid", function() {
      $j('body').append('<div id="crop"><div class="test_grid" id="partial_iso"></div></div>');
      var r = new Renderer();
      r.iso(0,40);
    });
	
	// the amount of node being rendered is tied to the container size
	// it should only render nodes within the confines of the container

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