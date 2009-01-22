Screw.Matchers["gt"] = {
  match: function(expected, actual) {
    return actual > expected;
  },
  failure_message: function(expected, actual, not) {
    return 'expected ' + $.print(actual) + (not ? ' not' : '') + ' to be greater than ' + $.print(expected) + '.';
  }
}

Screw.Unit(function() {
  before(function() {
    $('dom_test').empty();
  });
});