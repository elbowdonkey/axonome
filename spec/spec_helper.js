// Screw.Matchers["gt"] = {
//   match: function(expected, actual) {
//     return actual > expected;
//   },
//   failure_message: function(expected, actual, not) {
//     return 'expected ' + $.print(actual) + (not ? ' not' : '') + ' to be greater than ' + $.print(expected) + '.';
//   }
// }
//
// 
// Screw.Unit(function() {
//   before(function() {
//     $('dom_test').empty();
//   });
// });


// grab defaults from jquery.iso plugin that we can then pass into standalone lib tests
$j('body').append('<div id="sandbox"></div>');
$j('#sandbox').append('<div id="dummy"></div>');
var dummy = $j('#dummy').iso();
var defaults = $j('#dummy').iso.defaults;
$j('#dummy').remove();
$j('#sandbox').html('');
