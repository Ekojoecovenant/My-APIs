import { string } from "@deveko/utils";

let name = "covenant";
let movie = "the name of my bankai is tensa zangetsu";

name = string.capitalize(name);
movie = string.truncate(movie, 10);

console.log(name);
console.log(movie);
console.log(string.kebabCase("Yoooo Whats      up my-';'.'.'.'.|bro"));
