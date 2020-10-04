execute command `cd ./smime`

```
***:smtp-sample user$ cd ./smime
```

execute command `openssl genrsa 1024 > private-key.pem`

```
***:smime user$ openssl genrsa 1024 > private-key.pem
Generating RSA private key, 1024 bit long modulus
...++++++
.................................................++++++
e is 65537 (0x10001)
```

execute command `openssl req -x509 -new -key private-key.pem -out cert.pem -days 356`

```
***:smime user$ openssl req -x509 -new -key private-key.pem -out cert.pem -days 356
You are about to be asked to enter information that will be incorporated
into your certificate request.
What you are about to enter is what is called a Distinguished Name or a DN.
There are quite a few fields but you can leave some blank
For some fields there will be a default value,
If you enter '.', the field will be left blank.
-----
Country Name (2 letter code) []:JP
State or Province Name (full name) []:Tokyo
Locality Name (eg, city) []:
Organization Name (eg, company) []:
Organizational Unit Name (eg, section) []:
Common Name (eg, fully qualified host name) []:
Email Address []:from@test.com
```
