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

func stats(email string, numDays int) {
	commits := githelper.GetCommits(email, numDays)
	printgraph.PrintGraph(commits, numDays)
}

func main() {
	var folder string
	var email string
	var numDays int

	flag.StringVar(&folder, "add", "", "Add a new folder to scan for Git Repositories")
	flag.StringVar(&email, "email", "", "The email to check for contributions")
	flag.IntVar(&numDays, "numDays", 31, "Number of days of contributions to fetch")

	flag.Parse()

	if folder != "" {
		scan(folder)
		return
	}

	if email != "" {
		stats(email, numDays)
		return
	}

	log.Fatal("Invalid Flag :(")
}
