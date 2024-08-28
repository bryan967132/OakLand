class While extends Instruction {
    constructor(line, column, condition, block) {
        super(line, column, TypeInst.WHILE)
        this.condition = condition
        this.block = block
    }
    exec = (env) => {
        const envWhile = new Env(env, env.name + " While");
        var condition = this.condition.exec(envWhile);
        while(condition.value) {
            const block = this.block.exec(envWhile);
            if(block) {
                if(block.value === TypeInst.CONTINUE) {
                    condition = this.condition.exec(envWhile);
                    continue;
                }
                if(block.value === TypeInst.BREAK) {
                    break;
                }
                return block;
            }
            condition = this.condition.exec(envWhile);
        }
    }
}