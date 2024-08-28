class Primitive extends Expression {
    constructor(line, column, value, type) {
        super(line, column, TypeExp.PRIMITIVE)
        this.value = value
        this.type = type
    }

    exec = (_) => {
        switch(this.type) {
            case Type.INT:
                return new ReturnType(parseInt(this.value), this.type)
            case Type.FLOAT:
                return new ReturnType(parseFloat(this.value), this.type)
            case Type.BOOLEAN:
                return new ReturnType(this.value.toString().toLowerCase() === 'true', this.type)
            case Type.CHAR:
                this.value = this.value.replace(/\\n/g, '\n')
                this.value = this.value.replace(/\\t/g, '\t')
                this.value = this.value.replace(/\\"/g, '\"')
                this.value = this.value.replace(/\\'/g, '\'')
                this.value = this.value.replace(/\\\\/g, '\\')
                return new ReturnType(this.value, this.type)
            default:
                this.value = this.value.replace(/\\n/g, '\n')
                this.value = this.value.replace(/\\t/g, '\t')
                this.value = this.value.replace(/\\"/g, '\"')
                this.value = this.value.replace(/\\'/g, '\'')
                this.value = this.value.replace(/\\\\/g, '\\')
                return new ReturnType(this.value, this.type)
        }
    }
}