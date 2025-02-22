import { Calendar, Clock, Info, Monitor, Power, User } from "lucide-react";
import type React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { TvResponse } from "~/lib/validations/tv";

interface StatisticsPanelProps {
  tvs: TvResponse[];
  selectedTv: TvResponse | null;
}
export default function TvStatisticsPanel({
  tvs,
  selectedTv,
}: StatisticsPanelProps) {
  const totalUsage = tvs.reduce(
    (sum, tv) => sum + Number.parseInt(tv.usage),
    0,
  );
  const activeComputers = tvs.filter((tv) => tv.status).length;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Statistics</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue={selectedTv ? "selected" : "total"}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="total">Total</TabsTrigger>
            <TabsTrigger value="selected" disabled={!selectedTv}>
              Selected
            </TabsTrigger>
          </TabsList>
          <TabsContent value="total">
            <div className="space-y-4">
              <StatCard
                title="Total Computers"
                value={tvs.length}
                icon={<Monitor className="h-4 w-4" />}
              />
              <StatCard
                title="Total Usage"
                value={`${totalUsage} hours`}
                icon={<Clock className="h-4 w-4" />}
              />
              <StatCard
                title="Active Computers"
                value={activeComputers}
                icon={<Power className="h-4 w-4" />}
              />
            </div>
          </TabsContent>
          <TabsContent value="selected">
            {selectedTv && (
              <div className="space-y-4">
                <StatCard
                  title="Computer Name"
                  value={selectedTv.name}
                  icon={<Info className="h-4 w-4" />}
                />
                <StatCard
                  title="Usage"
                  value={`${selectedTv.usage} hours`}
                  icon={<Clock className="h-4 w-4" />}
                />
                <StatCard
                  title="Status"
                  value={selectedTv.status ? "On" : "Off"}
                  icon={<Power className="h-4 w-4" />}
                />
                <StatCard
                  title="Last Turn On"
                  value={new Date(selectedTv.updatedAt).toLocaleString()}
                  icon={<Calendar className="h-4 w-4" />}
                />
                <StatCard
                  title="Owner ID"
                  value={selectedTv.ownerId}
                  icon={<User className="h-4 w-4" />}
                />
                <StatCard
                  title="Created At"
                  value={new Date(selectedTv.createdAt).toLocaleString()}
                  icon={<Calendar className="h-4 w-4" />}
                />
                <StatCard
                  title="Updated At"
                  value={new Date(selectedTv.updatedAt!).toLocaleString()}
                  icon={<Calendar className="h-4 w-4" />}
                />
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
}

function StatCard({ title, value, icon }: StatCardProps) {
  return (
    <div className="flex items-center space-x-4 rounded-md border p-4">
      <div className="flex-shrink-0 rounded-full bg-primary/10 p-2">{icon}</div>
      <div>
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </div>
  );
}
