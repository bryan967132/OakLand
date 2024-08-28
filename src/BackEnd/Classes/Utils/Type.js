const Type = {
    INT: {
        ordinal: () => 0,
        getValue: () => 'int'
    },
    FLOAT: {
        ordinal: () => 1,
        getValue: () => 'float'
    },
    BOOLEAN: {
        ordinal: () => 2,
        getValue: () => 'boolean'
    },
    CHAR: {
        ordinal: () => 3,
        getValue: () => 'char'
    },
    STRING: {
        ordinal: () => 4,
        getValue: () => 'string'
    },
    VECTOR: {
        ordinal: () => 5,
        getValue: () => 'vector'
    },
    NULL: {
        ordinal: () => 7,
        getValue: () => 'null'
    }
}