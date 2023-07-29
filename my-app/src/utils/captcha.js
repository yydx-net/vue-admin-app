/**
 * 验证用户名的正确性
 * @param {用户名：11位的电话号码} value 
 * @returns Boolean类型的值
 */
export function checkPhone(value) {
    let regPhone = /^1(3|4|5|6|7|8|9)\d{9}$/;
    console.log(regPhone.test(value));
    return regPhone.test(value)
}

/**
 * 验证密码的正确性
 * @param {用户密码： 密码规则：包含至少一个大写字母、一个小写字母、一个数字，长度在8到20之间} password 
 * @returns Boolean
 */
export function validatePassword(password) {
    // 密码规则：包含至少一个大写字母、一个小写字母、一个数字，长度在8到20之间
    var pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,20}$/;
    return pattern.test(password);
}

export function validateCode(code) {
    var pattern = /^(?=.*[a-z])(?=.*\d).{6}$/;
    return pattern.test(code);
}