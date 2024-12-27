package main

import (
	"fmt"
	"net"
	"os"
)

func main() {
	fmt.Println("Starting server on Port 6379...")

	server, err := net.Listen("tcp", ":6379")
	if err != nil {
		fmt.Println(err)
		return
	}

	conn, err := server.Accept()
	if err != nil {
		fmt.Println(err)
		return
	}

	defer conn.Close()

	for {
		buf := make([]byte, 1024)

		_, err := conn.Read(buf)

		fmt.Println(string(buf))

		if err != nil {
			fmt.Println("Error reading from client ", err.Error())
			os.Exit(1)
		}

		conn.Write([]byte("+OK\r\n"))
	}
}
