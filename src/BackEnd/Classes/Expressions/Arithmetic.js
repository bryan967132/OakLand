class Arithmetic extends Expression {
    constructor(line, column, exp1, sign, exp2) {
        super(line, column, TypeExp.ARITMETICO)
        this.exp1 = exp1
        this.sign = sign
        this.exp2 = exp2
    }

    exec = (env) => {
        switch(this.sign) {
            case '+':
                return this.plus(env)
            case '-':
                return this.exp1 ? this.minus(env) : this.uminus(env)
            case '*':
                return this.mult(env)
            case '/':
                return this.div(env)
            case '%':
                return this.mod(env)
            default:
                return new ReturnType('null', Type.NULL)
        }
    }

    plus = (env) => {
        const value1 = this.exp1.exec(env)
        const value2 = this.exp2.exec(env)
        const t1 = value1.type1.ordinal()
        const t2 = value2.type1.ordinal()
        this.type = !(t1 >= 5 || t2 >= 5) ? plus[t1][t2] : Type.NULL
        if(this.type !== Type.NULL) {
            if(this.type === Type.INT) {
                return new ReturnType(parseInt(value1.value) + parseInt(value2.value), this.type)
            }
            if(this.type === Type.FLOAT) {
                return new ReturnType(parseFloat(value1.value) + parseFloat(value2.value), this.type)
            }
            if(this.type === Type.STRING) {
                return new ReturnType(`${value1.value}${value2.value}`, this.type)
            }
        }
        env.setError(`Los tipos no son válidos para operaciones aritméticas (+).`, this.exp2.line, this.exp2.column)
        return new ReturnType('null', Type.NULL)
    }

    minus = (env) => {
        const value1 = this.exp1.exec(env)
        const value2 = this.exp2.exec(env)
        const t1 = value1.type1.ordinal()
        const t2 = value2.type1.ordinal()
        this.type = !(t1 >= 5 || t2 >= 5) ? minus[t1][t2] : Type.NULL
        if(this.type !== Type.NULL) {
            if(this.type === Type.INT) {
                return new ReturnType(parseInt(value1.value) - parseInt(value2.value), this.type)
            }
            if(this.type === Type.FLOAT) {
                return new ReturnType(parseFloat(value1.value) - parseFloat(value2.value), this.type)
            }
        }
        env.setError(`Los tipos no son válidos para operaciones aritméticas (-).`, this.exp2.line, this.exp2.column)
        return new ReturnType('null', Type.NULL)
    }

    uminus = (env) => {
        var value = this.exp2.exec(env)
        this.type = value.type1
        if(this.type === Type.INT || this.type === Type.FLOAT) {
            return new ReturnType(-value.value, this.type)
        }
        env.setError(`Los tipos (${this.exp2.type1.ordinal()}) no son válidos para operaciones aritméticas (-).`, this.exp2.line, this.exp2.column)
        return new ReturnType('null', Type.NULL)
    }

    mult = (env) => {
        const value1 = this.exp1.exec(env)
        const value2 = this.exp2.exec(env)
        const t1 = value1.type1.ordinal()
        const t2 = value2.type1.ordinal()
        this.type = !(t1 >= 5 || t2 >= 5) ? mult[t1][t2] : Type.NULL
        if(this.type !== Type.NULL) {
            if(this.type === Type.INT) {
                return new ReturnType(parseInt(value1.value) * parseInt(value2.value), this.type)
            }
            if(this.type === Type.FLOAT) {
                return new ReturnType(parseFloat(value1.value) * parseFloat(value2.value), this.type)
            }
        }
        env.setError(`Los tipos no son válidos para operaciones aritméticas (*).`, this.exp2.line, this.exp2.column)
        return new ReturnType('null', Type.NULL)
    }

    div = (env) => {
        const value1 = this.exp1.exec(env)
        const value2 = this.exp2.exec(env)
        const t1 = value1.type1.ordinal()
        const t2 = value2.type1.ordinal()
        this.type = !(t1 >= 5 || t2 >= 5) ? div[t1][t2] : Type.NULL
        if(this.type !== Type.NULL) {
            if(value2.value == 0) {
                env.setError("Operación inválida, no se puede dividir entre cero.", this.exp2.line, this.exp2.column)
                return new ReturnType('null', Type.NULL)
            }
            if(this.type === Type.INT) {
                return new ReturnType(parseInt(parseFloat(value1.value) / parseFloat(value2.value)), this.type)
            }
            if(this.type === Type.FLOAT) {
                return new ReturnType(parseFloat(value1.value) / parseFloat(value2.value), this.type)
            }
        }
        env.setError(`Los tipos no son válidos para operaciones aritméticas (/).`, this.exp2.line, this.exp2.column)
        return new ReturnType('null', Type.NULL)
    }

    mod = (env) => {
        const value1 = this.exp1.exec(env)
        const value2 = this.exp2.exec(env)
        const t1 = value1.type1.ordinal()
        const t2 = value2.type1.ordinal()
        this.type = !(t1 >= 5 || t2 >= 5) ? mod[t1][t2] : Type.NULL
        if(this.type !== Type.NULL) {
            if(value2.value == 0) {
                env.setError("Operación inválida, no se puede dividir entre cero.", this.exp2.line, this.exp2.column)
                return new ReturnType('null', Type.NULL)
            }
            if(this.type === Type.INT) {
                return new ReturnType(parseInt(parseFloat(value1.value) % parseFloat(value2.value)), this.type)
            }
        }
        env.setError(`Los tipos no son válidos para operaciones aritméticas (%).`, this.exp2.line, this.exp2.column)
        return new ReturnType('null', Type.NULL)
    }
}