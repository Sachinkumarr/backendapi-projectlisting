// import { useEffect, useState } from 'react';
// import { fetchProducts } from '../api';
// import ProductCard from '../components/ProductCard';
// import Charts from '../components/Charts';
// import AddProduct from './AddProduct';


// const ProductList = () => {
//   const [products, setProducts] = useState([]);
//   const [filterColor, setFilterColor] = useState('');
//   const [filterCapacity, setFilterCapacity] = useState('');

//   useEffect(() => {
//     fetchProducts().then(res => setProducts(res.data));
//   }, []);

//   const filtered = products.filter(p => {
//     const color = p.data?.color || p.data?.Color;
//     const capacity = p.data?.capacity || p.data?.Capacity;
//     return (!filterColor || color === filterColor) &&
//            (!filterCapacity || String(capacity) === filterCapacity);
//   });

//   const uniqueColors = [...new Set(products.map(p => p.data?.color || p.data?.Color).filter(Boolean))];
//   const uniqueCapacities = [...new Set(products.map(p => String(p.data?.capacity || p.data?.Capacity)).filter(Boolean))];

//   return (
//     <div className="p-4">
//      <AddProduct />
//       <div className="flex gap-4 mb-4">
//         <select onChange={e => setFilterColor(e.target.value)} className="border p-1">
//           <option value="">Filter by Color</option>
//           {uniqueColors.map(c => <option key={c}>{c}</option>)}
//         </select>
//         <select onChange={e => setFilterCapacity(e.target.value)} className="border p-1">
//           <option value="">Filter by Capacity</option>
//           {uniqueCapacities.map(c => <option key={c}>{c}</option>)}
//         </select>
//       </div>
//       {filtered.map(p => <ProductCard key={p.id} {...p} />)}
//       <Charts products={filtered} />
//     </div>
//   );
// };
// export default ProductList;


import { useEffect, useState } from 'react';
import { fetchProducts, addProduct } from '../api';
import ProductCard from '../components/ProductCard';
import Charts from '../components/Charts';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filterColor, setFilterColor] = useState('');
  const [filterCapacity, setFilterCapacity] = useState('');
  const [name, setName] = useState('');
  const [color, setColor] = useState('');
  const [capacity, setCapacity] = useState('');

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    const res = await fetchProducts();
    setProducts(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newProduct = {
      name,
      data: { color, capacity }
    };
    await addProduct(newProduct);
    setName('');
    setColor('');
    setCapacity('');
    loadProducts();
  };

  const filtered = products.filter(p => {
    const colorVal = p.data?.color || p.data?.Color;
    const capacityVal = p.data?.capacity || p.data?.Capacity;
    return (!filterColor || colorVal === filterColor) &&
           (!filterCapacity || String(capacityVal) === filterCapacity);
  });

  const uniqueColors = [...new Set(products.map(p => p.data?.color || p.data?.Color).filter(Boolean))];
  const uniqueCapacities = [...new Set(products.map(p => String(p.data?.capacity || p.data?.Capacity)).filter(Boolean))];

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Product Listing with Charts</h1>

      {/* Inline Add Product Form */}
      <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
        <input
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Product Name"
          className="border p-2 flex-1"
        />
        <input
          value={color}
          onChange={e => setColor(e.target.value)}
          placeholder="Color"
          className="border p-2 flex-1"
        />
        <input
          value={capacity}
          onChange={e => setCapacity(e.target.value)}
          placeholder="Capacity"
          className="border p-2 flex-1"
        />
        <button type="submit" className="bg-gray-800 text-white px-4 py-2 rounded">
          Add Product
        </button>
      </form>

      {/* Filters */}
      <div className="flex gap-4 mb-4">
        <select onChange={e => setFilterColor(e.target.value)} className="border p-2">
          <option value="">Filter by Color</option>
          {uniqueColors.map(c => <option key={c}>{c}</option>)}
        </select>
        <select onChange={e => setFilterCapacity(e.target.value)} className="border p-2">
          <option value="">Filter by Capacity</option>
          {uniqueCapacities.map(c => <option key={c}>{c}</option>)}
        </select>
      </div>

      {/* Product List */}
      {filtered.map(p => <ProductCard key={p.id} {...p} />)}

      {/* Charts */}
      <Charts products={filtered} />
    </div>
  );
};

export default ProductList;
