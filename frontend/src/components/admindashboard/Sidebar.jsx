export default function Sidebar({ activeTab, setActiveTab }) {
  const tabs = ["Dashboard", "Users", "Orders", "Products"];

  return (
    <div className="w-64 h-screen bg-gray-800 text-white flex flex-col">
      <h2 className="text-2xl font-bold p-4 border-b border-gray-700">Admin Panel</h2>
      <ul className="flex-1 flex flex-col mt-4">
        {tabs.map((tab) => (
          <li
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`cursor-pointer px-6 py-3 hover:bg-gray-700 transition ${
              activeTab === tab ? "bg-gray-700 font-semibold" : ""
            }`}
          >
            {tab}
          </li>
        ))}
      </ul>
    </div>
  );
}
