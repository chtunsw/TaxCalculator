type IncomeYear = "2022 - 2023" | "2021 - 2022";
type CountryOfResidence = "Australia" | "Overseas";

export const incomeYears = ["2022 - 2023", "2021 - 2022"];
export const countries = ["Australia", "Overseas"];

export interface TaxRate {
  lower: number;
  upper: number;
  rate: number;
}

export interface TaxBracket extends TaxRate {
  taxable: number;
}

export interface TaxResult {
  taxBrackets: TaxBracket[];
  taxableIncome: number;
}

export const domesticTaxRates: TaxRate[] = [
  {
    lower: 0,
    upper: 18200,
    rate: 0,
  },
  {
    lower: 18200,
    upper: 45000,
    rate: 0.19,
  },
  {
    lower: 45000,
    upper: 120000,
    rate: 0.325,
  },
  {
    lower: 120000,
    upper: 180000,
    rate: 0.37,
  },
  {
    lower: 180000,
    upper: Infinity,
    rate: 0.45,
  },
];

export const overseasTaxRates: TaxRate[] = [
  {
    lower: 0,
    upper: 120000,
    rate: 0.325,
  },
  {
    lower: 120000,
    upper: 180000,
    rate: 0.37,
  },
  {
    lower: 180000,
    upper: Infinity,
    rate: 0.45,
  },
];

export const calculateTax = (
  income: number,
  residence: CountryOfResidence
): TaxResult => {
  const taxRates =
    residence === "Australia" ? domesticTaxRates : overseasTaxRates;
  const validIncome = taxRates.some(
    (t) => income > t.lower && income <= t.upper
  );
  if (!validIncome)
    return {
      taxBrackets: taxRates.map((t) => ({
        ...t,
        taxable: 0,
      })),
      taxableIncome: 0,
    };
  const taxBrackets = taxRates.map((t) => {
    let taxable = 0;
    if (income > t.lower && income < t.upper) {
      taxable = (income - t.lower) * t.rate;
    } else if (income >= t.upper) {
      taxable = (t.upper - t.lower) * t.rate;
    }
    return {
      ...t,
      taxable,
    };
  });
  const taxableIncome = taxBrackets.reduce(
    (accu, curr) => curr.taxable + accu,
    0
  );
  return { taxBrackets, taxableIncome };
};
