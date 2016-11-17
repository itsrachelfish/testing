#include <SPI.h>
#include <nRF24L01.h>
#include <RF24.h>

#define CE_PIN   9
#define CSN_PIN 10

// NOTE: the "LL" at the end of the constant is "LongLong" type
const uint64_t pipe = 0xE8E8F0F0E1LL; // Define the transmit pipe

RF24 radio(CE_PIN, CSN_PIN); // Create a Radio

int recv[1];
int led = 13;

void setup()  
{
  Serial.begin(9600); 
  pinMode(led, OUTPUT);  

  delay(1000);

  radio.begin();
  radio.openReadingPipe(1,pipe);
  radio.startListening();;
}

void loop()  
{  
//  if(radio.available())
//  {
//    while(true)
//    {
      // Fetch the data!
      radio.read( recv, sizeof(recv) );

      Serial.print(recv[0]);
      Serial.print(".\n");

/*
      if(recv[0] == 1337)
        digitalWrite(led, HIGH);  
      else if(recv[0] == 1)
        digitalWrite(led, LOW);*/
   // }
 // }
//  else { 
 //   Serial.print("WHY?\n"); 
  //}
}

