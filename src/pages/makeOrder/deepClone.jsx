export const istype = (obj, type) => {//判断包装类型的原型
    return Object.prototype.toString.call(obj).indexOf(type) != -1
}

export const deepClone = (initalObj) => {
    if (typeof initalObj !== 'object') {//如果是基本类型直接返回值
        return initalObj
    }
    if (istype(initalObj, 'String') || istype(initalObj, 'Number') || istype(initalObj, 'Boolean'))
        return initalObj.valueOf();
    if (istype(initalObj, 'Date'))
        return new Date(initalObj.valueOf());
    if (istype(initalObj, 'RegExp')) {
        let pattern = initalObj.valueOf();
        let flags = '';
        flags += pattern.global ? 'g' : '';
        flags += pattern.ignoreCase ? 'i' : '';
        flags += pattern.multiline ? 'm' : '';
        return new RegExp(pattern, flags);
    }
    const obj = Array.isArray(initalObj) ? [] : {};//可能是对象或者数组
    for (const key in initalObj) {
        if (typeof initalObj[key] === 'object') {//对于对象元素，deepclone
            //递归返回新的对象
            obj[key] = deepClone(initalObj[key]);
        } else if (typeof initalObj[key] === 'function') {//对于函数,用bind拷贝
            //返回新函数
            obj[key] = initalObj[key].bind(obj);
        } else {
            //基本类型直接返回
            obj[key] = initalObj[key];
        }
    }
    return obj;
}
