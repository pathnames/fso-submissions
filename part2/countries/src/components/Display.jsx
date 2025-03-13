const Display = ({ filter, data }) => {
    const countriesToShow = filter ? data.filter(country => country.name.common.toLowerCase().startsWith(filter.toLowerCase())) : [];

    if (!countriesToShow || countriesToShow.length === 0) {
        return <p>No matches found.</p>;
    } else if (countriesToShow.length >= 10) {
        return <p>Too many matches, specify another filter.</p>
    } else if (countriesToShow.length == 1) {
        const country = countriesToShow[0]
        return (
            <>
                <h1>{country.name.common}</h1>
                <p>Capital {country.capital?.[0] || "N/A"}</p>
                <p>Area {country.area}</p>
                <h3>Languages</h3>
                <ul>
                    {Object.entries(country.languages).map(([key, value]) => (
                        <li key={key}>{value}</li>
                    ))}
                </ul>
                <img src={country.flags.png} alt="flag"></img>            
            </>
        )
    }
    return (
        <ul>
            {countriesToShow.map(country => (
                <li key={country.name.common}> {country.name.common} </li> 
            ))}
        </ul>
    )
};

export default Display;
