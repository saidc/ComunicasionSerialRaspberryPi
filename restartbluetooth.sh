echo "restart Bluetooth"
sudo rfcomm release rfcomm0
sleep 3
sudo rfcomm bind rfcomm0 00:1D:A5:68:98:8B
echo "Bluetooth restarted"

