#!/usr/bin/expect

spawn ssh kimchangmain@kimchang.com ./restart.sh 
expect "password: "
send "rladoswkd8353\r"
interact
