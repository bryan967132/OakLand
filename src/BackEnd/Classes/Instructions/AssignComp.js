class AssignComp extends Instruction {
    constructor(line, column, idPos, sign, exp) {
        super(line, column,
            sign === "+=" ? TypeInst.PLUSC : (
            sign === "-=" ? TypeInst.MINUSC : (
            sign === "*=" ? TypeInst.MULTC : (
            sign === "/=" ? TypeInst.DIVC : TypeInst.MODC)))
        )
        this.idPos = idPos
        this.sign = sign
        this.exp = exp
    }
    exec = (env) => {
        if(this.idPos.pos.length === 0) {
            env.reasignID(
                this.idPos.id,
                new Arithmetic(this.line, this.column,
                    new AccessVar(this.line, this.column, this.idPos),
                    this.sign === "+=" ? "+" : (
                    this.sign === "-=" ? "-" : (
                    this.sign === "*=" ? "*" : (
                    this.sign === "/=" ? "/" : "%"))),
                    this.exp
                ).exec(env),
                this.line, this.column
            )
            return
        }
        var pos = []
        var index
        for(const e of this.idPos.pos) {
            index = e.exec(env)
            if(index.type1 != Type.INT) {
                env.setError("Los índices deben ser de tipo 'int'", e.line, e.column)
                return new ReturnType("null", Type.NULL)
            }
            pos.push([parseInt(index.value.toString()), e.line, e.column])
        }
        env.reasignID(
            this.idPos.id,
            pos,
            new Arithmetic(this.line, this.column,
                new AccessVar(this.line, this.column, this.idPos),
                this.sign === "+=" ? "+" : (
                this.sign === "-=" ? "-" : (
                this.sign === "*=" ? "*" : (
                this.sign === "/=" ? "/" : "%"))),
                this.exp
            ).exec(env),
            this.line, this.column
        )
        return
    }
}