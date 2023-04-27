import React, { PropsWithChildren, useState } from "react";
import { Paper, Button } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import CurrencyField from "../InputField/CurrencyField/CurrencyField";
import SelectionField from "../InputField/SelectionField/SelectionField";
import "./TaxCalculator.css";

interface CoverProps {
  className?: string;
}

interface CalculatorProps {
  showResult: boolean;
}

const Cover = (props: PropsWithChildren<CoverProps>) => {
  return <div className={props.className}>{props.children}</div>;
};

const TaxCalculator = () => {
  const [showResult, setShowResult] = useState(false);
  const [taxableIncome, setTaxableIncome] = useState();

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
    return (
      <Cover>
        <div>Your estimated taxable income is:</div>
        <div>The free and simple online tax calculator.</div>
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
