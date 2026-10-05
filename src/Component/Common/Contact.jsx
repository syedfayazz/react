import { useEffect, useMemo, useRef, useState } from "react";

const Contact = () => {
    const [count, setCount] = useState(0);
    let ref = useRef(0);
    let inputref = useRef(null);
    useEffect(() => {
        // console.log(ref);
        inputref.current.focus();
    })
    const updateref = () => {
        ref.current++;
    }
    const Getdata = () => {
        console.log(inputref.current.value);
    }
    const doubledCount = useMemo(() => {
        console.log("Calculating...");
        return count * 2;
    }, [count]);


    return (
        <div className="card">
            <h1>Contact Us</h1>
            <h2>Counter value is : {count}</h2>
            {/* <button style={{"width":"100px"}} onClick={() => setCount(count + 1)} className="btn btn-primary">+</button>
            <button style={{"width":"100px"}} onClick={() => setCount(count - 1)} className="btn btn-primary">-</button>
            <button style={{"width":"100px"}} onClick={() => setCount(0)} className="btn btn-primary">Reset</button> */}

            <button style={{ "width": "100px" }} onClick={updateref} className="btn btn-primary">Ref +</button>
            <button style={{ "width": "100px" }} onClick={() => setCount(ref.current)} className="btn btn-primary">Update</button>


            <br></br>
            <input ref={inputref} style={{ "width": "200px" }} className="form-control"></input>
            <button style={{ "width": "100px" }} onClick={Getdata} className="btn btn-primary">Getdata</button>
            <br></br>
            <h2>Count: {count}</h2>
            <h2>Doubled Count: {doubledCount}</h2>

            <button style={{ "width": "100px" }} onClick={() => setCount(count + 1)} className="btn btn-primary">++</button>
        </div>
    );
}

export default Contact;