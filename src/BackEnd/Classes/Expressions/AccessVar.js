class AccessVar extends Expression {
    constructor(line, column, idPos) {
        super(line, column, TypeExp.ACCESSVAR)
        this.id = idPos.id
        this.pos = idPos.pos
    }
    exec = (env) => {
        var value = null;
        if(this.pos.length === 0) {
            value = env.getValueID(this.id, this.line, this.column)
        } else {
            var pos = []
            var index = null
            for(const e of this.pos) {
                index = e.exec(env)
                if(index.type1 != Type.INT) {
                    env.setError("Los índices deben ser de tipo 'int'", e.line, e.column)
                    return new ReturnType("null", Type.NULL)
                }
                pos.push([parseInt(index.value.toString()), e.line, e.column])
            }
            value = env.getValueID(this.id, this.pos, this.line, this.column)
        }
        if(value != null) {
            return value.value
        }
        return new ReturnType("null", Type.NULL)
    }
}