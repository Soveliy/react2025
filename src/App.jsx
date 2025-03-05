import { useEffect, useState } from "react";
import {BrowserRouter as Router, Routes, Route, useParams, Link} from 'react-router-dom';
const ProductsList = () => {

  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  useEffect(() => {
      fetch('https://api.escuelajs.co/api/v1/products/', {
        headers:{
          'Content-Type': 'application/json',
        }
      })
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
  }, []);

  return (
    <>
    {loading && <p>Товары загружаются. Подождите немного</p>}
    {!loading &&
      products.map((product) => (
        <div key={product.id}>
        <h2>{product.title}</h2>
        <img src={product.images[0]} alt="" />
        <p>{product.description}</p>
        <Link to={`/catalog/${product.id}`}>Перейти в карточку</Link>
      </div>
      ))
    }
   
    </>
  )
}
const Home = () => {
  return (
    <h1 className="m-5 md:mt-0 bg-lime-200 mt-[100px] hover:bg-amber-950">Это главная страница</h1>
  )
}

const ProductsDetail = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);
  useEffect(() => {
      fetch(`https://api.escuelajs.co/api/v1/products/${id}/`, {
        headers:{
          'Content-Type': 'application/json',
        }
      })
      .then((res) => (
        res.json())
      )
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error)
      })
  }, []);

  return (
    <>

      <h1>{product?.title}</h1>
    
    </>
   
  )
}

const App = () => {
  return (
    <Router>
      <nav class=''>
          <Link to='/'>Главная</Link>
          <Link to='/catalog/'>Каталог</Link>
      </nav>  
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/catalog' element={<ProductsList/>}/>
        <Route path='/catalog/:id' element={<ProductsDetail/>}/>
      </Routes>
    </Router>
  )
}
export default App;