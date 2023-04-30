import taxRateTable from "../data/taxRateTable.json";

export type IncomeYear = "2022 - 2023" | "2021 - 2022";
export type CountryOfResidence = "Australia" | "Overseas";

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
  tax: number;
}

export const calculateTax = (
  income: number,
  residence: CountryOfResidence,
  incomeYear: IncomeYear
): TaxResult => {
  const taxRates = taxRateTable[residence][incomeYear].map((tr) => ({
    ...tr,
    upper: Number(tr.upper),
  })) as TaxRate[];
  const validIncome = taxRates.some(
    (t) => income > t.lower && income <= t.upper
  );
  if (!validIncome)
    return {
      taxBrackets: taxRates.map((t) => ({
        ...t,
        taxable: 0,
      })),
      tax: 0,
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
  const tax = taxBrackets.reduce((accu, curr) => curr.taxable + accu, 0);
  return { taxBrackets, tax };
};

export const getCurrencyString = (num: number): string => {
  const localeString = num.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  const currencyString =
    localeString[0] === "-"
      ? localeString[0] + "$" + localeString.slice(1)
      : `$${localeString}`;
  return currencyString;
};
