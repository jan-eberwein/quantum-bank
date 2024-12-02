import Image from "next/image";

const Dashboard = () => {
  const name = 'Jan';

  return (
      <div>
        <h1>Dashboard</h1>
        <p>Welcome, {name}!</p>
      </div>
  );
}

export default Dashboard;
