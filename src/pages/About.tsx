import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  Shield, 
  Globe, 
  Award, 
  TrendingUp, 
  Clock, 
  CheckCircle,
  Mail,
  MapPin,
  Phone
} from 'lucide-react';
import { Link } from 'react-router-dom';
import SEOHead from '@/components/SEOHead';
import DynamicBreadcrumbSchema from '@/components/DynamicBreadcrumbSchema';
import BreadcrumbNavigation from '@/components/BreadcrumbNavigation';
import SemanticHeader from '@/components/SemanticHeader';

const About = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Currency to Currency",
    "description": "Leading provider of real-time currency conversion tools and foreign exchange rate information.",
    "url": "https://currencytocurrency.app",
    "logo": "https://currencytocurrency.app/icon-512.png",
    "foundingDate": "2024",
    "numberOfEmployees": "10-50",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "US"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+1-555-CURRENCY",
      "contactType": "customer service",
      "email": "support@currencytocurrency.app"
    },
    "sameAs": [
      "https://twitter.com/currencytocurrency",
      "https://linkedin.com/company/currencytocurrency"
    ],
    "offers": {
      "@type": "Offer",
      "description": "Free real-time currency conversion services",
      "price": "0",
      "priceCurrency": "USD"
    }
  };

  const teamMembers = [
    {
      name: "Dr. Sarah Chen",
      role: "Chief Financial Strategist",
      credentials: "PhD in Economics, Former Goldman Sachs",
      experience: "15+ years in forex markets",
      image: "/team/sarah-chen.jpg"
    },
    {
      name: "Michael Rodriguez",
      role: "Lead Data Scientist",
      credentials: "MS Computer Science, Ex-Bloomberg",
      experience: "10+ years in financial technology",
      image: "/team/michael-rodriguez.jpg"
    },
    {
      name: "Emily Watson",
      role: "Currency Market Analyst",
      credentials: "CFA, Former JPMorgan Chase",
      experience: "12+ years in currency analysis",
      image: "/team/emily-watson.jpg"
    }
  ];

  const achievements = [
    {
      icon: <Users className="h-6 w-6" />,
      title: "5M+ Users",
      description: "Trusted by millions worldwide"
    },
    {
      icon: <Globe className="h-6 w-6" />,
      title: "150+ Currencies",
      description: "Comprehensive global coverage"
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Real-Time Updates",
      description: "Live rates every minute"
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Bank-Grade Security",
      description: "Enterprise-level protection"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="About Currency to Currency - Expert Currency Conversion Platform | Our Story"
        description="Learn about Currency to Currency's mission to provide accurate, real-time currency conversion tools. Meet our expert team of financial analysts and data scientists."
        keywords="about currency to currency, forex experts, currency conversion team, financial technology company, exchange rate professionals"
        canonical="https://currencytocurrency.app/about"
        structuredData={structuredData}
      />
      <DynamicBreadcrumbSchema pageTitle="About Us" />
      
      <div className="container mx-auto px-4 py-6">
        <BreadcrumbNavigation className="mb-6" />
      </div>

      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="text-center mb-12">
          <SemanticHeader level={1} variant="section">
            About Currency to Currency
          </SemanticHeader>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            We're a team of financial experts and technology professionals dedicated to providing 
            the most accurate and reliable currency conversion tools in the industry.
          </p>
          <div className="flex justify-center gap-4">
            <Badge variant="secondary" className="text-sm">
              <Award className="h-4 w-4 mr-1" />
              Industry Leading
            </Badge>
            <Badge variant="secondary" className="text-sm">
              <CheckCircle className="h-4 w-4 mr-1" />
              Trusted by Millions
            </Badge>
          </div>
        </section>

        {/* Mission Statement */}
        <section className="mb-12">
          <Card className="bg-gradient-to-r from-primary/5 to-secondary/5">
            <CardContent className="p-8">
              <div className="text-center">
                <SemanticHeader level={2} variant="article" className="mb-4">
                  Our Mission
                </SemanticHeader>
                <p className="text-lg text-muted-foreground max-w-4xl mx-auto">
                  To democratize access to accurate, real-time currency exchange information and empower 
                  individuals and businesses to make informed financial decisions in an increasingly 
                  connected global economy.
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Achievements */}
        <section className="mb-12">
          <SemanticHeader level={2} variant="section" className="text-center mb-8">
            Why Users Trust Us
          </SemanticHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {achievements.map((achievement, index) => (
              <Card key={index} className="text-center">
                <CardContent className="p-6">
                  <div className="flex justify-center mb-4 text-primary">
                    {achievement.icon}
                  </div>
                  <h3 className="font-bold text-lg mb-2">{achievement.title}</h3>
                  <p className="text-sm text-muted-foreground">{achievement.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Expert Team */}
        <section className="mb-12">
          <SemanticHeader level={2} variant="section" className="text-center mb-8">
            Our Expert Team
          </SemanticHeader>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index}>
                <CardContent className="p-6 text-center">
                  <div className="w-24 h-24 bg-gradient-to-br from-primary to-secondary rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Users className="h-12 w-12 text-white" />
                  </div>
                  <h3 className="font-bold text-lg mb-1">{member.name}</h3>
                  <p className="text-primary font-medium mb-2">{member.role}</p>
                  <p className="text-sm text-muted-foreground mb-2">{member.credentials}</p>
                  <Badge variant="outline" className="text-xs">
                    {member.experience}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Company Information */}
        <section className="mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2" />
                  Our Expertise
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span>Real-time forex data from 15+ premium sources</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span>Advanced algorithms for rate accuracy</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span>Enterprise-grade security infrastructure</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span>GDPR and SOC 2 compliant operations</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Mail className="h-5 w-5 mr-2" />
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 mr-3 text-muted-foreground" />
                    <span>support@currencytocurrency.app</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 mr-3 text-muted-foreground" />
                    <span>+1-555-CURRENCY (287-7362)</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-3 text-muted-foreground" />
                    <span>Global Operations - Serving Worldwide</span>
                  </div>
                  <div className="pt-4">
                    <Link to="/contact">
                      <Button className="w-full">
                        Get In Touch
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center">
          <Card className="bg-gradient-to-r from-primary/10 to-secondary/10">
            <CardContent className="p-8">
              <SemanticHeader level={2} variant="article" className="mb-4">
                Ready to Experience Accurate Currency Conversion?
              </SemanticHeader>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Join millions of users who trust our platform for their currency conversion needs. 
                Get started with our free, real-time converter today.
              </p>
              <div className="flex justify-center gap-4">
                <Link to="/">
                  <Button size="lg">
                    Try Our Converter
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button variant="outline" size="lg">
                    Contact Sales
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
};

export default About;