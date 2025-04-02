import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';

const EmailCommunication = () => {
  const [emailData, setEmailData] = useState({
    subject: '',
    content: ''
  });
  const [sending, setSending] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmailData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);

    try {
      // This would be replaced with actual API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      alert('Email sent successfully!');
      setEmailData({ subject: '', content: '' });
    } catch (error) {
      console.error('Failed to send email:', error);
      alert('Failed to send email. Please try again.');
    } finally {
      setSending(false);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Email Communication</h2>
      </div>

      <Card>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="subject" className="block text-sm font-medium mb-1">Subject</label>
              <Input
                id="subject"
                name="subject"
                value={emailData.subject}
                onChange={handleInputChange}
                placeholder="Enter email subject"
                required
              />
            </div>

            <div>
              <label htmlFor="content" className="block text-sm font-medium mb-1">Content</label>
              <textarea
                id="content"
                name="content"
                value={emailData.content}
                onChange={handleInputChange}
                placeholder="Write your email content here..."
                className="w-full min-h-[200px] p-2 border rounded-md"
                required
              />
            </div>

            <div className="flex justify-end">
              <Button type="submit" disabled={sending}>
                {sending ? 'Sending...' : 'Sent to All Users'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmailCommunication;