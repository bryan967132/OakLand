# INICIAR PROYECTO
npm init --yes
# INSTALAR PEGGY GLOBALMENTE
npm install -g peggy
# GENERA PARSER PEGGY DE CARPETA "Language" EN CARPETA "Language"
peggy Language/Parser.peggy -o Language/Parser.js --format globals --export-var PEGGY
# # ESCRIBIR EL COMANDO EN SCRIPT EN PACKAGE.JSON PARA GENERAR PARSER MEDIANTE COMANDO DE NODE
# # ESCRIBIR EL COMANDO DIRECTAMENTE EN LA CONSOLA PARA GENERAR PARSER