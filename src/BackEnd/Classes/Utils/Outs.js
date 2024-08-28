var printConsole = ''
var errors = []

const getConsole = () => {
    var out = printConsole
    if (errors.length > 0) {
        out += (out !== '' ? (out[out.length - 1] != '\n' ? '\n\n' : '\n') : '') + '↳ ERRORES\n'
        out += errors.map((e) => `${e.description} ${e.line}:${e.column}`).join('\n')
    }
    if(out !== '' && out[out.length - 1] === '\n') {
        out = out.slice(0, -1)
    }
    return out
}

const setPrintConsole = (print) => {
    printConsole += print
}

const resetOuts = () => {
    printConsole = ''
    errors = []
}