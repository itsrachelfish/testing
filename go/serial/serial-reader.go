package main

import (
	"go.bug.st/serial"
    "encoding/json"
	"log"
	"fmt"
    "time"
    "strings"
)

type SensorData struct {
    sensor	string
    temp   	float32
    humid 	float32
}

type SensorOutput struct {
	timestamp	string
    sensor		string
    temp   		float32
    humid 		float32
}

func connectSerial() serial.Port {
	mode := &serial.Mode{
		BaudRate: 9600,
	}

	port, err := serial.Open("/dev/ttyACM0", mode)
	if err != nil {
		log.Fatal(err)
	}

	return port
}

func parseSensorData(buffer []byte) SensorOutput {
	var sensorData SensorData

	err := json.Unmarshal(buffer, &sensorData)
	if err != nil {
		fmt.Println(err)
	}

	output := SensorOutput{
		timestamp: time.Now().String(),
		sensor:	sensorData.sensor,
		temp: sensorData.temp,
		humid: sensorData.humid,
	}
	
	return output
}

func main() {
	var port = connectSerial()
	inputBuffer := make([]byte, 100)
	lineBuffer := make([]byte, 100)

	for {
		length, readErr := port.Read(inputBuffer)
		if readErr != nil {
			log.Fatal(readErr)
			break
		}

		if length == 0 {
			fmt.Println("\nEOF")
			break
		}

		lineBuffer = append(lineBuffer, inputBuffer...)

		fmt.Println("New input", string(inputBuffer));
		fmt.Println("Total line", string(lineBuffer));
		
		if strings.Contains(string(lineBuffer), "\n") {
			sensorData := parseSensorData(lineBuffer)
			lineBuffer = lineBuffer[:0]		

			jsonData, err := json.Marshal(sensorData)
			if err != nil {
				fmt.Println("Error:", err)
				break
			}

			jsonString := string(jsonData)
			fmt.Println(jsonString)
		}
	}
}
