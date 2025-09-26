export function formatCurrency(value: number): string {
  const options = {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  };

  return value.toLocaleString('pt-BR', options);
}

export function formatBalance(balance: number): string {
  const formattedValue = formatCurrency(Math.abs(balance));

  if (balance >= 0) {
    return `P$ ${formattedValue}`;
  } else {
    return `- P$ ${formattedValue}`;
  }
}
