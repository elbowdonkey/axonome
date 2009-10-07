(function($) {
  $.fn.iso = function(options) {
    $.extend($.fn.iso.defaults, options);
    var defaults = $.fn.iso.defaults;
    $.fn.iso.grid = new Grid(defaults.max_x,defaults.max_y,defaults);
    
    for (var i=0; i < defaults.unwalkables.length; i++) {
      $.fn.iso.grid.nodes[defaults.unwalkables[i]].walkable = false;
    };
    
    $.fn.iso.nodes = $.fn.iso.grid.nodes;
    
    $.fn.iso.avatars = new Array();
    for (var i=0; i < defaults.avatar_count; i++) {
      $.fn.iso.avatars.push(new Avatar($.fn.iso.grid));
    };
    
    $.fn.iso.avatar = $.fn.iso.avatars[0];
    
    return this.each(function() {
      render_tiles(this);
      render_avatars(this);
      for (var i=0; i < defaults.avatar_count; i++) {
        attach_handlers(this,i);
      };
    });
  };
  
  $.fn.iso.defaults = {
    max_x: 6,
    max_y: 6,
    avatar_offset: [36,4],
    avatar_count: 1,
    tile_width: 104,
    tile_height: 52,
    speed: 200,
    animate: true,
    labels: true,
    tile_offset: [262,0],
    layers: 1,
    iso_tile_height:  5,
    unwalkables: [],
    render_all: true
  };
  
  var defaults = $.fn.iso.defaults;
  
  function render_tiles(container) {
    var nodes = $.fn.iso.nodes;
    var html = '';
    
    for (var key in nodes) {
      var node = nodes[key];
      var id = 'tile_' + key;
      var label = (defaults.labels) ? id : '';
      
      if (defaults.render_all == false) {
        if (node.walkable != true) {
          $(container).append('<div class="layer_' + node.z + '" id="' + id + '"></div>');
          $('#' + id).css({
            zIndex: node.zindex,
            left: (node.left+defaults.tile_offset[0]) + 'px',
            top: (node.top - (node.z * defaults.iso_tile_height)) + 'px'
          }).data("xyz", [node.x,node.y,node.z]);
          $('#' + id).addClass('dirt');
        }
      } else {
        $(container).append('<div class="layer_' + node.z + '" id="' + id + '"></div>');

        $('#' + id).css({
          zIndex: node.zindex,
          left: (node.left+defaults.tile_offset[0]) + 'px',
          top: (node.top - (node.z * defaults.iso_tile_height)) + 'px'
        }).data("xyz", [node.x,node.y,node.z]);
      
        if (node.walkable != true) {
          $('#' + id).addClass('dirt');
        }
      }
    };
    
  };
  
  function render_avatars(container) {
    for (var i=0; i < $.fn.iso.avatars.length; i++) {
      $(container).append('<span class="avatar" id="avatar_' + i + '" />');
      $(container).append('<span class="shadow" id="shadow_' + i + '" />');
      
      var avatar_element = $('#avatar_' + i);
      var shadow_element = $('#shadow_' + i);
      
      avatar_element.css({
        'z-index': 999999,
        'left': defaults.avatar_offset[0] + defaults.tile_offset[0],
        'top': defaults.avatar_offset[1]
      });
      
      shadow_element.css({
        'z-index': 888888,
        'left': defaults.avatar_offset[0] + defaults.tile_offset[0],
        'top': defaults.avatar_offset[1]
      });
      
      place_avatar(i);
    };
  };
  
  function attach_handlers(container, avatar_index) {
    $('#' + container.id).children().click(function(e) {
      var tile = $(e.target);
      //tile.css("background", "url('images/highlight.png') no-repeat top left");
      var start_x = $.fn.iso.avatar.position[0];
      var start_y = $.fn.iso.avatar.position[1];
      var start_z = $.fn.iso.avatar.position[2];
      var end_x = tile.data("xyz")[0];
      var end_y = tile.data("xyz")[1];
      var z = tile.data("xyz")[2];
      $.fn.iso.avatar.determine_path(start_x, start_y, end_x, end_y,z);
      if ($.fn.iso.avatar.movement_queue.length > 0) {
        follow_path(avatar_index);
      };
    });
  }
  
  function place_avatar(avatar_index) {
    var avatar_element = $('#avatar_' + avatar_index);
    var shadow_element = $('#shadow_' + avatar_index);
    var node = $.fn.iso.avatars[avatar_index].node();
    
    if (defaults.animate == true) {
      avatar_element.animate({
        left: node.left + defaults.avatar_offset[0] + defaults.tile_offset[0],
        top: node.top + defaults.avatar_offset[1]
      }, defaults.speed);

      shadow_element.animate({
        left: node.left + defaults.avatar_offset[0] + defaults.tile_offset[0],
        top: node.top + defaults.avatar_offset[1]
      }, defaults.speed);
    } else {
      avatar_element.css({
        left: node.left + defaults.avatar_offset[0] + defaults.tile_offset[0],
        top: node.top + defaults.avatar_offset[1]
      });

      shadow_element.css({
        left: node.left + defaults.avatar_offset[0] + defaults.tile_offset[0],
        top: node.top + defaults.avatar_offset[1]
      });
    }
  };
  $.fn.iso.place_avatar = place_avatar;
  
  function change_avatar(num,axis,avatar_index) {
    if (avatar_index == undefined) {
      var avatar_index = 0;
    }
    
    var i;
    var avatar = $.fn.iso.avatars[avatar_index];
    
    if (axis == 'x') i = 0;
    if (axis == 'y') i = 1;
    
    avatar.position[i] += num;

    if (avatar.position[i] < 0) avatar.position[i] = 0;
    if (avatar.position[i] >= max_xy[i]) avatar.position[i] = max_xy[i]-1;

    place_avatar(avatar_index);
  };
  
  $.fn.iso.change_avatar = change_avatar;
  
  function follow_path(avatar_index) {
    var avatar = $.fn.iso.avatars[avatar_index];
    var avatar_element = $('#avatar_' + avatar_index);
    var node = avatar.node();
    
    if (defaults.animate == true) {
      avatar_element.animate({
        left: node.left + defaults.avatar_offset[0] + defaults.tile_offset[0],
        top: node.top + defaults.avatar_offset[1]
      }, defaults.speed, function() {
        if (avatar.movement_queue && avatar.movement_queue.length > 0) {
          avatar.step();
          follow_path(avatar_index);
        } else {
          return true;
        }
      });
    } else {
      avatar_element.css({
        left: node.left + defaults.avatar_offset[0] + defaults.tile_offset[0],
        top: node.top + defaults.avatar_offset[1]
      });
      if (avatar.movement_queue && avatar.movement_queue.length > 0) {
        avatar.step();
        follow_path(avatar_index);
      } else {
        return true;
      }
    }
    
  };
  $.fn.iso.follow_path = follow_path;
})(jQuery);