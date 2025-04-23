const { Jimp } = require("jimp");

console.log("\033[2J");

console.log("\x1b[31m██   ██ ████▄ ███▄██▄ ████▄ ████▄\x1b[0m");
console.log("\x1b[32m██   ██ ██ ██ ██ █ ██ ██ ██ ██ ██\x1b[0m");
console.log("\x1b[1m\x1b[34m██ █ ██ ██ ██ ██ █ ██ ████▄ ██ ██\x1b[0m");
console.log("\x1b[31m██ █ ██ ██ ██ ██ █ ██ ██ ██ ██ ██\x1b[0m");
console.log("\x1b[32m██ █ ██ ██ ██ ██   ██ ██ ██ ██ ██\x1b[0m");
console.log("\x1b[1m\x1b[34m██▄█▄██ ▀█▄██ ██   ██ ██▄██ ▀█▄██\x1b[0m");
console.log("RGB Compositor   By notFUJI[不藤]");

console.log(" ");

var args = process.argv;

var err = 0;

if(args[2] == undefined) {
  console.log("\x1b[41mERROR: Argument 0 undefined\x1b[0m");
  err = 1;
}

if(args[3] == undefined) {
  console.log("\x1b[41mERROR: Argument 1 undefined\x1b[0m");
  err = 1;
}

if(args[4] == undefined) {
  console.log("\x1b[41mERROR: Argument 2 undefined\x1b[0m");
  err = 1;
}

if(args[5] == undefined) {
  console.log("\x1b[41mERROR: Argument 3 undefined\x1b[0m");
  err = 1;
}

if(err == 1){
  console.log(" ");
  console.log("\x1b[7mHelp:\x1b[0m");
  console.log("+------------------------------------+");
  
  console.log("Usage: \"node wombo <arg1> <arg2> <arg3> <arg4>\"");
  console.log("  <arg1> : Red channel image");
  console.log("  <arg2> : Green channel image");
  console.log("  <arg3> : Blue channel image");
  console.log("  <arg4> : Output image");
  console.log("Valid formats: .bmp, .gif, .jpeg, .png, .tiff");
  
  return;
}

console.log("\x1b[7mProcessing args:\x1b[0m");
console.log("+------------------------------------+");

a_r = args[2];
console.log("Red    : \x1b[4m" + a_r);
a_g = args[3];
console.log("Green  : \x1b[4m" + a_g);
a_b = args[4];
console.log("Blue   : \x1b[4m" + a_b);
a_o = args[5];
console.log("Output : \x1b[4m" + a_o);

console.log("+------------------------------------+");

console.log("  ");

execute().catch(console.error);

async function execute() {
  console.log("\x1b[7mExecuting:\x1b[0m");
  console.log("+------------------------------------+");
  process.stdout.write("Initializing color fills...");
  const f_r = new Jimp({ width: 1920, height: 1080, color: 0xff0000ff });
  process.stdout.write("...");
  const f_g = new Jimp({ width: 1920, height: 1080, color: 0x00ff00ff });
  process.stdout.write("...");
  const f_b = new Jimp({ width: 1920, height: 1080, color: 0x0000ffff });
  process.stdout.write("\x1b[7mDone\n\x1b[0m");
  
  process.stdout.write("Loading images...");
  const i_r = await Jimp.read(a_r);
  process.stdout.write("...");
  const i_g = await Jimp.read(a_g);
  process.stdout.write("...");
  const i_b = await Jimp.read(a_b);
  process.stdout.write("\x1b[7mDone\n\x1b[0m");
  
  process.stdout.write("Initializing output...");
  const o = new Jimp({ width: 1920, height: 1080, color: 0x000000ff });
  process.stdout.write("\x1b[7mDone\n\x1b[0m");

  process.stdout.write("Creating RGB channels...");
  i_r.composite(
    f_r, 0, 0, 
    {
      mode: "multiply"
    }
  );
  process.stdout.write("...");
  i_g.composite(
    f_g, 0, 0, 
    {
      mode: "multiply"
    }
  );
  process.stdout.write("...");
  i_b.composite(
    f_b, 0, 0, 
    {
      mode: "multiply"
    }
  );
  process.stdout.write("\x1b[7mDone\n\x1b[0m");
  
  process.stdout.write("Compositing channels...");
  o.composite(
    i_r, 0, 0, 
    {
      mode: "screen"
    }
  );
  process.stdout.write("...");
  o.composite(
    i_g, 0, 0, 
    {
      mode: "screen"
    }
  );
  process.stdout.write("...");
  o.composite(
    i_b, 0, 0, 
    {
      mode: "screen"
    }
  );
  process.stdout.write("\x1b[7mDone\n\x1b[0m");
  
  await o.write(a_o);
  
  console.log("+------------------------------------+");
  console.log("\n");

  console.log("\x1b[7mFinished:\x1b[0m Saved as \x1b[33m\x1b[44m\x1b[4m\x1b[5m\"" + a_o + "\"\x1b[0m");
  
  console.log("\n");
  console.log("\n");
}