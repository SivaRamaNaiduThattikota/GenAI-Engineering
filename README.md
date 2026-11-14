# GenAI Engineering notes

My course notes for learning generative AI engineering, from the basics to production systems.
Each lesson covers one topic in depth: the idea, how it works, Python code, engineering trade-offs, and how to check it works.

Live site: https://sivaramanaiduthattikota.github.io/GenAI-Engineering/

## Lessons so far

- Preview: prompts, tokens and context
- 1.1 How AI, ML, deep learning and GenAI fit together
- 1.2 From prediction models to generative models
- 1.3 Models vs applications
- 1.4 The model landscape and how models are made
- 1.5 How language models got here, and how they are measured
- 2.1 Tokens and tokenization

## Running locally

Open `index.html` in a browser. No build step. Serving the folder (`python -m http.server`) also enables the native page transitions.

## Adding a lesson

1. Add an entry to `COURSE` in `assets/app.js`.
2. Copy an existing page in `lessons/` and replace the content.

The sidebar, home cards, previous/next links and progress pick it up from the manifest.
