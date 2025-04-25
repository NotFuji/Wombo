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

alt = false;

if(args[7] != undefined) {
  alt = (args[7] === "true");
}

ch_o = false;

if(args[8] != undefined) {
  ch_o = (args[8] === "true");
  if(ch_o == true){
    a_or = "r_" + args[5];
    a_og = "g_" + args[5];
    a_ob = "b_" + args[5];
  }
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
  console.log("  <arg5> : (Optional) White Value (000000-FFFFFF)  def : FFFFFF");
  console.log("  <arg6> : (Optional) Alternate Composite (bool)   def : false");
  console.log("  <arg7> : (Optional) Output channels (bool)       def : false");
  console.log("Valid formats: .bmp, .gif, .jpeg, .png, .tiff");
  
  return;
}



console.log("\x1b[7mProcessing args:\x1b[0m");
console.log("+------------------------------------+");

a_r = args[2];
console.log("Red    : \x1b[4m" + a_r + "\x1b[0m");
a_g = args[3];
console.log("Green  : \x1b[4m" + a_g + "\x1b[0m");
a_b = args[4];
console.log("Blue   : \x1b[4m" + a_b + "\x1b[0m");
a_o = args[5];
console.log("Output : \x1b[4m" + a_o + "\x1b[0m");
wh = args[6];
if(args[6] == undefined) {
  wh = "FFFFFF";
}
console.log("White  : \x1b[4m0x" + wh + "\x1b[0m");

console.log("+------------------------------------+");

console.log("  ");

execute().catch(console.error);

async function execute() {
  console.log("\x1b[7mExecuting:\x1b[0m");
  
  
  console.log("+------------------------------------+");
  process.stdout.write("Initializing color fills....");
  
  r_i = wh.substr(0,2);
  g_i = wh.substr(2,2);
  b_i = wh.substr(4,2);
  
  f_r = new Jimp({ width: 1920, height: 1080, color: "#"+ r_i + "0000"});
  process.stdout.write("...");
  f_g = new Jimp({ width: 1920, height: 1080, color: "#00" + g_i + "00" });
  process.stdout.write("...");
  f_b = new Jimp({ width: 1920, height: 1080, color: "#0000" + b_i });
  process.stdout.write("\x1b[7mDone\n\x1b[0m");
  
  process.stdout.write("Loading images......");
  i_r = await Jimp.read(a_r);
  process.stdout.write(".......");
  i_g = await Jimp.read(a_g);
  process.stdout.write(".......");
  i_b = await Jimp.read(a_b);
  process.stdout.write("\x1b[7mDone\n\x1b[0m");
  
  process.stdout.write("Initializing output...............");
  const o = new Jimp({ width: 1920, height: 1080, color: 0x000000ff });
  process.stdout.write("\x1b[7mDone\n\x1b[0m");

  process.stdout.write("Creating RGB channels....");
  
  if(alt != true) {
    i_r.composite(
      f_r, 0, 0, 
      {
        mode: "multiply"
      }
    );
    process.stdout.write("....");
    i_g.composite(
      f_g, 0, 0, 
      {
        mode: "multiply"
      }
    );
    process.stdout.write(".....");
    i_b.composite(
      f_b, 0, 0, 
      {
        mode: "multiply"
      }
    );
    
  }
  else {
    for(let i = 0; i < i_r.height; i++){
      for(let j = 0; j < i_r.width; j++){
        col = i_r.getPixelColor(j, i);
        col_h = col.toString(16)

        col_ch = parseInt(col_h.substr(0,2), 16);
        
        lum = col_ch * 3;
        n_r = lum;
        n_g = 0;
        n_b = 0;
        
        if(n_r > 0xff) {
          n_r = 0xff;
          
          rem = Math.floor((lum - 0xff)/2);
          n_g = rem;
          n_b = rem;
          
          n_r = Math.min(0xff, n_r);
          n_g = Math.min(0xff, n_g);
          n_b = Math.min(0xff, n_b);
          
          if(n_r > 0xff){
            console.log("r",n_r);
            console.log("g",n_g);
            console.log("b",n_b);
          }
        }
        n_col = 0xff + (n_r * 0x1000000) + (n_g * 0x10000) + (n_b * 0x100);
        
        i_r.setPixelColor(n_col, j, i);
      }
    }
    process.stdout.write("....");
    
    for(let i = 0; i < i_g.height; i++){
      for(let j = 0; j < i_g.width; j++){
        col = i_g.getPixelColor(j, i);
        col_h = col.toString(16)

        col_ch = parseInt(col_h.substr(0,2), 16);
        
        lum = col_ch * 3;
        n_r = 0;
        n_g = lum;
        n_b = 0;
        
        if(n_g > 0xff) {
          n_g = 0xff;
          
          rem = Math.floor((lum - 0xff)/2);
          n_r = rem;
          n_b = rem;
          
          n_r = Math.min(0xff, n_r);
          n_g = Math.min(0xff, n_g);
          n_b = Math.min(0xff, n_b);
          
          if(n_r > 0xff){
            console.log("r",n_r);
            console.log("g",n_g);
            console.log("b",n_b);
          }
        }
        n_col = 0xff + (n_r * 0x1000000) + (n_g * 0x10000) + (n_b * 0x100);
        
        i_g.setPixelColor(n_col, j, i);
      }
    }
    process.stdout.write(".....");
    
    for(let i = 0; i < i_b.height; i++){
      for(let j = 0; j < i_b.width; j++){
        col = i_b.getPixelColor(j, i);
        col_h = col.toString(16)

        col_ch = parseInt(col_h.substr(0,2), 16);
        
        lum = col_ch * 3;
        n_r = 0;
        n_g = 0;
        n_b = lum;
        
        if(n_b > 0xff) {
          n_b = 0xff;
          
          rem = Math.floor((lum - 0xff)/2);
          n_r = rem;
          n_g = rem;
          
          n_r = Math.min(0xff, n_r);
          n_g = Math.min(0xff, n_g);
          n_b = Math.min(0xff, n_b);
          
          if(n_r > 0xff){
            console.log("r",n_r);
            console.log("g",n_g);
            console.log("b",n_b);
          }
        }
        n_col = 0xff + (n_r * 0x1000000) + (n_g * 0x10000) + (n_b * 0x100);
        
        i_b.setPixelColor(n_col, j, i);
      }
    }
  }
  
  process.stdout.write("\x1b[7mDone\n\x1b[0m");
  
  process.stdout.write("Compositing channels.....");
  o.composite(
    i_r, 0, 0, 
    {
      mode: "screen"
    }
  );
  process.stdout.write(".....");
  o.composite(
    i_g, 0, 0, 
    {
      mode: "screen"
    }
  );
  process.stdout.write("....");
  o.composite(
    i_b, 0, 0, 
    {
      mode: "screen"
    }
  );
  process.stdout.write("\x1b[7mDone\n\x1b[0m");
  
  await o.write(a_o);
  
  if(ch_o == true) {
    await i_r.write(a_or);
    await i_g.write(a_og);
    await i_b.write(a_ob);
  }
  console.log("+------------------------------------+ \n");
  console.log("\x1b[7mFinished:\x1b[0m Saved as \x1b[33m\x1b[44m\x1b[4m\x1b[5m\"" + a_o + "\"\x1b[0m");
  
  if(ch_o == true) {
    console.log("\x1b[7mFinished:\x1b[0m Saved as \x1b[33m\x1b[44m\x1b[4m\x1b[5m\"" + a_or + "\"\x1b[0m");
    console.log("\x1b[7mFinished:\x1b[0m Saved as \x1b[33m\x1b[44m\x1b[4m\x1b[5m\"" + a_og + "\"\x1b[0m");
    console.log("\x1b[7mFinished:\x1b[0m Saved as \x1b[33m\x1b[44m\x1b[4m\x1b[5m\"" + a_og + "\"\x1b[0m");
  }
}
