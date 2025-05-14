import { PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis } from 'recharts';

const Charts = ({ products }) => {
  const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#cc99ff'];

  const colorData = products.reduce((acc, p) => {
    const color = p.data?.color || p.data?.Color;
    if (color) acc[color] = (acc[color] || 0) + 1;
    return acc;
  }, {});
  const barData = Object.entries(colorData).map(([name, value]) => ({ name, value }));

  const capacityData = products.reduce((acc, p) => {
    const cap = p.data?.capacity || p.data?.Capacity;
    if (cap) acc[cap] = (acc[cap] || 0) + 1;
    return acc;
  }, {});
  const pieData = Object.entries(capacityData).map(([name, value]) => ({ name, value }));

  return (
    <div className="flex flex-wrap justify-around p-6">
      <div>
        <h2 className="font-bold mb-4">Product Distribution by Color</h2>
        <BarChart width={300} height={220} data={barData}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill="#8884d8" />
        </BarChart>
      </div>

      <div>
        <h2 className="font-bold mb-4">Product Distribution by Capacity</h2>
        <PieChart width={300} height={220}>
          <Pie
            data={pieData}
            dataKey="value"
            cx="50%"
            cy="50%"
            outerRadius={80}
            label
          >
            {pieData.map((_, i) => (
              <Cell key={`cell-${i}`} fill={colors[i % colors.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </div>
    </div>
  );
};
export default Charts;
