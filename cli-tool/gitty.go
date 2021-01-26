package main

import (
	"fileparser"
	"finder"
	"flag"
	"githelper"
	"log"
	"printgraph"
)

func scan(folder string, ns string) {
	gitRepos := finder.FindGitRepos(folder)
	dotFilePath := finder.GetDotFilePath(ns)
	fileparser.AddNewReposToFile(gitRepos, dotFilePath)
}

func stats(email string, numDays int, ns string) {
	commits := githelper.GetCommits(email, numDays, ns)
	printgraph.PrintGraph(commits, numDays)
}

func main() {
	var folder string
	var email string
	var numDays int
	var ns string

	flag.StringVar(&folder, "add", "", "Add a new folder to scan for Git Repositories")
	flag.StringVar(&email, "email", "", "The email to check for contributions")
	flag.IntVar(&numDays, "numDays", 31, "Number of days of contributions to fetch")
	flag.StringVar(&ns, "ns", "default", "The namespace to work on")

	flag.Parse()

	// Init Namespace
	finder.InitNamespace(ns)

	if folder != "" {
		scan(folder, ns)
		return
	}

	if email != "" {
		stats(email, numDays, ns)
		return
	}

	log.Fatal("Invalid Flag :(")
}
