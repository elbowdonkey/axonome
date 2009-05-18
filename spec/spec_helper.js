Screw.Matchers["gt"] = {
  match: function(expected, actual) {
    return actual > expected;
  },
  failure_message: function(expected, actual, not) {
    return 'expected ' + $.print(actual) + (not ? ' not' : '') + ' to be greater than ' + $.print(expected) + '.';
  }
}

Screw.Matchers["be_a"] = {
  match: function(expected, actual) {
    return actual instanceof expected;
  },
  failure_message: function(expected, actual, not) {
    return 'expected ' + $.print(actual) + (not ? ' not' : '') + ' to be an instance of ' + $.print(expected) + '.';
  }
}

Screw.Matchers["be_an"] = Screw.Matchers["be_a"];

Screw.Unit(function() {
  before(function() {
    $('dom_test').empty();
  });
});