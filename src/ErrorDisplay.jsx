const ErrorDisplay = (props) => {
    const showError = props.showError;

    if (showError) {
        console.log(props.errorContent)
        return null
    } else {
        return null
    }
}

export default ErrorDisplay;