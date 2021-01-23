module gitty

go 1.14

replace finder => ./finder

replace fileparser => ./file-parser

replace githelper => ./git-helper

replace printgraph => ./print-graph

require (
	fileparser v0.0.0-00010101000000-000000000000
	finder v0.0.0-00010101000000-000000000000
	githelper v0.0.0-00010101000000-000000000000
	printgraph v0.0.0-00010101000000-000000000000
)
