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

	// Control the state of the blinking LED
	blinking = false
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

	// Use a goroutine to start the LED blinking function in the background
	go blink()

	// Set up IO buffer to read user input
	reader := bufio.NewReader(os.Stdin)
	fmt.Print("Choose An Option: \n - On \n - Off \n - Blink")

	for {
		fmt.Print("\n> ");
		input, _ := reader.ReadString('\n') // Read until newline
		input = input[:len(input)-1]        // Remove trailing newline
		input = strings.ToLower(input)		// Convert to lowercase

		// Stop blinking once we receive user input
		blinking = false

		if input == "on" {
			fmt.Println("LED On")
			pin.High()
		} else if input == "off" {
			fmt.Println("LED Off")
			pin.Low()
		} else if input == "blink" {
			fmt.Println("Blinking LED")
			blinking = true
		} else {
			fmt.Println("Error: Invalid option")
		}
	}
}

func blink() {
	for {
		if blinking {
			pin.Toggle()
			time.Sleep(time.Second / 10)
		}
	}
}
