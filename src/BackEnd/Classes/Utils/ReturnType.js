class ReturnType {
    constructor(value, type1, type2 = null, dimensions = 0) {
        this.value = value
        this.type1 = type1
        this.type2 = type2
        this.dimensions = dimensions
    }

    getClone = () => {
        return new ReturnType(this.value, this.type1, this.type2, this.dimensions)
    }

    intToDouble = () => {
        if(this.type1.ordinal() < 5) {
            this.type1 = Type.FLOAT;
            this.value = parseFloat(value.toString());
            return this;
        }
        for(const r of value) {
            r.intToDouble();
            r.type2 = Type.FLOAT;
        }
        this.type2 = Type.FLOAT;
        return this;
    }

    getDataType = () => new DataType(this.type1, this.type2, this.dimensions)

    toString = () => this.value.toString()

    getObject = () => {
        if(type1 != Type.NULL) {
            if(type1.ordinal() < 5) {
                return type1.getValue() + "=" + value
            }
            return `${type1.getValue()}${(dimensions != 0 ? ":" + dimensions : "")}${(type2 != null ? "(" + type2.getValue() + ")" : "")}=[${this.value.map(r => r.getObject()).join(', ')}]`
        }
        return value.toString();
    }

    getPos = (env, id, pos) => {
        if(pos.size() > 0) {
            if(type1 == Type.VECTOR) {
                const v = this.value;
                const p = pos.shift();
                if(v.size() > p[0]) {
                    return v.get(p[0]).getPos(env, id, pos);
                }
                env.setError("Índice fuera de rango en vector '" + id + "'", pos[0][1], pos.get[0][2]);
                return new ReturnType("null", Type.NULL);
            }
        }
        return this;
    }
}