var OBDReader = require("serial-obd");
var options = {}
options.baudRate = 115200;
//var serialOBDReader = new OBDReader("/dev/rfcomm0", options);
var serialOBDReader = new OBDReader("/dev/ttyAMA0", options);
var dataReceivedMarker = {};
serialOBDReader.on("dataReceived", (data)=>{
	console.log(data);
	dataReceivedMarker = data;
});
serialOBDReader.on("connected", (data)=>{
	serialOBDReader.addPoller("rpm"); // Engine RPM
	serialOBDReader.addPoller("vss"); // Vehicle Spead Sensor
	serialOBDReader.addPoller("temp"); // Engine Coolant Temperature
	serialOBDReader.addPoller("frp"); // Fuel Pressure
	serialOBDReader.startPolling(2000); // Polls all added pollers each 2000 ms.
});
serialOBDReader.connect();

