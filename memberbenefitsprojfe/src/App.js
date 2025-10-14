import Login from "./components/Login";
import "./bgimage.css"
import image from "./memberbenefit.png";
import SessionStorageInit from "./components/SessionStorageInit";

function App() {
    return (
        <div className="healthcare-background" style={{'--bg-image': `url(${image})`}}>
            <div className="background-overlay"></div>
            <div className="background-content">
                <SessionStorageInit/>
                <Login/>
            </div>
        </div>
    );
}

export default App;
