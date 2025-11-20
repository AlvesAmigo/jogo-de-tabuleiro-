function rolarDados() {
    // 1. Pega os valores de entrada do usuário
    const numDadosInput = document.getElementById('numDados');
    const dificuldadeInput = document.getElementById('dificuldade');
    const resultadoDiv = document.getElementById('resultado');

    const numDados = parseInt(numDadosInput.value);
    const dificuldade = parseInt(dificuldadeInput.value);

    // Validação básica
    if (isNaN(numDados) || numDados < 1 || isNaN(dificuldade) || dificuldade < 1) {
        resultadoDiv.innerHTML = '<p class="falha">Por favor, insira valores válidos para Dados e Dificuldade (mínimo 1).</p>';
        return;
    }

    let totalAcertos = 0;
    const rolagens = []; // Array para armazenar o resultado de cada dado

    // 2. Loop para rolar cada dado
    for (let i = 0; i < numDados; i++) {
        // Gera um número aleatório de 1 a 6
        const resultadoDado = Math.floor(Math.random() * 6) + 1;
        let acertosDado = 0;
        let tipoResultado = '';

        // 3. Aplica a Regra Customizada
        if (resultadoDado >= 1 && resultadoDado <= 3) {
            acertosDado = 0;
            tipoResultado = 'ERRO';
        } else if (resultadoDado === 4 || resultadoDado === 5) {
            acertosDado = 1;
            tipoResultado = 'ACERTO';
        } else if (resultadoDado === 6) {
            acertosDado = 2; // ACERTO DUPLO = 2 ACERTOS
            tipoResultado = 'ACERTO DUPLO';
        }

        totalAcertos += acertosDado;
        
        // Armazena a rolagem para exibição
        rolagens.push(`[D${i + 1}: ${resultadoDado} -> ${tipoResultado}]`);
    }

    // 4. Determina o Sucesso/Falha do Teste
    let mensagemFinal = '';
    let classeResultado = '';

    if (totalAcertos >= dificuldade) {
        const excesso = totalAcertos - dificuldade;
        mensagemFinal = `<span class="acerto">SUCESSO!</span> Você obteve **${totalAcertos}** acertos (Dificuldade: ${dificuldade}).`;
        if (excesso > 0) {
            mensagemFinal += `<br>Sobraram **${excesso}** acertos!`;
        }
        classeResultado = 'acerto';
    } else {
        mensagemFinal = `<span class="falha">FALHA.</span> Você obteve **${totalAcertos}** acertos (Dificuldade: ${dificuldade}).`;
        classeResultado = 'falha';
    }

    // 5. Monta a exibição do resultado
    let htmlResultado = `
        <p class="${classeResultado}">${mensagemFinal}</p>
        <p>Rolagens Detalhadas: ${rolagens.join(' ')}</p>
    `;

    resultadoDiv.innerHTML = htmlResultado;
}