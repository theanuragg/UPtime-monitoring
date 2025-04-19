type SkeletonCardProps = {
    count?: number;
  };
  
  export default function SkeletonCard({ count = 2 }: SkeletonCardProps) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-6 ">
        {Array.from({ length: count }).map((_, i) => (
          <div
            key={i}
            className="w-72 h-40 bg-secondary rounded-xl animate-pulse"
          />
        ))}
      </div>
    );
  }
  