package fileparser

import (
	"bufio"
	"io/ioutil"
	"log"
	"os"
	"strings"
)

func openFile(filePath string) *os.File {
	fd, err := os.OpenFile(filePath, os.O_APPEND|os.O_RDWR, 0755)

	if err != nil {
		if os.IsNotExist(err) {
			fd, err := os.Create(filePath)

			if err != nil {
				log.Fatal(err)
			}

			return fd
		}

		log.Fatal(err)
	}

	return fd
}

func mergeReposList(list1 []string, list2 []string) []string {
	for _, t := range list2 {
		if !isPresentInSlice(list1, t) {
			list1 = append(list1, t)
		}
	}

	return list1
}

func isPresentInSlice(slice []string, val string) bool {
	for _, t := range slice {
		if t == val {
			return true
		}
	}

	return false
}

func writeSliceToStore(slice []string, filePath string) {
	fileContent := strings.Join(slice, "\n")
	err := ioutil.WriteFile(filePath, []byte(fileContent), 0755)

	if err != nil {
		log.Fatal(err)
	}
}

// --------------------
// Exports
// --------------------

// ReadStoredFile reads lines from store file and returns an array of strings
func ReadStoredFile(filePath string) []string {
	fd := openFile(filePath)
	defer fd.Close()

	ans := []string{}
	fileScanner := bufio.NewScanner(fd)

	for fileScanner.Scan() {
		ans = append(ans, fileScanner.Text())
	}

	if err := fileScanner.Err(); err != nil {
		log.Fatal(err)
	}

	return ans
}

// AddNewReposToFile checks the store file and adds any new repos to it
func AddNewReposToFile(repos []string, filePath string) {
	existingRepos := ReadStoredFile(filePath)
	newReposList := mergeReposList(existingRepos, repos)
	writeSliceToStore(newReposList, filePath)
}
