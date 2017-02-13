[TOC]

##环境需要
- npm install puer -g 
- npm install gulp -g
- npm install 
- gulp 

##系统结构

* 按照需求文档，有几个页面只需要前端模拟静态数据就可以，故在Module下子文件夹加了model.js。
* 前端数据和后端数据混合使用

##样式命名规范
1. 参考[NEC规范][]
2. 任何内容(结构)都可以是模块(m-),小的元件(u-)
3. 模块第一层子集命名为 模块_含义,第二层子集命名为 含义, 第二层耦合性就很少了

[NEC]: http://nec.netease.com
eg:
```
	<div class="m-nav">
		<div class="nav_left" data-descp="从属关系">
			<div class="left">耦合性小</div>
			<div class="right">耦合性小</div>
		</div>
		<div class="nav_right"></div>
	</div>
```

##特别说明 

由于NPM包很难下载下来，所以上传到git仓库中，不需要再下载npm包, 可以直接 gulp;
