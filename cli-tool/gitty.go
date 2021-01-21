package main

import (
	"flag"
	"log"
	"os"
	"path/filepath"
	"strings"
)

// findGitRepos recursively goes through all the folders within
// the provided folder and finds folders that have git initialized.
func findGitRepos(folder string) []string {
	folder = strings.TrimSuffix(folder, "/")
	gitRepos := []string{}

	absPath, err := filepath.Abs(folder)
	if err != nil {
		log.Fatal(err)
	}

	folder = absPath

	fd, err := os.Open(folder)
	if err != nil {
		log.Fatal(err)
	}

	files, err := fd.Readdir(-1)
	if err != nil {
		log.Fatal(err)
	}
	fd.Close()

	for _, file := range files {
		if file.IsDir() {
			if file.Name() == ".git" {
				gitRepos = append(gitRepos, folder)
				continue
			} else if file.Name() != "node_modules" {
				moreRepos := findGitRepos(folder + "/" + file.Name())
				gitRepos = append(gitRepos, moreRepos...)
			}
		}
	}

	return gitRepos
}

func scan(folder string) {
	gitRepos := findGitRepos(folder)
	for _, repo := range gitRepos {
		print(repo + "\n")
	}
}

func stats(email string) {}

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
