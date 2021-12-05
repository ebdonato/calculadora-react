import "./App.css"
import { Button } from "./components/Button"
import { Display } from "./components/Display"
import { useState } from "react"

function App() {
    const [displayValue, setDisplayValue] = useState("0")
    const [clearDisplay, setClearDisplay] = useState(false)
    const [operation, setOperation] = useState(null)
    const [values, setValues] = useState([0, 0])
    const [current, setCurrent] = useState(0)

    const clearMemory = () => {
        setDisplayValue("0")

        setClearDisplay(false)

        setOperation(null)

        setValues([0, 0])

        setCurrent(0)
    }

    const addOperation = (op) => {
        if (current === 0) {
            setOperation(op)

            setCurrent(1)

            setClearDisplay(true)
        } else {
            const isEqualsOperation = op === "="

            const currentOperation = operation

            const [left, right] = values

            const operationsFunctions = {
                "+": (left, right) => left + right,
                "-": (left, right) => left - right,
                "/": (left, right) => left / right,
                "*": (left, right) => left * right,
            }

            try {
                const result = operationsFunctions[currentOperation](left, right)

                setDisplayValue(result)

                setValues([result, 0])
            } catch (error) {
                console.error("🚀 ~ file: App.jsx ~ addOperation ~ error")

                setDisplayValue(left)
            }

            setOperation(isEqualsOperation ? null : op)

            setCurrent(isEqualsOperation ? 0 : 1)

            setClearDisplay(!isEqualsOperation)
        }
    }

    const addDigit = (n) => {
        if (n === "." && displayValue.includes(".")) return

        const clear = displayValue === "0" || clearDisplay

        const newDisplayValue = (clear ? "" : displayValue) + n

        setDisplayValue(newDisplayValue)

        setClearDisplay(false)

        if (n !== ".") {
            const [left, right] = values

            const newValue = parseFloat(newDisplayValue)

            setValues(current ? [left, newValue] : [newValue, right])
        }
    }

    return (
        <div className="App">
            <Display value={displayValue} />

            <Button label="AC" click={clearMemory} triple />

            <Button label="/" click={addOperation} operation />

            <Button label="7" click={addDigit} />

            <Button label="8" click={addDigit} />

            <Button label="9" click={addDigit} />

            <Button label="*" click={addOperation} operation />

            <Button label="4" click={addDigit} />

            <Button label="5" click={addDigit} />

            <Button label="6" click={addDigit} />

            <Button label="-" click={addOperation} operation />

            <Button label="1" click={addDigit} />

            <Button label="2" click={addDigit} />

            <Button label="3" click={addDigit} />

            <Button label="+" click={addOperation} operation />

            <Button label="0" click={addDigit} double />

            <Button label="." click={addDigit} />

            <Button label="=" click={addOperation} operation />
        </div>
    )
}

export default App
