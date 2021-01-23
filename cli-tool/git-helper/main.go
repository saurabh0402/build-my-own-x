package githelper

import (
	"fileparser"
	"finder"
	"github.com/go-git/go-git/v5"
	"github.com/go-git/go-git/v5/plumbing/object"
	"log"
	"math"
	"time"
)

func numDaysFromToday(date time.Time) int {
	_t := time.Now()
	_y, _m, _d := _t.Date()
	today := time.Date(_y, _m, _d, 0, 0, 0, 0, _t.Location())

	diff := int(math.Ceil(today.Sub(date).Hours() / 24))

	return diff
}

func addCommits(path string, email string, commitCounts map[int]int) map[int]int {
	repo, err := git.PlainOpen(path)
	if err != nil {
		log.Fatal(err)
	}

	headRef, err := repo.Head()
	if err != nil {
		log.Fatal(err)
	}

	iter, err := repo.Log(&git.LogOptions{From: headRef.Hash()})
	if err != nil {
		log.Fatal(err)
	}

	if err := iter.ForEach(func(c *object.Commit) error {
		if c.Author.Email != email {
			return nil
		}

		diff := numDaysFromToday(c.Author.When)

		if diff > 10 {
			return nil
		}

		commitCounts[diff]++

		return nil
	}); err != nil {
		log.Fatal(err)
	}

	log.Print(email)
	return commitCounts
}

// GetCommits returns the number of commits for last few days
func GetCommits(email string) map[int]int {
	dotFilePath := finder.GetDotFilePath()
	repos := fileparser.ReadStoredFile(dotFilePath)
	numsDays := 10

	commitCounts := make(map[int]int)
	for i := numsDays; i > 0; i-- {
		commitCounts[i] = 0
	}

	for _, repo := range repos {
		commitCounts = addCommits(repo, email, commitCounts)
	}

	return commitCounts
}
