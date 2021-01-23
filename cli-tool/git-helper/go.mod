module githelper

go 1.14

replace fileparser => ../file-parser

replace finder => ../finder

require (
	fileparser v0.0.0-00010101000000-000000000000
	finder v0.0.0-00010101000000-000000000000
	github.com/go-git/go-git/v5 v5.2.0
)
