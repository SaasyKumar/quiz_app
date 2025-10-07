# Quiz App <img src="https://img.shields.io/badge/Development%20Phase-8A2BE2">

# Did

- basic app that loads sample data
- can check answers when the answer is index with number or alphabet
- can extract questions from AikenFormat
- a create quiz page
- a toggle and timer component
- Actually working one will start using this and build more on it
- show right answer when you select wrong answer
- score board and recursive quizz
- result board
- a UI that show all user selected option and whether it is right or not.
- View Score or consecutive test -> next test will only contain wrong answered

# Do

- If show score at last use use radio button else use normal button
- Do random later first right flow
- Add sound for timer
- A start quizz maybe and in that we can choose show answer at last or not.
- a resizer
- quiz title and time
- a file upload and store it in top
- long term or short term memory toggle

# Learning

- Don't use set State inside a component without any triggers like on click; will stuck in the loop since every set rerender the component.
- What's the difference between button and normal div-> a11y keydown will be handled.
- In setstate `i++` won't work
  - `i++` POST return the original value and increment it -> So the sate assigned is same but if the index; but will assign right value if index is used somewhere, but the index state is used in any react component append check it won't work.
  - `++i` will work PRE

* While passing objects to a react component, don't pass the whole object, pass it every key value pair mentioned in the object.
* `rem` in CSS don't know what but in ref to root element. I think it will be used on react apps and it have mobile too. Auto?
* CSS transitions do not work with changes in display property.
* justify-content: space-between;
* for empty declarations

```ts
let answerSet: Record<string, string> = {};
```

- `useMemo` and `useEffect` hook
- No comments should be at production but in code needed. can't trace the format anytime

# Color

- blue/green hues improve recall, while red increases attention but not memory.

# Prettier

- run `npx prettier . --write` before commit. other prettier hooks interrupt while writing code.

# Name

- FOMizz - Fear of Missing Out
- maze
-
- create bank instead of vault

# icons

- crushed paper and neuron links on the crushed edges
- rubik cubes

# Multiverse

- Contains component that can be used in other websites too
