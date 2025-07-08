export const formatPrice = (price: number) =>
  price.toLocaleString('cs-CZ', { style: 'currency', currency: 'CZK' });

export const calculatePriceWithVAT = (price: number, vatRate: number = 0.21) =>
  price * (1 + vatRate);

export async function convertCZKtoEUR(czkAmount: number): Promise<number | null> {
  try {
    const PROXY_URL = "http://localhost:3333/cnb-kurz";
    const res = await fetch(PROXY_URL);
    const text: string = await res.text();

    const lines = text.split("\n").slice(2);
    const eurLine = lines.find((line) => {
      const parts = line.split("|");
      return parts[3] === "EUR";
    });

    if (!eurLine) {
      console.warn("Řádek s EUR nebyl nalezen.");
      return null;
    }

    const parts = eurLine.split("|");
    const amount = parseInt(parts[2]);
    const rate = parseFloat(parts[4].replace(",", "."));

    if (isNaN(rate) || isNaN(amount)) {
      console.warn("Neplatná čísla v datech kurzu EUR.");
      return null;
    }

    const eurRate = rate / amount;
    return czkAmount / eurRate;
  } catch (error) {
    console.error("Chyba při načítání kurzu z ČNB:", error);
    return null;
  }
}