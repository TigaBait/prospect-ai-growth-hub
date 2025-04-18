
import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { 
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { 
  BarChart3, 
  Plus, 
  MoreHorizontal, 
  Play, 
  Pause, 
  Clock,
  Mail,
  MessageSquare,
  ArrowRight,
  AlertCircle,
  Trash2,
  Edit,
  Copy,
  Target,
  ChevronDown,
  Calendar,
  UserPlus,
  RefreshCcw,
  Check,
  PlayCircle,
  Bell
} from "lucide-react";
import PageLayout from "@/components/layout/PageLayout";

// Mock data
const mockCampaigns = [
  {
    id: 1,
    name: "Q2 SaaS CTOs Outreach",
    description: "Targeting CTOs at mid-size SaaS companies for Q2 product rollout",
    status: "Active",
    createdDate: "2025-03-10T00:00:00Z",
    lastEdited: "2025-03-15T00:00:00Z",
    icpName: "Enterprise SaaS Decision Makers",
    progress: 65,
    prospectCount: 120,
    sentCount: 78,
    openCount: 45,
    replyCount: 28,
    steps: [
      { id: 1, type: "email", name: "Initial Outreach", delay: 0, template: "SaaS CTO Value Prop", status: "active" },
      { id: 2, type: "email", name: "Follow-up #1", delay: 3, template: "Case Study Follow-up", status: "active" },
      { id: 3, type: "linkedin", name: "LinkedIn Connection", delay: 5, template: "LinkedIn Connect Request", status: "active" },
      { id: 4, type: "email", name: "Final Follow-up", delay: 7, template: "Last Chance", status: "scheduled" }
    ]
  },
  {
    id: 2,
    name: "Marketing Directors Campaign",
    description: "Targeting Marketing Directors in retail and e-commerce",
    status: "Active",
    createdDate: "2025-03-01T00:00:00Z",
    lastEdited: "2025-03-12T00:00:00Z",
    icpName: "Retail Marketing Leaders",
    progress: 42,
    prospectCount: 85,
    sentCount: 36,
    openCount: 24,
    replyCount: 12,
    steps: [
      { id: 1, type: "email", name: "Initial Outreach", delay: 0, template: "Marketing ROI Intro", status: "active" },
      { id: 2, type: "linkedin", name: "LinkedIn Connection", delay: 2, template: "LinkedIn Connect Request", status: "active" },
      { id: 3, type: "email", name: "Case Study", delay: 4, template: "Retail Success Story", status: "scheduled" }
    ]
  },
  {
    id: 3,
    name: "Healthcare Decision Makers",
    description: "Targeting healthcare IT decision makers",
    status: "Draft",
    createdDate: "2025-03-18T00:00:00Z",
    lastEdited: "2025-03-18T00:00:00Z",
    icpName: "Healthcare IT Buyers",
    progress: 0,
    prospectCount: 31,
    sentCount: 0,
    openCount: 0,
    replyCount: 0,
    steps: [
      { id: 1, type: "email", name: "Initial Outreach", delay: 0, template: "Healthcare Intro", status: "draft" },
      { id: 2, type: "email", name: "Follow-up", delay: 3, template: "Healthcare Follow-up", status: "draft" }
    ]
  },
  {
    id: 4,
    name: "Financial Services Exec Outreach",
    description: "Targeting VPs and Directors at financial institutions",
    status: "Paused",
    createdDate: "2025-02-15T00:00:00Z",
    lastEdited: "2025-03-05T00:00:00Z",
    icpName: "Financial Services Leaders",
    progress: 80,
    prospectCount: 60,
    sentCount: 48,
    openCount: 32,
    replyCount: 15,
    steps: [
      { id: 1, type: "email", name: "Initial Outreach", delay: 0, template: "Financial Services Intro", status: "completed" },
      { id: 2, type: "email", name: "Follow-up #1", delay: 3, template: "Case Study", status: "completed" },
      { id: 3, type: "linkedin", name: "LinkedIn Connection", delay: 5, template: "LinkedIn Connect", status: "paused" }
    ]
  },
  {
    id: 5,
    name: "Tech Startup Founders",
    description: "Targeting founders of tech startups in seed to Series A stage",
    status: "Completed",
    createdDate: "2025-01-05T00:00:00Z",
    lastEdited: "2025-02-10T00:00:00Z",
    icpName: "Tech Startup Founders",
    progress: 100,
    prospectCount: 45,
    sentCount: 45,
    openCount: 38,
    replyCount: 22,
    steps: [
      { id: 1, type: "email", name: "Initial Outreach", delay: 0, template: "Startup Value Prop", status: "completed" },
      { id: 2, type: "email", name: "Follow-up", delay: 3, template: "Startup Follow-up", status: "completed" },
      { id: 3, type: "linkedin", name: "LinkedIn Connection", delay: 5, template: "LinkedIn Connect", status: "completed" }
    ]
  }
];

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'active':
      return 'bg-green-500 hover:bg-green-600';
    case 'paused':
      return 'bg-amber-500 hover:bg-amber-600';
    case 'draft':
      return 'bg-gray-500 hover:bg-gray-600';
    case 'completed':
      return 'bg-blue-500 hover:bg-blue-600';
    default:
      return 'bg-gray-500 hover:bg-gray-600';
  }
};

const Campaigns = () => {
  const [campaigns, setCampaigns] = useState(mockCampaigns);
  const [activeTab, setActiveTab] = useState("all");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState<any>(null);

  const filteredCampaigns = campaigns.filter(campaign => {
    if (activeTab === 'all') return true;
    return campaign.status.toLowerCase() === activeTab.toLowerCase();
  });

  const handlePauseCampaign = (id: number) => {
    setCampaigns(campaigns.map(campaign => 
      campaign.id === id ? { ...campaign, status: 'Paused' } : campaign
    ));
  };

  const handleResumeCampaign = (id: number) => {
    setCampaigns(campaigns.map(campaign => 
      campaign.id === id ? { ...campaign, status: 'Active' } : campaign
    ));
  };

  const handleDeleteCampaign = (id: number) => {
    setCampaigns(campaigns.filter(campaign => campaign.id !== id));
    if (selectedCampaign && selectedCampaign.id === id) {
      setSelectedCampaign(null);
    }
  };

  return (
    <PageLayout>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Campaigns</h1>
          <p className="text-muted-foreground">Manage your outreach campaigns and track their performance.</p>
        </div>
        <Button onClick={() => setIsCreateDialogOpen(true)} className="mt-4 md:mt-0">
          <Plus className="mr-2 h-4 w-4" />
          Create Campaign
        </Button>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList>
          <TabsTrigger value="all">All Campaigns</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="paused">Paused</TabsTrigger>
          <TabsTrigger value="draft">Drafts</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>
        
        <TabsContent value={activeTab} className="space-y-6">
          {filteredCampaigns.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                <BarChart3 className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No campaigns found</h3>
                <p className="text-muted-foreground mb-4">
                  {activeTab === 'all' 
                    ? "You haven't created any campaigns yet." 
                    : `You don't have any ${activeTab.toLowerCase()} campaigns.`}
                </p>
                <Button onClick={() => setIsCreateDialogOpen(true)}>Create Your First Campaign</Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredCampaigns.map((campaign) => (
                <Card key={campaign.id} className="overflow-hidden border-border hover:shadow-md transition-shadow">
                  <CardHeader className="bg-muted/30 pb-4">
                    <div className="flex justify-between items-start">
                      <Badge 
                        className={`${getStatusColor(campaign.status)} text-white`}
                      >
                        {campaign.status}
                      </Badge>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => setSelectedCampaign(campaign)}>
                            View Details
                          </DropdownMenuItem>
                          {campaign.status === 'Active' && (
                            <DropdownMenuItem onClick={() => handlePauseCampaign(campaign.id)}>
                              <Pause className="mr-2 h-4 w-4" />
                              Pause Campaign
                            </DropdownMenuItem>
                          )}
                          {campaign.status === 'Paused' && (
                            <DropdownMenuItem onClick={() => handleResumeCampaign(campaign.id)}>
                              <Play className="mr-2 h-4 w-4" />
                              Resume Campaign
                            </DropdownMenuItem>
                          )}
                          {campaign.status === 'Draft' && (
                            <DropdownMenuItem onClick={() => handleResumeCampaign(campaign.id)}>
                              <Play className="mr-2 h-4 w-4" />
                              Start Campaign
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Campaign
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Copy className="mr-2 h-4 w-4" />
                            Duplicate
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDeleteCampaign(campaign.id)}>
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <CardTitle className="mt-2 text-xl">{campaign.name}</CardTitle>
                    <CardDescription className="line-clamp-2">{campaign.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-1">
                          <Target className="h-3.5 w-3.5 text-muted-foreground" />
                          <span>ICP: {campaign.icpName}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <UserPlus className="h-3.5 w-3.5 text-muted-foreground" />
                          <span>{campaign.prospectCount} prospects</span>
                        </div>
                      </div>
                      
                      <div className="space-y-1">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Progress</span>
                          <span className="text-sm font-medium">{campaign.progress}%</span>
                        </div>
                        <Progress value={campaign.progress} className="h-2" />
                      </div>
                      
                      <div className="grid grid-cols-3 gap-2 pt-2">
                        <div className="bg-muted/50 rounded p-2 text-center">
                          <div className="text-lg font-semibold">{campaign.sentCount}</div>
                          <div className="text-xs text-muted-foreground">Sent</div>
                        </div>
                        <div className="bg-muted/50 rounded p-2 text-center">
                          <div className="text-lg font-semibold">{campaign.openCount}</div>
                          <div className="text-xs text-muted-foreground">Opens</div>
                        </div>
                        <div className="bg-muted/50 rounded p-2 text-center">
                          <div className="text-lg font-semibold">{campaign.replyCount}</div>
                          <div className="text-xs text-muted-foreground">Replies</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <Separator />
                  <CardFooter className="flex justify-between p-4 bg-muted/20">
                    <div className="text-xs text-muted-foreground">
                      Created: {new Date(campaign.createdDate).toLocaleDateString()}
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => setSelectedCampaign(campaign)}
                    >
                      View Details
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
      
      {/* Create Campaign Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Create New Campaign</DialogTitle>
            <DialogDescription>
              Set up a new outreach campaign with personalized steps and targeting
            </DialogDescription>
          </DialogHeader>
          
          <Tabs defaultValue="basics" className="space-y-6 mt-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="basics">Basics</TabsTrigger>
              <TabsTrigger value="audience">Audience</TabsTrigger>
              <TabsTrigger value="sequence">Sequence</TabsTrigger>
            </TabsList>
            
            <TabsContent value="basics" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="campaign-name">Campaign Name</Label>
                <Input id="campaign-name" placeholder="E.g., Q2 SaaS CTOs Outreach" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="campaign-description">Description</Label>
                <Textarea 
                  id="campaign-description" 
                  placeholder="Briefly describe your campaign objectives" 
                  rows={3} 
                />
              </div>
              <div className="space-y-2">
                <Label>Campaign Type</Label>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <Switch id="email-outreach" />
                    <Label htmlFor="email-outreach" className="cursor-pointer">Email Outreach</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="linkedin-outreach" />
                    <Label htmlFor="linkedin-outreach" className="cursor-pointer">LinkedIn Outreach</Label>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="start-date">Start Date</Label>
                <div className="flex items-center space-x-2">
                  <Input id="start-date" type="date" />
                  <Select defaultValue="immediate">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select timing" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="immediate">Start immediately</SelectItem>
                      <SelectItem value="scheduled">Schedule for later</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="audience" className="space-y-4">
              <div className="space-y-2">
                <Label>Select Target Audience</Label>
                <Select defaultValue="">
                  <SelectTrigger>
                    <SelectValue placeholder="Select an ICP" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="icp-1">Enterprise SaaS Decision Makers</SelectItem>
                    <SelectItem value="icp-2">Healthcare IT Buyers</SelectItem>
                    <SelectItem value="">Create new ICP</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>Prospect Selection</Label>
                <div className="border rounded-md p-4 space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Available prospects matching ICP</span>
                    <span className="text-sm font-medium">156</span>
                  </div>
                  <Button variant="outline" className="w-full">
                    <UserPlus className="mr-2 h-4 w-4" />
                    Select Prospects
                  </Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Additional Filters</Label>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Select defaultValue="">
                      <SelectTrigger>
                        <SelectValue placeholder="Company size" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="small">Small (1-50)</SelectItem>
                        <SelectItem value="medium">Medium (51-200)</SelectItem>
                        <SelectItem value="large">Large (201+)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Select defaultValue="">
                      <SelectTrigger>
                        <SelectValue placeholder="Location" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="us">United States</SelectItem>
                        <SelectItem value="eu">Europe</SelectItem>
                        <SelectItem value="global">Global</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="sequence" className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label>Outreach Sequence</Label>
                  <Button variant="outline" size="sm">
                    <Plus className="h-3.5 w-3.5 mr-1" />
                    Add Step
                  </Button>
                </div>
                
                <div className="space-y-3">
                  <SequenceStepCard 
                    stepNumber={1}
                    type="email"
                    name="Initial Outreach"
                    delay={0}
                    template="SaaS Value Proposition"
                  />
                  
                  <SequenceStepCard 
                    stepNumber={2}
                    type="email"
                    name="Follow-up Email"
                    delay={3}
                    template="Case Study Follow-up"
                  />
                  
                  <SequenceStepCard 
                    stepNumber={3}
                    type="linkedin"
                    name="LinkedIn Connection"
                    delay={5}
                    template="LinkedIn Connect Request"
                  />
                </div>
                
                <div className="mt-4 border rounded-md p-4 bg-muted/20">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <div className="text-sm text-muted-foreground">
                      Each step will be sent automatically based on the delay specified. You can edit your sequence and templates at any time.
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
          
          <DialogFooter className="mt-6">
            <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
              Save as Draft
            </Button>
            <Button onClick={() => setIsCreateDialogOpen(false)}>
              Create Campaign
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Campaign Detail Sheet */}
      {selectedCampaign && (
        <Sheet open={!!selectedCampaign} onOpenChange={(open) => !open && setSelectedCampaign(null)}>
          <SheetContent className="sm:max-w-[600px] overflow-y-auto">
            <SheetHeader>
              <div className="flex items-center gap-2">
                <SheetTitle>{selectedCampaign.name}</SheetTitle>
                <Badge 
                  className={`${getStatusColor(selectedCampaign.status)} text-white`}
                >
                  {selectedCampaign.status}
                </Badge>
              </div>
              <SheetDescription>
                {selectedCampaign.description}
              </SheetDescription>
            </SheetHeader>
            
            <div className="mt-6 space-y-6">
              {/* Campaign Stats */}
              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Campaign Progress</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">{selectedCampaign.progress}% Complete</span>
                        <span className="text-xs text-muted-foreground">
                          {selectedCampaign.sentCount}/{selectedCampaign.prospectCount} contacted
                        </span>
                      </div>
                      <Progress value={selectedCampaign.progress} className="h-2" />
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Key Metrics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-2 text-center">
                      <div>
                        <div className="text-2xl font-bold">
                          {selectedCampaign.replyCount}
                        </div>
                        <div className="text-xs text-muted-foreground">Replies</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold">
                          {Math.round((selectedCampaign.replyCount / selectedCampaign.sentCount) * 100) || 0}%
                        </div>
                        <div className="text-xs text-muted-foreground">Reply Rate</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              {/* Campaign Details */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground">Target ICP</Label>
                  <div className="text-sm flex items-center gap-1">
                    <Target className="h-3.5 w-3.5 text-muted-foreground" />
                    {selectedCampaign.icpName}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground">Prospects</Label>
                  <div className="text-sm flex items-center gap-1">
                    <UserPlus className="h-3.5 w-3.5 text-muted-foreground" />
                    {selectedCampaign.prospectCount} prospects
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground">Created Date</Label>
                  <div className="text-sm flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                    {new Date(selectedCampaign.createdDate).toLocaleDateString()}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground">Last Modified</Label>
                  <div className="text-sm flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                    {new Date(selectedCampaign.lastEdited).toLocaleDateString()}
                  </div>
                </div>
              </div>
              
              <Separator />
              
              {/* Campaign Sequence */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-sm font-medium">Campaign Sequence</h3>
                  <Button variant="outline" size="sm">
                    <Edit className="h-3.5 w-3.5 mr-1" />
                    Edit Sequence
                  </Button>
                </div>
                
                <div className="space-y-3">
                  {selectedCampaign.steps.map((step: any, index: number) => (
                    <div key={step.id} className="relative">
                      {index > 0 && (
                        <div className="absolute left-[29px] -top-3 h-3 w-0.5 bg-border" />
                      )}
                      <div className="flex gap-3">
                        <div className={`h-14 w-14 rounded-full flex items-center justify-center border-2 
                          ${step.status === 'active' ? 'border-green-500 text-green-500' : 
                            step.status === 'completed' ? 'border-blue-500 text-blue-500' : 
                            'border-gray-300 text-gray-400'}`}
                        >
                          {step.type === 'email' ? (
                            <Mail className="h-6 w-6" />
                          ) : (
                            <MessageSquare className="h-6 w-6" />
                          )}
                        </div>
                        <div className="flex-1 bg-muted/30 rounded-lg p-3">
                          <div className="flex justify-between">
                            <div>
                              <h4 className="font-medium">{step.name}</h4>
                              <p className="text-xs text-muted-foreground">
                                {step.type === 'email' ? 'Email' : 'LinkedIn'} • 
                                {step.delay === 0 ? ' Immediately' : ` Day ${step.delay}`} • 
                                Template: {step.template}
                              </p>
                            </div>
                            <Badge 
                              variant="outline" 
                              className={`
                                ${step.status === 'active' ? 'border-green-500 text-green-500' : 
                                  step.status === 'completed' ? 'border-blue-500 text-blue-500' : 
                                  step.status === 'paused' ? 'border-amber-500 text-amber-500' : 
                                  'border-gray-300 text-gray-400'}
                              `}
                            >
                              {step.status}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      {index < selectedCampaign.steps.length - 1 && (
                        <div className="absolute left-[29px] -bottom-3 top-14 w-0.5 bg-border" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
              
              <Separator />
              
              {/* Campaign Results */}
              <div className="space-y-4">
                <h3 className="text-sm font-medium">Campaign Results</h3>
                
                <div className="grid grid-cols-3 gap-3">
                  <Card>
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold">{selectedCampaign.sentCount}</div>
                      <div className="text-xs text-muted-foreground">Messages Sent</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold">{selectedCampaign.openCount}</div>
                      <div className="text-xs text-muted-foreground">Opens</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold">{selectedCampaign.replyCount}</div>
                      <div className="text-xs text-muted-foreground">Replies</div>
                    </CardContent>
                  </Card>
                </div>
              </div>
              
              {/* Campaign Actions */}
              <div className="space-y-4">
                <h3 className="text-sm font-medium">Actions</h3>
                
                <div className="flex flex-wrap gap-2">
                  {selectedCampaign.status === 'Active' && (
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        handlePauseCampaign(selectedCampaign.id);
                        setSelectedCampaign({...selectedCampaign, status: 'Paused'});
                      }}
                    >
                      <Pause className="mr-2 h-4 w-4" />
                      Pause Campaign
                    </Button>
                  )}
                  
                  {selectedCampaign.status === 'Paused' && (
                    <Button 
                      variant="outline"
                      onClick={() => {
                        handleResumeCampaign(selectedCampaign.id);
                        setSelectedCampaign({...selectedCampaign, status: 'Active'});
                      }}
                    >
                      <Play className="mr-2 h-4 w-4" />
                      Resume Campaign
                    </Button>
                  )}
                  
                  {selectedCampaign.status === 'Draft' && (
                    <Button variant="outline">
                      <PlayCircle className="mr-2 h-4 w-4" />
                      Start Campaign
                    </Button>
                  )}
                  
                  <Button variant="outline">
                    <RefreshCcw className="mr-2 h-4 w-4" />
                    Refresh Data
                  </Button>
                  
                  <Button variant="outline">
                    <Edit className="mr-2 h-4 w-4" />
                    Edit Campaign
                  </Button>
                  
                  <Button variant="outline">
                    <Copy className="mr-2 h-4 w-4" />
                    Duplicate
                  </Button>
                </div>
              </div>
            </div>

            <SheetFooter className="mt-6">
              <Button variant="outline" onClick={() => setSelectedCampaign(null)}>Close</Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      )}
    </PageLayout>
  );
};

interface SequenceStepCardProps {
  stepNumber: number;
  type: "email" | "linkedin";
  name: string;
  delay: number;
  template: string;
}

const SequenceStepCard = ({ stepNumber, type, name, delay, template }: SequenceStepCardProps) => {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="bg-primary/10 text-primary h-6 w-6 rounded-full flex items-center justify-center text-xs font-semibold">
              {stepNumber}
            </div>
            <h4 className="font-medium">{name}</h4>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-7 w-7">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        <div className="space-y-2">
          <div className="grid grid-cols-3 gap-2">
            <div>
              <Label className="text-xs text-muted-foreground">Type</Label>
              <div className="flex items-center text-sm">
                {type === 'email' ? (
                  <Mail className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                ) : (
                  <MessageSquare className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                )}
                {type === 'email' ? 'Email' : 'LinkedIn'}
              </div>
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">Delay</Label>
              <div className="flex items-center text-sm">
                <Clock className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                {delay === 0 ? 'Immediately' : `Day ${delay}`}
              </div>
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">Template</Label>
              <div className="flex items-center text-sm truncate">
                <Bell className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                <span className="truncate">{template}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Campaigns;
