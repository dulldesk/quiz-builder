# quiz-builder

for fill-in-the-blank style quizzes, where the blanks are dropdown inputs.

Written with React.js and Flask with a sqlite database.

Explore a serverless version at [dulldesk.github.io/quiz-builder](https://dulldesk.github.io/quiz-builder) (uses localStorage)
* [Try](https://dulldesk.github.io/quiz-builder/#/fox) or [edit](https://dulldesk.github.io/quiz-builder/#/fox/edit/f26df5b7d9363b8c) a sample quiz

### install & run

1. in `web`:
    * `npm ci`
    * `npm start`
2. in `api`:
    * `pip install -r requirements.txt` (or `pip install Flask`)
    * `python db/init.py`
    * `flask run`
