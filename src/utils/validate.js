export function required(value, message = 'This field is required'){
    return value && String(value).trim() ? "" : message;
}

export function isEmail(value, message = 'This field is required'){
    return /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(String(value).trim()) ? "" : message;
}

export function validate(value, rules = []){
    for(const rule of rules){
        let err = rule(value);
        if(err) return err;
    }
    return "";
}