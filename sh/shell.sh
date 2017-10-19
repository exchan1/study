#!/bin/bash
CURL_OUTPUT=$(curl -X HEAD -I "www.kimchang.com"|grep -c 200)
if [ "$CURL_OUTPUT" -ge 1 ];
 then ./shell2.sh
else
 echo "fail"
fi
