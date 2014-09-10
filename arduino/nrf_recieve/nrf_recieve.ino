/* 

 RadioReceive
 
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

 Receive a series of zeros and ones to the sender radio.
 
*/

#include <SPI.h>
#include <nRF24L01.h>
#include <RF24.h>

#define CE_PIN   9
#define CSN_PIN 10

// NOTE: the "LL" at the end of the constant is "LongLong" type
const uint64_t pipe = 0xE8E8F0F0E1LL; // Define the transmit pipe

RF24 radio(CE_PIN, CSN_PIN); // Create a Radio

int received[1];
int led = 13;

void setup()   /****** SETUP: RUNS ONCE ******/
{
  Serial.begin(9600); 

  pinMode(led, OUTPUT); 
  
  delay(1000);

  radio.begin();
  radio.openReadingPipe(1,pipe);
  radio.startListening();;
}//--(end setup )---


void loop()   /****** LOOP: RUNS CONSTANTLY ******/
{
  if ( radio.available() )
  {
    // Read the data payload until we've received everything
    bool done = false;
    while (!done)
    {
      // Fetch the data payload
      done = radio.read( received, sizeof(received) );
 
     
 
      if (received[0]==0)
        digitalWrite(led, LOW);
      else
        digitalWrite(led, HIGH);
    }
  }
}
