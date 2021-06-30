import {ReactComponent as NotFoundSVG} from "./svgs/page_not_found_su7k.svg";
import "./NoUrlMatch.css";
import {Link} from "react-router-dom";

const NoUrlMatch = () => {
    return (
        <div className={"not-found"}>

           <NotFoundSVG />
            <h1> Page not found</h1>
            <Link to={"/dashboard"} className={"notfound-home"}>Back to Home ?</Link>
        </div>
    );
}
export default NoUrlMatch;