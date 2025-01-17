package main

import (
	"go.bug.st/serial"
	"log"
	"fmt"
)

func main() {
	mode := &serial.Mode{
		BaudRate: 9600,
	}

	port, err := serial.Open("/dev/ttyACM0", mode)
	if err != nil {
		log.Fatal(err)
	}

	buffer := make([]byte, 100)

	for {
		length, err := port.Read(buffer)

		if err != nil {
			log.Fatal(err)
			break
		}

		if length == 0 {
			fmt.Println("\nEOF")
			break
		}

		fmt.Printf("%v", string(buffer[:length]))
	}
}
