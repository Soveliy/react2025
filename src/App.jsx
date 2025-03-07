import { useEffect, useState, createContext, useContext } from "react";
import {BrowserRouter as Router, Routes, Route, useParams, Link} from 'react-router-dom';

const CartContext = createContext();
const useCart = () => useContext(CartContext);

const CartProvider = ({children}) => {
  const [cart, setCart] = useState(() => {
    const savedCart = sessionStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : []
  });
  useEffect(() => {
    sessionStorage.setItem('cart', JSON.stringify(cart))
  })
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) =>  item.id === product.id);
      if (existingProduct){
        return prevCart.map((item) => item.id === product.id ? {...item, quantity: item.quantity + 1} : item)
      } else {
        return [...prevCart, { ...product, quantity:1}];
        // return [...prevCart, product]
      }
     
    })

  }

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id))
  }



  return (
    <CartContext.Provider value={{cart, addToCart, removeFromCart}}>
      {children}
    </CartContext.Provider>
  )
}


const ProductsList = () => {

  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const {addToCart, cart} = useCart();

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
        <button onClick={() => addToCart(product)}>Добавить в корзину</button>
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
const Cart = () => {
  const {cart, removeFromCart} = useCart();

  return (
    <>
    {
       cart.length === 0 && <p>Корзина пуста</p>
    }
    {
      cart.length > 0 && cart.map((product) => (
        <div key={product.id}>
           <h3 >{product.title}</h3>
           <span>Количество {product.quantity}</span>
           <button onClick={() => removeFromCart(product.id)}>Удалить из корзины</button>
        </div>
       
      ))
    }
    </>
  )
}
const App = () => {
  return (
    <CartProvider>
    <Router>
      <nav class=''>
          <Link to='/'>Главная</Link>
          <Link to='/catalog/'>Каталог</Link>
          <Link to='/cart/'>Корзина</Link>
      </nav>  
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/catalog' element={<ProductsList/>}/>
        <Route path='/catalog/:id' element={<ProductsDetail/>}/>
        <Route path="/cart" element={<Cart/>}/>
      </Routes>
    </Router>
    </CartProvider>
  )
}
export default App;