class Lista {
    constructor(id, hora, jogo) {
        this.id = id
        this.hora = hora
        this.jogo = jogo
        this.listaJogadores = []
    }

    adicionarJogador(nomeJogador) {
        if(this.listaJogadores.length < 12) {
            this.listaJogadores.push(nomeJogador)
        } else {
            return null
        }
    }

    removerJogador(nomeJogador) {
        this.listaJogadores = this.listaJogadores.filter(x => x != nomeJogador)
    }

    getListaDeJogadores() {
        return this.listaJogadores
    }

}

module.exports = Lista