(function($) {
  $.fn.iso = function(options) {
    $.extend($.fn.iso.defaults, options);
    
    return this.each(function() {
      $.fn.iso.grid = new Grid($.fn.iso.defaults.max_x,$.fn.iso.defaults.max_y, $.fn.iso.defaults);
      $.fn.iso.nodes = $.fn.iso.grid.nodes;
      
      $.fn.iso.avatars = new Array();

      for (var i=0; i < $.fn.iso.defaults.avatars; i++) {
        $.fn.iso.avatars[i] = new Avatar($.fn.iso.grid);
      };
      
      $.fn.iso.avatar = $.fn.iso.avatars[0];
      
      render_tiles(this);
      render_avatars(this);
      
      for (var i=0; i < $.fn.iso.avatars.length; i++) {
        attach_handlers(this,i);
      };
    });
  };
  
  $.fn.iso.defaults = {
    max_x: 6,
    max_y: 6,
    avatar_offset: [36,4],
    avatars: 1,
    tile_width: 104,
    tile_height: 52,
    speed: 200,
    animate: true,
    labels: true,
    tile_offset: [262,0],
    layers: 1
  };
  
  var defaults = $.fn.iso.defaults
  // TODO: trash these once dependent code has no need of them
  var max_xy = [defaults.max_x, defaults.max_y];
  var max_x = max_xy[0];
  var max_y = max_xy[0];
  
  function render_tiles(container) {
    var nodes = $.fn.iso.nodes;
    var html = '';
    
    for (var i=0; i < nodes.length; i++) {
  		var node = nodes[i];
  		var id = 'tile_' + node.index();
  		var label = (defaults.labels) ? id : '';

  		$(container).append('<div id="' + id + '">' + label + '</div>');

  		$('#' + id).css({
  			zIndex: node.zindex(),
  			left: (node.left()+defaults.tile_offset[0]) + 'px',
  			top: (node.top()) + 'px'
  		}).data("xy", node.xy());
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
  		var end_x = tile.data("xy")[0];
  		var end_y = tile.data("xy")[1];
		
  		$.fn.iso.avatar.determine_path(start_x, start_y, end_x, end_y);
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
    		left: node.left() + defaults.avatar_offset[0] + defaults.tile_offset[0],
    		top: node.top() + defaults.avatar_offset[1]
    	}, defaults.speed);

    	shadow_element.animate({
    		left: node.left() + defaults.avatar_offset[0] + defaults.tile_offset[0],
    		top: node.top() + defaults.avatar_offset[1]
    	}, defaults.speed);
    } else {
      avatar_element.css({
    		left: node.left() + defaults.avatar_offset[0] + defaults.tile_offset[0],
    		top: node.top() + defaults.avatar_offset[1]
    	});

    	shadow_element.css({
    		left: node.left() + defaults.avatar_offset[0] + defaults.tile_offset[0],
    		top: node.top() + defaults.avatar_offset[1]
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
    		left: node.left() + defaults.avatar_offset[0] + defaults.tile_offset[0],
    		top: node.top() + defaults.avatar_offset[1]
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
    		left: node.left() + defaults.avatar_offset[0] + defaults.tile_offset[0],
    		top: node.top() + defaults.avatar_offset[1]
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