module gitty

go 1.14

replace finder => ./finder

replace fileparser => ./file-parser

require (
	fileparser v0.0.0-00010101000000-000000000000
	finder v0.0.0-00010101000000-000000000000
)