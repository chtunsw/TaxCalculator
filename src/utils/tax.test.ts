import { calculateTax } from "./tax";

describe("calculateTax", () => {
  it.each`
    salary    | residence      | taxable
    ${-10}    | ${"Australia"} | ${0}
    ${0}      | ${"Australia"} | ${0}
    ${10000}  | ${"Australia"} | ${0}
    ${20000}  | ${"Australia"} | ${342}
    ${60000}  | ${"Australia"} | ${9967}
    ${150000} | ${"Australia"} | ${40567}
    ${200000} | ${"Australia"} | ${60667}
    ${-10}    | ${"Overseas"}  | ${0}
    ${0}      | ${"Overseas"}  | ${0}
    ${10000}  | ${"Overseas"}  | ${3250}
    ${150000} | ${"Overseas"}  | ${50100}
    ${200000} | ${"Overseas"}  | ${70200}
  `(
    "should return taxable $taxable for salary $salary and residence $residence",
    ({ salary, residence, taxable }) => {
      expect(calculateTax(salary, residence).taxableIncome).toEqual(taxable);
    }
  );
});
