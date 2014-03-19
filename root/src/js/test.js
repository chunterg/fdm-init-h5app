define(['util/template/1.0','view/testview'],function(Template,view){
	var data = {
			title: '基本例子',
			isAdmin: true,
			list: ['文艺', '博客', '摄影', '电影', '民谣', '旅行', '吉他']
		};
		var render = Template.compile(view)
		var html  =render(data);
		document.getElementById('content').innerHTML = html;
		
});

