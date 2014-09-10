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
  Serial.begin(9600); 

  radio.begin();
  radio.openWritingPipe(pipe);
  
  high[0] = 1337;
  low[0] = 0;
}

void loop()
{
  radio.write(high, sizeof(high));
  Serial.print("Turned on!\n");
//  delay(300);  
  
 // radio.write(low, sizeof(low));
 // Serial.print("Turned off!\n");
//  delay(100);  
}
