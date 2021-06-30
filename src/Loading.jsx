import "./Loading.css";

const Loading = ()=>{
    return(<div className={"loading-page"}>
        <span>Loading ...</span>
        <svg height="400" width="400" id="preloader">
            <g filter="url(#goo)">
                <circle className="outer" cx="200" cy="200" r="150"/>
                <circle className="drop" cx="200" cy="200" r="20" />
            </g>

            <defs>
                <filter id="goo">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur"/>
                    <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
                                   result="goo"/>
                </filter>
            </defs>
        </svg>

    </div>)
}
export default Loading;