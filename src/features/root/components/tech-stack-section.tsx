import client from "@/client";
import { CategoryUsageStatsDocument } from "@/generated/graphql";

export const TechStackSection = async () => {
  const { data } = await client.query({
    query: CategoryUsageStatsDocument,
  });

  // console.log(JSON.stringify(data, null, 2));
  
  return <div>TechStackSection</div>;
};
