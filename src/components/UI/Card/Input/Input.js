import classes from "./Input.module.css";

const Input = props => {
    return (
        <div
            className={`${classes.control} ${
                !props.isValid ? classes.invalid : ''
            }`}
        >
            <label htmlFor={props.name}>{props.label}</label>
            <input
                type={props.type}
                id={props.name}
                value={props.value}
                onChange={props.onChange}
                onBlur={props.onBlur}
            />
        </div>
    )
}

export default Input;