const API="https://script.google.com/macros/s/AKfycbynYN8XS4Y5bx9XPzqCiSQsnHkJ25WFlhPmnnW-j-pG_UAVzgFZLEszYQLpY_GFGx0/exec"

const form=document.getElementById("form")

// pegar inputs corretamente
const empresa = document.getElementById("empresa")
const bairro = document.getElementById("bairro")
const valor = document.getElementById("valor")
const pagamento = document.getElementById("pagamento")

// formatar dinheiro BR
function formatar(v){
return v.toLocaleString("pt-BR",{style:"currency",currency:"BRL"})
}

form.addEventListener("submit",async e=>{

e.preventDefault()

// validar campos
if(!empresa.value || !bairro.value || !valor.value){
alert("Preencha todos os campos!")
return
}

const dados={
empresa:empresa.value,
bairro:bairro.value,
valor:Number(valor.value),
pagamento:pagamento.value
}

await fetch(API,{
method:"POST",
body:JSON.stringify(dados)
})

form.reset()

// pequeno delay pra garantir atualização
setTimeout(carregar,500)

})


async function carregar(){

const res=await fetch(API)
const dados=await res.json()

let total=0
let dinheiro=0
let pix=0
let pendente=0
let despesas=0
let entregas=0

let bairros={}
let empresas={}

dados.forEach(e=>{

const valor = Number(e.valor) || 0

if(e.pagamento=="despesa"){

despesas+=valor

}else{

total+=valor
entregas++

if(e.pagamento=="dinheiro"){
dinheiro+=valor
}

if(e.pagamento=="pix"){
pix+=valor
}

if(e.pagamento=="pendente"){
pendente+=valor
}

}

// mantém como você pediu (sem filtro vazio)
bairros[e.bairro]=(bairros[e.bairro]||0)+1
empresas[e.empresa]=(empresas[e.empresa]||0)+1

})

let valorDia = total - despesas
let faturamento = total

// usando formatação correta
document.getElementById("total").innerText = formatar(valorDia)
document.getElementById("faturamento").innerText = formatar(faturamento)
document.getElementById("dinheiro").innerText = formatar(dinheiro)
document.getElementById("pix").innerText = formatar(pix)
document.getElementById("pendente").innerText = formatar(pendente)
document.getElementById("despesa").innerText = formatar(despesas)
document.getElementById("entregas").innerText = entregas


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