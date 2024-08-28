class InitVar extends Instruction {
    constructor(line, column, id, type, value) {
        super(line, column, TypeInst.INITVAR)
        this.id = id
        this.type = type
        this.value = value
    }

    exec = (env) => {
        if(this.type) {
            if(this.value) {
                const value = this.value.exec(env);
                if(value.type1 != Type.VECTOR && (value.type1 == this.type.type1 || this.type.type1 == Type.FLOAT && value.type1 == Type.INT)) {
                    env.saveID(this.id, value, this.type, this.line, this.column)
                    return
                }
                if(value.type1 == Type.VECTOR && value.type1 == this.type.type1 && (value.type2 == this.type.type2 || this.type.type2 == Type.FLOAT && value.type2 == Type.INT) && value.dimensions == this.type.dimensions) {
                    if(this.type.type2 == Type.FLOAT && value.type2 == Type.INT) {
                        value.intToDouble();
                    }
                    env.saveID(this.id, value, value.getDataType(), this.line, this.column)
                    return
                }
                env.setError("Los tipos no coinciden en la declaración", this.line, this.column)
                return
            }
            switch(this.type.type1) {
                case Type.INT:
                    env.saveID(this.id, new ReturnType(0, this.type.type1), this.type, this.line, this.column)
                    break
                case Type.FLOAT:
                    env.saveID(this.id, new ReturnType(0.0, this.type.type1), this.type, this.line, this.column)
                    break
                case Type.BOOLEAN:
                    env.saveID(this.id, new ReturnType(true, this.type.type1), this.type, this.line, this.column)
                    break
                case Type.CHAR:
                    env.saveID(this.id, new ReturnType('\0', this.type.type1), this.type, this.line, this.column)
                    break
                case Type.STRING:
                    env.saveID(this.id, new ReturnType("", this.type.type1), this.type, this.line, this.column)
                    break
                default:
                    env.saveID(this.id, new ReturnType("null", Type.NULL, this.type.dimensions), this.type, this.line, this.column)
                    break
            }
            return
        }
        const value = this.value.exec(env);
        env.saveID(this.id, value, value.getDataType(), this.line, this.column)
    }
}