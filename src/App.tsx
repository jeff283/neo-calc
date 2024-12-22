import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function App() {
  // Calc Steps
  // 1. Get input and prep it for calculation
  // 2. Display the calc inputs on screen
  // 3. Calculate when the "=" button is pressed
  // 4. Display the result on screen
  // 5. Clear the calc inputs

  const [calcInputs, setCalcInputs] = useState<string[]>([]);
  const [result, setResult] = useState<number | null>(null);
  // const operators = ["+", "-", "*", "/"];

  const inputHandler = (input: string) => {
    if (result !== null) {
      clearInputs();
    }
    switch (input) {
      // Clear inputs if input is AC
      case "AC":
        clearInputs();
        return;
        // Make calculations on equal sign
      case "=":
        calcHandler();
        return;
        // Parenthesis
      case "()":
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

  const calcHandler = () => {
    const results = calcInputs.join("");
    setResult(eval(results));
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
            <Button>()</Button>
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
