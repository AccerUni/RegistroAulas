import { db, collection, getDocs } from "./firebase.js";

// 📌 Função para obter o parâmetro da URL (ex: "materia=anatomia")
function obterParametro(nome) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(nome);
}

// 🏥 Obtém a matéria da URL (ex: anatomia, fisiologia...)
const materia = obterParametro("materia");

async function carregarAulas() {
    const tabelaCorpo = document.getElementById("tabela-corpo");

    if (!materia) {
        console.error("Nenhuma matéria selecionada!");
        tabelaCorpo.innerHTML = "<tr><td colspan='3'>Selecione uma matéria</td></tr>";
        return;
    }

    try {
        const querySnapshot = await getDocs(collection(db, materia));
        tabelaCorpo.innerHTML = ""; // Limpa a tabela antes de preencher

        let aulas = [];

        querySnapshot.forEach((doc) => {
            aulas.push(doc.data());
        });

        // Ordena as aulas pela data da mais recente para a mais antiga
        aulas.sort((a, b) => new Date(b.dataAula) - new Date(a.dataAula));

        // Adiciona as aulas ordenadas na tabela
        aulas.forEach(({ dataAula, conteudo, nomeArquivo, linkArquivo, nomeGravacao, linkGravacao }) => {
            const linha = `
                <tr>
                    <td>${dataAula}</td>
                    <td>${conteudo}</td>
                    <td>${nomeArquivo ? nomeArquivo : "Sem arquivo"}</td>
                    <td>${linkArquivo ? `<a href="${linkArquivo}" target="_blank">📄 Abrir Arquivo</a>` : "Sem Link"}</td>
                    <td>${nomeGravacao ? nomeGravacao : "Sem gravação"}</td>
                    <td>${linkGravacao ? `<a href="${linkGravacao}" target="_blank">🎥 Ver Gravação</a>` : "Sem Link"}</td>
                </tr>`;
            tabelaCorpo.innerHTML += linha;
        });

    } catch (error) {
        console.error("Erro ao carregar aulas:", error);
    }
}

// 🔄 Garante que os dados carreguem ao abrir a página
window.addEventListener("load", carregarAulas);
