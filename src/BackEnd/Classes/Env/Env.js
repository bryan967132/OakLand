class Env {
    constructor(previous, name) {
        this.previous = previous
        this.name = name
        this.ids = new Map()
        this.functions = new Map()
    }

    saveID = (id, value, type, line, column) => {
        if(!this.ids.has(id)) {
            this.ids.set(id, {value: value, id: id, type: type})
            return true
        }
        this.setError(`Redeclaración de variable existente '${id}'.`, line, column)
        return false
    }

    getValueID = (id, line, column) => {
        var current = this
        while(current) {
            if(current.ids.has(id)) {
                return current.ids.get(id)
            }
            current = current.previous
        }
        this.setError(`Acceso a variable inexistente  '${id}'.`, line, column)
        return null
    }

    reasignID = (id, value, line, column) => {
        var current = this
        while(current) {
            if(current.ids.has(id)) {
                var mySymbol = current.ids.get(id)
                if(mySymbol.type.type1 === value.type1 || mySymbol.type.type1 === Type.FLOAT && value.type1 === Type.INT) {
                    mySymbol.value = value.getClone()
                    current.ids.set(id, mySymbol)
                    return true
                }
                this.setError(`Los tipos no coinciden en la asignación. Intenta asignar un '${value.type1.getValue()}' a un '${mySymbol.type.type1.getValue()}'.`, line, column)
                return false
            }
            current = current.previous
        }
        this.setError(`Resignación de valor a variable inexistente  '${id}'.`, line, column)
        return false
    }

    saveFunction = (func) => {
        if(!this.functions.has(func.id)) {
            this.functions.set(func.id, func)
            return true
        }
        this.setError(`Redefinición de función existente '${func.id}'.`, func.line, func.column)
        return false
    }

    getFunction = (id, line, column) => {
        var current = this
        while(current) {
            if(current.functions.has(id)) {
                return current.functions.get(id)
            }
            current = current.previous
        }
        this.setError(`Acceso a función inexistente '${id}'.`, line, column)
        return null
    }

    getGlobal = () => {
        var env = this
        while(env.previous) {
            env = env.previous
        }
        return env
    }

    setPrint = (print) => {
        setPrintConsole(print)
    }

    setError = (errorD, line, column) => {
        if(!this.match(errorD, line, column)) {
            errors.push({type: 'SEMANTICO', description: errorD,  line: line, column: column})
        }
    }

    match = (err, line, column) => {
        for(const s of errors) {
            if(`${s}` == `${{type: 'SEMANTICO', description: err, line: line, column: column}}`) {
                return true
            }
        }
        return false
    }
}