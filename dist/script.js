function Quadrado(props) {
  return (
    React.createElement("button", { className: "quadrado", onClick: props.onClick },
    props.value));


}

class Tabuleiro extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.vanillaState();
  }

  vanillaState() {
    return { quadrados: Array(9).fill(null), xIsNext: true };
  }

  reset() {this.setState(this.vanillaState());}

  generateRandomInt() {
    const min = 0;
    const max = 8;
    const Rand = min + Math.random() * (max - min);
    const n = Math.floor(Math.random() * (5 + 1));
    return n;
  }

  random() {

    const quadrados = this.state.quadrados.slice();
    let n = this.generateRandomInt();

    while (1) {
      let n = this.generateRandomInt();
      if (calculateWinner(this.state.quadrados)) {
        alert('Jogo já acabou');
        break;
      }
      if (!quadrados[n]) {
        quadrados[n] = this.state.xIsNext ? 'X' : '0';
        this.setState({
          quadrados: quadrados,
          xIsNext: !this.state.xIsNext });

        break;
      }
    }

  }

  handleClick(i) {
    //faz uma cópia do vetor
    const quadrados = this.state.quadrados.slice();
    if (calculateWinner(quadrados)) {
      alert('Jogo já acabou');
      return;
    }
    if (quadrados[i]) {
      alert('Quadrado ocupado!');
      return;
    }

    quadrados[i] = this.state.xIsNext ? 'X' : '0';
    this.setState({
      quadrados: quadrados,
      xIsNext: !this.state.xIsNext });

  }

  renderizarQuadrado(i) {
    return (
      React.createElement(Quadrado, {
        value: this.state.quadrados[i],
        onClick: () => this.handleClick(i) }));


  }

  render() {
    const vencedor = calculateWinner(this.state.quadrados);
    let status;
    if (vencedor) {
      status = 'Vencedor: ' + vencedor;
    } else
    {
      status = 'Jogador: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      React.createElement("div", null,
      React.createElement("div", { className: "status" }, status),
      React.createElement("div", { className: "board-row" },
      this.renderizarQuadrado(0),
      this.renderizarQuadrado(1),
      this.renderizarQuadrado(2)),

      React.createElement("div", { className: "board-row" },
      this.renderizarQuadrado(3),
      this.renderizarQuadrado(4),
      this.renderizarQuadrado(5)),

      React.createElement("div", { className: "board-row" },
      this.renderizarQuadrado(6),
      this.renderizarQuadrado(7),
      this.renderizarQuadrado(8)),

      React.createElement("button", { onClick: () => this.reset() }, " Reset "),
      React.createElement("button", { onClick: () => this.random() }, " Random play ")));


  }}


class Jogo extends React.Component {
  render() {
    return (
      React.createElement("div", { className: "game" },
      React.createElement("div", { className: "game-board" },
      React.createElement(Tabuleiro, null)),

      React.createElement("div", { className: "game-info" },
      React.createElement("div", null),
      React.createElement("ol", null))));



  }}


ReactDOM.render(
React.createElement(Jogo, null),
document.getElementById("root"));


function calculateWinner(quadrados) {
  const lines = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (quadrados[a] && quadrados[a] === quadrados[b] && quadrados[a] === quadrados[c]) {
      return quadrados[a];
    }
  }
  return null;
}