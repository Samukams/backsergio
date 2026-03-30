import { Pool } from "pg";
export async function connect(){

    if(global.connection){
        return global.connection.connect();
    }

    const pool = new Pool({
        connectionString: process.env.CONNECTION_STRING,
    });


const client = await pool.connect();
console.log("Criou o pool de conexão");

    const res = await client.query("SELECT now()")
    console.log(res.rows[0])
    client.release();

    global.connection = pool;
    return pool.connect();
}

export async function listaFunc(){
    const client = await connect();
    const res = await client.query("SELECT * FROM funcionario");
    return res.rows;
}

export async function insereFunc(fun){
    const client = await connect();
    const sql = " INSERT INTO FUNCIONARIO VALUES (DEFAULT, $1, $2, $3, $4, $5)"
    await client.query (sql, [fun.nome, fun.cod_setor, fun.salario, fun.email, fun.senha]
    );
}

export async function alteraFunc(id, fun){
    const client = await connect();
    const sql = "UPDATE FUNCIONARIO SET NOME = $1, COD_SETOR = $2, SALARIO = $3, email = $4 WHERE MATRICULA = $5"
    await client.query(sql, [fun.nome, fun.cod_setor, fun.salario, fun.email, id]);
}

export async function deletaFunc(id){
    const client = await connect();
    const sql = "DELETE FROM FUNCIONARIO WHERE MATRICULA = $1";
    await client.query(sql, [id]);
}

connect();