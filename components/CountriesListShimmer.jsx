export default function CountryListShimmer() {
    return (
        <div className="countries-container">
            {[...Array(8)].map((_, index) => (
                <div key={index} className="country-card">
                    <div className="flag-card-shimmer shimmer"></div>
                    <div className="card-text">
                        <div className="card-title-shimmer shimmer"></div>
                        <div className="card-text-shimmer shimmer"></div>
                        <div className="card-text-shimmer shimmer"></div>
                        <div className="card-text-shimmer shimmer"></div>
                    </div>
                </div>
            ))}
        </div>
    )
}
