#{%= appname %}


###安装

fdm安装，[使用说明](https://github.com/chunterg/FdMaven)

````
npm install -g fdm

````


源码下载

````
fdm init git@gitlab.alibaba-inc.com:1688/{%= appname %}.git
````

服务启动

````
fdm server
````

- 支持页面实时刷新(js/css/html/tpl变动)

- 支持html模板实时转amd(fmd)模块

- 支持less实时编译

- 支持url rewrite

````    
'^/{%= name %}(.*)$ /src$1 [L]',//style代理到本地
'^(.*).(css|js)(.*)$ http://42.156.140.62$1.$2$3 [P]',//本地没有代理到线上
````

项目编译

````
fdm build
````

- 生成(js/css)到build目录，目前不作打包压缩