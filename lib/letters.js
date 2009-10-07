function Letters(word,x,y,z) {
  var letters = word.split("");
  
  for (var i=0; i < letters.length; i++) {
    if (letters[i] == ".") {
      letters[i] = "dot";
    }
  };
  
  this.origin_x = x;
  this.origin_y = y;
  this.start_x = x;
  this.word_as_array = new Array();
  
  this.coords = function(y,x) {
    this.word_as_array.push( (this.start_x + this.origin_x + x) + "_" + (this.origin_y + y) + "_" + z );
  }
  
  this.a = function(x,y) {
    var width = 5;
    this.coords(0,1);
    this.coords(0,2);
    this.coords(1,0);
    this.coords(1,3);
    this.coords(2,0);
    this.coords(2,1);
    this.coords(2,2);
    this.coords(2,3);
    this.coords(3,0);
    this.coords(3,3);
    this.coords(4,0);
    this.coords(4,3);
    this.start_x += width;
  }
  
  this.x = function(x,y) {
    var width = 6;
    this.coords(0,0);
    this.coords(0,4);
    this.coords(1,1);
    this.coords(1,3);
    this.coords(2,2);
    this.coords(3,1);
    this.coords(3,3);
    this.coords(4,0);
    this.coords(4,4);
    this.start_x += width;
  }
  
  this.o = function(x,y) {
    var width = 5;
    this.coords(0,1);
    this.coords(0,2);
    this.coords(1,0);
    this.coords(1,3);
    this.coords(2,0);
    this.coords(2,3);
    this.coords(3,0);
    this.coords(3,3);
    this.coords(4,1);
    this.coords(4,2);
    this.start_x += width;
  }
  
  this.n = function(x,y) {
    var width = 6;
    this.coords(0,0);
    this.coords(0,4);
    this.coords(1,0);
    this.coords(1,1);
    this.coords(1,4);
    this.coords(2,0);
    this.coords(2,2);
    this.coords(2,4);
    this.coords(3,0);
    this.coords(3,3);
    this.coords(3,4);
    this.coords(4,0);
    this.coords(4,4);
    
    this.start_x += width;
  }
  
  this.dot = function(x,y) {
    var width = 2;
    this.coords(4,0);
    this.start_x += width;
  }
  
  this.m = function(x,y) {
    var width = 6;
    this.coords(0,0);
    this.coords(0,4);
    this.coords(1,0);
    this.coords(1,1);
    this.coords(1,3);
    this.coords(1,4);
    this.coords(2,0);
    this.coords(2,2);
    this.coords(2,4);
    this.coords(3,0);
    this.coords(3,4);
    this.coords(4,0);
    this.coords(4,4);
    
    this.start_x += width;
  }
  
  this.e = function(x,y) {
    var width = 4;
    this.coords(0,0);
    this.coords(0,1);
    this.coords(0,2);
    this.coords(0,3);
    this.coords(1,0);
    this.coords(2,0);
    this.coords(2,1);
    this.coords(2,2);
    this.coords(2,3);
    this.coords(3,0);
    this.coords(4,0);
    this.coords(4,1);
    this.coords(4,2);
    this.coords(4,3);
    this.start_x += width;
  }
  
  for (var i=0; i < letters.length; i++) {
    eval("this." + letters[i] + "()");
  };
  
  return this.word_as_array;
}