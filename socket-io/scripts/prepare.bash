#!/usr/bin/env bash
if [ ! -d "keys" ]; then
  mkdir keys
  echo "Created keys directory"
else
  echo "Keys directory already exists"
fi

curve=prime256v1

openssl ecparam -name $curve -genkey -noout -out ./keys/ECDSAprivate.pem

openssl ec -in ./keys/ECDSAprivate.pem -pubout -out ./keys/ECDSApublic.pem

if [[ "$1" =~ "production" ]]; then
    npm i && npm i -g typescript && npm run build
elif [[ "$1" =~ "development" ]]; then
    npm i && husky install
else
    echo "Wrong positional argument was given, exiting..."
    exit 1
fi

exit 0