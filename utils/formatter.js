export function nf(num) {
    if ( num < 1000 ) return Math.round(num)

    const match = [
        { value: 1e3, symbol: "k"},
        { value: 1e6, symbol: "m"},
        { value: 1e9, symbol: "b"},
        { value: 1e12, symbol: "t"},
        { value: 1e15, symbol: "q" }
    ]

    let item = match.findLast(function(obj){return num >= obj.value})

    return (num / item.value).toFixed(2) + item.symbol
}
