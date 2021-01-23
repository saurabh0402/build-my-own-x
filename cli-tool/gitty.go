package main

import (
	"fileparser"
	"finder"
	"flag"
	"githelper"
	"log"
	"printgraph"
)

func scan(folder string) {
	gitRepos := finder.FindGitRepos(folder)
	dotFilePath := finder.GetDotFilePath()
	fileparser.AddNewReposToFile(gitRepos, dotFilePath)
}

func stats(email string) {
	numDays := 31
	commits := githelper.GetCommits(email, numDays)
	printgraph.PrintGraph(commits, numDays)
}

func main() {
	var folder string
	var email string

	flag.StringVar(&folder, "add", "", "Add a new folder to scan for Git Repositories")
	flag.StringVar(&email, "email", "", "The email to check for contributions")

	flag.Parse()

	if folder != "" {
		scan(folder)
		return
	}

	if email != "" {
		stats(email)
		return
	}

	log.Fatal("Invalid Flag :(")
}
