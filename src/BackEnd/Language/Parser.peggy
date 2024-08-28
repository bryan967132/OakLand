INIT =
    i: INSTRUCCION* {return i}

INSTRUCCION =
    _ i: INITVAR _               {return i} /
    _ i: IF      _               {return i} /
    _ i: SWITCH  _               {return i} /
    _ i: WHILE   _               {return i} /
    _ i: ASSIGN  _               {return i} /
    _ i: PRINT   _               {return i} /
    _ 'return' _ e: EXP? _ ';' _ {return new Return(location().start.line, location().start.column, e)} /
    _ 'continue'         _ ';' _ {return new Continue(location().start.line, location().start.column) } /
    _ 'break'            _ ';' _ {return new Break(location().start.line, location().start.column)    } 

INITVAR =
    t: DATATYPE _ id: TK_id _ v: ('=' _ EXP _)? ';' {return new InitVar(location().start.line, location().start.column, id, t, v ? v[2] : v)} /
    'var' _ id: TK_id _ '=' _ v: EXP ';'            {return new InitVar(location().start.line, location().start.column, id, null, v)        } 

IF =
    'if' _ '(' _ cn: EXP _ ')' _ b1: ENV b2: (_ 'else' _ (IF / ENV))? {return new If(location().start.line, location().start.column, cn, b1, b2 ? b2[3] : b2)}

SWITCH =
    'switch' _ '(' _ exp: EXP _ ')' _ b: ENVS {return new Switch(location().start.line, location().start.column, exp, b[0], b[1])}

ENVS =
    '{' _ c: (_ CASE)* _ d: DEFAULT? _ '}' {return [c.map((v) => v[1]), d]}

CASE =
    'case' _ exp: EXP _ ':' _ i: INSTRUCCION* {return new Case(location().start.line, location().start.column, exp, new Block(location().start.line, location().start.column, i))} /
    'case' _ exp: EXP _ ':' _ b: ENV          {return new Case(location().start.line, location().start.column, exp, b)                                                           } 

DEFAULT =
    'default' _ ':' _ i: INSTRUCCION* {return new Block(location().start.line, location().start.column, i)} /
    'default' _ ':' _ b: ENV          {return b                                                           } 

WHILE =
    'while' _ '(' _ exp: EXP _ ')' _ b: ENV {return new While(location().start.line, location().start.column, exp, b)}

ASSIGN =
    id: IDPOS _ s: ('+=' / '-=' / '*=' / '/=' / '%=') _ e: EXP _ ';' {return new AssignComp(id.line, id.column, id, s, e)} /
    id: IDPOS _ '=' _ e: EXP _ ';'                                   {return new Assign(id.line, id.column, id, e)       } /
    id: IDPOS _ s: ('++' / '--') _ ';'                               {return new IncDec(id.line, id.column, id, s)       } 

IDPOS =
    id: TK_id p: (_ '[' _ EXP _ ']')* {return new IDPos(location().start.line, location().start.column, id, p.map((v) => v[3]))}

PRINT =
    'System.out.println' _ '(' _ e: (EXP (_ ',' _ EXP)*)? _ ')' _ ';' {return new Print(location().start.line, location().start.column, e ? [e[0], ... e[1].map((v) => v[3])] : [])}

ENV =
    '{' _ i: INIT _ '}' {return new Block(location().start.line, location().start.column, i)}

DATATYPE =
    t: TYPE v: (_ '[' ']')* {return new DataType(v.length > 0 ? Type.VECTOR : t, v.length > 0 ? t : null, v.length)}

TYPE =
    'int'     {return Type.INT    } /
    'float'   {return Type.FLOAT  } /
    'string'  {return Type.STRING } /
    'boolean' {return Type.BOOLEAN} /
    'char'    {return Type.CHAR   } 

EXP =
    e1: EXP8 _ '?' _ e2: EXP8 _ ':' _ e3: EXP8 {return new Ternary(location().start.line, location().start.column, e1, e2, e3)} /
    e1: EXP8                                   {return e1}

EXP8 =
    e1: EXP7 e2: (_ '||' _ EXP7)* {return e2.reduce((res, op) => new Logic(location().start.line, location().start.column, res, op[1], op[3]), e1)}

EXP7 =
    e1: EXP6 e2: (_ '&&' _ EXP6)* {return e2.reduce((res, op) => new Logic(location().start.line, location().start.column, res, op[1], op[3]), e1)}

EXP6 =
    s: '!' _ e1: EXP5 {return new Logic(location().start.line, location().start.column, null, s, e1)} /
    e: EXP5           {return e}

EXP5 =
    e1: EXP4 e2: (_ ('==' / '!=') _ EXP4)* {return e2.reduce((res, op) => new Relational(location().start.line, location().start.column, res, op[1], op[3]), e1)}

EXP4 =
    e1: EXP3 e2: (_ ('<=' / '>=' / '<' / '>') _ EXP3)* {return e2.reduce((res, op) => new Relational(location().start.line, location().start.column, res, op[1], op[3]), e1)}

EXP3 =
    e1: EXP2 e2: (_ ('+' / '-') _ EXP2)* {return e2.reduce((res, op) => new Arithmetic(location().start.line, location().start.column, res, op[1], op[3]), e1)}

EXP2 =
    e1: EXP1 e2: (_ ('*' / '/' / '%') _ EXP1)* {return e2.reduce((res, op) => new Arithmetic(location().start.line, location().start.column, res, op[1], op[3]), e1)}

EXP1 =
    s: '-' _ exp: EXP1 {return new Arithmetic(location().start.line, location().start.column, null, s, exp)} /
    exp: PRIMITIVE     {return exp}

PRIMITIVE =
    p: TK_float              {return new Primitive(location().start.line, location().start.column, p, Type.FLOAT)  } /
    p: TK_int                {return new Primitive(location().start.line, location().start.column, p, Type.INT)    } /
    p: TK_char               {return new Primitive(location().start.line, location().start.column, p, Type.CHAR)   } /
    p: TK_string             {return new Primitive(location().start.line, location().start.column, p, Type.STRING) } /
    'true'                   {return new Primitive(location().start.line, location().start.column, p, Type.BOOLEAN)} /
    'false'                  {return new Primitive(location().start.line, location().start.column, p, Type.BOOLEAN)} /
    e: ACCESS                {return e} /
    '(' _ e: EXP _ ')'       {return e}

ACCESS =
    id: TK_id p: (_ '[' _ EXP _ ']')* {return new AccessVar(location().start.line, location().start.column, new IDPos(location().start.line, location().start.column, id, p.map((v) => v[3])))}

// Tokens

TK_float = [0-9]+'.'[0-9]+ {return text()}

TK_int = [0-9]+ {return text()}

TK_char = "'"([^\n\"\\]/[\\].)"'" {return text().substring(1, text().length - 1)}

TK_string = '"'([^\n\"\\]/[\\].)*'"' {return text().substring(1, text().length - 1)}

TK_id = [_]*[a-zA-Z][a-zA-Z0-9\_]* {return text()}

COMMENTS = '//'[^\r\n]*[\n]
COMMENTM = [/][*][^*]*[*]+([^/*][^*]*[*]+)*[/]
_ "whitespace" = ([ \t\r\n] / COMMENTS / COMMENTM)*