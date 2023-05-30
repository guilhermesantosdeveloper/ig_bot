function formatarDataBrasileira(data) {
  const dia = String(data.getDate()).padStart(2, '0');
  const mes = String(data.getMonth() + 1).padStart(2, '0');
  const ano = String(data.getFullYear());

  return `${dia}/${mes}/${ano}`;
}

// Exemplo de uso:
// const data = new Date();
// const dataFormatada = formatarDataBrasileira(data);
// console.log(dataFormatada);


function converterStringParaData(dataString) {
  const partes = dataString.split('/');
  const dia = parseInt(partes[0], 10);
  const mes = parseInt(partes[1], 10) - 1; // Subtrai 1 do mês, pois em objetos Date o mês é baseado em zero (janeiro = 0)
  const ano = parseInt(partes[2], 10);

  return new Date(ano, mes, dia);
}

// Exemplo de uso:
const dataFormatada = '30/05/2023';
const data = converterStringParaData(dataFormatada);
console.log(data);
