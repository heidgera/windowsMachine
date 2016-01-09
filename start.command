rm -r ~/Documents/chromeTemp
cp -r ~/Documents/chromeData ~/Documents/chromeTemp

ping -c 10 127.0.0.1

if pgrep "node" > /dev/null
then
    killall -9 node
fi

cd ~/Desktop/fluidPower/nodeSource
nohup node ./wsServer.js &

ping -c 5 127.0.0.1

open /Applications/Google\ Chrome.app --args --kiosk --user-data-dir="/Users/exhibits/Documents/chromeTemp" --allow-file-access-from-files "/Users/exhibits/Desktop/fluidPower/index.html"
