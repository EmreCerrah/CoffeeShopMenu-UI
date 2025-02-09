import { CardContent } from "../ui/card";
import { Skeleton } from "../ui/skeleton";


export const LoadingSkeleton = () => (
    <CardContent className="space-y-4">
      {Array(5).fill(null).map((_, index) => (
        <Skeleton key={index} className="h-12 w-full" />
      ))}
    </CardContent>
  );