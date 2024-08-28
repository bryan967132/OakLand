class Block extends Instruction {
    constructor(line, column, instructions) {
        super(line, column, TypeInst.BLOCK)
        this.instructions = instructions
    }
    exec = (env) => {
        const newEnv = new Env(env, env.name);
        for(const instruction of this.instructions) {
            const ret = instruction.exec(newEnv);
            if(ret) {
                return ret;
            }
        }
    }
}