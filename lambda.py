import json
import smtplib
from email.mime.text import  MIMEText
from email.mime.multipart import  MIMEMultipart

Bandeira = 0.20104
TUSD = 0.46955
TE = 0.36433
days = 7
def calcCustoObj(_objPot, _hours, _days = days):
    preco = ((_objPot*_hours*_days)/1000)*soma_tarifas()

    return round(preco,2)
    
def pot_med(event):
  if(type(event) is str):
    event = json.loads(event)
    if('thingSpeakData' in event.keys()):
      lista = event['thingSpeakData']
      med = 0
      for l in lista:
          med += float(l['field1'])
      return round( med/len(lista), 2)
    else:
        return 130
  else:
      return -1
      
class Object:
   
    # init method or constructor 
    def __init__(self, name, pot, hours):
        self.name = name
        self.pot = pot
        self.hours = hours


    # Sample Method 
    def report(self):
        return '\n- {}: consumo médio de {} watts. Assumindo que ela fique ligada por {}h, seu gasto semanal é de {} Reais.\n'.format(
                                                                                                        self.name, self.pot, self.hours, calcCustoObj(self.pot, self.hours))

def get_tarifas():
    # faz uma ação para pegar as tarifas atualizadas e de acordo com a bandeira do usuário
    return Bandeira, TUSD, TE

def soma_tarifas():
    return Bandeira + TUSD +  TE 
  
# def get_list_object(oaid = ""):
#     # faz uma ação para pegar os objetos no canal do ThingSpeak
#     return # lista de objetos

def get_text(event):
    values = []
    tarifas = get_tarifas()
    pot = pot_med(event)
    geladeira = Object("Geladeira", pot, 24)
    
    if(pot<0):
      return "Erro de conexão"
    else:
        
      text_objetos =  [ geladeira.report() ] # esta variavel tem de ser uma lista, por causa que esta sendo usado o .extend
      
      values.extend(text_objetos)
      values.extend(tarifas)
      text = """
  Nesta semana, seus objetos tiverem o seguinte desempenho:
  
    {}
  
  Gasto calculado a partir de Bandeira de {} Reais/KWh, TUSD de {} Reais/KWh e TE de {} Reais/KWh.""".format(*values)
  
      return text
  
  
def send_email(event):
  smtp_aws_user = "XXXXYYYYZZZZ"
  smtp_aws_pass = "XXXXYYYYZZZZ"

  texto = get_text(event)
  # "Testando gateway energy","plain"
  corpo_email = MIMEText(texto)
  
  # Email
  msg = MIMEMultipart()
  msg['From'] = 'email@server.com'
  msg['To'] = ', '.join(['email1@server.com','email2@server.com'])
  msg['Subject'] = 'Gateway Energy Weekly Report'
  msg.attach(corpo_email)
  
  try:
    server =  smtplib.SMTP('email-smtp.us-east-2.amazonaws.com', 587)
    server.ehlo()
    server.starttls()
    server.login(smtp_aws_user,smtp_aws_pass)
    server.send_message(msg)
  except Exception as e:
    print ("Erro: ",e)
  server.close()


def lambda_handler(event, context):
  
  print("event é variavel do tipo: ",type(event))
  print("event tem as seguintes chaves: ", event.keys()) 
  print(event['body'])
  if('body' in event.keys()):
    evento = event['body']
      
  send_email(event['body'])
  
  return {
    "statusCode": 200,
    "headers":{
      "Access-Control-Allow-Headers" : "Content-Type",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "*"
    },
    "body": "Email Enviado!"
  }
  
    
