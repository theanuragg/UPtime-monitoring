
const AlertLogSection = () => {
  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          <h3 className="text-base font-medium">Alert Log</h3>
        </div>
        <div className="text-xs text-gray-500">
          <span>Reason</span>
          <span className="ml-48">Duration</span>
        </div>
      </div>
      <div className="border rounded-sm p-4 text-center text-gray-500">
        No alerts in this period.
      </div>
    </div>
  );
};

export default AlertLogSection;
