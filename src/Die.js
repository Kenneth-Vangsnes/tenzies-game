import React from "react";

export default function Die(props) {
    const styles = {
        backgroundColor: props.isHeld ? "Green" : "Orange"
    }

    return (
        <div 
            className="dice-face"
            style={styles}
            onClick={() => props.onClick(props.id)}
            >
                {props.num}
        </div>
    )
}