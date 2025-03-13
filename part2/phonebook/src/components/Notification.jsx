const Notification = ({ message }) => {
    if (message === null) return null
    const successStyle = {
        color: 'green',
        backgroundColor: 'lightgrey',
        fontSize: '20px',
        borderStyle: 'solid',
        borderRadius: '5px',
        padding: '10px',
        marginBottom: '10px',
      };
      
    return (
        <>
            <div style={successStyle}>
                {message}
            </div>
        </>
    )
}

export default Notification