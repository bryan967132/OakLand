class If extends Instruction {
    constructor(line, column, condition, block, except) {
        super(line, column, TypeInst.IF)
        this.condition = condition
        this.block = block
        this.except = except
    }
    exec = (env) => {
        const envIf = new Env(env, env.name + " If")
        const condition = this.condition.exec(envIf)
        if(condition.value) {
            const block = this.block.exec(envIf)
            if(block) {
                return block
            }
            return
        }
        if(this.except) {
            const except = this.except.exec(envIf)
            if(except) {
                return except
            }
        }
    }
}