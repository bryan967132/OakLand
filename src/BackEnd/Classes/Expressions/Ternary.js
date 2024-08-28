class Ternary extends Expression {
    constructor(line, column, condicion, isTrue, isFalse) {
        super(line, column, Type.NULL, TypeExp.TERNARIO)
        this.condition = condicion
        this.isTrue = isTrue
        this.isFalse = isFalse
    }

    exec = (env) => {
        const condition = this.condition.exec(env)
        if(condition.type1 != Type.BOOLEAN) {
            env.setError("El tipo de dato de la condición no es aceptable.", condition.line, condition.column)
            return new ReturnType('null', Type.NULL)
        }
        if(condition.value) {
            const isTrue = this.isTrue.exec(env)
            return isTrue
        }
        const isFalse = this.isFalse.exec(env)
        return isFalse
    }
}