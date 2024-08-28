class Expression {
    constructor(line, column, typeExp) {
        this.line = line
        this.column = column
        this.typeExp = typeExp
    }

    exec = (_) => {}
}