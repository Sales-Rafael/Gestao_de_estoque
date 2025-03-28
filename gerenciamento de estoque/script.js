function registrarRetirada() {
  var planilha = SpreadsheetApp.getActiveSpreadsheet();
  var estoque = planilha.getSheetByName("Inserir_retirada"); // Mantém a planilha de origem
  var registro = planilha.getSheetByName("Registro_de_retirada"); // Nova planilha de destino

  if (!estoque || !registro) {
    SpreadsheetApp.getUi().alert("Erro: Verifique se os nomes das abas estão corretos!");
    return;
  }

  var codigoProduto = estoque.getRange("B3").getValue(); // Mantém a origem dos dados
  var codigoColaborador = estoque.getRange("C3").getValue(); // Mantém a origem dos dados

  // Verifica se os campos estão preenchidos
  if (!codigoProduto || !codigoColaborador) {
    SpreadsheetApp.getUi().alert("Preencha os campos B3 e C3 antes de registrar.");
    return;
  }

  // Verifica se o código do produto é um número e está no intervalo permitido
  if (isNaN(codigoProduto) || codigoProduto < 102 || codigoProduto > 147) {
    SpreadsheetApp.getUi().alert("Erro: O código do produto deve ser um número entre 102 e 147.");
    return;
  }

  // Encontrar a primeira linha vazia a partir da linha 3 na coluna C (nova estrutura)
  var ultimaLinha = 3; // Começa da linha 3
  var dadosColunaC = registro.getRange("C3:C").getValues(); // Obtém os valores da coluna C

  for (var i = 0; i < dadosColunaC.length; i++) {
    if (!dadosColunaC[i][0]) { // Se encontrar uma célula vazia
      ultimaLinha = i + 3; // Ajusta para a linha correta na planilha
      break;
    }
  }

  var dataHoraAtual = new Date();

  // Geração de código de retirada único
  var codigoRetirada;
  var codigosExistentes = registro.getRange("B3:B").getValues().flat();
  do {
    codigoRetirada = Math.floor(10000 + Math.random() * 90000);
  } while (codigosExistentes.includes(codigoRetirada));

  // Registra os dados na nova tabela
  registro.getRange(ultimaLinha, 2).setValue(codigoRetirada); // Coluna B: Código de Retirada
  registro.getRange(ultimaLinha, 3).setValue(codigoProduto); // Coluna C: Código do Produto
  registro.getRange(ultimaLinha, 4).setValue(codigoColaborador); // Coluna D: Código do Colaborador
  registro.getRange(ultimaLinha, 5).setValue(dataHoraAtual); // Coluna E: Data/Hora da Retirada
  registro.getRange(ultimaLinha, 5).setNumberFormat("dd/MM/yyyy HH:mm"); // Formatação de data

  SpreadsheetApp.getUi().alert("Retirada registrada com sucesso! Código de retirada: " + codigoRetirada);

  // Limpa os campos B3 e C3 em "Inserir_retirada"
  estoque.getRange("B3:C3").clearContent();
}

function registrarDevolucao() {
  var planilha = SpreadsheetApp.getActiveSpreadsheet();
  var estoque = planilha.getSheetByName("Devolucao"); // Planilha onde o código de retirada será pego
  var registro = planilha.getSheetByName("Registro_de_retirada"); // Planilha de registro de retirada

  if (!estoque || !registro) {
    SpreadsheetApp.getUi().alert("Erro: Verifique se as abas 'Devolucao' e 'Registro_de_retirada' existem.");
    return;
  }

  var codigoRetirada = estoque.getRange("B3").getValue(); // Pega o código de retirada da célula B3

  if (!codigoRetirada) {
    SpreadsheetApp.getUi().alert("Erro: Não há código de retirada em B3.");
    return;
  }

  var dadosColunaB = registro.getRange("B3:B").getValues(); // Obtém os valores da coluna B (código de retirada)
  var linhaEncontrada = -1;

  // Procura o código de retirada
  for (var i = 0; i < dadosColunaB.length; i++) {
    if (dadosColunaB[i][0] == codigoRetirada) {
      linhaEncontrada = i + 3; // Ajusta para a linha correta na planilha
      break;
    }
  }

  if (linhaEncontrada == -1) {
    SpreadsheetApp.getUi().alert("Erro: Código de retirada não encontrado.");
    return;
  }

  // Verifica se já existe uma data de devolução na coluna F
  var dataDevolucaoExistente = registro.getRange(linhaEncontrada, 6).getValue();
  if (dataDevolucaoExistente) {
    SpreadsheetApp.getUi().alert("Erro: Este código de retirada já foi devolvido.");
    return;
  }

  var dataHoraDevolucao = new Date(); // Data e hora atual

  // Insere a data e hora de devolução na coluna F
  registro.getRange(linhaEncontrada, 6).setValue(dataHoraDevolucao);
  registro.getRange(linhaEncontrada, 6).setNumberFormat("dd/MM/yyyy HH:mm"); // Formatação de data

  // Apaga o código de retirada de B3
  estoque.getRange("B3").clearContent();

  SpreadsheetApp.getUi().alert("Devolução registrada com sucesso! Código de retirada: " + codigoRetirada);
}
