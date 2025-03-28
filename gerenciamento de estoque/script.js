function registrarRetirada() {
    var planilha = SpreadsheetApp.getActiveSpreadsheet();
    var estoque = planilha.getSheetByName("Inserir_retirada");
    var registro = planilha.getSheetByName("Registro_de_retirada");

    if (!estoque || !registro) {
        SpreadsheetApp.getUi().alert("Erro: Verifique se os nomes das abas estão corretos!");
        return;
    }

    var codigoProduto = estoque.getRange("B3").getValue();
    var codigoColaborador = estoque.getRange("C3").getValue();

    if (!codigoProduto || !codigoColaborador) {
        SpreadsheetApp.getUi().alert("Preencha os campos B3 e C3 antes de registrar.");
        return;
    }

    if (isNaN(codigoProduto) || codigoProduto < 102 || codigoProduto > 147) {
        SpreadsheetApp.getUi().alert("Erro: O código do produto deve ser um número entre 102 e 147.");
        return;
    }

    var ultimaLinha = 3;
    var dadosColunaC = registro.getRange("C3:C").getValues();

    for (var i = 0; i < dadosColunaC.length; i++) {
        if (!dadosColunaC[i][0]) {
            ultimaLinha = i + 3;
            break;
        }
    }

    var dataHoraAtual = new Date();

    var codigoRetirada;
    var codigosExistentes = registro.getRange("B3:B").getValues().flat();
    do {
        codigoRetirada = Math.floor(10000 + Math.random() * 90000);
    } while (codigosExistentes.includes(codigoRetirada));

    registro.getRange(ultimaLinha, 2).setValue(codigoRetirada);
    registro.getRange(ultimaLinha, 3).setValue(codigoProduto);
    registro.getRange(ultimaLinha, 4).setValue(codigoColaborador);
    registro.getRange(ultimaLinha, 5).setValue(dataHoraAtual);
    registro.getRange(ultimaLinha, 5).setNumberFormat("dd/MM/yyyy HH:mm");

    SpreadsheetApp.getUi().alert("Retirada registrada com sucesso! Código de retirada: " + codigoRetirada);

    estoque.getRange("B3:C3").clearContent();
}

function registrarDevolucao() {
    var planilha = SpreadsheetApp.getActiveSpreadsheet();
    var estoque = planilha.getSheetByName("Devolucao");
    var registro = planilha.getSheetByName("Registro_de_retirada");

    if (!estoque || !registro) {
        SpreadsheetApp.getUi().alert("Erro: Verifique se as abas 'Devolucao' e 'Registro_de_retirada' existem.");
        return;
    }

    var codigoRetirada = estoque.getRange("B3").getValue();

    if (!codigoRetirada) {
        SpreadsheetApp.getUi().alert("Erro: Não há código de retirada em B3.");
        return;
    }

    var dadosColunaB = registro.getRange("B3:B").getValues();
    var linhaEncontrada = -1;

    for (var i = 0; i < dadosColunaB.length; i++) {
        if (dadosColunaB[i][0] == codigoRetirada) {
            linhaEncontrada = i + 3;
            break;
        }
    }

    if (linhaEncontrada == -1) {
        SpreadsheetApp.getUi().alert("Erro: Código de retirada não encontrado.");
        return;
    }

    var dataDevolucaoExistente = registro.getRange(linhaEncontrada, 6).getValue();
    if (dataDevolucaoExistente) {
        SpreadsheetApp.getUi().alert("Erro: Este código de retirada já foi devolvido.");
        return;
    }

    var dataHoraDevolucao = new Date();

    registro.getRange(linhaEncontrada, 6).setValue(dataHoraDevolucao);
    registro.getRange(linhaEncontrada, 6).setNumberFormat("dd/MM/yyyy HH:mm");

    estoque.getRange("B3").clearContent();

    SpreadsheetApp.getUi().alert("Devolução registrada com sucesso! Código de retirada: " + codigoRetirada);
}
