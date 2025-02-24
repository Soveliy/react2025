import './App.css';
import Products from './components/Products/Products';
function App() {
  const data = [
    {
      name: "Никита",
      desc: "Описание 1",
      date: new Date(2014, 1, 1)
    },
    {
      name: "Никита 2",
      desc: "Описание 2",
      date: new Date(2014, 1, 1)
    },
    {
      name: "Никита 3",
      desc: "Описание 3",
      date: new Date(2014, 1, 1)
    },

  ]
  return (
    <>
      <h1>Привет</h1>
      <Products name='Никита' desc='Тест' date='2014-10-10' />
      <div>
        {
          data.map((item, index) => (
            <Products key={index} name={item.name} desc={item.desc} date={item.date} />
          ))
        }

      </div>
    </>

  )
}

export default App
