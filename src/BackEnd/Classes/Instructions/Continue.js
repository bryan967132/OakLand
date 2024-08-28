class Continue extends Instruction {
    constructor(line, column) {
        super(line, column, TypeInst.CONTINUE)
    }
    exec = (_) => {
        return new ReturnType(this.typeInst, Type.NULL)
    }
}