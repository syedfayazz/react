import { useMatch } from "react-router-dom";

const AppFooter = () => {
    const match=useMatch('/dashboard/profile/:id');
    return ( 
        <div>{
            match && <h3>Copyright @ 2026</h3>
            }
            
        </div>
     );
}
 
export default AppFooter;