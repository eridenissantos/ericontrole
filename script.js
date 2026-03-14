const API="https://script.google.com/macros/s/AKfycbynYN8XS4Y5bx9XPzqCiSQsnHkJ25WFlhPmnnW-j-pG_UAVzgFZLEszYQLpY_GFGx0/exec"

const form=document.getElementById("form")

form.addEventListener("submit",async e=>{

e.preventDefault()

const dados={

empresa:empresa.value,
bairro:bairro.value,
valor:valor.value,
pagamento:pagamento.value

}

await fetch(API,{
method:"POST",
body:JSON.stringify(dados)
})

form.reset()

carregar()

})


async function carregar(){

const res=await fetch(API)

const dados=await res.json()

let total=0
let dinheiro=0
let pix=0
let pendente=0
let entregas=dados.length

let bairros={}
let empresas={}

dados.forEach(e=>{

total+=Number(e.valor)

if(e.pagamento=="dinheiro"){
dinheiro+=Number(e.valor)
}
if(e.pagamento=="pix"){
pix+=Number(e.valor)
}
if(e.pagamento=="pendente"){
pendente+=Number(e.valor)
}

bairros[e.bairro]=(bairros[e.bairro]||0)+1

empresas[e.empresa]=(empresas[e.empresa]||0)+1

})




document.getElementById("total").innerText="R$ "+total
document.getElementById("dinheiro").innerText="R$ "+dinheiro
document.getElementById("pix").innerText="R$ "+pix
document.getElementById("pendente").innerText="R$ "+pendente
document.getElementById("entregas").innerText=entregas


const tbBairros=document.getElementById("bairros")
tbBairros.innerHTML=""

for(let b in bairros){

tbBairros.innerHTML+=`

<tr>
<td>${b}</td>
<td>${bairros[b]}</td>
</tr>

`

}

const tbEmpresas=document.getElementById("empresas")
tbEmpresas.innerHTML=""

for(let e in empresas){

tbEmpresas.innerHTML+=`

<tr>
<td>${e}</td>
<td>${empresas[e]}</td>
</tr>

`

}

}

carregar()