
import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardFooter,
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { 
  Search, 
  Plus, 
  Upload, 
  MoreHorizontal, 
  UserPlus, 
  Mail, 
  MessageSquare,
  Building,
  User,
  BriefcaseBusiness,
  MapPin,
  Phone,
  Copy,
  Edit,
  Trash2,
  Filter,
  Download,
  CheckCircle2
} from "lucide-react";
import PageLayout from "@/components/layout/PageLayout";

// Mock data
const mockProspects = [
  {
    id: 1,
    name: "John Smith",
    company: "Acme Technologies",
    title: "CTO",
    email: "john.smith@acmetech.com",
    phone: "+1 415-555-1234",
    location: "San Francisco, CA",
    industry: "Software",
    companySize: "51-200 employees",
    linkedin: "linkedin.com/in/johnsmith",
    status: "Not contacted",
    tags: ["Decision Maker", "Enterprise"],
    addedDate: "2025-03-12T00:00:00Z",
    notes: "Met at SaaStr 2024, showed interest in our platform for their sales team"
  },
  {
    id: 2,
    name: "Sarah Johnson",
    company: "HealthFirst Solutions",
    title: "VP of Sales",
    email: "sarah.j@healthfirst.com",
    phone: "+1 312-555-9876",
    location: "Chicago, IL",
    industry: "Healthcare",
    companySize: "201-1000 employees",
    linkedin: "linkedin.com/in/sarahjohnson",
    status: "Contacted",
    tags: ["Decision Maker", "Mid-Market"],
    addedDate: "2025-03-10T00:00:00Z",
    notes: "Looking to improve their sales prospecting process"
  },
  {
    id: 3,
    name: "David Chen",
    company: "FinTech Innovations",
    title: "Director of Growth",
    email: "dchen@fintechinnovate.com",
    phone: "+1 212-555-4321",
    location: "New York, NY",
    industry: "Financial Services",
    companySize: "11-50 employees",
    linkedin: "linkedin.com/in/davidchen",
    status: "Responded",
    tags: ["Decision Maker", "Startup"],
    addedDate: "2025-03-08T00:00:00Z",
    notes: "Interested in our AI capabilities for personalized outreach"
  },
  {
    id: 4,
    name: "Emily Rodriguez",
    company: "Global Retail Group",
    title: "Head of Marketing",
    email: "emily.r@globalretail.com",
    phone: "+1 305-555-5678",
    location: "Miami, FL",
    industry: "Retail",
    companySize: "1000+ employees",
    linkedin: "linkedin.com/in/emilyrodriguez",
    status: "Not contacted",
    tags: ["Enterprise"],
    addedDate: "2025-03-05T00:00:00Z",
    notes: ""
  },
  {
    id: 5,
    name: "Michael Wilson",
    company: "TechStart",
    title: "CEO",
    email: "mike@techstart.io",
    phone: "+1 650-555-8765",
    location: "Palo Alto, CA",
    industry: "Technology",
    companySize: "1-10 employees",
    linkedin: "linkedin.com/in/mikewilson",
    status: "Meeting scheduled",
    tags: ["Decision Maker", "Startup"],
    addedDate: "2025-03-01T00:00:00Z",
    notes: "Scheduled demo for March 25th"
  }
];

const Prospects = () => {
  const [prospects, setProspects] = useState(mockProspects);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProspect, setSelectedProspect] = useState<any>(null);
  const [isAddingProspect, setIsAddingProspect] = useState(false);
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [selectedProspects, setSelectedProspects] = useState<number[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  
  const [newProspect, setNewProspect] = useState({
    name: "",
    company: "",
    title: "",
    email: "",
    phone: "",
    location: "",
    industry: "",
    companySize: "",
    linkedin: "",
    notes: ""
  });

  const filteredProspects = prospects.filter(
    (prospect) =>
      prospect.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prospect.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prospect.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectProspect = (prospectId: number) => {
    if (selectedProspects.includes(prospectId)) {
      setSelectedProspects(selectedProspects.filter(id => id !== prospectId));
    } else {
      setSelectedProspects([...selectedProspects, prospectId]);
    }
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedProspects([]);
    } else {
      setSelectedProspects(filteredProspects.map(p => p.id));
    }
    setSelectAll(!selectAll);
  };

  const handleViewProspect = (prospect: any) => {
    setSelectedProspect(prospect);
  };

  const handleAddProspect = () => {
    // This would send the data to Supabase in a real implementation
    const newProspectData = {
      id: prospects.length + 1,
      ...newProspect,
      status: "Not contacted",
      tags: [],
      addedDate: new Date().toISOString()
    };
    
    setProspects([...prospects, newProspectData]);
    setIsAddingProspect(false);
    
    // Reset form
    setNewProspect({
      name: "",
      company: "",
      title: "",
      email: "",
      phone: "",
      location: "",
      industry: "",
      companySize: "",
      linkedin: "",
      notes: ""
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewProspect(prev => ({ ...prev, [name]: value }));
  };

  const handleDeleteProspect = (id: number) => {
    setProspects(prospects.filter(prospect => prospect.id !== id));
    if (selectedProspect && selectedProspect.id === id) {
      setSelectedProspect(null);
    }
  };

  return (
    <PageLayout>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Prospects</h1>
          <p className="text-muted-foreground">Manage your sales prospects and leads.</p>
        </div>
        <div className="flex gap-2 mt-4 md:mt-0">
          <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Upload className="mr-2 h-4 w-4" />
                Import
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Import Prospects</DialogTitle>
                <DialogDescription>
                  Upload a CSV file with your prospects data or paste prospect information.
                </DialogDescription>
              </DialogHeader>
              <Tabs defaultValue="upload" className="mt-4">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="upload">Upload File</TabsTrigger>
                  <TabsTrigger value="paste">Paste Data</TabsTrigger>
                </TabsList>
                <TabsContent value="upload" className="space-y-4 py-4">
                  <div className="border-2 border-dashed rounded-lg p-6 text-center">
                    <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                    <p className="mb-2 text-sm">Drag and drop your CSV file here, or click to browse</p>
                    <Button size="sm">Select File</Button>
                    <p className="mt-2 text-xs text-muted-foreground">
                      Supports .CSV files up to 5MB
                    </p>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    <p className="font-medium mb-1">Your CSV should include these columns:</p>
                    <p>name, company, title, email, phone, location, linkedin</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" className="mt-2">Download Template</Button>
                    <Button className="mt-2" onClick={() => setIsUploadDialogOpen(false)}>Upload Prospects</Button>
                  </div>
                </TabsContent>
                <TabsContent value="paste" className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="prospects-data">Paste Prospect Data</Label>
                    <Textarea 
                      id="prospects-data" 
                      placeholder="Paste prospect data here, one per line with comma-separated values" 
                      className="min-h-[200px]" 
                    />
                    <p className="text-xs text-muted-foreground">
                      Format: Name, Company, Title, Email, Phone, Location, LinkedIn
                    </p>
                  </div>
                  <Button onClick={() => setIsUploadDialogOpen(false)}>Import Prospects</Button>
                </TabsContent>
              </Tabs>
            </DialogContent>
          </Dialog>
          
          <Sheet open={isAddingProspect} onOpenChange={setIsAddingProspect}>
            <SheetTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Prospect
              </Button>
            </SheetTrigger>
            <SheetContent className="sm:max-w-md overflow-y-auto">
              <SheetHeader>
                <SheetTitle>Add New Prospect</SheetTitle>
                <SheetDescription>
                  Enter the details of the new prospect you want to add to your database.
                </SheetDescription>
              </SheetHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input 
                    id="name" 
                    name="name" 
                    value={newProspect.name} 
                    onChange={handleInputChange} 
                    placeholder="John Smith" 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company">Company</Label>
                  <Input 
                    id="company" 
                    name="company" 
                    value={newProspect.company} 
                    onChange={handleInputChange} 
                    placeholder="Acme Technologies" 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="title">Job Title</Label>
                  <Input 
                    id="title" 
                    name="title" 
                    value={newProspect.title} 
                    onChange={handleInputChange} 
                    placeholder="CTO" 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    name="email" 
                    type="email" 
                    value={newProspect.email} 
                    onChange={handleInputChange} 
                    placeholder="john.smith@acmetech.com" 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input 
                    id="phone" 
                    name="phone" 
                    value={newProspect.phone} 
                    onChange={handleInputChange} 
                    placeholder="+1 415-555-1234" 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input 
                    id="location" 
                    name="location" 
                    value={newProspect.location} 
                    onChange={handleInputChange} 
                    placeholder="San Francisco, CA" 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="industry">Industry</Label>
                  <Input 
                    id="industry" 
                    name="industry" 
                    value={newProspect.industry} 
                    onChange={handleInputChange} 
                    placeholder="Software" 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="companySize">Company Size</Label>
                  <Input 
                    id="companySize" 
                    name="companySize" 
                    value={newProspect.companySize} 
                    onChange={handleInputChange} 
                    placeholder="51-200 employees" 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="linkedin">LinkedIn URL</Label>
                  <Input 
                    id="linkedin" 
                    name="linkedin" 
                    value={newProspect.linkedin} 
                    onChange={handleInputChange} 
                    placeholder="linkedin.com/in/johnsmith" 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea 
                    id="notes" 
                    name="notes" 
                    value={newProspect.notes} 
                    onChange={handleInputChange} 
                    placeholder="Add any relevant notes about this prospect" 
                    rows={3} 
                  />
                </div>
              </div>
              <SheetFooter>
                <SheetClose asChild>
                  <Button variant="outline">Cancel</Button>
                </SheetClose>
                <Button onClick={handleAddProspect}>Save Prospect</Button>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <div className="space-y-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="relative w-full md:w-96">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search prospects..." 
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="flex items-center gap-2 ml-auto">
                <Button variant="outline" size="sm" disabled={selectedProspects.length === 0}>
                  <Mail className="mr-2 h-4 w-4" />
                  Email
                </Button>
                <Button variant="outline" size="sm" disabled={selectedProspects.length === 0}>
                  <MessageSquare className="mr-2 h-4 w-4" />
                  LinkedIn
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Filter className="mr-2 h-4 w-4" />
                      Filter
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>Filter Prospects</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Checkbox id="status" className="mr-2" />
                      <label htmlFor="status">Status: Not contacted</label>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Checkbox id="industry" className="mr-2" />
                      <label htmlFor="industry">Industry: Technology</label>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Checkbox id="size" className="mr-2" />
                      <label htmlFor="size">Size: Enterprise</label>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Button variant="outline" size="sm" className="w-full">Apply Filters</Button>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">
                    <Checkbox
                      checked={selectAll}
                      onCheckedChange={handleSelectAll}
                      aria-label="Select all prospects"
                    />
                  </TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-[100px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProspects.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-6">
                      <div className="flex flex-col items-center justify-center text-muted-foreground">
                        <UserPlus className="h-8 w-8 mb-2" />
                        <p className="mb-2">No prospects found</p>
                        <Button size="sm" onClick={() => setIsAddingProspect(true)}>
                          Add your first prospect
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredProspects.map((prospect) => (
                    <TableRow key={prospect.id} className="cursor-pointer hover:bg-muted/50">
                      <TableCell>
                        <Checkbox
                          checked={selectedProspects.includes(prospect.id)}
                          onCheckedChange={() => handleSelectProspect(prospect.id)}
                          aria-label={`Select ${prospect.name}`}
                          onClick={(e) => e.stopPropagation()}
                        />
                      </TableCell>
                      <TableCell 
                        className="font-medium" 
                        onClick={() => handleViewProspect(prospect)}
                      >
                        {prospect.name}
                      </TableCell>
                      <TableCell onClick={() => handleViewProspect(prospect)}>
                        {prospect.company}
                      </TableCell>
                      <TableCell onClick={() => handleViewProspect(prospect)}>
                        {prospect.title}
                      </TableCell>
                      <TableCell onClick={() => handleViewProspect(prospect)}>
                        {prospect.location}
                      </TableCell>
                      <TableCell onClick={() => handleViewProspect(prospect)}>
                        <Badge 
                          variant={prospect.status === "Responded" || prospect.status === "Meeting scheduled" ? "default" : "secondary"}
                          className={
                            prospect.status === "Responded" || prospect.status === "Meeting scheduled" 
                              ? "bg-green-500" 
                              : prospect.status === "Contacted" 
                              ? "bg-blue-500/20 text-blue-700" 
                              : ""
                          }
                        >
                          {prospect.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleViewProspect(prospect)}>
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Mail className="mr-2 h-4 w-4" />
                              Send Email
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <MessageSquare className="mr-2 h-4 w-4" />
                              LinkedIn Message
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => handleDeleteProspect(prospect.id)}>
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
          <CardFooter className="flex items-center justify-between border-t p-4">
            <div className="text-sm text-muted-foreground">
              Showing <strong>{filteredProspects.length}</strong> of {prospects.length} prospects
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" disabled>Previous</Button>
              <Button variant="outline" size="sm" disabled>Next</Button>
            </div>
          </CardFooter>
        </Card>
      </div>

      {/* Prospect Detail Sheet */}
      {selectedProspect && (
        <Sheet open={!!selectedProspect} onOpenChange={(open) => !open && setSelectedProspect(null)}>
          <SheetContent className="sm:max-w-md overflow-y-auto">
            <SheetHeader>
              <SheetTitle>Prospect Details</SheetTitle>
              <div className="flex gap-2 mt-2">
                <Badge 
                  variant={
                    selectedProspect.status === "Responded" || selectedProspect.status === "Meeting scheduled" 
                      ? "default" 
                      : "secondary"
                  }
                  className={
                    selectedProspect.status === "Responded" || selectedProspect.status === "Meeting scheduled" 
                      ? "bg-green-500" 
                      : selectedProspect.status === "Contacted" 
                      ? "bg-blue-500/20 text-blue-700" 
                      : ""
                  }
                >
                  {selectedProspect.status}
                </Badge>
                {selectedProspect.tags.map((tag: string) => (
                  <Badge key={tag} variant="outline">{tag}</Badge>
                ))}
              </div>
            </SheetHeader>
            
            <div className="mt-6 space-y-6">
              {/* Basic Info */}
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <User className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{selectedProspect.name}</h3>
                    <p className="text-muted-foreground">{selectedProspect.title} at {selectedProspect.company}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="flex flex-col gap-1">
                    <Label className="text-xs text-muted-foreground">Email</Label>
                    <div className="flex items-center gap-1">
                      <Mail className="h-3.5 w-3.5 text-muted-foreground" />
                      <span className="text-sm">{selectedProspect.email}</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <Label className="text-xs text-muted-foreground">Phone</Label>
                    <div className="flex items-center gap-1">
                      <Phone className="h-3.5 w-3.5 text-muted-foreground" />
                      <span className="text-sm">{selectedProspect.phone}</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <Label className="text-xs text-muted-foreground">LinkedIn</Label>
                    <div className="flex items-center gap-1">
                      <svg className="h-3.5 w-3.5 text-muted-foreground" viewBox="0 0 24 24">
                        <path 
                          fill="currentColor" 
                          d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"
                        />
                      </svg>
                      <span className="text-sm">{selectedProspect.linkedin}</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <Label className="text-xs text-muted-foreground">Location</Label>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
                      <span className="text-sm">{selectedProspect.location}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              {/* Company Info */}
              <div className="space-y-3">
                <h4 className="text-sm font-medium">Company Information</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <Label className="text-xs text-muted-foreground">Company</Label>
                    <div className="flex items-center gap-1">
                      <Building className="h-3.5 w-3.5 text-muted-foreground" />
                      <span className="text-sm">{selectedProspect.company}</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <Label className="text-xs text-muted-foreground">Industry</Label>
                    <div className="flex items-center gap-1">
                      <BriefcaseBusiness className="h-3.5 w-3.5 text-muted-foreground" />
                      <span className="text-sm">{selectedProspect.industry}</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <Label className="text-xs text-muted-foreground">Company Size</Label>
                    <div className="flex items-center gap-1">
                      <User className="h-3.5 w-3.5 text-muted-foreground" />
                      <span className="text-sm">{selectedProspect.companySize}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              {/* Notes */}
              <div className="space-y-3">
                <h4 className="text-sm font-medium">Notes</h4>
                <Textarea 
                  defaultValue={selectedProspect.notes} 
                  placeholder="Add notes about this prospect"
                  rows={3}
                />
              </div>
              
              {/* Actions */}
              <div className="space-y-3">
                <h4 className="text-sm font-medium">Actions</h4>
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" size="sm">
                    <Mail className="mr-2 h-4 w-4" />
                    Send Email
                  </Button>
                  <Button variant="outline" size="sm">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    LinkedIn Message
                  </Button>
                  <Button variant="outline" size="sm">
                    <Edit className="mr-2 h-4 w-4" />
                    Edit Details
                  </Button>
                  <Button variant="outline" size="sm">
                    <Copy className="mr-2 h-4 w-4" />
                    Duplicate
                  </Button>
                </div>
              </div>
              
              <Separator />
              
              {/* Activity Timeline */}
              <div className="space-y-3">
                <h4 className="text-sm font-medium">Activity History</h4>
                
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                      <User className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Added to database</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(selectedProspect.addedDate).toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric', 
                          year: 'numeric' 
                        })}
                      </p>
                    </div>
                  </div>
                  
                  {selectedProspect.status === "Contacted" && (
                    <div className="flex gap-3">
                      <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                        <Mail className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Email sent</p>
                        <p className="text-xs text-muted-foreground">Mar 15, 2025</p>
                      </div>
                    </div>
                  )}
                  
                  {selectedProspect.status === "Responded" && (
                    <>
                      <div className="flex gap-3">
                        <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                          <Mail className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">Email sent</p>
                          <p className="text-xs text-muted-foreground">Mar 14, 2025</p>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                          <CheckCircle2 className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">Reply received</p>
                          <p className="text-xs text-muted-foreground">Mar 16, 2025</p>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            <SheetFooter className="mt-6">
              <Button variant="outline" onClick={() => setSelectedProspect(null)}>Close</Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      )}
    </PageLayout>
  );
};

export default Prospects;
