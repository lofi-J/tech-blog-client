"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, XAxis, YAxis } from "recharts";

import { useCategoryUsageStatsQuery } from "@/generated/graphql";
import { skillColorConfig } from "@/shared/components/language-icon";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/shared/components/ui/chart";
import { formatCategory } from "@/shared/lib/utils/format-link";

export const description = "A mixed bar chart";

// 차트 색상 설정
const chartColors = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
];

const chartConfig = {
  category: {
    label: "카테고리",
  },
  usage_count: {
    label: "사용 횟수",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export function TechStackSection() {
  const { data, loading, error } = useCategoryUsageStatsQuery();

  // 로딩 상태 처리
  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>카테고리</CardTitle>
          <CardDescription>포스팅에 사용된 카테고리 횟수 통계</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-center justify-center">
            <div className="text-muted-foreground">로딩 중...</div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // 에러 상태 처리
  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>카테고리</CardTitle>
          <CardDescription>포스팅에 사용된 카테고리 횟수 통계</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-center justify-center">
            <div className="text-destructive">
              데이터를 불러오는 중 오류가 발생했습니다.
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // 데이터가 없는 경우 처리
  if (!data?.categoryUsageStats || data.categoryUsageStats.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>카테고리</CardTitle>
          <CardDescription>포스팅에 사용된 카테고리 횟수 통계</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-center justify-center">
            <div className="text-muted-foreground">
              카테고리 데이터가 없습니다.
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // 차트 데이터 변환
  const chartData = data.categoryUsageStats
    .filter((item) => item.usage_count && item.usage_count > 0) // 사용 횟수가 있는 항목만 필터링
    .sort((a, b) => (b.usage_count || 0) - (a.usage_count || 0)) // 사용 횟수 기준 내림차순 정렬
    .map((item, index) => ({
      category: item.category_name,
      usage_count: item.usage_count || 0,
      fill:
        skillColorConfig[
          formatCategory(item.category_name) as keyof typeof skillColorConfig
        ] ?? chartColors[index % chartColors.length], // 색상 순환
    }));

  const totalUsage = chartData.reduce((sum, item) => sum + item.usage_count, 0);

  return (
    <Card>
      <CardHeader className="px-4 md:px-6">
        <CardTitle>카테고리</CardTitle>
        <CardDescription>포스팅에 사용된 카테고리 통계</CardDescription>
      </CardHeader>
      <CardContent className="px-4 md:px-6">
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{
              left: 0,
            }}
          >
            <YAxis
              dataKey="category"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              width={80}
            />
            <XAxis dataKey="usage_count" type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="usage_count" radius={5} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm px-4 md:px-6">
        <div className="flex gap-2 leading-none font-medium">
          총 {totalUsage}개의 포스트 <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          {chartData.length}개 카테고리에서 사용되었습니다.
        </div>
      </CardFooter>
    </Card>
  );
}
