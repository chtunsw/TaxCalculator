import { calculateTax } from "./tax";

describe("calculateTax", () => {
  it.each`
    salary    | taxable
    ${-10}    | ${0}
    ${0}      | ${0}
    ${10000}  | ${0}
    ${20000}  | ${342}
    ${60000}  | ${9967}
    ${150000} | ${40567}
    ${200000} | ${60667}
  `(
    "should return taxable $taxable for salary of $salary",
    ({ salary, taxable }) => {
      expect(calculateTax(salary).taxableIncome).toEqual(taxable);
    }
  );
});
