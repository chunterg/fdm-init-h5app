jQuery(function(){
  define(['{%= name %}'],function({%= name %}){
      test('{%= name %}.init', function() {
        expect(1);
        strictEqual({%= name %}.init(), '{%= name %} loaded successfully', 'should be {%= name %} loaded successfully');
    });
      
  });
});

