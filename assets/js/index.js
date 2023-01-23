if(localStorage.getItem('token') == null){
  alert('Você precisa estar logado para acessar essa página')
  window.location.href = '../html/login.html'
}


let userLogado = JSON.parse(localStorage.getItem('userLogado')) 

let logado = document.querySelector('#logado')
logado.innerHTML = `Olá ${userLogado.nome}`;


const modal = document.querySelector('.modal-container')
const tbody = document.querySelector('tbody')
const sNome = document.querySelector('#m-nome')
const sRecado = document.querySelector('#m-recado')
const sPix = document.querySelector('#m-pix')
const btnSalvar = document.querySelector('#btnSalvar')

let itens
let id

function openModal(edit = false, index = 0) {
modal.classList.add('active')

modal.onclick = e => {
  if (e.target.className.indexOf('modal-container') !== -1) {
    modal.classList.remove('active')
  }
}

if (edit) {
  sNome.value = itens[index].nome
  sRecado.value = itens[index].recado
  sPix.value = itens[index].pix
  id = index
} else {
  sNome.value = ''
  sRecado.value = ''
  sPix.value = ''
}

}

function editItem(index) {

openModal(true, index)
}

function deleteItem(index) {
itens.splice(index, 1)
setItensBD()
loadItens()
}

function insertItem(item, index) {
let tr = document.createElement('tr')

tr.innerHTML = `
  <td>${item.nome}</td>
  <td>${item.recado}</td>
  <td>R$ ${item.pix}</td>
  <td class="acao">
    <button onclick="editItem(${index})"><i class='bx bx-edit' ></i></button>
  </td>
  <td class="acao">
    <button onclick="deleteItem(${index})"><i class='bx bx-trash'></i></button>
  </td>
`
tbody.appendChild(tr)
}

btnSalvar.onclick = e => {

if (sNome.value == '' || sRecado.value == '' || sPix.value == '') {
  return
}

e.preventDefault();

if (id !== undefined) {
  itens[id].nome = sNome.value
  itens[id].recado = sRecado.value
  itens[id].pix = sPix.value
} else {
  itens.push({'nome': sNome.value, 'recado': sRecado.value, 'pix': sPix.value})
}

setItensBD()

modal.classList.remove('active')
loadItens()
id = undefined
}

function loadItens() {
itens = getItensBD()
tbody.innerHTML = ''
itens.forEach((item, index) => {
  insertItem(item, index)
})

}

const getItensBD = () => JSON.parse(localStorage.getItem('dbfunc')) ?? []
const setItensBD = () => localStorage.setItem('dbfunc', JSON.stringify(itens))

loadItens();


function sair(){
  alert('tem certeza que deseja sair?')
  if(alert){
  localStorage.removeItem('token')
  localStorage.removeItem('userLogado')
  window.location.href = '../html/login.html'
  }
}