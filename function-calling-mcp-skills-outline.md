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

### 那既然有了工具调用，为什么又会有MCP和Skills呢？

Function Calling确实解决了核心问题：让LLM能够稳定地输出结构化的工具调用请求，实现了"非结构化→结构化"的转换。这是AI Agent工具能力的基础。

但在实际应用中，开发者很快发现了一个新的问题：**工具集成成本太高**。

#### 工具集成成本高的问题

现实世界中，有大量的既有系统和数据：数据库里存储着业务数据，文件系统里有各种文档和代码，GitHub上有项目仓库和Issue，Slack里有团队沟通记录，还有各种API服务提供实时数据。这些既有系统里蕴含着丰富的信息，如果能让LLM直接使用这些系统和数据，AI Agent的能力会大大增强。

但问题是：**如何让LLM能够使用这些既有系统？**

在Function Calling的框架下，每个既有系统都需要单独集成到应用中。每个组织或公司都有自己的API、认证方式、数据格式，开发者需要为每个组织或公司编写对应的函数实现。 -- **这就是 MCP 产生的原因：提供一个服务，可以让既有系统快速集成到LLM中** ， 它的核心思路是：**通过统一的协议标准，让工具可以被多个应用共享**。

**MCP如何解决这个问题？**

1. **统一的工具描述格式**
   - MCP定义了标准的工具描述格式（JSON Schema）
   - 工具提供者只需要按照标准格式描述工具，不需要为每个应用写集成代码

2. **统一的调用接口**
   - MCP提供了标准的调用接口（`/tools/call`）
   - 应用只需要实现MCP Client，就能调用所有符合MCP标准的工具
   - 不需要为每个工具单独写调用代码

3. **工具与应用的解耦**
   - 工具以MCP Server的形式独立运行
   - 应用通过MCP Client连接MCP Server，就能使用工具
   - 工具更新时，只需要更新MCP Server，所有使用该工具的应用自动受益

4. **工具生态的建立**
   - 一个MCP Server可以被多个应用共享
   - 开发者可以专注于开发工具（MCP Server），而不是重复集成
   - 形成统一的工具生态，工具可以被发现和复用

**举个例子**：

在MCP出现之前，如果你想在应用中集成GitHub API，你需要：
- 写GitHub API的调用代码
- 处理认证、错误、重试等逻辑
- 每个应用都要重复这个过程

有了MCP之后：
- GitHub工具以MCP Server的形式存在（比如`mcp-server-github`）
- 你的应用只需要实现MCP Client，连接到这个Server
- 就能使用GitHub的所有功能，无需重复写集成代码

这就是MCP产生的核心原因：**降低工具集成成本，让工具可以被多个应用共享，形成统一的工具生态**。

## Function Calling、MCP、Skills的核心定位

### Function Calling：是什么

### MCP (Model Context Protocol)：是什么

### Skills (Claude Skills)：是什么

## 三者的本质差异对比

### 对比表格（定位、协议层、实现方式、适用场景等维度）



## 三者的联系与演进关系

## Lynxe的实践与总结

