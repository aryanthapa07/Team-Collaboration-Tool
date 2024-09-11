import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { useFetchTaskReportQuery } from "../services/TasksApi";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const TaskReport = () => {
  const { data: reportData, error, isLoading } = useFetchTaskReportQuery();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading report data.</p>;

  const labels = reportData.map(item => item["project__name"]);
  const completedData = reportData.map(item => item.completed_tasks);
  const inProgressData = reportData.map(item => item.in_progress_tasks);
  const pendingData = reportData.map(item => item.pending_tasks);

  const data = {
    labels,
    datasets: [
      {
        label: "Completed Tasks",
        data: completedData,
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
      {
        label: "In Progress Tasks",
        data: inProgressData,
        backgroundColor: "rgba(255, 206, 86, 0.2)",
        borderColor: "rgba(255, 206, 86, 1)",
        borderWidth: 1,
      },
      {
        label: "Pending Tasks",
        data: pendingData,
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Task Progress Report",
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className="p-4" style={{ width: '100%', height: '500px' }}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default TaskReport;
