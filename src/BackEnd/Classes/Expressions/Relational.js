class Relational extends Expression {
    constructor(linea, columna, exp1, signo, exp2) {
        super(linea, columna, TypeExp.RELACIONAL)
        this.exp1 = exp1
        this.sign = signo
        this.exp2 = exp2
    }

    exec = (env) => {
        switch(this.sign) {
            case '==':
                return this.igual(env)
            case '!=':
                return this.diferente(env)
            case '>=':
                return this.mayorigual(env)
            case '<=':
                return this.menorigual(env)
            case '>':
                return this.mayor(env)
            case '<':
                return this.menor(env)
            default:
                return new ReturnType('null', Type.NULL)
        }
    }

    igual = (env) => {
        var value1 = this.exp1.exec(env)
        var value2 = this.exp2.exec(env)
        if(value1.type1 === Type.INT || value1.type1 === Type.FLOAT) {
            if(value2.type1 === Type.INT || value2.type1 === Type.FLOAT) {
                return new ReturnType(value1.value === value2.value, Type.BOOLEAN)
            }
            env.setError("Los tipos no son válidos para operaciones relacionales (==).", this.exp2.line, this.exp2.column)
            return new ReturnType('null', Type.NULL)
        }
        if(value1.type1 === value2.type1 && (value1.type1 === Type.BOOLEAN || value1.type1 === Type.CHAR || value1.type1 === Type.STRING)) {
            return new ReturnType(value1.value === value2.value, Type.BOOLEAN)
        }
        env.setError("Los tipos no son válidos para operaciones relacionales (==).", this.exp2.line, this.exp2.column)
        return new ReturnType('null', Type.NULL)
    }

    diferente = (env) => {
        var value1 = this.exp1.exec(env)
        var value2 = this.exp2.exec(env)
        if(value1.type1 === Type.INT || value1.type1 === Type.FLOAT) {
            if(value2.type1 === Type.INT || value2.type1 === Type.FLOAT) {
                return new ReturnType(value1.value !== value2.value, Type.BOOLEAN)
            }
            env.setError("Los tipos no son válidos para operaciones relacionales (!=).", this.exp2.line, this.exp2.column)
            return new ReturnType('null', Type.NULL)
        }
        if(value1.type1 === value2.type1 && (value1.type1 === Type.BOOLEAN || value1.type1 === Type.CHAR || value1.type1 === Type.STRING)) {
            return new ReturnType(value1.value !== value2.value, Type.BOOLEAN)
        }
        env.setError("Los tipos no son válidos para operaciones relacionales (!=).", this.exp2.line, this.exp2.column)
        return new ReturnType('null', Type.NULL)
    }

    mayorigual = (env) => {
        var value1 = this.exp1.exec(env)
        var value2 = this.exp2.exec(env)
        if(value1.type1 === Type.INT || value1.type1 === Type.FLOAT) {
            if(value2.type1 === Type.INT || value2.type1 === Type.FLOAT) {
                return new ReturnType(value1.value >= value2.value, Type.BOOLEAN)
            }
            env.setError("Los tipos no son válidos para operaciones relacionales (>=).", this.exp2.line, this.exp2.column)
            return new ReturnType('null', Type.NULL)
        }
        if(value1.type1 === Type.CHAR && value2.type1 === Type.CHAR) {
            return new ReturnType(value1.value >= value2.value, Type.BOOLEAN)
        }
        env.setError("Los tipos no son válidos para operaciones relacionales (>=).", this.exp2.line, this.exp2.column)
        return new ReturnType('null', Type.NULL)
    }

    menorigual = (env) => {
        var value1 = this.exp1.exec(env)
        var value2 = this.exp2.exec(env)
        if(value1.type1 === Type.INT || value1.type1 === Type.FLOAT) {
            if(value2.type1 === Type.INT || value2.type1 === Type.FLOAT) {
                return new ReturnType(value1.value <= value2.value, Type.BOOLEAN)
            }
            env.setError("Los tipos no son válidos para operaciones relacionales (<=).", this.exp2.line, this.exp2.column)
            return new ReturnType('null', Type.NULL)
        }
        if(value1.type1 === Type.CHAR && value2.type1 === Type.CHAR) {
            return new ReturnType(value1.value <= value2.value, Type.BOOLEAN)
        }
        env.setError("Los tipos no son válidos para operaciones relacionales (<=).", this.exp2.line, this.exp2.column)
        return new ReturnType('null', Type.NULL)
    }

    mayor = (env) => {
        var value1 = this.exp1.exec(env)
        var value2 = this.exp2.exec(env)
        if(value1.type1 === Type.INT || value1.type1 === Type.FLOAT) {
            if(value2.type1 === Type.INT || value2.type1 === Type.FLOAT) {
                return new ReturnType(value1.value > value2.value, Type.BOOLEAN)
            }
            env.setError("Los tipos no son válidos para operaciones relacionales (>).", this.exp2.line, this.exp2.column)
            return new ReturnType('null', Type.NULL)
        }
        if(value1.type1 === Type.CHAR && value2.type1 === Type.CHAR) {
            return new ReturnType(value1.value > value2.value, Type.BOOLEAN)
        }
        env.setError("Los tipos no son válidos para operaciones relacionales (>).", this.exp2.line, this.exp2.column)
        return new ReturnType('null', Type.NULL)
    }

    menor = (env) => {
        var value1 = this.exp1.exec(env)
        var value2 = this.exp2.exec(env)
        if(value1.type1 === Type.INT || value1.type1 === Type.FLOAT) {
            if(value2.type1 === Type.INT || value2.type1 === Type.FLOAT) {
                return new ReturnType(value1.value < value2.value, Type.BOOLEAN)
            }
            env.setError("Los tipos no son válidos para operaciones relacionales (<).", this.exp2.line, this.exp2.column)
            return new ReturnType('null', Type.NULL)
        }
        if(value1.type1 === Type.CHAR && value2.type1 === Type.CHAR) {
            return new ReturnType(value1.value < value2.value, Type.BOOLEAN)
        }
        env.setError("Los tipos no son válidos para operaciones relacionales (<).", this.exp2.line, this.exp2.column)
        return new ReturnType('null', Type.NULL)
    }
}