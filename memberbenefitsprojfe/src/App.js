import Login from "./components/Login";
import "./bgimage.css"
import image from "./memberbenefit.png";

function App() {
    return (
        <div className="healthcare-background" style={{'--bg-image': `url(${image})`}}>
            <div className="background-overlay"></div>
            <div className="background-content">
                <Login/>
            </div>
        </div>
    );
}

export default App;
