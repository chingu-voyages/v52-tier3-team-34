type ButtonGroupProps = {
  onFilterChange: (filter: string) => void; // Callback to handle button clicks
};

function ButtonGroup({ onFilterChange }: ButtonGroupProps) {
  return (
    <div className="flex space-x-2 p-4 ">
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-l-lg hover:bg-blue-600 shadow-lg"
        onClick={() => onFilterChange('today')}
      >
        Today
      </button>
      <button
        className="bg-blue-500 text-white px-4 py-2 hover:bg-blue-600 shadow-lg"
        onClick={() => onFilterChange('now')}
      >
        Now
      </button>
      <button
        className="bg-blue-500 text-white px-4 py-2 hover:bg-blue-600 shadow-lg"
        onClick={() => onFilterChange('1hour')}
      >
        In 1 Hour
      </button>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600 shadow-lg"
        onClick={() => onFilterChange('2hours')}
      >
        In 2 Hours
      </button>
    </div>
  );
}

export default ButtonGroup;
