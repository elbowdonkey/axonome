function Iso(x,y, container, options) {
  this.max_x = x;
  this.max_y = y;
  this.max_xy = [x,y];
  this.grid = new Grid(this.max_x,this.max_y, options);
  this.nodes = this.grid.nodes;
  this.container = container;
  this.avatar_offset = [36,4];
  this.avatars = [];
  
  var avatar_count = 1;
  
  if (options) {
   if (options.avatars) {
     avatar_count = options.avatars;
   };
   
   if (options.avatar_offset) {
      this.avatar_offset = options.avatar_offset;
    };
  };
  
  for (var i=0; i < avatar_count; i++) {
    this.avatars[i] = new Avatar(this.grid);
  };
  
  // TODO: this.avatar might be removed in favor of this.avatars[0]
  if (avatar_count == 1) {
    this.avatar = this.avatars[0];
  }
  
  this.place_avatar = function(avatar_index) {
    var avatar_element = $('#avatar_' + avatar_index);
    var shadow_element = $('#shadow_' + avatar_index);
    var node = this.avatars[avatar_index].node();
  	avatar_element.animate({
  		left: node.left() + this.avatar_offset[0],
  		top: node.top() + this.avatar_offset[1]
  	}, 200);
  	
  	shadow_element.animate({
  		left: node.left() + this.avatar_offset[0],
  		top: node.top() + this.avatar_offset[1]
  	}, 200);
  };
  
  this.render = function() {
    for (var i=0; i < this.avatars.length; i++) {
      $(this.container).append('<span class="avatar" id="avatar_' + i + '" />');
      $(this.container).append('<span class="shadow" id="shadow_' + i + '" />');
      
      var avatar_element = $('#avatar_' + i);
      var shadow_element = $('#shadow_' + i);
      avatar_element.css('z-index',999999);
    	avatar_element.css('left',this.avatar_offset[0]);
    	avatar_element.css('top',this.avatar_offset[1]);
    	
    	shadow_element.css('z-index',888888);
    	shadow_element.css('left',this.avatar_offset[0]);
    	shadow_element.css('top',this.avatar_offset[1]);
    	
    	this.place_avatar(i);
    };
    
    for (var i=0; i < this.nodes.length; i++) {
  		var node = this.nodes[i];
  		var id = 'tile_' + node.index();

  		$(this.container).append('<div id="' + id + '"><span>' + id + '</span></div>');
  		$('#' + id + ' span');
  		$('#' + id).data("xy", node.xy());
  		$('#' + id).css({
  			zIndex: node.zindex(),
  			left: (node.left()) + 'px',
  			top: (node.top()) + 'px'
  		});
  	};
  };
  
  this.follow_path = function(end_tile) {
    var avatar = this.avatar;
    var avatar_element = $('#avatar');
    var node = this.avatar.node();

  	avatar_element.animate({
  		left: node.left() + this.avatar_offset[0],
  		top: node.top() + this.avatar_offset[1]
  	}, 200, function() {
  	  if (avatar.movement_queue.length > 0) {
  			avatar.step();
  			iso.follow_path(end_tile);
  		} else {
  			end_tile.css({
  			  background: "url('images/tile.png') no-repeat top left"
  			});
  		}
  	});
  };
  
  this.change_avatar = function (num,axis,avatar_index) {
    if (avatar_index == undefined) {
      var avatar_index = 0;
    }
    
    var i;
    var avatar = this.avatars[avatar_index];
    
    if (axis == 'x') i = 0;
    if (axis == 'y') i = 1;
    
  	avatar.position[i] += num;

  	if (avatar.position[i] < 0) avatar.position[i] = 0;
  	if (avatar.position[i] >= this.max_xy[i]) avatar.position[i] = this.max_xy[i]-1;

  	this.place_avatar(avatar_index);
  };
};