
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { BarChart3, Target, Users, Mail, MessageSquare, ArrowRight, ExternalLink, TrendingUp } from "lucide-react";
import PageLayout from "@/components/layout/PageLayout";

// Mock data
const dashboardData = {
  totalProspects: 487,
  activeProspects: 236,
  emailsSent: 325,
  emailsOpened: 213,
  emailsReplied: 48,
  linkedinMessages: 124,
  linkedinAccepted: 76,
  linkedinReplied: 31,
  recentCampaigns: [
    { id: 1, name: "Q2 SaaS CTOs", status: "Active", progress: 65, prospects: 120, replies: 28 },
    { id: 2, name: "Marketing Directors", status: "Active", progress: 42, prospects: 85, replies: 12 },
    { id: 3, name: "Healthcare Decision Makers", status: "Draft", progress: 0, prospects: 31, replies: 0 },
  ],
  upcomingTasks: [
    { id: 1, task: "Review campaign performance", date: "Today" },
    { id: 2, task: "Approve 12 new prospects", date: "Today" },
    { id: 3, task: "Finalize Healthcare campaign", date: "Tomorrow" },
    { id: 4, task: "Check new message templates", date: "Mar 22, 2025" },
  ],
};

const Dashboard = () => {
  const [period, setPeriod] = useState("week");

  return (
    <PageLayout>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Track your prospecting performance and campaign metrics.</p>
        </div>
        <div className="flex gap-2 mt-4 md:mt-0">
          <Button variant="outline">View Reports</Button>
          <Button>New Campaign</Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
          <TabsTrigger value="prospects">Prospects</TabsTrigger>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <MetricCard 
              title="Total Prospects" 
              value={dashboardData.totalProspects}
              description="Active prospecting pool"
              icon={<Users className="h-4 w-4" />} 
              trend="+12% from last month"
              trendPositive={true}
            />
            <MetricCard 
              title="Campaigns Active" 
              value={2}
              description="Currently running"
              icon={<BarChart3 className="h-4 w-4" />} 
            />
            <MetricCard 
              title="Emails Sent" 
              value={dashboardData.emailsSent}
              description={`${dashboardData.emailsReplied} replies (${Math.round((dashboardData.emailsReplied / dashboardData.emailsSent) * 100)}%)`}
              icon={<Mail className="h-4 w-4" />} 
              trend="+5% reply rate from last week"
              trendPositive={true}
            />
            <MetricCard 
              title="LinkedIn Messages" 
              value={dashboardData.linkedinMessages}
              description={`${dashboardData.linkedinReplied} replies (${Math.round((dashboardData.linkedinReplied / dashboardData.linkedinMessages) * 100)}%)`}
              icon={<MessageSquare className="h-4 w-4" />} 
              trend="-2% reply rate from last week"
              trendPositive={false}
            />
          </div>

          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            <Card className="col-span-1 lg:col-span-2">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Recent Campaigns</CardTitle>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm" className="h-8" onClick={() => setPeriod("week")}>Week</Button>
                    <Button variant="outline" size="sm" className="h-8" onClick={() => setPeriod("month")}>Month</Button>
                    <Button variant="outline" size="sm" className="h-8" onClick={() => setPeriod("quarter")}>Quarter</Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {dashboardData.recentCampaigns.map((campaign) => (
                    <div key={campaign.id} className="bg-card border rounded-md p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-medium">{campaign.name}</h3>
                          <div className="flex items-center mt-1">
                            <span className={`text-xs px-2 py-0.5 rounded-full ${
                              campaign.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                            }`}>
                              {campaign.status}
                            </span>
                            <span className="text-xs text-muted-foreground ml-2">{campaign.prospects} prospects</span>
                          </div>
                        </div>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center text-sm">
                          <span>Progress</span>
                          <span className="font-medium">{campaign.progress}%</span>
                        </div>
                        <Progress value={campaign.progress} className="h-2" />
                      </div>
                    </div>
                  ))}
                  
                  <Button variant="outline" className="w-full mt-2">
                    View all campaigns
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Upcoming Tasks</CardTitle>
                <CardDescription>Your scheduled activities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {dashboardData.upcomingTasks.map((task) => (
                    <div key={task.id} className="flex justify-between items-start pb-3 border-b last:border-0 last:pb-0">
                      <div className="space-y-1">
                        <p className="font-medium">{task.task}</p>
                        <p className="text-sm text-muted-foreground">{task.date}</p>
                      </div>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="campaigns" className="space-y-4">
          <h2 className="text-xl font-semibold mb-4">Your Active Campaigns</h2>
          <div className="space-y-4">
            {dashboardData.recentCampaigns.map((campaign) => (
              <Card key={campaign.id}>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-medium">{campaign.name}</h3>
                      <div className="flex items-center mt-1">
                        <span className={`text-xs px-2 py-0.5 rounded-full ${
                          campaign.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {campaign.status}
                        </span>
                        <span className="text-sm text-muted-foreground ml-2">{campaign.prospects} prospects</span>
                        {campaign.status === 'Active' && (
                          <span className="text-sm text-muted-foreground ml-2">{campaign.replies} replies</span>
                        )}
                      </div>
                    </div>
                    <Button>View Campaign</Button>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-sm">
                      <span>Progress</span>
                      <span className="font-medium">{campaign.progress}%</span>
                    </div>
                    <Progress value={campaign.progress} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-8">
            <Button>Create New Campaign</Button>
          </div>
        </TabsContent>
        
        <TabsContent value="prospects" className="space-y-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Your Prospect Pool</h2>
            <Button>Add Prospects</Button>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Prospect Summary</CardTitle>
              <CardDescription>Overview of your current prospect database</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <div className="bg-muted/50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Total Prospects</span>
                  </div>
                  <div className="text-2xl font-bold">{dashboardData.totalProspects}</div>
                </div>
                <div className="bg-muted/50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Target className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">In Active Campaigns</span>
                  </div>
                  <div className="text-2xl font-bold">{dashboardData.activeProspects}</div>
                </div>
                <div className="bg-muted/50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Contacted</span>
                  </div>
                  <div className="text-2xl font-bold">{dashboardData.emailsSent + dashboardData.linkedinMessages}</div>
                </div>
              </div>
              
              <div className="mt-6">
                <Button variant="outline" className="w-full">
                  View All Prospects
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="tasks" className="space-y-4">
          <h2 className="text-xl font-semibold mb-4">Upcoming Tasks</h2>
          <Card>
            <CardContent className="p-6">
              <div className="space-y-6">
                {dashboardData.upcomingTasks.map((task) => (
                  <div key={task.id} className="flex justify-between items-center border-b pb-4 last:border-0">
                    <div>
                      <p className="font-medium">{task.task}</p>
                      <p className="text-sm text-muted-foreground">{task.date}</p>
                    </div>
                    <Button variant="outline" size="sm">Complete</Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </PageLayout>
  );
};

interface MetricCardProps {
  title: string;
  value: number;
  description?: string;
  icon?: React.ReactNode;
  trend?: string;
  trendPositive?: boolean;
}

const MetricCard = ({ title, value, description, icon, trend, trendPositive }: MetricCardProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground mt-1">{description}</p>
        {trend && (
          <div className={`flex items-center mt-2 text-xs ${
            trendPositive ? "text-green-600" : "text-red-600"
          }`}>
            {trendPositive ? 
              <TrendingUp className="h-3 w-3 mr-1" /> : 
              <TrendingUp className="h-3 w-3 mr-1 rotate-180" />
            }
            {trend}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default Dashboard;
