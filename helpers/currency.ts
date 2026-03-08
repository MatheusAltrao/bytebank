export function formatCurrency(value: string): string {
    const digits = value.replace(/\D/g, "");

    if (!digits) return "";

    const numericValue = parseInt(digits, 10);
    const formatted = (numericValue / 100).toFixed(2);

    const [intPart, decPart] = formatted.split(".");
    const intFormatted = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

    return `${intFormatted},${decPart}`;
}
