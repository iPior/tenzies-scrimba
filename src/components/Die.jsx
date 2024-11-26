import React from "react"

export default function Die(props) {

    const styles = props.isHeld ? {backgroundColor: "#59E391"} : {};

    return (
        (
            <button style={styles} onClick={props.hold} className="die" aria-label={`Die with value ${props.value}, 
            ${props.isHeld ? "held" : "not held"}`}>{props.value}</button>
        )
    )
}