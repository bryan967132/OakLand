```html
<INIT> =
    <INSTRUCCION>*

<INSTRUCCION> =
    <INITVAR>           /
    <IF>                /
    <SWITCH>            /
    <WHILE>             /
    <ASSIGN>            /
    <PRINT>             /
    'return' <EXP>? ';' /
    'continue'      ';' /
    'break'         ';' 

<INITVAR> =
    <DATATYPE> <TK_id> ('=' <EXP> _)? ';' /
    'var' <TK_id> '=' <EXP> ';'           

<IF> =
    'if' '(' <EXP> ')' <ENV> ('else' (<IF> / <ENV>))?

<SWITCH> =
    'switch' '(' <EXP> ')' <ENVS>

<ENVS> =
    '{' (<CASE>)* <DEFAULT>? '}'

<CASE> =
    'case' <EXP> ':' <INSTRUCCION>* /
    'case' <EXP> ':' <ENV>          

<DEFAULT> =
    'default' ':' <INSTRUCCION>* /
    'default' ':' <ENV>          

<WHILE> =
    'while' '(' <EXP> ')' <ENV>

<ASSIGN> =
    <IDPOS> ('+=' / '-=' / '*=' / '/=' / '%=') <EXP> ';' /
    <IDPOS> '=' <EXP> ';'                                /
    <IDPOS> ('++' / '--') ';'                            

<IDPOS> =
    <TK_id> ('[' <EXP> ']')*

<PRINT> =
    'System.out.println' '(' (<EXP> (',' <EXP>)*)? ')' ';'

<ENV> =
    '{' <INIT> '}'

<DATATYPE> =
    <TYPE> ('[' ']')*

<TYPE> =
    'int'     /
    'float'   /
    'string'  /
    'boolean' /
    'char'    

<EXP> =
    <EXP8> '?' <EXP8> ':' <EXP8> /
    <EXP8>                       

<EXP8> =
    <EXP7> ('||' <EXP7>)*

<EXP7> =
    <EXP6> ('&&' <EXP6>)*

<EXP6> =
    '!' <EXP5> /
    <EXP5>     

<EXP5> =
    <EXP4> (('==' / '!=') <EXP4>)*

<EXP4> =
    <EXP3> (('<=' / '>=' / '<' / '>') <EXP3>)*

<EXP3> =
    <EXP2> (('+' / '-') <EXP2>)*

<EXP2> =
    <EXP1> (('*' / '/' / '%') <EXP1>)*

<EXP1> =
    '-' <EXP1>  /
    <PRIMITIVE> 

<PRIMITIVE> =
    [0-9]+'.'[0-9]+          /
    [0-9]+                   /
    "'"([^\n\"\\]/[\\].)"'"  /
    '"'([^\n\"\\]/[\\].)*'"' /
    'true'                   /
    'false'                  /
    <ACCESS>                 /
    '(' <EXP> ')'            

<ACCESS> =
    <TK_id> ('[' <EXP> ']')*

<TK_id> = [_]*[a-zA-Z][a-zA-Z0-9\_]*
```