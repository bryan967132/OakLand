class Break extends Instruction {
    constructor(line, column) {
        super(line, column, TypeInst.BREAK)
    }
    exec = (_) => {
        return new ReturnType(this.typeInst, Type.NULL)
    }
}