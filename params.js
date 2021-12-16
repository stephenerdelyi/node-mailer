class Params {
    constructor() {
        this.param_string = '';
        this.params = {};
    }

    add(param) {
        this.param_string += param;
        this.params = JSON.parse(this.param_string);
    }

    get(key) {
        if(!key) {
            return this.params;
        } else {
            return this.params[key];
        }
    }
}

module.exports = Params;
