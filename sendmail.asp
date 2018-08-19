

<%
'-----EDIT THE MAILING DETAILS IN THIS SECTION-----
dim fromName, fromAddress, recipientName, recipientAddress, subject, body, sentTo

fromName = Request.Form("name")
fromAddress = Request.Form("email")
recipientName = "Daniel Niclas"
recipientAddress= "dniclas@sbcglobal.net"
subject = "WEB INQUIRY"
body = Request.Form("message")

'-----YOU DO NOT NEED TO EDIT BELOW THIS LINE-----

sentTo = "NOBODY"
Set Mailer = Server.CreateObject("SMTPsvg.Mailer")
Mailer.FromName = fromName
Mailer.FromAddress = fromAddress
Mailer.RemoteHost = "mrelay.perfora.net"
if Mailer.AddRecipient (recipientName, recipientAddress) then
sentTo=recipientName & " (" & recipientAddress & ")"
end if
Mailer.Subject = subject
Mailer.BodyText = body
if Mailer.SendMail then
Response.Write "The mailing was sent to: <b>" & sentTo & "</b>"
else
Response.Write "Mail send failure. Error was " & Mailer.Response
end if
%>