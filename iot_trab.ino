#include <EmonLib.h>

EnergyMonitor emon1;
int pin_sct = A0;

double potencia_values = 0;
double potencia_media = 0;
int count = 0;

void setup() {
  Serial.begin(9600);
  emon1.current(pin_sct,60);
}

void loop() {
    // Ler o valor da corrente   
    while(count < 60){
       double Irms = emon1.calcIrms(1480);
       potencia_values += Irms * 220;
       count = count + 1;
       delay(780);
    };

    potencia_media = potencia_values/count;
    Serial.println(potencia_media);
 
    potencia_values = 0;
    count = 0;      
}
  
