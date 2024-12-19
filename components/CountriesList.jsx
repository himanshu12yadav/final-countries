import CountryCard from "./CountryCard";
import {useEffect, useState} from "react";
import './shimmer.css';
import CountryListShimmer from "./CountriesListShimmer";

export default function CountriesList({query}) {
    const [countriesData, setCountriesData] = useState([]);

    useEffect(() => {
        fetch('https://restcountries.com/v3.1/all')
            .then(res => res.json())
            .then((data) => setCountriesData(data));
    }, []);


    return countriesData.length === 0 ? <CountryListShimmer/> : (
        <div className="countries-container">
            {countriesData.filter(country => country.name.common.toLowerCase().includes(query) || country.region.toLowerCase().includes(query)).map((country) =>
                <CountryCard
                    name={country.name.common}
                    flag={country.flags.svg}
                    population={country.population.toLocaleString('en-IN')}
                    region={country.region}
                    capital={country.capital ? country.capital[0] : 'N/A'}
                    key={country.name.common}
                    data={country}
                />)}
        </div>
    )
}
