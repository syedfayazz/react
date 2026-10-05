import { useLocation, useParams } from "react-router-dom";

const Profile = () => {
    const { id, area } = useParams();
    const location=useLocation();
    return (
        <div>
            <h1>Admin Profile</h1>
            <h2>Current Id is : {id}</h2>
            <h2>Current Area is : {area}</h2>
            <h2>Current Url is : {location.pathname}</h2>
        </div>
    );
}

export default Profile;