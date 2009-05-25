function Iso(x,y, container, options) {
  this.max_x = x;
  this.max_y = y;
  this.grid = new Grid(this.max_x,this.max_y, options);
  this.nodes = this.grid.nodes;
  this.avatar = new Avatar(this.grid);
  this.container = container;
  this.avatar_offset = [36,4];
};

Iso.prototype.render = function() {
	$(this.container).append('<span id="avatar"></span>');
	$('#avatar').css('z-index',999999);
	$('#avatar').css('left',this.avatar_offset[0]);
	$('#avatar').css('top',this.avatar_offset[1]);
	
	this.place_avatar();
  
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

Iso.prototype.place_avatar = function() {
  var avatar_element = $('#avatar');
  var node = this.avatar.node();
	avatar_element.animate({
		left: node.left() + this.avatar_offset[0],
		top: node.top() + this.avatar_offset[1]
	}, 200);
}

Iso.prototype.follow_path = function(end_tile) {
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
}

Iso.prototype.change_avatar_x = function (num) {
	this.avatar.position[0] += num;
	
	if (this.avatar.position[0] < 0) {
		this.avatar.position[0] = 0;
	}
	
	if (this.avatar.position[0] >= this.max_x) {
		this.avatar.position[0] = this.max_x-1;
	}
	
	this.place_avatar();
	
}

Iso.prototype.change_avatar_y = function (num) {
	this.avatar.position[1] += num;
	
	if (this.avatar.position[1] < 0) {
		this.avatar.position[1] = 0;
	}
	
	if (this.avatar.position[1] >= this.max_y) {
		this.avatar.position[1] = this.max_y-1;
	}
	
	this.place_avatar();
}
