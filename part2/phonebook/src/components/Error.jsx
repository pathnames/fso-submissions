const Error = ({ message }) => {
    if (message === null) return null
    const errorStyle = {
        color: 'red',
        backgroundColor: 'lightgrey',
        fontSize: '20px',
        borderStyle: 'solid',
        borderRadius: '5px',
        padding: '10px',
        marginBottom: '10px',
    }
    return (
        <>
            <div style={errorStyle}>
                {message}
            </div>
        </>
    )
}

export default Error