const env = process.env.NODE_ENV;
console.log(env);
console.log("hola");

const messagediv = document.querySelector("#message");
const extra = document.createElement("div");
extra.textContent = "Soy el extra";
messagediv!.append(extra);
