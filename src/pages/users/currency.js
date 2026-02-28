export const formatCurrency = (amount = 0) => {
  const safeAmount = Number(amount);

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(isNaN(safeAmount) ? 0 : safeAmount);
};