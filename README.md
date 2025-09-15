# Quiz App <img src="https://img.shields.io/badge/Development%20Phase-8A2BE2">
# Did

# Do

- If show score at last use use radio button else use normal button
- View Score or consecutive test -> next test will only contain wrong answered
- Do random later first right flow

# Learning

- Don't use set State inside a component without any triggers like on click; will stuck in the loop since every set rerender the component.
- What's the difference between button and normal div-> a11y keydown will be handled.
- In setstate `i++` won't work
  - `i++` POST return the original value and increment it -> So the sate assigned is same but if the index; but will assign right value if index is used somewhere, but the index state is used in any react component append check it won't work.
  - `++i` will work PRE

# Prettier

- run `npx prettier . --write` before commit. other prettier hooks interrupt while writing code.
