class Instruction {
    constructor(line, column, typeInst) {
        this.linea = line
        this.column = column
        this.typeInst = typeInst
    }

    exec = (_) => {}
}