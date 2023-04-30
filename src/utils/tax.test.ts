import { calculateTax, getCurrencyString } from "./tax";

describe("calculateTax", () => {
  it.each`
    salary    | residence      | incomeYear       | tax
    ${-10}    | ${"Australia"} | ${"2022 - 2023"} | ${0}
    ${0}      | ${"Australia"} | ${"2022 - 2023"} | ${0}
    ${10000}  | ${"Australia"} | ${"2022 - 2023"} | ${0}
    ${20000}  | ${"Australia"} | ${"2022 - 2023"} | ${342}
    ${60000}  | ${"Australia"} | ${"2022 - 2023"} | ${9967}
    ${150000} | ${"Australia"} | ${"2022 - 2023"} | ${40567}
    ${200000} | ${"Australia"} | ${"2021 - 2022"} | ${60667}
    ${-10}    | ${"Overseas"}  | ${"2021 - 2022"} | ${0}
    ${0}      | ${"Overseas"}  | ${"2021 - 2022"} | ${0}
    ${10000}  | ${"Overseas"}  | ${"2021 - 2022"} | ${3250}
    ${150000} | ${"Overseas"}  | ${"2021 - 2022"} | ${50100}
    ${200000} | ${"Overseas"}  | ${"2021 - 2022"} | ${70200}
  `(
    "should return tax $tax for salary $salary, residence $residence and incomeYear $incomeYear",
    ({ salary, residence, incomeYear, tax }) => {
      expect(calculateTax(salary, residence, incomeYear).tax).toEqual(tax);
    }
  );
});

describe("getCurrencyString", () => {
  it.each`
    num                   | currencyString
    ${-61231231234.25345} | ${"-$61,231,231,234.25"}
    ${-1234.25}           | ${"-$1,234.25"}
    ${-100.0}             | ${"-$100.00"}
    ${-0}                 | ${"-$0.00"}
    ${0}                  | ${"$0.00"}
    ${100.0}              | ${"$100.00"}
    ${1234.25}            | ${"$1,234.25"}
    ${61231231234.25345}  | ${"$61,231,231,234.25"}
  `(
    "should return currency string $currencyString for number $num",
    ({ num, currencyString }) => {
      expect(getCurrencyString(num)).toEqual(currencyString);
    }
  );
});
