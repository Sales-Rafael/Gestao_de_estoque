# Sistema de Gestão de Estoque  

Este é um sistema de gestão de estoque desenvolvido em **Excel** e **JavaScript** (usando **Google Apps Script**) para automatizar o registro de retiradas e devoluções de produtos. O sistema foi projetado para garantir precisão, rastreabilidade e simplicidade no controle de estoque.  

---

## 🚀 Funcionalidades  

### ✅ **Registro de Retirada**  
- O sistema permite registrar a retirada de um produto de forma automatizada.  
- Cada retirada recebe um **código de identificação único** gerado automaticamente.  
- Validação de código do produto e código do colaborador para garantir a integridade dos dados.  

### ✅ **Registro de Devolução**  
- A devolução de produtos é registrada com base no código de retirada.  
- O sistema verifica se o código é válido e se o produto já foi devolvido.  
- A data e o horário da devolução são registrados automaticamente.  

### ✅ **Interface Intuitiva**  
- O sistema é baseado em **Google Sheets**, permitindo fácil acesso e organização dos dados.  
- As retiradas e devoluções são registradas em abas específicas da planilha.  
- Os dados são validados para evitar erros e garantir a precisão das informações.  

---

## 🛠️ Tecnologias Utilizadas  
- **Excel** – Para interface de entrada e saída de dados.  
- **JavaScript** – Para automatização das funções usando **Google Apps Script**.  
- **Google Sheets** – Para armazenar e organizar os dados de retirada e devolução.  

---

## 📂 Estrutura do Projeto  
```markdown
📦 Sistema de Gestão de Estoque  
├── 📄 gerenciamento de estoque.xlsx → Arquivo da planilha com abas para retirada, devolução e registro  
├── 📄 script.js → Código em Google Apps Script para registrar retiradas e devoluções  
└── 📄 README.md → Documentação do projeto  
```  

---

## 📋 Detalhes de Funcionamento  

### **1. Registro de Retirada**  
- Os dados de retirada (código do produto e código do colaborador) devem ser preenchidos nas células **B3** e **C3** na aba **"Inserir_retirada"**.  
- Após preencher os campos, o sistema:  
  - Gera um código de retirada único.  
  - Verifica se o código do produto é válido (entre **102** e **147**).  
  - Registra a data e a hora da retirada.  
  - Salva os dados na aba **"Registro_de_retirada"**.  
  - Exibe um alerta confirmando o sucesso da operação.  

**Exemplo de Código:**  
```javascript
if (isNaN(codigoProduto) || codigoProduto < 102 || codigoProduto > 147) {
    SpreadsheetApp.getUi().alert("Erro: O código do produto deve ser um número entre 102 e 147.");
    return;
}
```  

---

### **2. Registro de Devolução**  
- O código de retirada deve ser preenchido na célula **B3** na aba **"Devolucao"**.  
- Após preencher o campo, o sistema:  
  - Verifica se o código de retirada existe.  
  - Garante que o código não tenha sido devolvido anteriormente.  
  - Registra a data e hora da devolução.  
  - Salva os dados na aba **"Registro_de_retirada"**.  
  - Exibe um alerta confirmando o sucesso da operação.  

**Exemplo de Código:**  
```javascript
if (linhaEncontrada == -1) {
    SpreadsheetApp.getUi().alert("Erro: Código de retirada não encontrado.");
    return;
}
```  

---

## 🎯 Validações e Regras de Negócio  
✅ O código do produto deve estar entre **102** e **147**.  
✅ O código de retirada deve ser único e não pode ser reutilizado.  
✅ Um código de retirada já registrado como devolvido não pode ser registrado novamente.  
✅ Todos os dados de retirada e devolução são salvos automaticamente na aba **"Registro_de_retirada"**.  

---

## 🚨 Possíveis Erros e Alertas  
❌ Código do produto inválido ou fora do intervalo permitido.  
❌ Código de retirada inexistente ou já devolvido.  
❌ Campos obrigatórios não preenchidos.  

---

## 🏆 Aprendizados e Melhorias Futuras  
Este projeto foi uma excelente oportunidade para aprimorar minhas habilidades em:  
- Programação em **JavaScript** com **Google Apps Script**.  
- Automação de processos em **Excel** e **Google Sheets**.  
- Validação e tratamento de erros para garantir a integridade dos dados.  

---

## 🚀 Como Executar o Projeto  
1. Abra o arquivo **gerenciamento de estoque.xlsx** no Google Sheets.  
2. Acesse o menu **Extensões > Apps Script**.  
3. Cole o código do arquivo **script.js** no editor do Apps Script.  
4. Salve e autorize as permissões necessárias.  
5. Preencha os campos conforme descrito nos detalhes de funcionamento.  
