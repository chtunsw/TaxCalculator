import React, { PropsWithChildren, useState } from "react";
import { Paper, Button } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import CurrencyField from "../InputField/CurrencyField/CurrencyField";
import SelectionField from "../InputField/SelectionField/SelectionField";
import {
  IncomeYear,
  CountryOfResidence,
  TaxBracket,
  calculateTax,
  getCurrencyString,
} from "../../utils/tax";
import "./TaxCalculator.css";

interface CoverProps {
  className?: string;
}

interface CalculatorProps {
  showResult: boolean;
}

interface TaxBracketProps {
  taxBracket: TaxBracket;
}

const Cover = (props: PropsWithChildren<CoverProps>) => {
  return <div className={props.className}>{props.children}</div>;
};

const TaxCalculator = () => {
  const [showResult, setShowResult] = useState(false);
  const [residence, setResidence] = useState<CountryOfResidence>("Australia");
  const [incomeYear, setIncomeYear] = useState<IncomeYear>("2022 - 2023");
  const [taxableIncome, setTaxableIncome] = useState<number>(0);
  const { taxBrackets, tax } = calculateTax(taxableIncome, residence);

  const BrandCover = () => {
    return (
      <Cover>
        <div>Tax-o-tron</div>
        <p>The free and simple online tax calculator.</p>
      </Cover>
    );
  };

  const Calculator = ({ showResult }: CalculatorProps) => {
    const onCalculate = () => {
      setShowResult(true);
    };
    const onBackToPrevious = () => {
      setShowResult(false);
    };
    const title = showResult ? "Your tax results" : "Calculate your tax";
    const tip = showResult ? null : (
      <div>
        <InfoOutlinedIcon />
        <span>Fields marked with * are mandatory</span>
      </div>
    );
    const button = showResult ? (
      <div onClick={onBackToPrevious}>Go back to previous screen</div>
    ) : (
      <Button onClick={onCalculate}>Calculate</Button>
    );
    return (
      <div>
        <span>{title}</span>
        {tip}
        <SelectionField
          label="Select your country of residence *"
          options={[]}
          value=""
          setValue={() => {}}
        />
        <SelectionField
          label="Select an income year *"
          options={[]}
          value=""
          setValue={() => {}}
        />
        <CurrencyField
          label="Enter your total taxable income for the income year * "
          value=""
          setValue={() => {}}
        />
        {button}
      </div>
    );
  };

  const TaxDetail = () => {
    const TaxBracket = (props: TaxBracketProps) => {
      return (
        <div>
          <div>
            <div>Tax Bracket</div>
            <div>{`${getCurrencyString(
              props.taxBracket.lower
            )} - ${getCurrencyString(props.taxBracket.upper)}`}</div>
          </div>
          <div>{getCurrencyString(props.taxBracket.taxable)}</div>
        </div>
      );
    };
    return (
      <Cover>
        <div>Your estimated tax is:</div>
        <span>{getCurrencyString(tax)}</span>
        <div>Breakdown</div>
        {taxBrackets.map((tb) => (
          <TaxBracket taxBracket={tb} />
        ))}
      </Cover>
    );
  };

  // render input screen
  const renderInput = () => {
    return (
      <>
        <BrandCover />
        <Calculator showResult={showResult} />
      </>
    );
  };

  // render result screen
  const renderResult = () => {
    return (
      <>
        <Calculator showResult={showResult} />
        <TaxDetail />
      </>
    );
  };
  return (
    <Paper className="taxCalculator">
      {showResult ? renderResult() : renderInput()}
    </Paper>
  );
};

export default TaxCalculator;
