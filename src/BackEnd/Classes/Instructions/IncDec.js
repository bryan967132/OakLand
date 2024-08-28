class IncDec extends Expression {
    constructor(line, column, idPos, sign) {
        super(line, column, sign === "++" ? TypeExp.INC : TypeExp.DEC)
        this.idPos = idPos
        this.sign = sign
    }
    exec = (env) => {
        if(this.idPos.pos.length === 0) {
            env.reasignID(
                this.idPos.id,
                new Arithmetic(this.line, this.column,
                    new AccessVar(this.line, this.column, this.idPos),
                    this.sign === "++" ? "+" : "-",
                    new Primitive(this.line, this.column, "1", Type.INT)
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
                return
            }
            pos.push([parseInt(index.value.toString()), e.line, e.column])
        }
        env.reasignID(
            this.idPos.id,
            pos,
            new Arithmetic(this.line, this.column,
                new AccessVar(this.line, this.column, this.idPos),
                this.sign === "++" ? "+" : "-",
                new Primitive(this.line, this.column, "1", Type.INT)
            ).exec(env),
            this.line, this.column
        );
    }
}