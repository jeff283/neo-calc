import { Button } from "@/components/ui/button";
import { useState } from "react";

const Calculator = () => {
  const [calcInputs, setCalcInputs] = useState<string[]>([]);
  const [result, setResult] = useState<number | null>(null);

  const inputHandler = (input: string) => {
    if (result !== null) {
      clearInputs();
    }

    switch (input) {
      // Clear inputs if input is AC
      case "AC":
        clearInputs();
        return;

      // Remove the last input if input is C
      case "C":
        setCalcInputs((prevInputs) => prevInputs.slice(0, -1));
        return;

      // Make calculations on equal sign
      case "=":
        calcHandler();
        return;

      default:
        break;
    }

    setCalcInputs((prevInputs) => [...prevInputs, input]);
  };

  const clearInputs = () => {
    setCalcInputs([]);
    setResult(null);
  };

  const calcHandler = (): void => {
    try {
      // Replace "π" with Math.PI for calculation
      const results: string = calcInputs.join("").replace(/π/g, `${Math.PI}`);

      // Convert eval result to number for type safety
      const evaluatedResult: number = Number(eval(results));

      // Validate the result is a valid, finite number
      if (!isNaN(evaluatedResult) && isFinite(evaluatedResult)) {
        // Round the result to 3 decimal places
        const roundedResult: number = Math.round(evaluatedResult * 1000) / 1000;
        setResult(roundedResult);
      } else {
        setResult(null);
      }
    } catch (error) {
      console.error("Error in Calculating the results: ", error);
      setResult(null);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen bg-displayArea">
        <div className="shadow-[-4px_-4px_0px_rgba(0,0,0,1),12px_12px_0px_rgba(0,0,0,1)]  bg-keyboardArea rounded-2xl ">
          {/* Display Container */}
          <div className="w-full p-6 text-black rounded-2xl bg-displayArea">
            <div>
              {/* Display Input */}
              <div className="text-4xl font-bold min-h-12">
                {calcInputs.length > 0 ? calcInputs.join("") : ""}
              </div>
              {/* Display Result */}
              <div className="text-6xl font-bold text-right min-h-16">
                {result !== null && result}
              </div>
            </div>
          </div>

          {/* Keyboard Container */}
          <div className="grid grid-cols-4 gap-4 p-4 bg-keyboardArea rounded-2xl">
            {/* Row */}
            <Button onClick={() => inputHandler("AC")} variant="special" className="">
              AC
            </Button>
            <Button onClick={() => inputHandler("C")} variant="normal">
              C
            </Button>
            <Button onClick={() => inputHandler("π")} variant="normal">
              π
            </Button>
            <Button onClick={() => inputHandler("/")} variant="normal">
              /
            </Button>

            {/* Row */}
            <Button onClick={() => inputHandler("7")} variant="normal">
              7
            </Button>
            <Button onClick={() => inputHandler("8")} variant="normal">
              8
            </Button>
            <Button onClick={() => inputHandler("9")} variant="normal">
              9
            </Button>
            <Button onClick={() => inputHandler("*")} variant="normal">
              x
            </Button>

            {/* Row */}
            <Button onClick={() => inputHandler("4")} variant="normal">
              4
            </Button>
            <Button onClick={() => inputHandler("5")} variant="normal">
              5
            </Button>
            <Button onClick={() => inputHandler("6")} variant="normal">
              6
            </Button>
            <Button onClick={() => inputHandler("-")} variant="normal">
              -
            </Button>

            {/* Row */}
            <Button onClick={() => inputHandler("1")} variant="normal">
              1
            </Button>
            <Button onClick={() => inputHandler("2")} variant="normal">
              2
            </Button>
            <Button onClick={() => inputHandler("3")} variant="normal">
              3
            </Button>
            <Button onClick={() => inputHandler("+")} variant="normal">
              +
            </Button>

            {/* Row */}
            <Button onClick={() => inputHandler("0")} variant="normal">
              0
            </Button>
            <Button onClick={() => inputHandler(".")} variant="normal">
              .
            </Button>
            {/* Larger Button */}
            <Button
              className="col-span-2"
              onClick={() => inputHandler("=")}
              variant="special"
            >
              =
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Calculator;
