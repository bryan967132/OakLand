class Logic extends Expression {
    constructor(linea, columna, exp1, signo, exp2) {
        super(linea, columna, TypeExp.LOGICO)
        this.exp1 = exp1
        this.sign = signo
        this.exp2 = exp2
    }

    exec = (env) => {
        switch(this.sign) {
            case '&&':
                return this.and(env)
            case '||':
                return this.or(env)
            case '!':
                return this.not(env)
            default:
                return new ReturnType('null', Type.NULL)
        }
    }

    and = (env) => {
        let value1 = this.exp1.exec(env)
        let value2 = this.exp2.exec(env)
        if(value1.type1 === value2.type1 && value1.type1 === Type.BOOLEAN) {
            this.type = Type.BOOLEAN
            return new ReturnType(value1.value && value2.value, this.type)
        }
        env.setError("Los tipos no son válidos para operaciones lógicas (&&).", this.exp1.line, this.exp1.column)
        return new ReturnType('null', Type.NULL)
    }

    or = (env) => {
        let value1 = this.exp1.exec(env)
        let value2 = this.exp2.exec(env)
        if(value1.type1 === value2.type1 && value1.type1 === Type.BOOLEAN) {
            this.type = Type.BOOLEAN
            return new ReturnType(value1.value || value2.value, this.type)
        }
        env.setError("Los tipos no son válidos para operaciones lógicas (||).", this.exp1.line, this.exp1.column)
        return new ReturnType('null', Type.NULL)
    }

    not = (env) => {
        let value = this.exp2.exec(env)
        if(value.type1 === Type.BOOLEAN) {
            this.type = Type.BOOLEAN
            return new ReturnType(!value.value, this.type)
        }
        env.setError("Los tipos no son válidos para operaciones lógicas (!).", this.exp2.line, this.exp2.column)
        return new ReturnType('null', Type.NULL)
    }
}