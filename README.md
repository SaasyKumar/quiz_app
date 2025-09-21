# Quiz App <img src="https://img.shields.io/badge/Development%20Phase-8A2BE2">

# Did

- basic app that loads sample data
- can check answers when the answer is index with number or alphabet
- can extract questions from AikenFormat
- a create quiz page

# Do

- If show score at last use use radio button else use normal button
- View Score or consecutive test -> next test will only contain wrong answered
- Do random later first right flow
- if the options are list map it with a b c d before giving it an id , then shuffle the components

# Learning

- Don't use set State inside a component without any triggers like on click; will stuck in the loop since every set rerender the component.
- What's the difference between button and normal div-> a11y keydown will be handled.
- In setstate `i++` won't work
  - `i++` POST return the original value and increment it -> So the sate assigned is same but if the index; but will assign right value if index is used somewhere, but the index state is used in any react component append check it won't work.
  - `++i` will work PRE

* While passing objects to a react component, don't pass the whole object, pass it every key value pair mentioned in the object.
* `rem` in CSS don't know what but in ref to root element. I think it will be used on react apps and it have mobile too. Auto?

# Prettier

- run `npx prettier . --write` before commit. other prettier hooks interrupt while writing code.

# Name

- FOMizz - Fear of Missing Out

# icons

- crushed paper and neuron links on the crushed edges
- rubik cubes

# Multiverse
- Contains component that can be used in other websites too