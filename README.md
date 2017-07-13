# 用redux升级的galley by react
距离做这个练手项目已经过去了快一年，在此之间，有些学习有些成长。之前公司里用的是`mobx`，最近刚好有空，学习了`redux`，便产生了重构这个demo的想法。
## 做了什么
* 将原先的组件拆分为两个`container`，分别为控制条和图片展示区。让结构更加清晰，容易维护。
* 将数据存储于`store`，所有组件共享一份数据。解决了组件间传值问题。一处改变，就可以响应式的更新。
* 设计三个`action`，分别用于初始化/升级排布数组`update`、设置居中（后来发现其实可以省略）`center`、设置翻转`inverse`
## 点击查看
[http://laihaibo.xyz/gallery-on-react/build/index.html](http://laihaibo.xyz/gallery-on-react/build/index.html)
## 安装
```
    1. npm i
    2. npm start
```
## 优化
1. 为每个component组件编写了shouldComponentUpdate
2. 将原先的充满副作用的函数修改为声明式的函数

## todo
1. 控制条旋转图标
2. `css` => `less`
3. 编写`dev`、`prod`版本的配置文件
4. `localstorage`数据持久化存储
5. 其他优化
6. pwa

## 总结
* 重构完这个项目，我对`view = f(data)`的思想，有了一个更深的理解。组件间的数据传递使用`redux`，`react`负责渲染数据，这样就够清晰，也更易维护。
* 关于组件的拆分，如何合理利用`props`传递数据，数据结构设计，采用怎样的设计模式，都是值得不断优化的问题
* just do it