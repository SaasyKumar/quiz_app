# for flow Diagram

- https://tree-tool.netlify.app/
  ![alt text](image.png)

* Inside Questions no concatination is allowed

# For Development

- The question Id should not be stored, I should be generated on app load starting from `0`. or just index+1.
- The option Id is `QuestionID`+"\_"+`option_label`
- The option label should be again created on app load and always upper case alphabet starting from `A`.
- The question Ids and option should be maintained within the quizz component
- The Questions component should only check the answer is right or not and either show answer or return the option selected to parent and mark it.
- the options standard method should be set where key is options label and value is the string that contain it.

# Samples

- dataSet

```js
[
  {
    Question: "Capital of India",
    Options: ["Delhi", "Chennai", "Mumbai", "Kolkata"],
    type: "MCQ",
    Answer: "A",
    Difficulty: "1",
    Priority: "2",
  },
  {
    Question: "Capital of TamilNadu",
    Options: {
      A: "Madurai",
      B: "Chennai",
      C: "Trichy",
      D: "Erode",
    },
    type: "MCQ",
    Answer: "Chennai",
    Difficulty: "1",
    Priority: "2",
  },
];
```

- currentQn

```js
{
    "Question": "Capital of India",
    "Options": [
        "Delhi",
        "Chennai",
        "Mumbai",
        "Kolkata"
    ],
    "type": "MCQ",
    "Answer": "A",
    "Difficulty": "1",
    "Priority": "2"
}
```

- AnswerSet

```js
{
    "0": "A",
    "1": "B"
}
```

- optionsSelected

```js
{
    "0": "B",
    "1": "C"
}
```
