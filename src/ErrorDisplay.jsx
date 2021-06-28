const ErrorDisplay = (props) => {
    const showError = props.showError;

    if (showError) {
        return (
            <div className="errorHandler">
                {props.errorContent}
            </div>)
    } else {
        return null
    }
}

export default ErrorDisplay;