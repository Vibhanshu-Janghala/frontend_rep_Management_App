import {ReactComponent as WelcomeSVG} from "./svgs/homepage-welcome.svg";
import {useTheme} from "./ThemeContext";
import "./Home.css";

const Home = () => {
    const {setThemeData} = useTheme();
    const handleTheme = (number) => {
        window.localStorage.setItem("themeNumber", number);
        setThemeData(() => number);
    }

    return (<div className={"home-container"}>
        <div className={"svg-div"}>
            <WelcomeSVG/>
        </div>
        <div className={"colour-pallets-container"}>
            <h2>Choose a theme you like</h2>
            <div className={"colour-pallets"}>
                <div className={"theme-selector-first "} onClick={(() => handleTheme("first"))}>
                    first
                </div>
                <div className={"theme-selector-second "} onClick={(() => handleTheme("second"))}>
                    second
                </div>
                <div className={"theme-selector-third "} onClick={(() => handleTheme("third"))}>
                    third
                </div>
                <div className={"theme-selector-fourth "} onClick={(() => handleTheme("fourth"))}>
                    fourth
                </div>
                <div className={"theme-selector-fifth"} onClick={(() => handleTheme("fifth"))}>
                    fifth
                </div>
                <div className={"theme-selector-sixth "} onClick={(() => handleTheme("sixth"))}>
                    sixth
                </div>
                <div className={"theme-selector-seventh "} onClick={(() => handleTheme("seventh"))}>
                    seventh
                </div>
                <div className={"theme-selector-eighth "} onClick={(() => handleTheme("eighth"))}>
                    eighth
                </div>
            </div>

        </div>
    </div>)
}
export default Home;
