
import ResponseTimeChart from "@components/ResponseTimeChart";

interface ResponseTimeSectionProps {
  data: Array<{ time: string; value: number }>;
}

const ResponseTimeSection = ({ data }: ResponseTimeSectionProps) => {
  return (
    <div className="mt-4">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          <h3 className="text-base font-medium">Response Time</h3>
          <span className="text-xs text-gray-500 ml-2">last 24 hours</span>
        </div>
        <div className="text-xs text-gray-500">
          <span>High: 213ms, Low: 54ms, Avg: 87ms</span>
        </div>
      </div>
      <ResponseTimeChart 
        data={data} 
        height={240}
        stats={{
          high: "213ms",
          low: "54ms",
          avg: "87ms"
        }}
        showStats={true}
      />
    </div>
  );
};

export default ResponseTimeSection;
