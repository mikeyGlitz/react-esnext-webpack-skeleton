# React ESnext Webpack Skeleton

This project contains all the scaffolding code to build a webapp using React and ES2015.
Some proposal features have been added to the babel parsing such as __object rest spread__
and __class properties__.
This project is also configured to run with [Facebook's Flow](https://flowtype.org) for type checking,
[Facebook's Jest](https://facebook.github.io/jest) for testing and coverage, and eslint for static code analysis

## Project Structure

This project utilizes the following folder structure:
```
/
---/__tests__
---/.webpack-config
---/app
---/docs
---/coverage
---/public
```

|                     |                                          |
|---------------------|------------------------------------------|
| **/**               | project root folder                      |
| **\_\_tests\_\_**   | contains the unit tests                  |
| **.webpack-config** | contains the webpack configuration files |
| **app**             | contains the app sources                 |
| **docs**            | contains the application documentation   |
| **coverage**        | contains the test coverage report        |
| **public**          | contains the built sources from webpack  |

## npm tasks
This project utilizes the following *npm* tasks to perform the following functions:

|                |                                      |
|----------------|--------------------------------------|
| **dev-server** | Runs the webpack dev server          |
| **docs**       | Generates documentation              |
| **lint**       | Performs linting                     |
| **lint:styles  | Lints stylesheets                    |
| **test**       | Runs the unit tests using jest       |
| **webpack**    | Builds project sources using webpack |