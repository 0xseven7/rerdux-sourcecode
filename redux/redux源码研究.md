在项目中用 Redux 的时候，有时候就觉得会用，但是不明白为什么这样用, 有时候搞得自己云里雾里的. 抽了一块时间静下来看了看redux的源码,再配合文档, 觉得豁然开朗. 其实redux的源码非常简单, 就暴露出五个api, 常用的就`createStore`, `combineReducer`, 'compose'三个. 最后我会尝试一下写一个自己的`zcx-redux`.

# MVC
开始之前还是要先复习一下MVC框架的思想: 
MVC分为三个部分:
- View : 视图层, 展现的页面 
- Controller: 控制层, 管理应用的行为和数据, 响应用户的输入(来自view)和更新状态的指令(来自Model)
- Model: 管理数据, 大部分的业务逻辑

用户的请求先到达`Controller`, 然后`Controller`调用`Model`中的数据, 把数据再把数据交给`View`. 这是个很理想的方法, 但是在实际应用应用中, 是可以允许`View`和`Model`直接通信的. 当项目变得越来越大的时候, 不同模块之间的以来就变得不可预测了, 数据非常容易造成混乱. 为了解决这种问题, `Flux`思想出现了.

# Flux
一个Flux应用应该包揽四个部分: 
- Dispatcher: 处理分发, 维持store之间的依赖关系
- Store, 负责存储数据和处理数据相关逻辑
- Action: 出发Dispatcher
- View: 视图层

![](http://pcvhffvzu.bkt.clouddn.com/flux.png)

上图就可以看到, Flux的特点就是单向数据流: 
- 用户在`View`发起一个Action 对象给`Dispatcher`;
- Dispatcher 接到Action并要求Store作出相应的更新;
- Store作出相应的更新, 并发出一个change事件
- View接收到change事件, 更新页面
  
所以在Flux的体系下, 想要驱动页面只能派发一个Action, 别无他法. 所以在这中严格的规矩下, 就杜绝了`View`和`Model`之间的直接对话. 

# Redux
`Redux`也是`Flux`思想的一种实现. 除了继承了Flux的单向数据流之外, 还强调了三个基本原则:
- 唯一的`store`, 每个应用只会生成一个`store`
- 保持状态只读, `state`是不发生改变的
- 数据改变只能通过纯函数完成, 这个纯函数就是`Reducer`. 按照redux作者的话: `Redux = Flux + Reducer`

# Redux
一个`Redex`莹莹需要以下几个部分: 
- Action
- Store
- Reducer
看起来有些抽象, 我们来具象化以下; 如下图, 这是李云龙的独立团今天的防御视图:
![](http://pcvhffvzu.bkt.clouddn.com/redux1.png)
老李来视察之后觉得张大喵的一营太过靠前, 容易被攻击, 就让张大喵把一营撤回来一点.
![](http://pcvhffvzu.bkt.clouddn.com/redux2.png)
上面的例子就可以很好的说明Redux了: 
- View: 独立团的防御示意图;
- Action: 李云龙下达的命令: {一营后撤};
- Reducer: 具体后撤的实施者张大喵: {一应全体后撤}
- Store: 一营后撤后的具体位置
  
`Store`决定了`View`, 用户的交互产生了`Action`, `Reducer`根据接收的`Action`执行任务, 从而改变`Store`中的`State`, 最终展示到`View`上. 上面说了`Reducer`是个纯函数, 那么他是怎么工作的呢?

## Redux栗子


