js_iso is a lightweight Javascript isometric pixel art grid library

* fully test driven using Screw Unit;
* small, essentials-only footprint;

# Examples

Here's how you'd render a 6x6 isometric grid using jQuery.

    $(document).ready(function(){
			var grid = new Grid(6,6);
			
			for (var i=0; i < grid.nodes().length; i++) {
				var node = grid.nodes()[i];
				var id = 'tile_' + node.index();

				$('#board').append('<div id="' + id + '"><span>' + id + '</span></div>');
				$('#' + id).css({
					zIndex: node.zindex(),
					left: (node.left()) + 'px',
					top: (node.top()) + 'px'
				});
			};
		});

We create a Grid object, then iterate over its nodes, using each node's attributes to tell us how to position the node within the #board div.

See the demos for more examples.

# Useful resources

* http://www.compuphase.com/axometr.htm
* http://www-cs-students.stanford.edu/~amitp/game-programming/grids/