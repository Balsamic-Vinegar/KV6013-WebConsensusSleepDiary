This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

# Web Consensus Sleep Diary

A frontend-only web application implementing a digital version of the Consensus Sleep Diary (CSD) using Next.js and React.

## Features

- Step-by-step diary workflow
- Schema-driven question rendering
- Field and entry validation
- JSON and CSV export (client-side)

## Tech Stack

- Next.js
- React
- Tailwind CSS

## Editing the Diary Schema

The diary is driven by a schema defined in
`
library/schematic.js
`

Each question is represented as an object in the exported array. For example:

```js
{
id: "bedtime",
label: "What time did you go to bed intending to sleep?",
type: "time",
direction: "Indicate the time you began trying to sleep"
}
```

To modify the diary:
- Add a question - add a new object to the array
- Remove a question - delete an object
- Modify a question - change attributes

Each question object requires a set of key attributes
- id - field name for data collected
- label - question displayed
- direction - accompanying instruction displayed
- type - defines the question input type
- min/max - exclusive to number and ordinal inputs limits range of answers
- suffix - displayed next to input indicates what unit the user is inputting

Supported input types:
- time - time picker input
- number - integer input
- ordinal - selectable scale
- boolean - True/False input

## Exporting Data

Data export is currently handled client allowing the user to download a basic JSON or CSV format for the purposes of testing.

For a practical implementation of this replace the current use cases of ``downloadJson`` with``postJson`` designed to export the diary by sending it to a remote endpoint.

Replace the current placeholder endpoint URL with your own:

```js
async function postJson(submission) {

    await fetch("https://your-endpoint-url", {
        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(submission, null, 2)
    })
}
