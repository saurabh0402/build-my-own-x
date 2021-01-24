# Bundly 📦
Bundly ( another uninspirational name, I know 🙈 ) is a simple JavaScript module bundler. The main aim here is to 
get a better understanding on how bundlers work and in the way get myself a tiny bundler (that atleast does some bundling) ready.

## What and How of Module Bundlers 🏗️
The very first question that needs to be answered here is what module bundlers are. So, Module Bundlers are tools that package all of our required modules into a single file. This way we only need to add a single file as a dependency into our HTML file 🎉. If you have worked with React, you most probably did use `webpack` which is one of the most famous module bundler.

We now know what Module Bundlers are, the question now is how they actually work. So, there's this concept of `entry file` - this is the file that bootstraps our complete application, the application where it all begins, the file that holds the key to our application. So, we provide the module bundler with this entry file, it reads it and finds all other files that it is dependent on. It then reads those dependencies and find their dependencies and keeps going on until is has found all the files that it needs to bundle. This way it creates what we call `Dependency Graph`. Using this it then bundles the files into one.

So, lets look at the first step then. Reading a file and finding it's dependencies. What a bundler does is that it reads a JS File, parses it and makes something it calls `Abstract Syntax Tree or AST`. An AST is represented as a simple JS object which has following form -
```
{
  "type": "Program",
  "start": 0,
  "end": 25,
  "body": [
    {
      "type": "ImportDeclaration",
      "start": 0,
      "end": 24,
      "specifiers": [
        {
          "type": "ImportDefaultSpecifier",
          "start": 7,
          "end": 12,
          "local": {
            "type": "Identifier",
            "start": 7,
            "end": 12,
            "name": "hello"
          }
        }
      ],
      "source": {
        "type": "Literal",
        "start": 18,
        "end": 23,
        "value": "xyz",
        "raw": "'xyz'"
      }
    }
  ],
  "sourceType": "module"
}
```
As we can see, an AST actually describes every line of our code and contains all the data to recreate our code. For the bundler, the most important aspect of this is objects with type `ImportDeclaration` in the body because they represent the `imports` (we are using `@babel/parser` and that considers only the ES6 `import` statements as `ImportDeclaration`). Therfore if a module bundler has the AST for a file, it could easily get all the dependencies of the file.

## Further Steps 🚶
- Try some other parses like - [acorn](https://github.com/acornjs/acorn) and maybe have an option to choose parser.
- Add missing functionalities - parsing each module just once, caching, circular dependency, etc.

## Credits 🏆
***All Credits to [https://github.com/ronami/minipack](https://github.com/ronami/minipack)***