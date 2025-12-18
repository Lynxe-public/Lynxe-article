# AI Agent Series - 2 What Are the Fundamental Differences Between ReAct Agent and Traditional Workflow Writing?

## About This Series

As the author of Lynxe (formerly JManus), I've spent a lot of my spare time perfecting this Func-Agent framework, which has given me a deeper understanding of what a ReAct-based Agent is.

I want to summarize this content because the core purpose of this project is to explore cutting-edge best practices for Agents. We've made some progress—Lynxe can solve over 80% of the problems I face—so I think it's worth documenting the effective practices I've discovered to help others get started quickly.

You can visit [Lynxe (/lɪŋks/)](https://github.com/spring-ai-alibaba/Lynxe) to read the detailed source code and learn about some agent best practices. This is a very complete, production-grade Func-Agent framework.

## Series Plan

* [What is a ReAct Agent?](./react-agent-intro.md)
* [How do Agents differ fundamentally from traditional workflow writing?](./react-agent-vs-traditional.md)
* Best practices for tool/toolcall/MCP management
* Some practices for context management
* Best practices for parallel execution and the pitfalls I've encountered
* Others (to be written as ideas come up or feedback is received)

## Main Content

In the previous article, we introduced what a ReAct Agent is. Now let's discuss a more practical question: What are the fundamental differences between Agents and traditional programming/workflow approaches? Why do we need Agents?

## Comparison of Three Approaches

Let's start with an intuitive comparison table:

| Dimension | Traditional Programming | Workflow | Agent |
|-----------|------------------------|----------|-------|
| **Required Skills** | Need to master programming languages, algorithms, system design, and other professional knowledge | Understand programming principles, ability to use graphical drag-and-drop products, and write extension functions | Natural language is sufficient to complete all business logic |
| **Task Completion Method** | Completely relies on hardcoded rules, difficult to handle uncertain or complex scenarios | Fixed path flow, limited conditional judgment, unable to dynamically adjust strategies | Dynamically adjusts strategies to complete tasks under the guidance of natural language |
| **Modification and Maintenance Costs** | Multi-role waterfall collaboration: Operations discovers problem -> Product breaks down and schedules -> Development -> Deployment -> Testing -> Launch | Basically only saves the deployment step: Operations discovers problem -> Product breaks down and schedules -> Development -> Testing -> Launch | Business self-closed loop: (Discover -> Test -> Solve) |

This table might seem a bit abstract. Let me explain the fundamental differences between these three approaches in a more concrete way.

## Traditional Programming: Everything Must Be Planned in Advance

Traditional programming is like building a house—you need to draw all the blueprints first, prepare all the materials, and then strictly follow the blueprints during construction. Once you encounter a situation not covered in the blueprints, you have to redesign.

### Practical Example

Suppose you want to create a "weather-based clothing recommendation" feature:

**Traditional Programming Approach:**
```python
def get_weather_recommendation(city):
    # 1. Query weather
    weather = query_weather_api(city)
    temperature = weather['temperature']
    condition = weather['condition']
    
    # 2. Judge based on temperature
    if temperature < 10:
        return "Recommend wearing a thick coat"
    elif temperature < 20:
        return "Recommend wearing a thin coat"
    elif temperature < 25:
        return "Recommend wearing long sleeves"
    else:
        return "Recommend wearing short sleeves"
    
    # 3. What if the API returns an error? Need to write exception handling
    # 4. What if the data format is wrong? Need to write data validation
    # 5. What if the user wants more detailed advice? Need to modify the code
```

The problems with this approach are obvious:
- **Hardcoded rules**: All logic is predetermined, and you need to modify code when encountering new situations
- **Complex exception handling**: All edge cases must be considered in advance, making the code very complex
- **High modification costs**: Changing a small piece of logic requires development, testing, and deployment—going through the entire process

## Workflow: Fixed Process, but More Flexible

Workflow is like building with blocks—you can connect different "blocks" (nodes) graphically to form a fixed process. It's more flexible than traditional programming, but essentially still a fixed path.

### Practical Example

The same "weather-based clothing recommendation" feature using Workflow:

```
[Start] -> [Query Weather API] -> [Judge Temperature] -> [Return Recommendation] -> [End]
         ↓ (if fails)
      [Error Handling Node]
```

This approach is better than traditional programming:
- **Visual**: No need to write code, just drag and drop
- **Modular**: Each node is independent and reusable
- **But problems still exist**:
  - The process is fixed. If the user wants "first check weather, then check clothing advice, finally save to file," you need to redesign the entire process
  - Limited conditional judgment; complex logic still requires writing code
  - Complex processes become harder to maintain
  - Modifying the process still requires developer participation

## Agent: Walk and Observe, Dynamic Adjustment

An Agent is like an experienced guide—you tell it the goal, and it dynamically adjusts the route based on actual conditions. You don't need to plan everything in advance; solve problems as they arise, and change paths when one doesn't work.

### Practical Example

The same "weather-based clothing recommendation" feature using Agent:

You only need to tell the Agent: "Help me check what the weather is like in Beijing today, what I should wear, and then save it to a file."

The Agent will decide on its own:
1. First call the weather query tool
2. Based on the weather results, decide to call the clothing advice tool
3. After getting the advice, decide to call the file writing tool
4. If a tool fails, it will automatically try other methods

The entire process is dynamic and doesn't require designing all steps in advance.

## Fundamental Difference: Who Makes the Decisions?

The most fundamental difference between these three approaches is: **Who makes the decisions?**

- **Traditional Programming**: Programmers make decisions, thinking through all possible situations in advance and writing them into code
- **Workflow**: Product/Development makes decisions, designing fixed process paths
- **Agent**: AI makes decisions, dynamically adjusting strategies based on actual conditions

## Skill Requirements: From Professional to Natural Language

### Traditional Programming
Need to master:
- Programming languages (Python, Java, JavaScript, etc.)
- Algorithms and data structures
- System design
- Debugging and testing
- Version control

High threshold, requires professional training.

### Workflow
Need to master:
- Understand basic programming principles (variables, conditionals, loops, etc.)
- Ability to use graphical tools to drag and drop nodes
- Ability to write some extension functions (if needed)

Medium threshold, requires some technical understanding.

### Agent
Need to master:
- **Natural language**: Just need to be able to describe requirements in Chinese or English

Very low threshold, anyone can use it.

## Modification and Maintenance Costs: From Waterfall to Closed Loop

### Traditional Programming Collaboration Process

```
Operations discovers problem 
  -> Product breaks down requirements and schedules 
    -> Development writes code 
      -> Testing and validation 
        -> Deployment and launch 
          -> Operations validation
```

The entire process may take days or even weeks, involving multiple roles with high communication costs.

### Workflow Collaboration Process

```
Operations discovers problem 
  -> Product breaks down requirements and schedules 
    -> Development adjusts process 
      -> Testing and validation 
        -> Launch (deployment step may be automated)
```

Better than traditional programming, but still requires multiple roles to collaborate.

### Agent Collaboration Process

```
Operations discovers problem 
  -> Operations directly describes requirements to Agent in natural language 
    -> Agent automatically completes 
      -> Operations tests and validates 
        -> If incorrect, continues to adjust using natural language
```

**Business self-closed loop**—no need for product, development, testing, deployment, and other steps. From discovering a problem to solving it may only take a few minutes.

## Real-World Scenario Comparison

Let's use a more complex scenario for comparison: **"Help me analyze the sales data from the past week, find abnormal orders, generate a report and send it to the team"**

### Traditional Programming Approach

Requires:
1. Write code to connect to database
2. Write SQL to query sales data
3. Write algorithm to analyze abnormalities (define what is abnormal)
4. Write code to generate report
5. Write code to send email
6. Handle various exception cases (database connection failure, email sending failure, etc.)
7. Testing and deployment

May require: 1-2 weeks of development time, involving backend development, data analysis, operations, and other roles.

### Workflow Approach

Requires:
1. Design process: Query data -> Analyze data -> Generate report -> Send email
2. Configure each node
3. Write some extension functions to handle complex logic
4. Testing and launch

May require: 3-5 days, needs technical personnel participation.

### Agent Approach

Only requires:
1. Tell the Agent: "Help me analyze the sales data from the past week, find abnormal orders, generate a report and send it to the team"
2. Agent automatically completes all steps
3. If the result is incorrect, continue adjusting with natural language: "Change the definition of abnormal orders—only orders with amounts exceeding 3 times the average should be considered abnormal"

May require: **A few minutes to a few hours**, operations personnel can complete it themselves.

## When to Use Which Approach?

Although Agents seem very powerful, not all scenarios are suitable for Agents. Each of the three approaches has its applicable scenarios:

### Traditional Programming is Suitable For:
- Scenarios with extremely high performance requirements (high-frequency trading, real-time games, etc.)
- Scenarios requiring precise control (security systems, financial systems, etc.)
- Scenarios with very fixed logic that won't change

### Workflow is Suitable For:
- Scenarios with relatively fixed business processes but requiring visual management
- Scenarios requiring non-technical personnel to participate in process design
- Scenarios requiring process auditing and version management

### Agent is Suitable For:
- Scenarios with frequently changing requirements
- Scenarios requiring handling of uncertainty
- Scenarios requiring rapid iteration and trial-and-error
- Scenarios where non-technical personnel need to complete tasks independently

## Summary

The fundamental differences between Agents and traditional programming/Workflow are:

1. **Different decision-makers**: Agents have AI making decisions, rather than humans designing all logic in advance
2. **Different flexibility**: Agents can dynamically adjust based on actual conditions, rather than following fixed paths
3. **Different thresholds**: Agents only require natural language, greatly lowering the usage threshold
4. **Different iteration speed**: Agents can achieve business self-closed loops, taking only minutes from discovering a problem to solving it

Of course, Agents are not a panacea. They are suitable for handling complex, uncertain tasks, but for scenarios requiring precise control and high performance, traditional programming is still a better choice.

The key is to understand the essence of each approach and choose the most appropriate one based on actual scenarios. In many scenarios, Agents can greatly improve efficiency, allowing non-technical personnel to complete complex tasks—this is the core value of Agents.
