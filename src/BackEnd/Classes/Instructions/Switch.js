class Switch extends Instruction {
    constructor(line, column, arg, cases, _default) {
        super(line, column, TypeInst.SWITCH);
        this.arg = arg;
        this.cases = cases;
        this._default = _default;
    }
    exec = (env) => {
        const envSwitch = new Env(env, "Switch");
        if(this.cases) {
            const arg = this.arg.exec(env);
            for(const case_ of this.cases) {
                case_.setCase(arg);
                const case_exec = case_.exec(envSwitch);
                if(case_exec) {
                    if(case_exec.value == TypeExp.RETURN) {
                        return
                    }
                    if(case_exec.value == TypeInst.BREAK) {
                        return
                    }
                    return case_exec;
                }
            }
        }
        if(this._default) {
            const default_ = this._default.exec(env);
            if(default_) {
                if(default_.value == TypeExp.RETURN) {
                    return
                }
                if(default_.value == TypeInst.BREAK) {
                    return
                }
                return default_;
            }
        }
    }
}