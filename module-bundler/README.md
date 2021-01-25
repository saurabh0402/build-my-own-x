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
As we can see, an AST actually describes every line of our code and contains all the data to recreate our code. For the bundler, the most important aspect of this is objects with type `ImportDeclaration` in the body because they represent the `imports` (we are using `@babel/parser` and that considers only the ES6 `import` statements as `ImportDeclaration`). Therfore if a module bundler has the AST for a file, it could easily get all the dependencies of the file. At this point, the code in each file is transpiled as well so that the `import` statements are converted to `require` calls. This will come important in bundling step.

The next step is to generate the dependency graph which is pretty easy now because we have a mechanism to get all the dependencies of a file. All we need to do is loop through the entry file's dependencies and get dependencies for them. Then, parse those dependencies and get dependencies for them and so on until we have the complete dependencies list. Note that this does not considers the case of cyclic dependencies in which case this will just get stuck in a loop. 😢

And now comes the last step - Bundling the code. One thing that is to be kept in mind is that we are not going to be running any code while bundling, we will be generating a string that will be written to a file and executed at a later time. So, functions will be written as string, objects will be created inside string, etc. Keeping this in mind lets go over the 2 things we do in this step (Remember that the code displayed is created inside a string and is not executed while bundling) :
- From the dependency graph create an object of the following form:
  ```js
  {
    "module_id": [
      function(require, module, exports) {
        // module_code <not in comments though>
      },
      // module mapping object which has following form
      {
        "dependency_address": "dependency id"
      }
    ]
  }
  ```
  For each module we define an array - the first value is a function that wraps our transpiled module code, and the second value is just its mapping object which maps its dependencies' paths to our module IDs.

- Finally, we create an IIFE that takes the object created in the first step. We declare a `globalRequire` function that takes the `id` of a module, runs its code, and returns whatever it exports.

  Now, for running the code is uses the function that was defined in first step for each module. But the code has relative addresses in their `require` statements so how is that handled 🤔  This is where `require` comes in handy. Note that the function that wraps a module's code expects three arguments - `require`, `module`, and `exports`. What we do is that we pass in our `localRequire` function - which takes in an address, gets module id for it, and passes it to the `globalRequire` which runs the function and returns the exported value.

  I know this is a bit complicated to get the head around but all that you really need to understand is this function:
  ```js
  function globalRequire(id) {
    const [f, mapping] = modules[id];

    function localRequire(name) {
      return globalRequire(mapping[name]);
    }

    const module = { exports: {} };
    f(localRequire, module, module.exports);

    return module.exports;
  }
  ```

## Sidenote 📓
```js
/*
  A subtle difference between for..of and for..in loop
*/

let arr = [1];
for (const elem of arr) {
  console.log(elem);
  if (elem < 10) {
    arr.push(elem + 1);
  }
}

// The above code prints 1 to 10

arr = [1]
for (const index in arr) {
  const elem = arr[i];
  console.log(elem);
  if (elem < 10) {
    arr.push(elem + 1);
  }
}

// Whereas this code prints only 1

```

## Further Steps 🚶
- Currently we need to add `.js` to filenames, let's remove that.
- Try some other parses like - [acorn](https://github.com/acornjs/acorn) and maybe have an option to choose parser.
- Add missing functionalities - caching, circular dependency, etc.
- Config file support.

## Credits 🏆
***All Credits to [https://github.com/ronami/minipack](https://github.com/ronami/minipack)***