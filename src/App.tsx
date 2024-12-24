import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function App() {


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
      // Remove the lasr input if input is C
      case "C":
        setCalcInputs((prevInputs) => prevInputs.slice(0, -1));
        return;
        // Make calculations on equal sign
      case "=":
        calcHandler();
        return;
        // Percent
      case "%":
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
      const results: string = calcInputs.join("");
      // Convert eval result to number for type safety
      const evaluatedResult: number = Number(eval(results));
      
      // Validate the result is a valid, finite number
      if (!isNaN(evaluatedResult) && isFinite(evaluatedResult)) {
        setResult(evaluatedResult);
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
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="flex flex-col gap-4 p-4 border border-black rounded-lg">
          {/* Display Container */}
          <div className="w-full p-6 border border-black rounded-lg">
            <div>
              {/* Display Input */}
              <div className="text-2xl font-bold min-h-9">
                {calcInputs.length > 0 ? calcInputs.join("") : ""}
              </div>
              {/* Display Result */}
              <div className="text-3xl font-bold text-right min-h-10">
                {result !== null && result}
              </div>
            </div>
          </div>

          {/* Keyboard Container */}
          <div className="grid grid-cols-4 gap-4">
            {/* Row */}
            <Button onClick={() => inputHandler("AC")}>AC</Button>
            <Button onClick={() => inputHandler("C")}>C</Button>
            <Button>%</Button>
            <Button>/</Button>

            {/* Row */}
            <Button onClick={() => inputHandler("7")}>7</Button>
            <Button onClick={() => inputHandler("8")}>8</Button>
            <Button onClick={() => inputHandler("9")}>9</Button>
            <Button onClick={() => inputHandler("*")}>x</Button>

            {/* Row */}
            <Button onClick={() => inputHandler("4")}>4</Button>
            <Button onClick={() => inputHandler("5")}>5</Button>
            <Button onClick={() => inputHandler("6")}>6</Button>
            <Button onClick={() => inputHandler("-")}>-</Button>

            {/* Row */}
            <Button onClick={() => inputHandler("1")}>1</Button>
            <Button onClick={() => inputHandler("2")}>2</Button>
            <Button onClick={() => inputHandler("3")}>3</Button>
            <Button onClick={() => inputHandler("+")}>+</Button>

            {/* Row */}
            <Button onClick={() => inputHandler("0")}>0</Button>
            <Button onClick={() => inputHandler(".")}>.</Button>
            {/* Larger Button */}
            <Button className="col-span-2" onClick={() => inputHandler("=")}>
              =
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
