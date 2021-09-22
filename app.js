const { exec } = require("child_process");
var script = exec("sh restartbluetooth.sh",(error, stdout, stderr)=>{
	console.log(stdout);
	console.log(stderr);
	if(error !== null){
		console.log(`exec error: ${error} `);
	}else{
		var SerialPort = require("serialport");
		var serialPort = new SerialPort("/dev/rfcomm0",{
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
			console.log(`Recive: ${data}`);
		});
		var contar = 0;
		async function run(){
			var sw = true;
			while(sw){
				var data = new Date().toTimeString();
				if(contar == 0){
					serialPort.write("AT Z\n");
					contar = 1;
				}else if(contar == 1){
					serialPort.write("ATI I\n");
					contar = -1;
					sw = false;
				}else if(contar == 2){
					serialPort.write("ATI\0");
					contar = 3;
				}else if(contar == 3){
					serialPort.write("ATI\n");
					contar = 3;
				}
				console.log("Send: ATI "+contar);
				await sleep(3000);
				//contar = contar + 1;
			}
		}
		function sleep(ms){
			return new Promise((resolve)=>{
				setTimeout(resolve, ms);
			});
		}
		run();
	}
});
