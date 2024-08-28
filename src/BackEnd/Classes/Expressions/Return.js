class Return extends Expression {
    constructor(line, column, exp) {
        super(line, column, TypeExp.RETURN)
        this.exp = exp
    }
    exec = (env) => {
        if(this.exp != null) {
            return this.exp.exec(env);
        }
        return new ReturnType(this.typeExp, Type.NULL);
    }
}