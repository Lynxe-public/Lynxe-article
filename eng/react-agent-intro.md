# AI Agent Series - 1 What is a ReAct Agent?

## About This Series

As the author of Lynxe (formerly JManus), I've spent a lot of my spare time perfecting this Func-Agent framework, which has given me a deeper understanding of what a ReAct-based Agent is.

I want to summarize this content because the core purpose of this project is to explore cutting-edge best practices for Agents. We've made some progress—Lynxe can solve over 80% of the problems I face—so I think it's worth documenting the effective practices I've discovered to help others get started quickly.

You can visit [Lynxe (/lɪŋks/)](https://github.com/spring-ai-alibaba/Lynxe) to read the detailed source code and learn about some agent best practices. This is a very complete, production-grade Func-Agent framework.

## Series Plan

* [What is a ReAct Agent?](./react-agent-intro.md)
* [How do Agents differ fundamentally from traditional workflow writing?](./react-agent-vs-traditional.md)
* Differences and connections between function calling/MCP/skill
* Some practices for context management
* Best practices for parallel execution and the pitfalls I've encountered
* Others (to be written as ideas come up or feedback is received)

## Main Content

The name "ReAct" sounds sophisticated, but when you break it down, it's clear: **Reasoning** (推理) + **Acting** (行动). Simply put, it's about letting AI think and act simultaneously, rather than thinking first and then acting.

## Core Concept: Observe-Think-Act

The way a ReAct Agent works is actually quite similar to how humans solve problems. Instead of planning the entire process at once, it proceeds step by step toward an overall goal. Specifically, it first observes the current situation, then thinks about what to do next, executes that action, observes the result, and decides the next step based on the result. This process continues in a loop until the task is completed.

To use an analogy, the traditional approach is like checking your entire route before leaving home and then following it strictly. ReAct is more like leaving home, walking a bit, looking at your surroundings, and then deciding where to go next. For example, if you want to go to a coffee shop you've never been to, the traditional way is to look up the entire route in advance, while ReAct is like walking to an intersection, checking the street signs, and deciding whether to turn left or right as you go.

## Practical Example

Let's take a more concrete example. Suppose you want the AI to help you check "What's the weather like in Beijing today, and what should I wear?" Using the ReAct approach, the AI would work like this:

1. **Observe**: See the user's question, historical context is empty
2. **Think**: "I need to know today's weather in Beijing" (thinking is optional output)
3. **Act**: Call the weather query tool to query "Beijing today weather"
4. **Observe**: Get weather data: temperature 25°C, sunny, humidity 60%, wind speed 3m/s
5. **Think**: "Now I know the weather, I need to query the clothing advice knowledge base to get specific clothing recommendations" (thinking is optional output)
6. **Act**: Call the clothing advice knowledge base query tool to query "What to wear for 25°C sunny weather"
7. **Observe**: Get clothing advice: For 25°C sunny weather, it's recommended to wear short-sleeved T-shirts or thin long sleeves, bring a light jacket for morning/evening temperature differences, and wear a hat and apply sunscreen
8. **Think**: "I've obtained the weather and clothing advice, I should write this information to a file for saving" (thinking is optional output)
9. **Act**: Call the writeToFile tool to write the complete advice to a file
10. **Observe**: Advice has been written to file weather_suggestion.md

The entire process is a cycle of observe-think-act-observe again, rather than fixing all steps at the beginning. Each step dynamically decides what to do next based on the current historical context and environmental information.

## Why Do We Need ReAct?

You might ask, why go through all this trouble? Why not just write a fixed process? The problem is that many real-world tasks aren't that simple. You might encounter various unexpected situations, such as API errors, incorrect data formats, or needing to adjust strategies based on intermediate results. ReAct's advantage is that it can flexibly respond to actual situations, rather than getting stuck when encountering unexpected events.

Of course, this flexibility comes with some costs, such as potentially less predictable behavior, and sometimes the AI might "act foolishly." But overall, when dealing with complex, uncertain tasks, ReAct's approach of thinking while acting still has significant advantages.

## How is ReAct Implemented?

### Key Components

The implementation of ReAct actually relies on several key components:

**1. Historical Context (History)**
ReAct maintains a conversation history that records all previous thoughts, actions, and observations. This way, when the LLM makes decisions, it can refer to what happened before, avoiding repeated operations or going down the wrong path.

**2. Current Environment Information**
This is the external information the Agent receives at the current moment, such as user input, system state, or other data that needs to be processed. This information serves as input for LLM reasoning, helping to decide what to do next.

**3. Language Model (LLM Thinking)**
This is ReAct's "brain," responsible for reasoning and decision-making. Each time it needs to think about what to do next, the LLM generates the next action plan based on the current historical context, environmental information, and observation results.
(In the subsequent table, this "think" is hidden, and the final form is toolcall)

**4. Tools/Actions (toolcall)**
This is ReAct's "hands and feet," used to execute specific operations. For example, searching, querying APIs, reading/writing files, etc. Each tool has clear inputs and outputs, and the Agent can call these tools to complete actual work.

**5. Observation Results (toolcall results)**
After each action is executed, an observation result is obtained. This result is fed back to the LLM as the basis for the next round of reasoning. Observation results may include successful data, error messages, or content that needs further processing.

### Execution Flow Example

Below is a complete example showing how ReAct solves problems step by step. Suppose the task is: "Help me check what the weather is like in Beijing today and what I should wear."

| Round | Historical Context | Current Environment Information | Current Round Prompt | Action (toolcall) | Observation Result (toolcall result) |
|------|-------------------|--------------------------------|---------------------|-------------------|-------------------------------------|
| Round 1 | None | Empty | Known:<br>Current historical context: ${historical context}<br>Current environment information: ${current environment information}<br>User goal: "Help me check what the weather is like in Beijing today and what I should wear."<br><br>Make the next decision<br><br>You must use at least one tool to implement this decision | Weather query tool call: Query "Beijing today weather" | Weather query tool returns: Retrieved weather data: temperature 25°C, sunny, humidity 60%, wind speed 3m/s |
| Round 2 | Retrieved Beijing weather data (25°C, sunny, humidity 60%, wind speed 3m/s) | Weather tool: No additional environment information | Known:<br>Current historical context: ${historical context}<br>Current environment information: ${current environment information}<br>User goal: "Help me check what the weather is like in Beijing today and what I should wear."<br><br>Make the next decision<br><br>You must use at least one tool to implement this decision | Clothing advice knowledge base query tool call: Query "What to wear for 25°C sunny weather" | Clothing advice knowledge base query tool returns: For 25°C sunny weather, it's recommended to wear short-sleeved T-shirts or thin long sleeves, bring a light jacket for morning/evening temperature differences, and wear a hat and apply sunscreen |
| Round 3 | Weather data (25°C, sunny, humidity 60%, wind speed 3m/s); Retrieved clothing advice: For 25°C sunny weather, it's recommended to wear short-sleeved T-shirts or thin long sleeves, bring a light jacket for morning/evening temperature differences, and wear a hat and apply sunscreen | Weather tool: No additional environment information; Clothing knowledge base tool: No additional environment information | Known:<br>Current historical context: ${historical context}<br>Current environment information: ${current environment information}<br>User goal: "Help me check what the weather is like in Beijing today and what I should wear."<br><br>Make the next decision<br><br>You must use at least one tool to implement this decision | writeToFile tool call: Content is "Beijing today weather: 25°C, sunny, humidity 60%. Recommended to wear short-sleeved T-shirts or thin long sleeves, bring a light jacket for morning/evening temperature differences, and wear a hat and apply sunscreen" | writeToFile tool returns: Advice has been written to file weather_suggestion.md |

**Final Output**: The advice has been written to file weather_suggestion.md. You can open this file to see the specific recommendations.

From this example, we can see that ReAct doesn't know all the steps from the beginning, but dynamically decides what to do next based on each round's observation results. If Round 1's search fails, it might try other search keywords or switch to a different strategy. This flexibility is precisely ReAct's core advantage.

## Pseudocode

Below is the pseudocode for a round's execution flow, showing the core execution logic:

```
function executeOneRound(userGoal, historicalContext):
    // 1. Get current environment information
    currentEnvironmentInfo = getCurrentEnvironmentInfo()
    
    // 2. Build prompt (replace placeholders)
    promptTemplate = "Known:\nCurrent historical context: ${historicalContext}\nCurrent environment information: ${currentEnvironmentInfo}\nUser goal: \"${userGoal}\"\n\nMake the next decision\n\nYou must use at least one tool to implement this decision"
    fullPrompt = replacePlaceholders(promptTemplate, {
        historicalContext: historicalContext,
        currentEnvironmentInfo: currentEnvironmentInfo,
        userGoal: userGoal
    })
    
    // 3. Call LLM for reasoning (thinking process is hidden, directly outputs toolcall)
    toolCallResult = callLanguageModel(fullPrompt, historicalContext)
    
    // 4. Parse tool call
    toolName = parseToolName(toolCallResult)
    toolParams = parseToolParams(toolCallResult)
    
    // 5. Execute tool call
    observationResult = executeTool(toolName, toolParams)
    
    // 6. Update historical context
    newHistoricalContext = appendToHistoricalContext(historicalContext, {
        action: toolCallResult,
        observationResult: observationResult
    })
    
    // 7. Return result
    return {
        observationResult: observationResult,
        newHistoricalContext: newHistoricalContext
    }
end function

// Main loop
function executeReActFlow(userGoal):
    historicalContext = empty
    currentRound = 1
    maxRounds = 10
    
    while currentRound <= maxRounds and taskNotCompleted:
        result = executeOneRound(userGoal, historicalContext)
        historicalContext = result.newHistoricalContext
        
        if taskCompleted(result.observationResult):
            break loop
        
        currentRound = currentRound + 1
    end loop
    
    return historicalContext
end function
```
