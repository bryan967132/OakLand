class Assign extends Instruction {
    constructor(line, column, idPos, value) {
        super(line, column, TypeInst.ASIGN)
        this.id = idPos.id
        this.pos = idPos.pos
        this.value = value
    }
    exec = (env) => {
        const value = this.value.exec(env);
        if(this.pos.length === 0) {
            env.reasignID(this.id, value, this.line, this.column);
        } else {
            var pos = []
            var index
            for(const e of this.pos) {
                index = e.exec(env)
                if(index.type1 != Type.INT) {
                    env.setError("Los índices deben ser de tipo 'int'", e.line, e.column)
                    return
                }
                pos.push([parseInt(index.value.toString()), e.line, e.column])
            }
            env.reasignID(this.id, this.pos, value, this.line, this.column)
        }
    }
}