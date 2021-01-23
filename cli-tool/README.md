# Gitty 🐱
## What is Gitty? 🤔
Continuing with the trend of having un-inspirational names, here's **Gitty**, a command-line tool, written in Golang, that allows you to visualize you Git contributions for repositories you have on your system ( Drum rolls please 🥁 🥁 ) on your terminal.

## Running the Application 🏃
- cd into the application folder.
- Add repositories to search by running the `gitty.go` file with `-add` flag
  ```
  go run gitty.go -add=../
  ```
- Build and display the graph using following 
  ```
  go run gitty.go -email=<email> -numDays=<number of days>
  ```

In addition to this you could also run
```
sudo go install
```
to install the application and then run `gitty` command to invoke the app.

## V2 Ideas 💡
I will be following the tutorial first and get a simple version of the tool ready. After that there are a few ideas that I would like to visit:
- **Namespaces** : Ability to create a new namespace and then add folders to that namespace and thus get stats for that namespace only so that one could check how much has one contributed to side projects, job, etc.
- **.giffyignore** : Rather than hardcoding folders that are to be skipped like - node_modules, .git, etc this will allow user to add more folders to this list if one wants to.

## Credits 🏆
***All credits to [https://flaviocopes.com/go-git-contributions/](https://flaviocopes.com/go-git-contributions/)***