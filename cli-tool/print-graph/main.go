package printgraph

import (
	"fmt"
	"time"
)

func getCommitsByDay(commits map[int]int, numDays int) map[int][]int {
	dayMapper := map[string]int{
		"Sunday":    0,
		"Monday":    1,
		"Tuesday":   2,
		"Wednesday": 3,
		"Thursday":  4,
		"Friday":    5,
		"Saturday":  6,
	}

	startDay := dayMapper[time.Now().AddDate(0, 0, -numDays).Weekday().String()]
	commitsByDay := make(map[int][]int)

	for i := 0; i < startDay; i++ {
		commitsByDay[i] = append(commitsByDay[i], -1)
	}

	for i := numDays; i >= 0; i-- {
		index := ((numDays - i) + startDay) % 7
		commitsByDay[index] = append(commitsByDay[index], commits[i])
	}

	return commitsByDay
}

func printGrid(commitsByDay map[int][]int) {
	dayMapper := map[int]string{
		0: "Sunday",
		1: "Monday",
		2: "Tuesday",
		3: "Wednesday",
		4: "Thursday",
		5: "Friday",
		6: "Saturday",
	}

	fmt.Printf("\n")
	for day := 0; day < 7; day++ {
		commits := commitsByDay[day]
		length := len(commits)

		fmt.Printf("%12s ", dayMapper[day])
		for j := 0; j < length; j++ {
			if commits[j] == -1 {
				fmt.Printf("%4s ", "")
			} else {
				escape := ""
				val := commits[j]

				switch {
				case val > 0 && val < 5:
					escape = "\033[1;30;47m"
				case val >= 5 && val < 10:
					escape = "\033[1;30;43m"
				case val >= 10:
					escape = "\033[1;30;42m"
				}

				fmt.Printf(escape+"%4d \033[0m", val)
			}
		}
		fmt.Print("\n")
	}
	fmt.Printf("\n")
}

// PrintGraph takes a map of numDays to numOfCommits and prints the graph
func PrintGraph(commits map[int]int, numDays int) {
	commitsByDay := getCommitsByDay(commits, numDays)
	printGrid(commitsByDay)
}
