import "./Button.css"

export function Button(props) {
    const style = `button ${props.operation ? "operation" : ""} ${props.double ? "double" : ""} ${
        props.triple ? "triple" : ""
    }`

    return (
        <button className={style} onClick={() => props.click && props.click(props.label)}>
            {props.label}
        </button>
    )
}
