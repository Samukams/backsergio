// const url = "http://localhost:3000/func";

// import { application } from "express";

// async function relfunc() {
//     const resp = await fetch(url);
//     //console.log(resp);
//     if(resp.status == 200){
//         const obj = await resp.json();
//         console.log(obj);
//     }
// }

// relfunc();

const form = document.getElementById("formFunc");
const msg = document.getElementById("msg");

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const func = {
        nome: document.getElementById("nome").value,
        cod_setor: Number(document.getElementById("setor").value),
        salario: Number(document.getElementById("salario").value),
        email: document.getElementById("email").value,
        senha: document.getElementById("senha").value
    };
    try {
        const response = await fetch("http://localhost:3000/func/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(func)
        });
        if(response.status == 201){
            msg.textContent = "Funcionário cadastrado com sucesso";
            msg.style.color = "green";
            form.reset();
        }else{
            msg.textContent = "Erro ao cadastrar o funcionário";
            msg.style.color = "red";
    }
    } catch (err) {
        msg.textContent = "Erro de conexão com o servidor";
        msg.style.color = "red";
        console.error(err);
    }
});

document.getElementById("listaFunc").addEventListener("click", async () => {
  try {
    const res = await fetch("http://localhost:3000/func/");
    const dados = await res.json();

    const nomes = dados.map(f => `${f.matricula} ${f.nome}`).join(", ");

    msg.textContent = "Funcionários: " + nomes;
    msg.style.color = "blue";

  } catch (err) {
    msg.textContent = "Erro ao carregar os dados";
    msg.style.color = "red";
  }
});

document.getElementById("deletarFunc").addEventListener("click", async () => {
  const id = document.getElementById("idDelete").value;

  if (!id) {
    msg.textContent = "Digite o ID";
    msg.style.color = "red";
    return;
  }

  try {
    const res = await fetch(`http://localhost:3000/func/${id}`, {
      method: "DELETE"
    });

    if (res.status === 200 || res.status === 204) {
      msg.textContent = "Deletado com sucesso";
      msg.style.color = "green";
      document.getElementById("idDelete").value = "";
    } else {
      msg.textContent = "Erro ao deletar";
      msg.style.color = "red";
    }

  } catch (err) {
    msg.textContent = "Erro na requisição";
    msg.style.color = "red";
  }
});