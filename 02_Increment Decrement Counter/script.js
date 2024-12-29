const inc = document.querySelector("#inc");
const dec = document.querySelector("#dec");
const counter = document.querySelector("#counter");
const clear = document.querySelector("#clr");
const range = document.querySelectorAll("input");
const incUpdateBtn = document.querySelector("#incUpdate");
const decUpdateBtn = document.querySelector("#decUpdate");

inc.addEventListener("click", () => {
  counter.innerText = parseInt(counter.innerText) + 1;
});

dec.addEventListener("click", () => {
  counter.innerText = parseInt(counter.innerText) - 1;
});

incUpdateBtn.addEventListener("click", ()=>{
  rangeIncrement();
});

decUpdateBtn.addEventListener("click", ()=>{
  rangeDecrement();
});

function rangeIncrement() {
  if(range[0].value === ""){
    return alert("Give Any Number For Increment!");
  }
  counter.innerText = parseInt(range[0].value) + parseInt(counter.innerText);
  range[0].value = "";
}

function rangeDecrement() {
  if(range[1].value === ""){
    return alert("Give Any Number For Decrement!");
  }
  counter.innerText = parseInt(counter.innerText) - parseInt(range[1].value);
  range[1].value = "";
}

//clear.onclick = (() => counter.innerText = 0);
clear.addEventListener("click",()=>{
  counter.innerText = 0;
})