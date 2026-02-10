export default function formatNumber(value: number, options?: { useNotations: boolean }) {
    
    let newValue = ''
    let suffix   = ''
    if (value >= 1_000_000) {
        suffix   = 'M'
        newValue = (value / 1_000_000).toPrecision(2)
    } else if (value >= 1000) {
        suffix   = 'K'
        newValue = (value / 1000).toPrecision(2)
    }
    
    return newValue + suffix
    
}