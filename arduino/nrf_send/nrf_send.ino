/* 

 RadioSend
 
 - CONNECTIONS: nRF24L01 Modules See:
 
 http://arduino-info.wikispaces.com/Nrf24L01-2.4GHz-HowTo
   1 - GND
   2 - VCC 3.3V !!! NOT 5V
   3 - CE to Arduino pin 9
   4 - CSN to Arduino pin 10
   5 - SCK to Arduino pin 13
   6 - MOSI to Arduino pin 11
   7 - MISO to Arduino pin 12
   8 - UNUSED

 Send a series of zeros and ones to the receiver radio.
 
*/

#include <SPI.h>
#include <nRF24L01.h>
#include <RF24.h>

#define CE_PIN   9
#define CSN_PIN 10

// NOTE: the "LL" at the end of the constant is "LongLong" type
const uint64_t pipe = 0xE8E8F0F0E1LL; // Define the transmit pipe

RF24 radio(CE_PIN, CSN_PIN); // Create a Radio

int high[1];
int low[1];

void setup()
{
  radio.begin();
  radio.openWritingPipe(pipe);

  high[0] = 1;
  low[0] = 0;
  Serial.print("Hello?");
}

void loop()
{
  radio.write(high, sizeof(high));
  Serial.print("Turned on!");
  delay(1000);  
  
  radio.write(low, sizeof(low));
  Serial.print("Turned off!");
  delay(1000);  
}
