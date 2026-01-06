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

## 那既然有了工具调用，为什么又会有MCP和Skills呢？

Function Calling确实解决了核心问题：让LLM能够稳定地输出结构化的工具调用请求，实现了"非结构化→结构化"的转换。这是AI Agent工具能力的基础。

但在实际应用中，开发者很快发现了一个新的问题：**工具集成成本太高**。

### Function calling会有工具集成成本高的问题

现实世界中，有大量的既有系统和数据：数据库里存储着业务数据，文件系统里有各种文档和代码，GitHub上有项目仓库和Issue，dingding里有团队沟通记录，还有各种API服务提供实时数据。这些既有系统里有着丰富的信息，如果能让LLM直接使用这些系统和数据，AI Agent的能力会大大增强。

但问题是：**如何让LLM能够使用这些既有系统？**

在Function Calling的框架下，每个既有系统都需要单独集成到应用中。每个组织或公司都有自己的API、认证方式、数据格式，开发者需要为每个组织或公司编写对应的函数实现。这就是MCP产生的原因：提供一个服务，可以让既有系统快速集成到LLM中。

MCP的核心其实还是基于Function Calling的。它做的事情很简单：把Function Calling的调用，在客户端转换成一套JSON+HTTP的请求。然后提供一套Server来响应这个JSON+HTTP请求，这样就能实现各类应用都可以被LLM使用的效果。

```
LLM -> Function Calling -> MCP Client -> JSON+HTTP请求 -> MCP Server -> 既有系统（GitHub/Slack/数据库等）
                                                                    ↓
LLM <- Function Calling结果 <- MCP Client <- JSON响应 <- MCP Server <- 既有系统返回结果
```

但MCP解决了工具集成的问题后，又出现了另一个问题。

### Function calling和MCP都会有任务流程定义困难的问题

在实际使用中，用户经常需要让AI Agent按照特定的方式执行任务。比如，格式化Excel表格要按照公司的品牌指南，法律审查要遵循特定的合规性要求，数据分析要按照组织的工作流程。这些任务往往需要复杂的提示词和多个步骤的组合。

但在Function Calling和MCP的框架下，用户面临一个两难的问题：当前的大模型很难仅仅依托自己的模型能力就做出最优的工具调用步骤。很多任务需要特定的执行顺序、规则和约束，但把这些步骤全部写成代码又不太现实。就像我们在第一篇文章里讲的，模型的核心优势是面对不确定性时可以走一步看一步，动态调整策略。如果全部落成程序，就会丧失模型的核心优势。

举个例子，我们以Lynxe实际在跑的一个`new_branch`流程定义为例，我这个流程用文字写到一个markdown里面，每次都让模型遵照执行：

```
1) 确认本地的 VERSION 与 pom.xml 与 本地branch 中的版本一致，不一致的话以pom.xml为准
2) mvn package 
3) 进入 ui-vue3 运行pnpm lint 
4) 退回项目目录， git merge upstream/main
5) 项目目录，运行 make ui-deploy
6) git 提交 branch到origin
7) git 打包 tag名字与pom的版本号一致，先删除远程tag（如果存在）：git push upstream :refs/tags/v{版本号}，然后上传tag到 upstream (上传之前请先用git remote 看一下upstream是哪里，确认是spring-ai-alibaba/JManus)
```

这个流程有7个步骤，每个步骤都有特定的顺序、条件和规则。如果完全写成代码，每一步都要处理各种异常情况（比如版本不一致、tag已存在、upstream地址不对等），代码会变得非常复杂。但如果只给模型一个简单的提示词"帮我创建新分支"，模型可能无法按照这个精确的流程执行，或者执行顺序不对。
而用文字表达，非常直接简单，而且实际跑的过程中只有很小的概率会出错，非常爽。

而这就是这个问题的本质：**如何在尽可能的准确的前提下，能让用户能用文字（而非代码）指导模型按照特定的流程和规则执行任务？**

这就是Skills产生的原因（其实也是Lynxe的Func-Agent产生的核心原因）：提供一个方式，让用户可以用文字定义指令、脚本和资源，形成可复用的任务流程。

Skills的核心其实也是基于Function Calling的。它做的事情很巧妙：通过一个固化的函数和参数，让模型去查找和加载固定的skills文档。用户用文字定义的指令、脚本和资源被打包成Skills（包含SKILL.md和可选的脚本、参考资料等），Claude在启动时会读取所有Skills的元数据（名称和描述），当用户请求与某个Skill的描述匹配时，Claude会通过Function Calling调用查找函数，自动加载对应的SKILL.md文档，然后按照文档中的指令执行任务。

这个过程采用了"渐进式披露"机制：首先只加载元数据（约100 token），支持发现而不消耗太多上下文；当判定Skill相关时，才加载SKILL.md主体（控制在500行以内）；最后按需加载脚本和参考资料。这样既能让Claude自动发现相关Skills，又能高效管理上下文。

```
用户定义Skills（SKILL.md + 脚本+资源） -> Skills元数据（始终加载） -> 模型自动发现
                                                              ↓
用户请求匹配 -> Function Calling调用查找函数 -> 加载SKILL.md -> LLM按指令执行任务
                                                              ↓
用户获得结果 <- LLM返回结果 <- 按需加载脚本/资源 <- 执行Skills定义的流程
```




## Function Calling、MCP、Skills的核心定位

### Function Calling：是什么

### MCP (Model Context Protocol)：是什么

### Skills (Claude Skills)：是什么

## 三者的本质差异对比

### 对比表格（定位、协议层、实现方式、适用场景等维度）



## 三者的联系与演进关系

## Lynxe的实践与总结

