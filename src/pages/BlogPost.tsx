import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const BlogPost = () => {
  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <Card>
          <CardHeader>
            <CardTitle>Blog Post</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Blog post content will be available soon.</p>
            <div className="mt-4">
              <a href="/blog" className="text-primary hover:underline">← Back to Blog</a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BlogPost;