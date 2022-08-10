
export const utilService = {
    delay,
    getRandomInt,
    makeId,
    debounce,
    isDarkColor
}

function delay(ms = 1500) {
    return new Promise(resolve => {
        setTimeout(resolve, ms)
    })
}

function getRandomInt(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min) + min) //The maximum is exclusive and the minimum is inclusive
}

function makeId(length = 5) {
    var txt = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return txt
}

function isDarkColor(c) {
    if (c[0] !== '#') c = _rgbToHex(c)
    c = c.substring(1) // strip #
    const rgb = parseInt(c, 16) // convert rrggbb to decimal
    const r = (rgb >> 16) & 0xff // extract red
    const g = (rgb >> 8) & 0xff // extract green
    const b = (rgb >> 0) & 0xff // extract blue
    var luma = 0.2126 * r + 0.7152 * g + 0.0722 * b // per ITU-R BT.709

    return luma < 100
}
function _componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}
function _rgbToHex(clr) {
    if (clr[0] === '#') return clr
    const rgb = clr.split('(')[1].split(')')[0].split(',')
    const r = +rgb[0].trim()
    const g = +rgb[1].trim()
    const b = +rgb[2].trim()
    return "#" + _componentToHex(r) + _componentToHex(g) + _componentToHex(b);
}

export function debounce(func, wait = 700) {
    let timeout

    return function (...args) {
        const later = () => {
            clearTimeout(timeout)
            func(...args)
        }

        clearTimeout(timeout)
        timeout = setTimeout(later, wait)
    }
}
