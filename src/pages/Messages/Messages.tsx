
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  PlusCircle, 
  Mail, 
  MessageSquare, 
  Search, 
  MoreHorizontal, 
  Copy, 
  Edit, 
  Trash2,
  Wand2,
  MessageSquarePlus,
  RefreshCw,
  Sparkles,
  Check,
  Save
} from "lucide-react";
import PageLayout from "@/components/layout/PageLayout";

// Mock data
const mockTemplates = [
  {
    id: 1,
    name: "SaaS CTO Value Prop",
    type: "email",
    subject: "Streamline your sales outreach with AI",
    body: "Hi {{firstName}},\n\nI noticed that {{company}} has been expanding its sales team recently, and I thought you might be interested in how our AI platform can help your team find and connect with the right prospects.\n\nOur customers typically see a 40% increase in response rates and a 25% reduction in time spent on prospecting.\n\nWould you be open to a quick 15-minute call next week to discuss how we could help {{company}} achieve similar results?\n\nBest regards,\n{{userFirstName}}",
    variables: ["firstName", "company", "userFirstName"],
    createdAt: "2025-03-10T00:00:00Z",
    lastUsed: "2025-03-18T00:00:00Z",
    useCount: 78
  },
  {
    id: 2,
    name: "Case Study Follow-up",
    type: "email",
    subject: "See how {{similarCompany}} improved their outreach by 40%",
    body: "Hi {{firstName}},\n\nI wanted to follow up on my previous email about helping {{company}} improve its sales prospecting process.\n\nI thought you might be interested in how {{similarCompany}}, another {{industry}} company, was able to increase their response rates by 40% and book 30% more meetings using our platform.\n\nYou can check out their full case study here: [LINK]\n\nWould you be interested in learning more about how we could help {{company}} achieve similar results?\n\nBest,\n{{userFirstName}}",
    variables: ["firstName", "company", "similarCompany", "industry", "userFirstName"],
    createdAt: "2025-03-11T00:00:00Z",
    lastUsed: "2025-03-18T00:00:00Z",
    useCount: 56
  },
  {
    id: 3,
    name: "LinkedIn Connect Request",
    type: "linkedin",
    subject: "",
    body: "Hi {{firstName}}, I came across your profile and I'm impressed by your work at {{company}}. I thought you might be interested in connecting, as we help {{industry}} companies improve their sales prospecting process. Would love to add you to my professional network!",
    variables: ["firstName", "company", "industry"],
    createdAt: "2025-03-12T00:00:00Z",
    lastUsed: "2025-03-17T00:00:00Z",
    useCount: 124
  },
  {
    id: 4,
    name: "Last Chance",
    type: "email",
    subject: "Last touchpoint: {{company}} + ProspectAI",
    body: "Hi {{firstName}},\n\nI've reached out a couple of times about how we could help {{company}} improve its prospecting process and response rates, but haven't heard back. I understand you're busy, so this will be my last email.\n\nIf you're interested in learning how companies like {{company}} are using AI to improve their sales outreach, feel free to book a time on my calendar: [LINK]\n\nAll the best in your future endeavors,\n{{userFirstName}}",
    variables: ["firstName", "company", "userFirstName"],
    createdAt: "2025-03-12T00:00:00Z",
    lastUsed: "2025-03-16T00:00:00Z",
    useCount: 45
  },
  {
    id: 5,
    name: "Marketing ROI Intro",
    type: "email",
    subject: "Improving {{company}}'s marketing ROI with AI",
    body: "Hi {{firstName}},\n\nAs the {{jobTitle}} at {{company}}, I imagine you're always looking for ways to improve your marketing ROI.\n\nI'm reaching out because our AI platform has been helping {{industry}} companies like {{company}} identify and connect with their ideal customers more effectively, resulting in a 35% higher conversion rate and 20% lower CAC.\n\nWould you be open to a brief call to discuss how we might be able to help {{company}} achieve similar results?\n\nBest regards,\n{{userFirstName}}",
    variables: ["firstName", "jobTitle", "company", "industry", "userFirstName"],
    createdAt: "2025-03-15T00:00:00Z",
    lastUsed: "2025-03-18T00:00:00Z",
    useCount: 36
  }
];

const Messages = () => {
  const [templates, setTemplates] = useState(mockTemplates);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null);
  const [isCreatingTemplate, setIsCreatingTemplate] = useState(false);
  const [isGeneratingTemplate, setIsGeneratingTemplate] = useState(false);
  
  const [newTemplate, setNewTemplate] = useState({
    name: "",
    type: "email",
    subject: "",
    body: "",
  });

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = 
      template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.body.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = activeTab === "all" || template.type === activeTab;
    
    return matchesSearch && matchesType;
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewTemplate(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setNewTemplate(prev => ({ ...prev, [name]: value }));
  };

  const handleCreateTemplate = () => {
    // This would send the data to Supabase in a real implementation
    const variables = extractVariables(newTemplate.body);
    if (newTemplate.subject) {
      variables.push(...extractVariables(newTemplate.subject));
    }
    
    // Remove duplicates
    const uniqueVariables = [...new Set(variables)];
    
    const newTemplateData = {
      id: templates.length + 1,
      ...newTemplate,
      variables: uniqueVariables,
      createdAt: new Date().toISOString(),
      lastUsed: "",
      useCount: 0
    };
    
    setTemplates([...templates, newTemplateData]);
    setIsCreatingTemplate(false);
    
    // Reset form
    setNewTemplate({
      name: "",
      type: "email",
      subject: "",
      body: "",
    });
  };

  const handleDeleteTemplate = (id: number) => {
    setTemplates(templates.filter(template => template.id !== id));
    if (selectedTemplate && selectedTemplate.id === id) {
      setSelectedTemplate(null);
    }
  };

  const extractVariables = (text: string) => {
    const regex = /\{\{(\w+)\}\}/g;
    const matches = text.match(regex) || [];
    return matches.map(match => match.replace(/\{\{|\}\}/g, ''));
  };

  const handleGenerateAITemplate = () => {
    // This would connect to an LLM via Supabase Edge Function in a real implementation
    setIsGeneratingTemplate(true);
    
    // Simulate API delay
    setTimeout(() => {
      const generatedTemplate = {
        name: "AI Generated Template",
        type: "email",
        subject: "Improving {{company}}'s sales process with AI prospecting",
        body: "Hi {{firstName}},\n\nI noticed that {{company}} has been expanding its presence in the {{industry}} sector, and I thought you might be interested in how our AI-powered prospecting platform could help you connect with the right decision-makers more efficiently.\n\nOur customers typically see:\n• 40% increase in response rates\n• 30% reduction in prospecting time\n• 25% higher meeting booking rates\n\nWould you be open to a quick 15-minute call to explore how we might be able to help {{company}} achieve similar results?\n\nBest regards,\n{{userFirstName}}",
      };
      
      setNewTemplate(generatedTemplate);
      setIsGeneratingTemplate(false);
    }, 2000);
  };

  return (
    <PageLayout>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Message Templates</h1>
          <p className="text-muted-foreground">Create and manage your outreach templates.</p>
        </div>
        <div className="flex gap-2 mt-4 md:mt-0">
          <Button variant="outline" onClick={handleGenerateAITemplate}>
            <Wand2 className="mr-2 h-4 w-4" />
            AI Generate
          </Button>
          <Button onClick={() => setIsCreatingTemplate(true)}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Create Template
          </Button>
        </div>
      </div>
      
      <div className="space-y-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative w-full md:w-96">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search templates..." 
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full md:w-auto">
                <TabsList>
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="email">Email</TabsTrigger>
                  <TabsTrigger value="linkedin">LinkedIn</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </CardContent>
        </Card>
        
        {filteredTemplates.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center p-6 text-center">
              <MessageSquarePlus className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No templates found</h3>
              <p className="text-muted-foreground mb-4">
                {searchTerm 
                  ? "No templates match your search criteria." 
                  : "You haven't created any templates yet."}
              </p>
              <Button onClick={() => setIsCreatingTemplate(true)}>Create Your First Template</Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredTemplates.map((template) => (
              <Card 
                key={template.id} 
                className="overflow-hidden border-border hover:shadow-md transition-shadow"
                onClick={() => setSelectedTemplate(template)}
              >
                <CardHeader className="bg-muted/30 pb-4">
                  <div className="flex justify-between items-start">
                    <Badge variant="outline" className="bg-background">
                      {template.type === 'email' ? (
                        <Mail className="mr-1 h-3 w-3" />
                      ) : (
                        <MessageSquare className="mr-1 h-3 w-3" />
                      )}
                      {template.type === 'email' ? 'Email' : 'LinkedIn'}
                    </Badge>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={(e) => {
                          e.stopPropagation();
                          setSelectedTemplate(template);
                        }}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit Template
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={(e) => {
                          e.stopPropagation();
                          // This would copy to clipboard
                          alert(`Template ${template.name} copied to clipboard`);
                        }}>
                          <Copy className="mr-2 h-4 w-4" />
                          Copy to Clipboard
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteTemplate(template.id);
                        }}>
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <CardTitle className="mt-2 text-lg">{template.name}</CardTitle>
                  {template.type === 'email' && (
                    <CardDescription className="line-clamp-1">
                      Subject: {template.subject}
                    </CardDescription>
                  )}
                </CardHeader>
                <CardContent className="p-4">
                  <div className="prose prose-sm max-w-none">
                    <div className="line-clamp-3 text-sm text-muted-foreground">
                      {template.body}
                    </div>
                  </div>
                </CardContent>
                <Separator />
                <CardFooter className="flex justify-between p-4 bg-muted/20 text-xs text-muted-foreground">
                  <div>
                    Used {template.useCount} times
                  </div>
                  <div>
                    {template.lastUsed 
                      ? `Last used: ${new Date(template.lastUsed).toLocaleDateString()}` 
                      : 'Never used'}
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
      
      {/* Template Create/Edit Sheet */}
      <Sheet 
        open={isCreatingTemplate} 
        onOpenChange={setIsCreatingTemplate}
      >
        <SheetContent className="sm:max-w-[600px] overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Create Message Template</SheetTitle>
            <SheetDescription>
              Create a personalized template for your outreach campaigns.
            </SheetDescription>
          </SheetHeader>
          
          <div className="space-y-6 py-6">
            <div className="space-y-4">
              <div className="grid grid-cols-4 gap-4 items-end">
                <div className="col-span-3 space-y-2">
                  <Label htmlFor="name">Template Name</Label>
                  <Input 
                    id="name" 
                    name="name" 
                    placeholder="E.g., Initial Sales Outreach"
                    value={newTemplate.name}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">Type</Label>
                  <Select 
                    value={newTemplate.type} 
                    onValueChange={(value) => handleSelectChange("type", value)}
                  >
                    <SelectTrigger id="type">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="email">Email</SelectItem>
                      <SelectItem value="linkedin">LinkedIn</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              {newTemplate.type === 'email' && (
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject Line</Label>
                  <Input 
                    id="subject" 
                    name="subject" 
                    placeholder="Enter subject line"
                    value={newTemplate.subject}
                    onChange={handleInputChange}
                  />
                </div>
              )}
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="body">Message Content</Label>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-8 text-xs"
                    onClick={handleGenerateAITemplate}
                    disabled={isGeneratingTemplate}
                  >
                    {isGeneratingTemplate ? (
                      <>
                        <RefreshCw className="h-3 w-3 mr-1 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-3 w-3 mr-1" />
                        Generate with AI
                      </>
                    )}
                  </Button>
                </div>
                <Textarea 
                  id="body" 
                  name="body" 
                  placeholder="Write your message content here. Use {{variableName}} for personalization."
                  rows={12}
                  value={newTemplate.body}
                  onChange={handleInputChange}
                />
                <p className="text-xs text-muted-foreground">
                  Available variables: &#123;&#123;firstName&#125;&#125;, &#123;&#123;company&#125;&#125;, &#123;&#123;industry&#125;&#125;, &#123;&#123;jobTitle&#125;&#125;, &#123;&#123;userFirstName&#125;&#125;
                </p>
              </div>
              
              <div className="space-y-2 bg-muted/30 p-4 rounded-md">
                <Label>Personalization Preview</Label>
                <div className="mt-2 space-y-2">
                  {newTemplate.type === 'email' && newTemplate.subject && (
                    <div>
                      <p className="text-xs text-muted-foreground">Subject:</p>
                      <p className="text-sm font-medium">
                        {newTemplate.subject
                          .replace(/\{\{firstName\}\}/g, 'John')
                          .replace(/\{\{company\}\}/g, 'Acme Technologies')
                          .replace(/\{\{industry\}\}/g, 'Software')
                          .replace(/\{\{jobTitle\}\}/g, 'CTO')
                          .replace(/\{\{userFirstName\}\}/g, 'Alice')}
                      </p>
                    </div>
                  )}
                  <div>
                    <p className="text-xs text-muted-foreground">Body:</p>
                    <div className="text-sm whitespace-pre-line bg-white p-3 rounded border mt-1">
                      {newTemplate.body
                        .replace(/\{\{firstName\}\}/g, 'John')
                        .replace(/\{\{company\}\}/g, 'Acme Technologies')
                        .replace(/\{\{industry\}\}/g, 'Software')
                        .replace(/\{\{jobTitle\}\}/g, 'CTO')
                        .replace(/\{\{userFirstName\}\}/g, 'Alice')}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <SheetFooter>
            <SheetClose asChild>
              <Button variant="outline">Cancel</Button>
            </SheetClose>
            <Button onClick={handleCreateTemplate}>
              <Save className="mr-2 h-4 w-4" />
              Save Template
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
      
      {/* Template Detail Sheet */}
      {selectedTemplate && (
        <Sheet 
          open={!!selectedTemplate} 
          onOpenChange={(open) => !open && setSelectedTemplate(null)}
        >
          <SheetContent className="sm:max-w-[600px] overflow-y-auto">
            <SheetHeader>
              <div className="flex items-center gap-2">
                <SheetTitle>{selectedTemplate.name}</SheetTitle>
                <Badge variant="outline" className="bg-background">
                  {selectedTemplate.type === 'email' ? (
                    <Mail className="mr-1 h-3 w-3" />
                  ) : (
                    <MessageSquare className="mr-1 h-3 w-3" />
                  )}
                  {selectedTemplate.type === 'email' ? 'Email' : 'LinkedIn'}
                </Badge>
              </div>
              <SheetDescription>
                Created on {new Date(selectedTemplate.createdAt).toLocaleDateString()} • 
                Used {selectedTemplate.useCount} times
              </SheetDescription>
            </SheetHeader>
            
            <div className="mt-6 space-y-6">
              {selectedTemplate.type === 'email' && (
                <div className="space-y-2">
                  <Label>Subject Line</Label>
                  <div className="bg-muted/30 p-3 rounded-md">
                    <p className="text-sm font-medium">{selectedTemplate.subject}</p>
                  </div>
                </div>
              )}
              
              <div className="space-y-2">
                <Label>Message Content</Label>
                <div className="bg-muted/30 p-3 rounded-md whitespace-pre-line">
                  <p className="text-sm">{selectedTemplate.body}</p>
                </div>
              </div>
              
              {selectedTemplate.variables.length > 0 && (
                <div className="space-y-2">
                  <Label>Personalization Variables</Label>
                  <div className="flex flex-wrap gap-2">
                    {selectedTemplate.variables.map((variable: string) => (
                      <Badge key={variable} variant="secondary">
                        {variable}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
              
              <Separator />
              
              <div className="space-y-2">
                <Label>Personalization Preview</Label>
                <div className="mt-2 space-y-2 border rounded-md p-4 bg-white">
                  {selectedTemplate.type === 'email' && (
                    <div>
                      <p className="text-xs text-muted-foreground">Subject:</p>
                      <p className="text-sm font-medium">
                        {selectedTemplate.subject
                          .replace(/\{\{firstName\}\}/g, 'John')
                          .replace(/\{\{company\}\}/g, 'Acme Technologies')
                          .replace(/\{\{industry\}\}/g, 'Software')
                          .replace(/\{\{jobTitle\}\}/g, 'CTO')
                          .replace(/\{\{userFirstName\}\}/g, 'Alice')
                          .replace(/\{\{similarCompany\}\}/g, 'TechCorp')}
                      </p>
                    </div>
                  )}
                  <div>
                    <p className="text-xs text-muted-foreground">Body:</p>
                    <div className="text-sm whitespace-pre-line mt-1">
                      {selectedTemplate.body
                        .replace(/\{\{firstName\}\}/g, 'John')
                        .replace(/\{\{company\}\}/g, 'Acme Technologies')
                        .replace(/\{\{industry\}\}/g, 'Software')
                        .replace(/\{\{jobTitle\}\}/g, 'CTO')
                        .replace(/\{\{userFirstName\}\}/g, 'Alice')
                        .replace(/\{\{similarCompany\}\}/g, 'TechCorp')}
                    </div>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <Label>Actions</Label>
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline">
                    <Edit className="mr-2 h-4 w-4" />
                    Edit Template
                  </Button>
                  <Button variant="outline">
                    <Copy className="mr-2 h-4 w-4" />
                    Duplicate
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => handleDeleteTemplate(selectedTemplate.id)}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </Button>
                </div>
              </div>
            </div>
            
            <SheetFooter className="mt-6">
              <Button variant="outline" onClick={() => setSelectedTemplate(null)}>
                Close
              </Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      )}
    </PageLayout>
  );
};

export default Messages;
