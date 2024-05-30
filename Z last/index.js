// // const add = require("./add.js");
// // console.log("Hello from node.js");
// // const sum=add(2,4);
// // const sum2=add(2,6);
// // console.log(sum2);
// // console.log(sum);

// //module scope in js

// // require("./batman");
// // require("./superman");



// //module catch in js      
// // const superHero=require("./super-hero");
// // superHero.setName("palash");
// // console.log(superHero.getName());

// // const newSuperHero=require("./super-hero");
// // console.log(newSuperHero.getName());
// const math=require("./math");
// const sum=math.add(2,6);
// console.log(sum);
// console.log(math.sub(3,5));
// const data =require("./data.json");
// console.log(data.address.street);  



// const path=require("node:path");
// console.log(__filename);
// console.log(__dirname);

// //return file name
// console.log(path.basename(__filename));
// console.log(path.basename(__dirname));

// //return extention of file
// console.log(path.extname(__filename));
// console.log(path.extname(__dirname));


// console.log(path.parse(__filename));



// function abc(name){
// console.log(`hello ${name}`);
// }

// function xyz(abcFn){
//     const name=Palash;
//     abcFn(name);
// };

// xyz(abc);





const EventEmitter=require("node:events");

const emitter=new EventEmitter();

emitter.on("order-pizza",(size,topping)=>{
    console.log(`Order recived! Baking a ${size} pizza with ${topping}`);
})

emitter.emit("order-pizza","large","onion");