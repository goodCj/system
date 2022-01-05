import { useCallback, useEffect, useRef } from 'react'

/**
 * @method useDounced
 * @description 防抖函数
 */
export const useDounced = (fn, time, dep = []) => {
    const { current }  =useRef({ fn, timer: null })
    useEffect(()=> {
        current.fn = fn
    }, [fn])  // eslint-disable-line react-hooks/exhaustive-deps
    return useCallback((...args) => {
        if(current.timer){
            clearTimeout(current.timer)
        }
        current.timer = setTimeout((() => {
            current.fn.call(this, ...args)
        }), time)
    }, dep)  // eslint-disable-line react-hooks/exhaustive-deps
}

/**
 * @method getUrlParam
 * @param { string } name 参数名
 * @description 获取url的参数
 */

export const getUrlParam = (name) => {
    if(!name) return
    let param = window.location.search?.substr(1) || window.location.hash.split('?')[1]
    if(!param) return
    let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
    let r = decodeURI(param).match(reg)
    if(!r) return
    return r[2]
}