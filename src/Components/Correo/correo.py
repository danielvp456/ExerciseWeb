import smtplib
import mimetypes

# Importamos los módulos necesarios
from email.mime.multipart import MIMEMultipart
from email.mime.image import MIMEImage
from email.encoders import encode_base64

msg = MIMEMultipart()
msg['From']="danielvp456@gmail.com"
msg['To']="danielvp456@hotmail.com"
msg['Subject']="Correo con imagen Adjunta"

file = open("D:/Daniel_Universidad/9NO SEMESTRE/DESARROLLO_APP_WEB/2DO_CORTE/Login/foto_db/src/Components/Correo/tanjiro-kamado.jpg", "rb")
attach_image = MIMEImage(file.read())
attach_image.add_header('Content-Disposition', 'attachment; filename = "avatar.png"')
msg.attach(attach_image)

server = smtplib.SMTP('smtp.gmail.com', 587)
server.starttls()
server.login('danielvp456@gmail.com', '1000467107danie')

server.sendmail('danielvp456@gmail.com', 'danielvp456@hotmail.com', msg.as_string())

server.quit()

print("mensaje enviado jejej")