import React, { PropsWithChildren, useState } from "react";
import { Paper, Button } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import CurrencyField from "../InputField/CurrencyField/CurrencyField";
import SelectionField from "../InputField/SelectionField/SelectionField";
import {
  IncomeYear,
  CountryOfResidence,
  incomeYears,
  countries,
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
  setShowResult: (value: boolean) => void;
  residence: string;
  setResidence: (value: string) => void;
  incomeYear: string;
  setIncomeYear: (value: string) => void;
  taxableIncome: string;
  setTaxableIncome: (value: string) => void;
  taxableIncomeError: boolean;
}

interface TaxBracketProps {
  taxBracket: TaxBracket;
}

const Cover = (props: PropsWithChildren<CoverProps>) => {
  return <div className={props.className}>{props.children}</div>;
};

const Calculator = ({
  showResult,
  setShowResult,
  residence,
  setResidence,
  incomeYear,
  setIncomeYear,
  taxableIncome,
  setTaxableIncome,
  taxableIncomeError,
}: CalculatorProps) => {
  const onCalculate = () => {
    setShowResult(true);
  };
  const onBackToPrevious = () => {
    setShowResult(false);
  };
  const title = showResult ? "Your tax results" : "Calculate your tax";
  const tip = showResult ? null : (
    <div className="tip">
      <InfoOutlinedIcon className="icon" />
      <span className="text">Fields marked with * are mandatory</span>
    </div>
  );
  const button = showResult ? (
    <div onClick={onBackToPrevious}>Go back to previous screen</div>
  ) : (
    <Button
      onClick={onCalculate}
      disabled={taxableIncomeError}
      fullWidth
      variant="contained"
      size="large"
      className="calculateButton"
    >
      Calculate
    </Button>
  );
  return (
    <div className="calculator">
      <span className="title">{title}</span>
      {tip}
      <SelectionField
        label="Select your country of residence *"
        options={countries}
        value={residence}
        setValue={setResidence}
        disabled={showResult}
      />
      <SelectionField
        label="Select an income year *"
        options={incomeYears}
        value={incomeYear}
        setValue={setIncomeYear}
        disabled={showResult}
      />
      <CurrencyField
        label="Enter your total taxable income for the income year * "
        value={taxableIncome}
        setValue={setTaxableIncome}
        error={taxableIncomeError}
        disabled={showResult}
      />
      {button}
    </div>
  );
};

const TaxCalculator = () => {
  const [showResult, setShowResult] = useState(false);
  const [residence, setResidence] = useState("Australia");
  const [incomeYear, setIncomeYear] = useState("2022 - 2023");
  const [taxableIncome, setTaxableIncome] = useState("0");
  const taxableIncomeError =
    taxableIncome === "" || isNaN(Number(taxableIncome));
  const { taxBrackets, tax } = calculateTax(
    Number(taxableIncome),
    residence as CountryOfResidence
  );

  console.log("showResult", showResult);
  console.log("residence", residence);
  console.log("incomeYear", incomeYear);
  console.log("taxableIncome", taxableIncome);
  console.log("tax", tax);

  const BrandCover = () => {
    return (
      <Cover className="brandCover">
        <img src="Planetoid.png" className="planetoid" />
        <img src="Moon.png" className="moon" />
        <div className="brandContent">
          <div className="brandTitle">Tax-o-tron</div>
          <p className="brandText">
            The free and simple online tax calculator.
          </p>
        </div>
      </Cover>
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
      <Cover className="detailCover">
        <div>Your estimated tax is:</div>
        <span>{getCurrencyString(tax)}</span>
        <div>Breakdown</div>
        {taxBrackets.map((tb, index) => (
          <TaxBracket
            taxBracket={tb}
            key={index.toString() + tb.lower.toString() + tb.upper.toString()}
          />
        ))}
      </Cover>
    );
  };

  // render input screen
  const renderInput = () => {
    return (
      <>
        <div className="box">
          <BrandCover />
        </div>
        <div className="box">
          <Calculator
            showResult={showResult}
            setShowResult={setShowResult}
            residence={residence}
            setResidence={setResidence}
            incomeYear={incomeYear}
            setIncomeYear={setIncomeYear}
            taxableIncome={taxableIncome}
            setTaxableIncome={setTaxableIncome}
            taxableIncomeError={taxableIncomeError}
          />
        </div>
      </>
    );
  };

  // render result screen
  const renderResult = () => {
    return (
      <>
        <Calculator
          showResult={showResult}
          setShowResult={setShowResult}
          residence={residence}
          setResidence={setResidence}
          incomeYear={incomeYear}
          setIncomeYear={setIncomeYear}
          taxableIncome={taxableIncome}
          setTaxableIncome={setTaxableIncome}
          taxableIncomeError={taxableIncomeError}
        />
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
