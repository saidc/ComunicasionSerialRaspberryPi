var SerialPort = require("serialport");
var serialPort = new SerialPort("/dev/ttyAMA0",{
	baudRate: 9600,
	dataBits: 8,
	parity: 'none',
	stopBits: 1,
	flowControl: false
	//parser: SerialPort.parsers.readline("\n")
});

const Readline = SerialPort.parsers.Readline;
const parser = new Readline();
serialPort.pipe(parser);
parser.on("data", (data)=>{
	console.log(data);
});
async function run(){
	while(true){
		var date = new Date().toTimeString();
		serialPort.write("date: "+ date);
		console.log("raspi: Date->"+date);
		await sleep(5000);
	}
}
function sleep(ms){
	return new Promise((resolve)=>{
		setTimeout(resolve, ms);
	});
}
run();

