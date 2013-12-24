/*
 * {%= name %}
 *
 * Copyright (c) {%= grunt.template.today('yyyy') %} {%= author_name %}
 * Licensed under the {%= licenses.join(', ') %} license{%= licenses.length === 1 ? '' : 's' %}.
 */

lofty.config({
 	amd: true
});
define("{%= name %}",['jquery'], function(){
   var mymodule = {	
		init:function(){
			console.log('{%= name %} loaded successfully');
			return '{%= name %} loaded successfully';
		}	
   };
   return mymodule;
});