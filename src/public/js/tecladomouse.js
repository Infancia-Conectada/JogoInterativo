function showInfo(type) {
  const infoBox = document.getElementById("infoBox");
  infoBox.classList.remove("hidden");

  if (type === "keyboard") {
    infoBox.innerHTML = `
      <h3>O que é um Teclado?</h3>
      <p>O teclado é como uma máquina de escrever mágica! Ele tem botões com letras, números e símbolos. Usamos ele para escrever, jogar e até conversar com o computador!</p>
    `;
  } else if (type === "mouse") {
    infoBox.innerHTML = `
      <h3>O que é um Mouse?</h3>
      <p>O mouse é como uma varinha mágica! Você o move com a mão e ele faz o ponteiro se mexer na tela. Com ele, você pode clicar, arrastar e brincar com o computador!</p>
    `;
  }
}