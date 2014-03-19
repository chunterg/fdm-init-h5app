(function( env ) {
    'use strict';
 
    var configs = {
        resolve: function( id ) {
            var rStyle = /\.css(?:\?|$)/,
            parts = id.split('/'),
                  root = parts[0],
                  type = rStyle.test( id ) ? 'css/' : 'js/';
        
            switch ( root ){
                case 'view':
                  id = '{%= appname %}/' + type  + id;
                break;
            }
                
            return id;
        },
        alias: {
		},
		/**	
		* 配置baseUrl，如果是static分支，请配置成 http://static.c.aliimg.com，
		* 请勿直接配置 cdn 域名，除非你想清楚了清除文件缓存的机制（比如加时间戳）
		* 请使用styleCombine来帮你处理CDN缓存的问题。
		*/
		baseUrl: "http://style.c.aliimg.com/",
		/**	
		* 打开 AMD 异步加载功能。
		*/
		amd: true,
        debug:false
    };
    if( typeof env.lofty !== 'undefined' ) {
        // for lofty
        env.lofty.config(configs);
    }
    if( typeof exports !== 'undefined' && env === exports ) {
        // for node.js
        exports.configs = configs;
    }
})(this);