import React from 'react';
import { 
  BarChart, Bar, 
  PieChart, Pie, 
  LineChart, Line,
  XAxis, YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  Cell,
  ResponsiveContainer 
} from 'recharts';
import './Dashboard.css';

function Dashboard() {
  // Sample data - replace with actual data from database later
  const appointmentData = [
    { month: 'Jan', appointments: 65 },
    { month: 'Feb', appointments: 59 },
    { month: 'Mar', appointments: 80 },
    { month: 'Apr', appointments: 81 },
    { month: 'May', appointments: 56 },
    { month: 'Jun', appointments: 55 },
  ];

  const treatmentData = [
    { name: 'Cleaning', value: 400 },
    { name: 'Fillings', value: 300 },
    { name: 'Root Canal', value: 200 },
    { name: 'Extractions', value: 150 },
    { name: 'Crowns', value: 100 },
  ];

  const ageGroupData = [
    { age: '0-18', patients: 120 },
    { age: '19-30', patients: 250 },
    { age: '31-50', patients: 300 },
    { age: '51-70', patients: 200 },
    { age: '70+', patients: 100 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  return (
    <div className="dashboard">
      <h1>Clinic Dashboard</h1>
      
      {/* Summary Cards */}
      <div className="summary-cards">
        <div className="card">
          <h3>Total Patients</h3>
          <p className="number">970</p>
          <span className="trend positive">+5.5% this month</span>
        </div>
        <div className="card">
          <h3>Today's Appointments</h3>
          <p className="number">12</p>
          <span className="trend">Next: 2:30 PM</span>
        </div>
        <div className="card">
          <h3>Monthly Revenue</h3>
          <p className="number">$24,500</p>
          <span className="trend positive">+12% vs last month</span>
        </div>
        <div className="card">
          <h3>Pending Appointments</h3>
          <p className="number">28</p>
          <span className="trend negative">5 urgent</span>
        </div>
      </div>

      {/* Charts Section */}
      <div className="charts-grid">
        {/* Monthly Appointments Chart */}
        <div className="chart-container">
          <h2>Monthly Appointments</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={appointmentData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="appointments" 
                stroke="#8884d8" 
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Treatment Distribution Chart */}
        <div className="chart-container">
          <h2>Treatment Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={treatmentData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {treatmentData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Age Distribution Chart */}
        <div className="chart-container">
          <h2>Patient Age Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={ageGroupData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="age" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="patients" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Recent Activity */}
        <div className="recent-activity">
          <h2>Recent Activity</h2>
          <div className="activity-list">
            <div className="activity-item">
              <span className="time">10:30 AM</span>
              <span className="description">New appointment scheduled - John Doe</span>
            </div>
            <div className="activity-item">
              <span className="time">09:45 AM</span>
              <span className="description">Treatment completed - Maria Garcia</span>
            </div>
            <div className="activity-item">
              <span className="time">09:00 AM</span>
              <span className="description">Patient checked in - Robert Smith</span>
            </div>
            <div className="activity-item">
              <span className="time">08:30 AM</span>
              <span className="description">Appointment rescheduled - Sarah Johnson</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;