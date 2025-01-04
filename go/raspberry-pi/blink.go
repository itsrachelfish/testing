package main

import (
	"fmt"
	"github.com/stianeikeland/go-rpio/v4"
	"os"
	"time"
	"bufio"
	"strings"
)

var (
	// Use mcu pin 10, corresponds to physical pin 19 on the pi
	pin = rpio.Pin(10)
)

func main() {
	// Open and map memory to access gpio, check for errors
	if err := rpio.Open(); err != nil {
		fmt.Println(err)
		os.Exit(1)
	}

	// Unmap gpio memory when done
	defer rpio.Close()

	// Set pin to output mode
	pin.Output()

	reader := bufio.NewReader(os.Stdin)
	fmt.Print("Choose An Option: \n - On \n - Off \n - Blink")

	for {
		fmt.Print("\n> ");
		input, _ := reader.ReadString('\n') // Read until newline
		input = input[:len(input)-1]        // Remove trailing newline
		input = strings.ToLower(input)		// Convert to lowercase

		if input == "on" {
			fmt.Println("LED On")
			pin.High()
		} else if input == "off" {
			fmt.Println("LED Off")
			pin.Low()
		} else if input == "blink" {
			fmt.Println("Blinking LED")
			go blink()
		} else {
			fmt.Println("Error: Invalid option")
		}
	}
}

func blink() {
	for {
		pin.Toggle()
		time.Sleep(time.Second / 5)
	}
}
