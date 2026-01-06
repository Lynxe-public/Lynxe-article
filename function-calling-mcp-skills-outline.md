# 深入解析Function Calling、MCP和Skills的本质差异与最佳实践

## 关于这个系列

作为 Lynxe(原JManus）的作者，我花费了很多课余时间来完善这个Func-Agent框架，也因此对于什么是ReAct Based Agent 有了更深一些的理解。

所以想把这些内容总结出来，是因为这个项目本身核心目的就是探索Agent的前沿最佳实践，目前已经有所小成，Lynxe能解决我自己面对的80%以上的问题了，所以我觉得值得把我实验下来有效的东西写出来，方便大家快速入门。

你可以访问 [Lynxe(菱科斯)](https://github.com/spring-ai-alibaba/Lynxe) 阅读详细源码来学习agent的一些最佳实践。这是一个非常完善的产品级的 Func-Agent框架。

## 系列计划

* [什么是 ReAct Agent？](./react-agent-intro.md)
* [Agent 与传统的写流程对比，有哪些本质不同？](./react-agent-vs-traditional.md)
* 深入解析Function Calling、MCP和Skills的本质差异与最佳实践
* 上下文管理的一些实践
* 并行执行的最佳实践与我走过的弯路
* 其余 想到或得到反馈在写 

## 正文开始

在前面的文章中，我们介绍了什么是 ReAct Agent，以及 Agent 与传统编程、Workflow 的本质区别。

现在我们来聊聊一个大家广为谈论的话题：AI Agent 的工具能力是什么？Function Calling、MCP 和 Skills 这三者有什么区别？它们背后的核心原理是什么？

## 一句话总结

* **Function Calling**：AI Agent 调用工具的基础能力，也是后面两个能够存在的基础。

* **MCP (Model Context Protocol)**：由 Anthropic 推动的开放标准，为 LLM 应用提供标准化接口以连接和交互外部数据源和工具，现已捐赠给linux基金会。

* **Skills**：Claude的一个新的尝试，可以允许用户更细致的用文字定义指令、脚本和资源，跟MCP有竞合关系，我们后面会从不同角度来阐述这个竞合关系（虽然很多人认为是互补，但实际上，这两个是竞争关系更大一些）


## 为什么需要这些技术：理解工具调用的基础

### AI Agent工具调用的基本流程

### 为什么需要这些技术

## Function Calling、MCP、Skills的核心定位

### Function Calling：是什么

### MCP (Model Context Protocol)：是什么

### Skills (Claude Skills)：是什么

## 三者的本质差异对比

### 对比表格（定位、协议层、实现方式、适用场景等维度）



## 三者的联系与演进关系

## Lynxe的实践与总结

