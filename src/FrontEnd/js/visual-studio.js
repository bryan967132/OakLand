var codigo = CodeMirror(document.getElementById('codigo'), {
    mode: "text/x-c++src",
    theme: "git-hub",
    lineNumbers: true,
    indentUnit: 4,
    indentWithTabs: true,
    autoCloseBrackets: true,
    matchBrackets: true,
    styleActiveLine: true,
    caseFold: true
});

var consola = CodeMirror(document.getElementById('consola'), {
    mode: "text",
    theme: "git-hub",
    lineNumbers: true,
    indentUnit: 4,
    indentWithTabs: true,
    readOnly: true,
    cursorHeight: 0,
    lineWrapping: false,
});

codigo.setSize(null, window.innerHeight - document.getElementById('codigo').offsetTop - 16);
	window.addEventListener("resize", function() {
	codigo.setSize(null, window.innerHeight - document.getElementById('codigo').offsetTop - 16);
});

consola.setSize(null, window.innerHeight - document.getElementById('codigo').offsetTop - 16);
	window.addEventListener("resize", function() {
	consola.setSize(null, window.innerHeight - document.getElementById('codigo').offsetTop - 16);
});