let numFormatter = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
})

function numFormat(num) {
    return num.toString().padStart(2, 0)
}

export { numFormat }
