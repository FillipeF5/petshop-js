const moment = require('moment');
const fs = require('fs');
const { Console } = require('console');
const nomeArquivo = 'pets.json';
const Petshop = "=== PETSHOP DH ===";
console.log(Petshop);

let petsJSON = fs.readFileSync(nomeArquivo); //lê o conteúdo do arquivo json
let arquivoPets = JSON.parse(petsJSON); // converte para JSON

const atualizarJson = () => {
    let listaJson = JSON.stringify(arquivoPets, null, 2); //converte o objeto literal para JSON
    fs.writeFileSync(nomeArquivo, listaJson, 'utf-8' ); // caminho arquivo, conteudo novo , formato
}

const listarPets = (listaDePets) => {
    for (let i=0; i<listaDePets.length; i++){
        console.log(`${listaDePets[i].nome} , ${listaDePets[i].idade} anos, ${listaDePets[i].raca} , ${listaDePets[i].tipo} , ${(listaDePets[i].vacinado) ? 'vacinado' : 'não vacinado'}`);
        
        for (let abc=0; abc<listaDePets[i].servicos.length; abc++){
        console.log(`${listaDePets[i].servicos[abc].data} - ${listaDePets[i].servicos[abc].nome}`);
        }
    }
};
//listarPets(pets);

const campanhaVacina = (listaPets) => {
    let totalVacinados = 0;
    for (var i = 0; i<listaPets.length; i++) {
        if (!listaPets[i].vacinado) {
            listaPets[i].vacinado = true;
            totalVacinados++;
        }
    }
    atualizarJson();
    console.log(`Parabéns, ${totalVacinados} pets foram vacinado nesta campanha.`);
};
// campanhaVacina(arquivoPets.pets);

const vacinarPet = (pet) => {
    if (!pet.vacinado) {
        pet.vacinado = true;
        atualizarJson();
        console.log(`${pet.nome} foi vacinado com sucesso!`);
    } else {
        console.log(`Ops, ${pet.nome} já está vacinado!`);
    }
}
// vacinarPet(arquivoPets.pets[2]);

const darBanho = (pet) => {
    pet.servicos.push({
        nome: 'banho',
        data: moment().format('DD-MM-YYYY')
    });
    atualizarJson();
    console.log(`${pet.nome} está limpo(a)`);
}
// darBanho(arquivoPets.pets[0]);

const tosarPet = (pet) => {
    pet.servicos.push({
        nome: 'tosa',
        data: moment().format('DD-MM-YYYY')
    });
    atualizarJson();
    console.log(`${pet.nome} está tosado(a)`);
};
// tosarPet(arquivoPets.pets[1]);

const apararUnhas = (pet) => {
    pet.servicos.push({
        nome: 'unhas',
        data: moment().format('DD-MM-YYYY')
    })
    atualizarJson();
    console.log(`${pet.nome} está com as unhas cortadas`);
};
// apararUnhas(arquivoPets.pets[4]);

const buscarPet = (nomePet) => {
    const petEncontrado = arquivoPets.pets.find((pet) => {
        return pet.nome == nomePet;
    });
    console.log(petEncontrado ? petEncontrado : `Nenhum pet encontrado com o nome ${nomePet} `);
}
// buscarPet('Jack');

const atenderCliente = (pet, servico) => {
    console.log(`Olá, ${pet.nome}!`);
    servico(pet);
    console.log('Até breve!');
}
// atenderCliente(arquivoPets.pets[0], darBanho);

const castracao = (listaPets) => {
    arquivoPets.pets = listaPets.map((pet) => {
        pet.castrado = true;
        return pet;
    });
    atualizarJson();
}
// castracao();

const listarVacinados = () => {
    console.log('** VACINADO **');
        let vacinados = arquivoPets.pets.filter((pet) => {
        return pet.vacinado;
    });
    console.log(vacinados);
    console.log(`Temos ${vacinados.length} pets vacinados !`);
}
// listarVacinados();


//listarPets(arquivoPets.pets);

// adicionarPet({
//     nome: 'Rex', 
//     idade: 1, 
//     raca: 'Maltes', 
//     tipo: 'cachorro', 
//     vacinado: false,
//     genero: 'M',
//     servicos: []
// }); 