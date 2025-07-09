export const formatPrice = (price: number) =>
  price.toLocaleString('cs-CZ', { style: 'currency', currency: 'CZK' });

export const calculatePriceWithVAT = (price: number, vatRate: number = 0.21) =>
  price * (1 + vatRate);

export async function convertCZKtoEUR(czkAmount: number): Promise<number | null> {
  try {
    const res = await fetch('/eur-rate.json');
    const data = await res.json();

    const eur = data.rates.find((item: any) => item.currencyCode === "EUR");
    if (!eur) return null;

    return czkAmount / eur.rate;
  } catch (error) {
    console.error("Chyba při načítání kurzu EUR (offline):", error);
    return null;
  }
}