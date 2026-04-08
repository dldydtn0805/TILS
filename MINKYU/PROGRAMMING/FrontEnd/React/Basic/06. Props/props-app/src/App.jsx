import './App.css';
import ProductDetail from './components/ProductDetail';

function App() {
  // 객체 추가
  const product = {
    productId: 'p000001',
    name: '베이직 폴라 니트',
    price: 42000,
    quantity: 20,
    img: 'https://i.imgur.com/1vpSkbW.png',
  };

  return (
    <div>
      <ProductDetail product={product} />
    </div>
  );
}

export default App;
