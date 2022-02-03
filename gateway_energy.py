import paho.mqtt.client as mqtt
import urllib3
import serial


# MQTT Infos
channel_id = 1610857
topic = "channels/1610857/publish/RS75WRZPOF5JG0XB"
server = "mqtt.thingspeak.com" 
clientName = "ESP-ThingSpeak"

def on_connect(client, userdata, flags, rc):
    print("Connection returned result: " + str(rc))

def main():
    # Conectando como broker
    client = mqtt.Client(clientName)
    client.on_connect = on_connect
    client.connect(server)
    client.loop_start()
    
    # Porta Serial
    ser = serial.Serial('COM5',9600)

    print("Conectado ao broker...")
    while True:
        potencia_media = float(ser.readline().decode('utf-8'))
        print("potência média: {}".format(potencia_media))

        fields = "field1=" + str(potencia_media) + '&status=MQTTPUBLISH'

        client.publish(topic, payload=fields)


if __name__ == "__main__":
    main()
