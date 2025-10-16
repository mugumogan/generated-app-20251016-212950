import { TimelineTask } from '@/lib/calculator';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, Label } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
interface GanttChartProps {
  data: TimelineTask[];
}
const COLORS = [
  'hsl(var(--primary))',
  'hsl(var(--primary) / 0.8)',
  'hsl(var(--primary) / 0.6)',
  'hsl(var(--primary) / 0.4)',
];
const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="rounded-lg border bg-background p-2 shadow-sm">
        <p className="font-bold">{data.name}</p>
        <p className="text-sm text-muted-foreground">
          Timeline: Day {data.range[0]} - Day {data.range[1]}
        </p>
        <p className="text-sm text-muted-foreground">
          Duration: {data.duration} day{data.duration > 1 ? 's' : ''}
        </p>
      </div>
    );
  }
  return null;
};
export function GanttChart({ data }: GanttChartProps) {
  const chartData = data.map(task => ({
    name: task.name,
    start: task.range[0] - 1, // Invisible bar starts at 0
    duration: task.duration,
    range: task.range, // Keep original range for tooltip
  }));
  const maxDay = Math.max(...data.map(d => d.range[1]));
  return (
    <Card className="bg-card border">
      <CardHeader>
        <CardTitle>Development Timeline</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300 + data.length * 10}>
          <BarChart
            data={chartData}
            layout="vertical"
            margin={{ top: 5, right: 30, left: 100, bottom: 20 }}
            barCategoryGap="35%"
          >
            <XAxis type="number" domain={[0, maxDay]} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}>
              <Label value="Project Day" offset={0} position="insideBottom" fill="hsl(var(--muted-foreground))" />
            </XAxis>
            <YAxis
              dataKey="name"
              type="category"
              width={150}
              tick={{ fill: 'hsl(var(--foreground))', fontSize: 12 }}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'hsl(var(--accent))' }} />
            <Bar dataKey="start" stackId="a" fill="transparent" />
            <Bar dataKey="duration" stackId="a" radius={[4, 4, 4, 4]}>
              {chartData.map((_entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}