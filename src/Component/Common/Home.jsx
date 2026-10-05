
import Products from '../Product'
import { useEffect, useState } from 'react'
import imgBat from '../../assets/bat.jpg'
const Home = () => {

  const [title1, setTitle] = useState("Welcome to React 19.2");
  const [count, setCount] = useState(0);

  const addproduct = ({ name }) => {
    alert('Product added to cart :' + name)
    setCount(count + 1);
  }

  const updatetitle = (value) => {
    title = value;
  }

  useEffect(() => {
  }, [count, title1]);

  return (
    <div>
      <h1>Welcome to Home Page</h1>

      <h2>{title1}</h2>
      <h2>{count} - products added to cart</h2>
      <div className='row'>
        <div className='col-lg-6'>
          <div className='form-group'>
            <input className='form-control' onChange={(e) => setTitle(e.target.value)}></input>
          </div>
        </div>
      </div>


      <Products name="MRF Cricket Bat" description="Standard bat" price="10" prodimage={imgBat} onAdd={addproduct} show={true}></Products>
      <Products name="Cricket Ball" price="5" onAdd={addproduct} show={true}></Products>
      <Products name="Cricket Pad" price={20} onAdd={addproduct} show={true}></Products>
    </div>
  );
}

export default Home;