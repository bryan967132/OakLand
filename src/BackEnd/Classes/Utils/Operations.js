const plus = [
    //              INT         FLOAT     BOOLEAN      CHAR      STRING
    /*INT*/     [Type.INT,   Type.FLOAT, Type.NULL, Type.NULL, Type.NULL, ],
    /*FLOAT*/   [Type.FLOAT, Type.FLOAT, Type.NULL, Type.NULL, Type.NULL, ],
    /*BOOLEAN*/ [Type.NULL,  Type.NULL,  Type.NULL, Type.NULL, Type.NULL, ],
    /*CHAR*/    [Type.NULL,  Type.NULL,  Type.NULL, Type.NULL, Type.NULL, ],
    /*STRING*/  [Type.NULL,  Type.NULL,  Type.NULL, Type.NULL, Type.STRING]
]

const minus = [
    //              INT         FLOAT     BOOLEAN      CHAR      STRING
    /*INT*/     [Type.INT,   Type.FLOAT, Type.NULL, Type.NULL, Type.NULL,],
    /*FLOAT*/   [Type.FLOAT, Type.FLOAT, Type.NULL, Type.NULL, Type.NULL,],
    /*BOOLEAN*/ [Type.NULL,  Type.NULL,  Type.NULL, Type.NULL, Type.NULL,],
    /*CHAR*/    [Type.NULL,  Type.NULL,  Type.NULL, Type.NULL, Type.NULL,],
    /*STRING*/  [Type.NULL,  Type.NULL,  Type.NULL, Type.NULL, Type.NULL,]
]

const mult = [
    //              INT         FLOAT     BOOLEAN      CHAR      STRING
    /*INT*/     [Type.INT,   Type.FLOAT, Type.NULL, Type.NULL, Type.NULL,],
    /*FLOAT*/   [Type.FLOAT, Type.FLOAT, Type.NULL, Type.NULL, Type.NULL,],
    /*BOOLEAN*/ [Type.NULL,  Type.NULL,  Type.NULL, Type.NULL, Type.NULL,],
    /*CHAR*/    [Type.NULL,  Type.NULL,  Type.NULL, Type.NULL, Type.NULL,],
    /*STRING*/  [Type.NULL,  Type.NULL,  Type.NULL, Type.NULL, Type.NULL,]
]

const div = [
    //              INT         FLOAT     BOOLEAN      CHAR      STRING
    /*INT*/     [Type.INT,   Type.FLOAT, Type.NULL, Type.NULL, Type.NULL,],
    /*FLOAT*/   [Type.FLOAT, Type.FLOAT, Type.NULL, Type.NULL, Type.NULL,],
    /*BOOLEAN*/ [Type.NULL,  Type.NULL,  Type.NULL, Type.NULL, Type.NULL,],
    /*CHAR*/    [Type.NULL,  Type.NULL,  Type.NULL, Type.NULL, Type.NULL,],
    /*STRING*/  [Type.NULL,  Type.NULL,  Type.NULL, Type.NULL, Type.NULL,]
]

const mod = [
    //              INT        FLOAT    BOOLEAN      CHAR      STRING
    /*INT*/     [Type.INT,  Type.NULL, Type.NULL, Type.NULL, Type.NULL,],
    /*FLOAT*/   [Type.NULL, Type.NULL, Type.NULL, Type.NULL, Type.NULL,],
    /*BOOLEAN*/ [Type.NULL, Type.NULL, Type.NULL, Type.NULL, Type.NULL,],
    /*CHAR*/    [Type.NULL, Type.NULL, Type.NULL, Type.NULL, Type.NULL,],
    /*STRING*/  [Type.NULL, Type.NULL, Type.NULL, Type.NULL, Type.NULL,]
]