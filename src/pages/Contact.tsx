import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  MessageSquare, 
  HelpCircle,
  Shield,
  Headphones
} from 'lucide-react';
import { useState } from 'react';
import SEOHead from '@/components/SEOHead';
import DynamicBreadcrumbSchema from '@/components/DynamicBreadcrumbSchema';
import BreadcrumbNavigation from '@/components/BreadcrumbNavigation';
import SemanticHeader from '@/components/SemanticHeader';
import { useToast } from '@/hooks/use-toast';

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    category: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    toast({
      title: "Message Sent Successfully",
      description: "We'll get back to you within 24 hours.",
    });
    setFormData({ name: '', email: '', subject: '', category: '', message: '' });
  };

  const contactMethods = [
    {
      icon: <Mail className="h-6 w-6" />,
      title: "Email Support",
      description: "Get detailed help via email",
      contact: "support@currencytocurrency.app",
      responseTime: "Within 24 hours"
    },
    {
      icon: <Phone className="h-6 w-6" />,
      title: "Phone Support",
      description: "Speak with our currency experts",
      contact: "+1-555-CURRENCY",
      responseTime: "Monday-Friday, 9 AM - 6 PM EST"
    },
    {
      icon: <MessageSquare className="h-6 w-6" />,
      title: "Live Chat",
      description: "Instant help with currency questions",
      contact: "Available on website",
      responseTime: "Real-time during business hours"
    },
    {
      icon: <HelpCircle className="h-6 w-6" />,
      title: "FAQ Center",
      description: "Find quick answers to common questions",
      contact: "Visit our FAQ page",
      responseTime: "Instant access"
    }
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contact Currency to Currency",
    "description": "Get in touch with our currency conversion experts. Contact us for support, business inquiries, or technical assistance.",
    "url": "https://currencytocurrency.app/contact",
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "telephone": "+1-555-CURRENCY",
        "contactType": "customer service",
        "email": "support@currencytocurrency.app",
        "availableLanguage": ["English"],
        "hoursAvailable": "Mo-Fr 09:00-18:00"
      },
      {
        "@type": "ContactPoint",
        "email": "business@currencytocurrency.app",
        "contactType": "sales",
        "availableLanguage": ["English"]
      }
    ]
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Contact Currency to Currency - Get Expert Currency Support | Contact Us"
        description="Contact our currency conversion experts for support, business inquiries, or technical assistance. Multiple contact methods available with fast response times."
        keywords="contact currency to currency, customer support, currency help, forex support, business inquiries, technical assistance"
        canonical="https://currencytocurrency.app/contact"
        structuredData={structuredData}
      />
      <DynamicBreadcrumbSchema pageTitle="Contact Us" />
      
      <div className="container mx-auto px-4 py-6">
        <BreadcrumbNavigation className="mb-6" />
      </div>

      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="text-center mb-12">
          <SemanticHeader level={1} variant="section">
            Contact Our Currency Experts
          </SemanticHeader>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-6">
            Have questions about currency conversion? Need technical support? Our team of experts 
            is here to help you with all your foreign exchange needs.
          </p>
          <div className="flex justify-center gap-2">
            <Badge variant="secondary">
              <Clock className="h-3 w-3 mr-1" />
              24/7 Support Available
            </Badge>
            <Badge variant="secondary">
              <Shield className="h-3 w-3 mr-1" />
              Secure Communication
            </Badge>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Methods */}
          <div className="lg:col-span-1">
            <SemanticHeader level={2} variant="article" className="mb-6">
              Get In Touch
            </SemanticHeader>
            
            <div className="space-y-4">
              {contactMethods.map((method, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-3">
                      <div className="p-2 bg-primary/10 rounded-lg text-primary">
                        {method.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold mb-1">{method.title}</h3>
                        <p className="text-sm text-muted-foreground mb-2">{method.description}</p>
                        <p className="text-sm font-medium">{method.contact}</p>
                        <p className="text-xs text-muted-foreground">{method.responseTime}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Business Hours */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Clock className="h-5 w-5 mr-2" />
                  Business Hours
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Monday - Friday</span>
                    <span className="font-medium">9:00 AM - 6:00 PM EST</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday</span>
                    <span className="font-medium">10:00 AM - 4:00 PM EST</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday</span>
                    <span className="font-medium">Emergency Support Only</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageSquare className="h-5 w-5 mr-2" />
                  Send us a Message
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Fill out the form below and we'll get back to you as soon as possible.
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-2">
                        Full Name *
                      </label>
                      <Input
                        id="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-2">
                        Email Address *
                      </label>
                      <Input
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="category" className="block text-sm font-medium mb-2">
                        Inquiry Type *
                      </label>
                      <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select inquiry type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="support">Technical Support</SelectItem>
                          <SelectItem value="business">Business Inquiry</SelectItem>
                          <SelectItem value="api">API Access</SelectItem>
                          <SelectItem value="partnership">Partnership</SelectItem>
                          <SelectItem value="feedback">Feedback</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium mb-2">
                        Subject *
                      </label>
                      <Input
                        id="subject"
                        type="text"
                        required
                        value={formData.subject}
                        onChange={(e) => setFormData({...formData, subject: e.target.value})}
                        placeholder="Brief description of your inquiry"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">
                      Message *
                    </label>
                    <Textarea
                      id="message"
                      required
                      rows={6}
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      placeholder="Please provide details about your inquiry, including any specific currency pairs or features you're interested in..."
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="privacy" className="rounded" required />
                    <label htmlFor="privacy" className="text-sm text-muted-foreground">
                      I agree to the <a href="/privacy-policy" className="text-primary hover:underline">Privacy Policy</a> and <a href="/terms-of-service" className="text-primary hover:underline">Terms of Service</a>
                    </label>
                  </div>

                  <Button type="submit" size="lg" className="w-full">
                    <Headphones className="h-4 w-4 mr-2" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Additional Information */}
        <section className="mt-12">
          <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20">
            <CardContent className="p-8">
              <div className="text-center">
                <SemanticHeader level={2} variant="article" className="mb-4">
                  Enterprise & API Solutions
                </SemanticHeader>
                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                  Looking for enterprise-grade currency data or API access? We offer scalable solutions 
                  for businesses of all sizes with dedicated support and custom integrations.
                </p>
                <div className="flex justify-center gap-4">
                  <Button variant="outline">
                    <Mail className="h-4 w-4 mr-2" />
                    business@currencytocurrency.app
                  </Button>
                  <Button>
                    Schedule Consultation
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
};

export default Contact;