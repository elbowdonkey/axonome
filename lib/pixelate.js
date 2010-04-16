/* http://awiki.tomasu.org/index.php?title=Pixelate:Issue_1/Tile_Maps */

function random_color(format)
{
 var rint = Math.round(0xffffff * Math.random());
 return ('#0' + rint.toString(16)).replace(/^#0([0-9a-f]{6})$/i, '#$1');
}

function Map(layer_count,camera_options) {
  this.layers = [];
  this.rotation = 2.3559999999999994;
  this.elevation = 1.0469999999999988;
  this.spin = 0.0;
  this.zoom = 11.31399999999999119;
  
  if (arguments.length > 1) {
    if (camera_options["rotation"]) this.rotation = camera_options["rotation"];
    if (camera_options["elevation"]) this.elevation = camera_options["elevation"];
    if (camera_options["spin"]) this.spin = camera_options["spin"];
    if (camera_options["zoom"]) this.zoom = camera_options["zoom"];
  }
  
  if (layer_count == undefined) layer_count = 1;
  
  for (var i=0; i < layer_count; i++) {
    this.layers[i] = new Layer(0,0,5,5);
  };
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
  
  this.tile_width = 126;
  this.tile_height = 68;
}

function Tile(x,y) {
  this.id = x + '_' + y;
}

function Renderer(camera_options) {
  this.map = new Map(1, camera_options);
  var map = this.map;
  
  //this.full = function() {
  //  for (var l=0; l < map.layers.length; l++) {
  //    var layer = map.layers[l];
  //    for (var j=0; j < layer.h; j++) {
  //      for (var i=0; i < layer.w; i++) {
  //        // builds a list of top/left coordinates
  //        var top = (layer.y + layer.tile_height*j);
  //        var left = (layer.x + layer.tile_width*i);
  //        var node = '<div id="' + i + '_' + j + '" style="position:absolute;width:16px;height:16px;top:' + top + 'px;left:' + left + 'px;background-color:' + random_color() + '"></div>'
  //
  //        $j('#full').append(node);
  //      };
  //    };
  //  };
  //};
  //this.partial = function(x1,y1) {
  //  var tile_height = 16;
  //  var tile_width = 16;
  //  var screen_w = 160;
  //  var screen_h = 100;
  //  $j('#partial').css({
  //    width: screen_w,
  //    height: screen_h
  //  });
  //  
  //  var x_inverted = -(x1);
  //  var y_inverted = -(y1);
  //  var first_tile_in_map_to_draw_x = parseInt(x_inverted/tile_width);
  //  var first_tile_in_map_to_draw_y = parseInt(y_inverted/tile_height); // results are first visible tile.
  //  var draw_first_tile_here_x = (x1) % tile_width;
  //  var draw_first_tile_here_y = (y1) % tile_height;
  //  var last_tile_in_map_to_draw_x = parseInt((screen_w - draw_first_tile_here_x)/tile_width)+1;
  //  var last_tile_in_map_to_draw_y = parseInt((screen_h - draw_first_tile_here_y)/tile_height)+1;
  //      
  //  for (var j = first_tile_in_map_to_draw_y; j < last_tile_in_map_to_draw_y; j++) {
  //    for (var i = first_tile_in_map_to_draw_x; i < last_tile_in_map_to_draw_x; i++) {
  //      var left = ((i * tile_width) + draw_first_tile_here_x);
  //      var top = ((j * tile_height) + draw_first_tile_here_y);
  //      var node = '<div style="width:' + tile_width + 'px;height:' + tile_height + 'px;top:' + top + 'px;left:' + left + 'px;background-color:' + random_color() + '">' + i + ',' + j + '</div>';
  //      $j('#partial').append(node);
  //    };
  //  };
  //};
  
  /* http://awiki.tomasu.org/index.php?title=Pixelate:Issue_12/Isometric_Projection */
  this.iso = function(x1,y1) {
    var layer = this.map.layers[0];
    var screen_w = 1024;
    var screen_h = 1024;
    
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
      var tile_height = layer.tile_height; // (layer.tile_height/2)
      var tile_width = layer.tile_width;
      
      console.log("width: %d height: %d", tile_width, tile_height);
      
      // PRE IPAD/
      // container.css({
      //   width: screen_w,
      //   height: parseInt(screen_h/2)+parseInt(tile_height/2)
      // });
      
      container.css({
        width: 1024,
        height: 768
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
    
    // PRE IPAD SETTINGS
    //var starting_left_offset = parseInt(screen_w/4);
    //var starting_top_offset = parseInt(screen_h/8);
    
    var starting_left_offset = 512;
    var starting_top_offset = 0;
    
    // PRE IPAD SETTINGS
    // crop.css({
    //   width: parseInt(screen_w/2),
    //   height: parseInt(screen_h/4),
    // });
    
    crop.css({
      width: 1024,
      height: 768,
    });
    
    /* 
      this is just one of the infinite possible perspectives.
      these numbers were derived by brute force, and are viewing
      the map from the southeast (if the upper right edge of the map is north)
    */
    // PRE IPAD
    //var rotation = 2.3559999999999994;
    //var elevation = 1.0469999999999988;
    //var spin = 0.0;
    //var zoom = 11.31399999999999119;
    
    var rotation = map.rotation;
    var elevation = map.elevation;
    var spin = map.spin;
    var zoom = map.zoom;
    
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