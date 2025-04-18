
import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  PlusCircle, 
  Save, 
  Copy, 
  Trash2, 
  Check, 
  X, 
  Target, 
  Users,
  Building,
  MapPin,
  BriefcaseBusiness
} from "lucide-react";
import PageLayout from "@/components/layout/PageLayout";

// Mock data
const mockICPs = [
  {
    id: 1,
    name: "Enterprise SaaS Decision Makers",
    description: "C-level and directors at enterprise SaaS companies looking to optimize their sales process",
    industries: ["SaaS", "Technology", "Enterprise Software"],
    companySize: "Enterprise (1000+ employees)",
    locations: ["United States", "Canada", "United Kingdom"],
    jobTitles: ["CTO", "VP of Sales", "Director of Revenue", "Head of Growth"],
    revenue: "$50M - $1B",
    lastUsed: "2 days ago",
    prospectCount: 156
  },
  {
    id: 2,
    name: "Healthcare IT Buyers",
    description: "Technology decision makers in healthcare organizations",
    industries: ["Healthcare", "Health Tech", "Medical Devices"],
    companySize: "Mid-Market (100-999 employees)",
    locations: ["United States", "Germany", "France"],
    jobTitles: ["CIO", "IT Director", "Head of Digital Transformation"],
    revenue: "$10M - $100M",
    lastUsed: "1 week ago",
    prospectCount: 87
  }
];

const industryOptions = [
  "Technology", "SaaS", "Healthcare", "Financial Services", 
  "Manufacturing", "Retail", "Education", "Government", 
  "Telecommunications", "Media", "Entertainment", "Real Estate",
  "Transportation", "Construction", "Agriculture", "Energy",
  "Professional Services", "Hospitality", "Non-profit"
];

const locationOptions = [
  "United States", "Canada", "United Kingdom", "Germany", "France", 
  "Australia", "Japan", "Singapore", "Brazil", "India",
  "Spain", "Italy", "Netherlands", "Sweden", "Belgium"
];

const companySizeOptions = [
  "Startup (1-10 employees)",
  "Small Business (11-50 employees)",
  "Mid-size (51-200 employees)",
  "Medium Enterprise (201-1000 employees)",
  "Large Enterprise (1000+ employees)"
];

const revenueOptions = [
  "Less than $1M", 
  "$1M - $10M", 
  "$10M - $50M", 
  "$50M - $100M", 
  "$100M - $500M", 
  "$500M - $1B", 
  "$1B+"
];

interface ICPFormData {
  name: string;
  description: string;
  industries: string[];
  locations: string[];
  companySize: string;
  jobTitles: string[];
  revenue: string;
}

const ICPBuilder = () => {
  const [icps, setIcps] = useState(mockICPs);
  const [activeTab, setActiveTab] = useState("existing");
  const [currentIndustry, setCurrentIndustry] = useState("");
  const [currentLocation, setCurrentLocation] = useState("");
  const [currentJobTitle, setCurrentJobTitle] = useState("");
  
  const [formData, setFormData] = useState<ICPFormData>({
    name: "",
    description: "",
    industries: [],
    locations: [],
    companySize: "",
    jobTitles: [],
    revenue: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const addIndustry = () => {
    if (currentIndustry && !formData.industries.includes(currentIndustry)) {
      setFormData(prev => ({
        ...prev,
        industries: [...prev.industries, currentIndustry]
      }));
      setCurrentIndustry("");
    }
  };

  const removeIndustry = (industry: string) => {
    setFormData(prev => ({
      ...prev,
      industries: prev.industries.filter(i => i !== industry)
    }));
  };

  const addLocation = () => {
    if (currentLocation && !formData.locations.includes(currentLocation)) {
      setFormData(prev => ({
        ...prev,
        locations: [...prev.locations, currentLocation]
      }));
      setCurrentLocation("");
    }
  };

  const removeLocation = (location: string) => {
    setFormData(prev => ({
      ...prev,
      locations: prev.locations.filter(l => l !== location)
    }));
  };

  const addJobTitle = () => {
    if (currentJobTitle && !formData.jobTitles.includes(currentJobTitle)) {
      setFormData(prev => ({
        ...prev,
        jobTitles: [...prev.jobTitles, currentJobTitle]
      }));
      setCurrentJobTitle("");
    }
  };

  const removeJobTitle = (title: string) => {
    setFormData(prev => ({
      ...prev,
      jobTitles: prev.jobTitles.filter(t => t !== title)
    }));
  };

  const handleCreateICP = () => {
    // This would send the data to Supabase in a real implementation
    const newICP = {
      id: icps.length + 1,
      ...formData,
      lastUsed: "Just now",
      prospectCount: 0
    };
    
    setIcps([...icps, newICP]);
    setActiveTab("existing");
    
    // Reset form
    setFormData({
      name: "",
      description: "",
      industries: [],
      locations: [],
      companySize: "",
      jobTitles: [],
      revenue: ""
    });
  };

  const duplicateICP = (id: number) => {
    const icpToDuplicate = icps.find(icp => icp.id === id);
    if (icpToDuplicate) {
      setFormData({
        name: `${icpToDuplicate.name} (Copy)`,
        description: icpToDuplicate.description,
        industries: [...icpToDuplicate.industries],
        locations: [...icpToDuplicate.locations],
        companySize: icpToDuplicate.companySize,
        jobTitles: [...icpToDuplicate.jobTitles],
        revenue: icpToDuplicate.revenue
      });
      setActiveTab("create");
    }
  };

  const deleteICP = (id: number) => {
    setIcps(icps.filter(icp => icp.id !== id));
  };

  return (
    <PageLayout>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">ICP Builder</h1>
          <p className="text-muted-foreground">Define your Ideal Customer Profile for targeted prospecting.</p>
        </div>
        <Button 
          onClick={() => setActiveTab("create")} 
          className="mt-4 md:mt-0"
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          Create New ICP
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList>
          <TabsTrigger value="existing">Existing ICPs</TabsTrigger>
          <TabsTrigger value="create">Create New</TabsTrigger>
        </TabsList>
        
        <TabsContent value="existing" className="space-y-6">
          {icps.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                <Target className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No ICPs defined yet</h3>
                <p className="text-muted-foreground mb-4">
                  Create your first Ideal Customer Profile to start finding prospects that match your target criteria.
                </p>
                <Button onClick={() => setActiveTab("create")}>Create Your First ICP</Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {icps.map((icp) => (
                <Card key={icp.id} className="overflow-hidden">
                  <CardHeader className="bg-muted/30 pb-4">
                    <div className="flex justify-between">
                      <CardTitle>{icp.name}</CardTitle>
                      <div className="flex space-x-1">
                        <Button variant="ghost" size="icon" onClick={() => duplicateICP(icp.id)}>
                          <Copy className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => deleteICP(icp.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <CardDescription>{icp.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-start gap-2">
                        <Building className="h-4 w-4 text-muted-foreground mt-0.5" />
                        <div>
                          <p className="text-sm font-medium">Industries</p>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {icp.industries.map((industry) => (
                              <Badge key={industry} variant="secondary">{industry}</Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                        <div>
                          <p className="text-sm font-medium">Locations</p>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {icp.locations.map((location) => (
                              <Badge key={location} variant="secondary">{location}</Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-2">
                        <Users className="h-4 w-4 text-muted-foreground mt-0.5" />
                        <div>
                          <p className="text-sm font-medium">Company Size</p>
                          <p className="text-sm">{icp.companySize}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-2">
                        <BriefcaseBusiness className="h-4 w-4 text-muted-foreground mt-0.5" />
                        <div>
                          <p className="text-sm font-medium">Job Titles</p>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {icp.jobTitles.map((title) => (
                              <Badge key={title} variant="secondary">{title}</Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <Separator />
                  <CardFooter className="flex justify-between p-4 bg-muted/30">
                    <div className="text-sm text-muted-foreground">
                      <span>{icp.prospectCount} prospects</span>
                      <span className="mx-2">•</span>
                      <span>Last used {icp.lastUsed}</span>
                    </div>
                    <Button variant="outline" size="sm">Use This ICP</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="create">
          <Card>
            <CardHeader>
              <CardTitle>Create New Ideal Customer Profile</CardTitle>
              <CardDescription>
                Define the criteria that your ideal customers match. This will help you find and target the right prospects.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Basic Info */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">ICP Name</Label>
                  <Input 
                    id="name" 
                    name="name" 
                    value={formData.name} 
                    onChange={handleInputChange}
                    placeholder="E.g., Enterprise SaaS Decision Makers" 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea 
                    id="description" 
                    name="description" 
                    value={formData.description} 
                    onChange={handleInputChange}
                    placeholder="Briefly describe your ideal customer profile" 
                    rows={3} 
                  />
                </div>
              </div>
              
              <Separator />
              
              {/* Industries */}
              <div className="space-y-4">
                <Label>Industries</Label>
                <div className="flex gap-2">
                  <Select 
                    value={currentIndustry} 
                    onValueChange={setCurrentIndustry}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select industry" />
                    </SelectTrigger>
                    <SelectContent>
                      {industryOptions.map((industry) => (
                        <SelectItem key={industry} value={industry}>
                          {industry}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button type="button" onClick={addIndustry} variant="outline">
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Add
                  </Button>
                </div>
                {formData.industries.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {formData.industries.map((industry) => (
                      <Badge key={industry} variant="secondary" className="pl-2 pr-1 py-1 flex items-center gap-1">
                        {industry}
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-4 w-4 ml-1"
                          onClick={() => removeIndustry(industry)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
              
              {/* Locations */}
              <div className="space-y-4">
                <Label>Locations</Label>
                <div className="flex gap-2">
                  <Select 
                    value={currentLocation} 
                    onValueChange={setCurrentLocation}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select location" />
                    </SelectTrigger>
                    <SelectContent>
                      {locationOptions.map((location) => (
                        <SelectItem key={location} value={location}>
                          {location}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button type="button" onClick={addLocation} variant="outline">
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Add
                  </Button>
                </div>
                {formData.locations.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {formData.locations.map((location) => (
                      <Badge key={location} variant="secondary" className="pl-2 pr-1 py-1 flex items-center gap-1">
                        {location}
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-4 w-4 ml-1"
                          onClick={() => removeLocation(location)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
              
              {/* Company Size */}
              <div className="space-y-4">
                <Label htmlFor="companySize">Company Size</Label>
                <Select 
                  value={formData.companySize} 
                  onValueChange={(value) => handleSelectChange("companySize", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select company size" />
                  </SelectTrigger>
                  <SelectContent>
                    {companySizeOptions.map((size) => (
                      <SelectItem key={size} value={size}>
                        {size}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              {/* Job Titles */}
              <div className="space-y-4">
                <Label>Job Titles</Label>
                <div className="flex gap-2">
                  <Input 
                    value={currentJobTitle}
                    onChange={(e) => setCurrentJobTitle(e.target.value)}
                    placeholder="E.g., CTO, VP of Sales" 
                  />
                  <Button type="button" onClick={addJobTitle} variant="outline">
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Add
                  </Button>
                </div>
                {formData.jobTitles.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {formData.jobTitles.map((title) => (
                      <Badge key={title} variant="secondary" className="pl-2 pr-1 py-1 flex items-center gap-1">
                        {title}
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-4 w-4 ml-1"
                          onClick={() => removeJobTitle(title)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
              
              {/* Revenue */}
              <div className="space-y-4">
                <Label htmlFor="revenue">Annual Revenue</Label>
                <Select 
                  value={formData.revenue} 
                  onValueChange={(value) => handleSelectChange("revenue", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select revenue range" />
                  </SelectTrigger>
                  <SelectContent>
                    {revenueOptions.map((revenue) => (
                      <SelectItem key={revenue} value={revenue}>
                        {revenue}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t p-6">
              <Button variant="outline" onClick={() => setActiveTab("existing")}>
                Cancel
              </Button>
              <Button onClick={handleCreateICP}>
                <Save className="mr-2 h-4 w-4" />
                Create ICP
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </PageLayout>
  );
};

export default ICPBuilder;
