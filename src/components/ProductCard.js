const ProductCard = ({ name, data }) => (
    <div className="p-4 border shadow mb-2">
      <h2 className="font-bold">{name}</h2>
      <p>Color: {data?.color || data?.Color || "N/A"}</p>
      <p>Capacity: {data?.capacity || data?.Capacity || "N/A"}</p>
    </div>
  );
  export default ProductCard;
  