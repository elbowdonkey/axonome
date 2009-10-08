axono.me is a lightweight Javascript isometric pixel art grid library.

* fully test driven using <a href="http://github.com/nathansobo/screw-unit">Screw Unit</a>
* small, mostly essentials only footprint
* a* pathfinding
* silly things, like a letter renderer

# Examples

Here's how you'd render a 6x6 isometric grid using jQuery.

    $(document).ready(function(){
      $('#board').iso();
		});

The Iso object handles rendering as well as representing the grid as Javascript objects.

See the <a href="http://axono.me/demos/index.html">demos</a> for more examples.

# Why axono.me?

Most of the pixel art we see today is said to be represented in an isometric projection. Though, in truth, it's actually done in dimetric projection, both isometric and dimetric projections are considered kinds of axonometric projections.

axono.me has been designed to render axonometric projections. Though it works fine for any kind of grid. Check out the demos for examples of non-axonometric projections.

# Useful resources

* <a href="http://www.compuphase.com/axometr.htm">Axonometric projections - a technical overview</a>
* <a href="http://www-cs-students.stanford.edu/~amitp/game-programming/grids/">Amit's Thoughts on Grids</a>