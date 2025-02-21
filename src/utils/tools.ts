
// Format String or Number to Currency
export function number_format(number: number | string) {
    return new Intl.NumberFormat("en-US", {
        style: "decimal",
    }).format(Number(number));
}

export const sleep = (delay: number) => new Promise((resolve) => setTimeout(resolve, delay))
