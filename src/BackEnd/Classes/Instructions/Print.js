class Print extends Instruction {
    constructor(line, column, exps) {
        super(line, column, TypeInst.PRINT)
        this.exps = exps
    }
    exec = (env) => {
        var value = ""
        for(const e of this.exps) {
            const value1 = e.exec(env)
            value += `${value !== '' ? ' ' : ''}${value1.type1.ordinal() < 5 ? value1.value.toString() : value1.getObject()}`
        }
        env.setPrint(value + "\n")
    }
}