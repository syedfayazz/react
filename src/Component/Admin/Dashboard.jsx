import { useRef } from "react";
import { Link, Outlet } from "react-router-dom";
import myvideo from '../../assets/Test.mp4'

const Dashboard = () => {
    let videoref=useRef(null)
    return ( 
        <div className="card">
            <h1>Admin Dashboard</h1>
            <br></br>
            <Link to={"profile"}>Profile</Link>
            <br></br>
            <Link to={"setting"}>Settings</Link>
            <Outlet></Outlet>

            <div className="container">
               <video className="w-100 rounded shadow" 
               ref={videoref} src={myvideo} controls>

               </video>
               <button onClick={()=>videoref.current.pause()} style={{"width":"100px"}} className="btn btn-primary">Pause</button>
                 <button onClick={()=>videoref.current.play()} style={{"width":"100px"}} className="btn btn-primary">Play</button>
            </div>
        </div>
     );
}
 
export default Dashboard;