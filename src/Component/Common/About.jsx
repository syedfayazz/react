import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

const About = () => {
    const navigate = useNavigate();
    const [searchparams, setSearchparams] = useSearchParams();

    const navigatecontact = () => {
        navigate('/contact');
    }
    const update = () => {
        setSearchparams(prev => {
            prev.set('location', 'Delhi');
            prev.set('area', 'North');
            return prev;
        })
    }

    const showsuccess = () => {
        toast.success('Saved successfully.')
    }
     const showfail = () => {
        toast.error('Failed to save.')
    }
     const showwarn = () => {
        toast.warning('Saved successfully.')
    }
     const showinfo = () => {
        toast.info('Saved successfully.')
    }


    return (
        <div className="card">
            <h1>About Us</h1>
            <br>
            </br>
            <button onClick={() => navigatecontact()} className="btn btn-primary">Contact</button>
            <br></br>
            <h2>The location is : {searchparams.get('location')}</h2>
            <h2>The Area is : {searchparams.get('area')}</h2>
            <br>
            </br>
            <button onClick={() => update()} className="btn btn-primary">Update</button>
            <div className="card">
                <button onClick={showsuccess} style={{ "width": "100px" }} className="btn btn-primary">Success</button>
                <button onClick={showfail} style={{ "width": "100px" }} className="btn btn-danger">Failure</button>
                <button onClick={showwarn} style={{ "width": "100px" }} className="btn btn-warning">Warning</button>
                <button onClick={showinfo} style={{ "width": "100px" }} className="btn btn-info">Info</button>
            </div>
        </div>
    );
}

export default About;