Array.prototype.size = function () {
  var l = this.length ? --this.length : -1;
  for (var k in this) {
    l++;
  }
  return l;
}