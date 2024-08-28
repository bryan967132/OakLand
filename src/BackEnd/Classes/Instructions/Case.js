class Case extends Instruction {
    constructor(line, column, _case, block) {
        super(line, column, TypeInst.CASE)
        this._case = _case
        this.block = block
    }
    setCase = (caseEvaluate) => {
        this.caseEvaluate = caseEvaluate;
    }
    exec = (env) => {
        const envCase = new Env(env, env.name + " Case");
        const case_ = this._case.exec(envCase); 
        envCase.name += " " + case_.value.toString();
        if(this.compare(case_, this.caseEvaluate)) {
            const block = this.block.exec(envCase);
            if (block != null) {
                return block;
            }
        }
    }
    compare = (value1, value2) => {
        if(value1.type1 == value2.type1) {
            return value1.value === value2.value
        }
        return false;
    }
}