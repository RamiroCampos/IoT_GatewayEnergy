import urllib3
import serial
from time import sleep


API_KEY = "https://api.thingspeak.com/update?api_key=RS75WRZPOF5JG0XB&"

http = urllib3.PoolManager()
ser = serial.Serial('COM5',9600)


print("Enviando dados...")

potencia_values = []

while True:
    '''
    c = 60; 
    while c > 1:
        corrente = float(ser.readline().decode('utf-8'))
        potencia = round(float(corrente) * 220, 2)
        potencia_values.append(potencia)

        c -= 1
        sleep(1)
    '''

    potencia_media = float(ser.readline().decode('utf-8'))

    #media_potencia = sum(potencia_values) / len(potencia_values) 

    #print("corrente: {}".format(corrente))
    print("potência média: {}".format(potencia_media))

#    if(potencia < corrente):
#        corrente, potencia  = potencia, corrente
     
    #url = API_KEY + "field1=" + str(corrente) + "&" + "field2=" + str(potencia)
    url = API_KEY + "field2=" + str(potencia_media)

    http.request('GET',url)
    




