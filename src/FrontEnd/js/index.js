const analyze = () => {
    resetOuts()
    const input = codigo.getValue()
    const execute = PEGGY.parse(input)
    const entorno = new Env(null, 'Global')
    for(const e of execute) {
        e.exec(entorno)
    }
    consola.setOption('value', getConsole())
}

const fileChange = (e) => {
    let input = e.target;
    let spanBlock = e.target.closest('label').querySelector('.form-file-span');
    spanBlock.innerHTML = '';
    Array.from(input.files).forEach(file => {
        spanBlock.innerHTML = `${file.name}`;
    });
}

const openFile = (input) => {
    let archivo = input.files[0];
    if(archivo) {
        let lector = new FileReader();
        lector.readAsText(archivo, 'UTF-8');
        lector.onload = (e) => {
            let contenido = e.target.result;
            codigo.setOption('value', contenido)
        }
    } else {
        alert('Por favor selecciona un archivo .sc');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const fileInputs = document.querySelectorAll('input[type=file]');
    fileInputs.forEach(file => file.addEventListener('change', fileChange));
});