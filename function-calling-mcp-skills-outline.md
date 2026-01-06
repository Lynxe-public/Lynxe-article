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

要讲明白为什么这几个概念是竞合关系，我们需要先简单了解一下AI Agent工具调用的基本原理。


### AI Agent工具调用的基本流程

![AI Agent工具调用流程](./llmToolCalling.png)

一个典型的AI Agent工具调用流程是这样的：


1. **LLM接收用户请求和工具描述**
   - 用户提出需求（比如"帮我查一下北京今天的天气"）
   - 系统向LLM提供可用工具的列表和描述（比如"天气查询工具：可以查询指定城市的天气信息"）

2. **LLM决定是否需要调用工具**
   - LLM根据用户需求和工具描述，判断是否需要调用工具
   - 如果需要，LLM会生成结构化的工具调用请求

   这里的关键是LLM返回的是结构化的JSON格式，而不是自然语言。比如用户说"帮我查一下北京今天的天气"，LLM可能会返回：

   ```json
   {
     "id": "chatcmpl-abc123",
     "object": "chat.completion",
     "choices": [
       {
         "index": 0,
         "message": {
           "role": "assistant",
           "content": null,
           "tool_calls": [
             {
               "id": "call_abc123",
               "type": "function",
               "function": {
                 "name": "get_weather",
                 "arguments": "{\"city\": \"北京\", \"date\": \"today\"}"
               }
             }
           ]
         },
         "finish_reason": "tool_calls"
       }
     ]
   }
   ```

   这种结构化的输出格式，就是Function Calling的核心机制。它让系统能够稳定地解析LLM的意图，而不需要复杂的文本解析逻辑。注意关键字段：
   - `tool_calls`：当需要调用工具时，这里包含工具调用的信息
   - `function.name`：要调用的工具名称
   - `function.arguments`：工具的参数（JSON字符串格式）


3. **系统解析并执行工具调用**
   - 系统解析LLM生成的工具调用请求
   - 执行对应的工具函数（比如调用天气API）
   - 获取工具执行结果
还是以上面的llm返回为例：

上面的JSON格式会被系统解析并转换为真正的函数调用。以JavaScript为例：

   ```javascript
   // 1. 从LLM响应中提取工具调用信息
   const toolCall = response.choices[0].message.tool_calls[0];
   const functionName = toolCall.function.name;  // "get_weather"
   const functionArgs = JSON.parse(toolCall.function.arguments);  // {city: "北京", date: "today"}

   // 2. 根据工具名称找到对应的函数
   const tools = {
     get_weather: (city, date) => {
       // 执行天气查询逻辑
       return `北京今天天气：25°C，晴天`;
     },
     // ... 其他工具
   };

   // 3. 执行工具调用
   const result = tools[functionName](functionArgs.city, functionArgs.date);
   // 实际调用：tools["get_weather"]("北京", "today")
   ```

   这个过程是自动的：系统根据`function.name`找到对应的函数，解析`function.arguments`获取参数，然后执行调用。这就是Function Calling让工具调用变得可预测和可靠的核心机制。

4. **将结果返回给LLM**
   - 工具执行结果被返回给LLM
   - LLM根据结果决定下一步行动（继续调用工具，或者生成最终回答）

### 小结：工具调用的本质

这个流程的核心在于：LLM需要把用户的非结构化需求（一段自然语言文本）转换为结构化的函数调用（函数名和参数），然后与其他应用程序交互，再将结构化结果返回给模型，让模型能够基于这些结果进行下一步决策。

问题的本质在于，历史上其他系统（数据库、API、文件系统等）只能处理结构化信息，而LLM擅长处理非结构化信息（文本）。因此，LLM必须想办法在两种信息形式之间架起桥梁：将非结构化的用户需求转换为结构化的函数调用，这样才能与外部系统交互。

这就是Function Calling的本质，也是后面MCP和Skills能够存在的前置条件。

### 为什么需要这些技术

这个流程听起来很简单，但在实际实现中会遇到很多问题。让我们看看传统方式存在哪些痛点：

**问题1：如何让LLM输出可解析的工具调用？**

最早的方式是通过复杂的提示词引导LLM输出特定格式的文本，然后手动解析。这种方式的问题很明显：
- 输出格式不稳定，解析容易出错
- 需要大量的提示词工程
- 不同模型需要不同的提示词策略

**问题2：如何统一工具的描述和调用方式？**

每个工具都有自己的API、参数格式、返回格式。如果每个工具都要单独集成：
- 开发者需要为每个工具写专门的集成代码
- 不同工具的参数校验、错误处理都要重复实现
- 工具之间的组合调用变得复杂

**问题3：如何让工具可以被多个应用共享？**

如果每个AI应用都要自己集成所有工具：
- 重复造轮子，开发成本高
- 工具更新需要每个应用都同步修改
- 无法形成统一的工具生态

**问题4：如何保证工具调用的安全性和可靠性？**

直接让LLM调用外部API存在很多风险：
- API密钥可能泄露
- 无法控制LLM可以访问哪些资源
- 错误处理和重试机制需要每个工具都实现

Function Calling、MCP和Skills这些技术，本质上都是为了解决这些问题而出现的。它们分别从不同角度提供了解决方案：

- **Function Calling**：解决了问题1，让LLM能够稳定地输出结构化的工具调用请求
- **MCP**：解决了问题2、3、4，提供了统一的工具发现、调用和安全机制
- **Skills**：在Claude生态内，提供了更细粒度的工具定义和编排方式

理解了这些背景，我们就能更好地理解为什么说MCP和Skills是竞合关系，而不是简单的互补关系了。

## Function Calling、MCP、Skills的核心定位

### Function Calling：是什么

### MCP (Model Context Protocol)：是什么

### Skills (Claude Skills)：是什么

## 三者的本质差异对比

### 对比表格（定位、协议层、实现方式、适用场景等维度）



## 三者的联系与演进关系

## Lynxe的实践与总结

