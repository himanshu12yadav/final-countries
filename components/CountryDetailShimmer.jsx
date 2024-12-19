import './shimmer.css';

export default function CountryDetailShimmer() {
    return (
        <div className="country-details-container">
            <span className="back-button shimmer"></span>
            <div className="country-details">
                <div className="flag-shimmer shimmer"></div>
                <div className="details-text-container">
                    <div className="title-shimmer shimmer">
                        <div className="details-text">
                            {
                                [...Array(9)].map((_, index) => <div key={index}
                                                                     className="text-line-shimmer shimmer"></div>)
                            }
                        </div>
                        <div className="border-countries-shimmer shimmer"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}
