import './CountryDetail.css';
import {Link, useParams, useLocation} from "react-router-dom";
import {useEffect, useState} from "react";
import CountryDetailShimmer from "./CountryDetailShimmer";
import {useTheme} from "../hooks/useTheme";


const CountryNotFound = () => {
    return (
        <div className="error-container">
            <div className="error-content">
                <div className="error-icon">
                    <i className="fa-solid fa-globe fa-3x"></i>
                </div>
                <h1 className="error-title">Country Not Found</h1>
                <p className="error-message">
                    We couldn't find any country matching your search. Please verify the country name and try again.
                </p>
                <Link to="/" className="error-button">
                    <i className="fa-solid fa-arrow-left"></i>
                    <span>Return to Homepage</span>
                </Link>
            </div>
        </div>
    )
}

export default function CountryDetail() {
    // const countryName = new URLSearchParams(location.search).get('name');
    const params = useParams();
    const location = useLocation();

    const countryName = params.country;
    const [countryData, setCountryData] = useState(null);
    const [notFound, setNotFound] = useState(false);
    const [isDark] = useTheme();


    function updateCountryData(data) {
        setCountryData({
            name: data.name.common || data.name,
            nativeName: Object.values(data.name.nativeName || {})[0]?.common,
            population: data.population,
            region: data.region,
            subRegion: data.subregion,
            capital: data.capital?.join(', '),
            topLevelDomain: data.tld,
            currencies: Object.values(data.currencies || {}).map(currency => currency.name).join(', '),
            languages: Object.values(data.languages || {}).join(', '),
            borders: [],
            flag: data.flags.svg,
        });

        if (!data.borders) {
            setCountryData(prevState => ({
                ...prevState,
                borders: []
            }));
            return;
        }

        Promise.all(data.borders.map(border => {
            return fetch(`https://restcountries.com/v3.1/alpha/${border}`)
                .then(res => res.json())
                .then(([borderCountry]) => borderCountry.name.common);
        })).then(borders => {
            setTimeout(() => setCountryData(prevState => ({
                ...prevState,
                borders
            })));

        })
    }


    useEffect(() => {
        if (location.state) {
            updateCountryData(location.state);
            return;
        }

        fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
            .then(res => {
                if (!res.ok) {
                    throw new Error('Country not found');
                }
                return res.json();
            })
            .then(([data]) => {
                updateCountryData(data);
            })
            .catch(err => {
                console.log(err);
                setNotFound(true);
            });
    }, [countryName]); // Added closing parenthesis and dependency array


    if (notFound) {
        return <CountryNotFound/>
    }

    return (countryData === null ? <CountryDetailShimmer/> : (
            <main className={`${isDark ? 'dark' : ''}`}>
                <div className="country-details-container">
        <span className="back-button" onClick={() => history.back()}>
          <i className="fa-solid fa-arrow-left"></i>&nbsp; Back
        </span>
                    <div className="country-details">
                        <img src={countryData.flag} alt={`${countryName} flag`}/>
                        <div className="details-text-container">
                            <h1>{countryData.name}</h1>
                            <div className="details-text">
                                <p>
                                    <b>Native Name: {countryData.nativeName || countryData.name}</b>
                                    <span className="native-name"></span>
                                </p>
                                <p>
                                    <b>
                                        Population:{countryData.population?.toLocaleString('en-IN')}
                                    </b>
                                    <span className="population"></span>
                                </p>
                                <p>
                                    <b>Region: {countryData.region}</b>
                                    <span className="region"></span>
                                </p>
                                <p>
                                    <b>Sub Region:{countryData.subRegion} </b>
                                    <span className="sub-region"></span>
                                </p>
                                <p>
                                    <b>Capital: {countryData.capital}</b>
                                    <span className="capital"></span>
                                </p>
                                <p>
                                    <b>Top Level Domain: {countryData.topLevelDomain}</b>
                                    <span className="top-level-domain"></span>
                                </p>
                                <p>
                                    <b>Currencies: {countryData.currencies}</b>
                                    <span className="currencies"></span>
                                </p>
                                <p>
                                    <b>Languages: {countryData.languages}</b>
                                    <span className="languages"></span>
                                </p>
                            </div>

                            {
                                countryData.borders?.length > 0 && (
                                    <div className="border-countries">
                                        <b>Border Countries: {countryData.borders.map((border) => <Link key={border}
                                                                                                        to={`/${border}`}>
                                            {border}
                                        </Link>)}</b>&nbsp;
                                    </div>
                                )

                            }
                        </div>
                    </div>
                </div>
            </main>)
    )
}


