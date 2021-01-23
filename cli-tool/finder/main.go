package finder

import (
	"log"
	"os"
	"os/user"
	"path/filepath"
	"strings"
)

// FindGitRepos recursively goes through all the folders within
// the provided folder and finds folders that have git initialized.
func FindGitRepos(folder string) []string {
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
				moreRepos := FindGitRepos(folder + "/" + file.Name())
				gitRepos = append(gitRepos, moreRepos...)
			}
		}
	}

	return gitRepos
}

// GetDotFilePath return the path to the store file
func GetDotFilePath() string {
	usr, err := user.Current()
	if err != nil {
		log.Fatal(err)
	}

	return usr.HomeDir + "/.gittystore"
}
