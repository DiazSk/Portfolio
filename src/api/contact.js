// api/contact-resend.js - Alternative using Resend (Modern email API)
import { Resend } from 'resend';

// Initialize Resend with your API key
const resend = new Resend(process.env.RESEND_API_KEY);

// Use the same templates from above (notificationTemplate and autoReplyTemplate)
const notificationTemplate = (name, email, message) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>New Portfolio Contact</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
    <h1 style="margin: 0;">🚀 New Portfolio Contact</h1>
    <p style="margin: 10px 0 0 0; opacity: 0.9;">ML/Data Science Opportunity</p>
  </div>
  
  <div style="background: #f7f7f7; padding: 30px; border-radius: 0 0 10px 10px;">
    <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
      <h3 style="color: #667eea; margin-top: 0;">📋 Contact Information</h3>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
    </div>
    
    <div style="background: white; padding: 20px; border-radius: 8px;">
      <h3 style="color: #667eea; margin-top: 0;">💬 Message</h3>
      <div style="background: #f9f9f9; padding: 15px; border-left: 4px solid #667eea; border-radius: 4px;">
        ${message.replace(/\n/g, '<br>')}
      </div>
    </div>
  </div>
</body>
</html>
`;

const autoReplyTemplate = (name) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Thank You for Reaching Out</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
    <h1 style="margin: 0;">Thank You for Reaching Out!</h1>
    <p style="margin: 10px 0 0 0; opacity: 0.9;">Zaid Shaikh - Data Scientist & ML Engineer</p>
  </div>
  
  <div style="background: #f7f7f7; padding: 30px;">
    <div style="background: white; padding: 25px; border-radius: 8px;">
      <p>Dear ${name},</p>
      
      <p>Thank you for contacting me through my portfolio. I've received your message and appreciate your interest in my work.</p>
      
      <div style="background: #f0f4ff; padding: 15px; border-radius: 8px; margin: 20px 0;">
        <h3 style="color: #667eea; margin-top: 0;">📅 Expected Response Time:</h3>
        <ul>
          <li>Job Opportunities: Within 24 hours</li>
          <li>Project Collaborations: 24-48 hours</li>
          <li>General Inquiries: 2-3 business days</li>
        </ul>
      </div>
      
      <h3 style="color: #667eea;">🚀 Explore My Production ML Systems:</h3>
      
      <p><strong>🛡️ Fraud Detection:</strong> 99.2% accuracy, $1.6M+ saved<br>
      <strong>📈 Portfolio Optimizer:</strong> $5M ARR capability<br>
      <strong>📊 Churn Prediction:</strong> 40% reduction, $487K saved</p>
      
      <div style="margin-top: 25px; padding: 20px; background: #f9f9f9; border-radius: 8px; text-align: center;">
        <a href="https://github.com/DiazSk" style="color: #667eea; text-decoration: none; margin: 0 10px;">GitHub</a> |
        <a href="https://linkedin.com/in/zaidshaikhscientist" style="color: #667eea; text-decoration: none; margin: 0 10px;">LinkedIn</a>
      </div>
      
      <p style="margin-top: 25px;">
        Best regards,<br>
        <strong>Zaid Shaikh</strong><br>
        Data Scientist & ML Engineer
      </p>
    </div>
  </div>
</body>
</html>
`;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, message } = req.body;

  // Validate input
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    // Send notification email to yourself
    const notificationData = await resend.emails.send({
      from: 'Portfolio <onboarding@resend.dev>', // Use your verified domain
      to: ['zaid07sk@gmail.com'],
      reply_to: email,
      subject: `New Portfolio Contact from ${name}`,
      html: notificationTemplate(name, email, message),
    });

    // Send auto-reply to the visitor
    const autoReplyData = await resend.emails.send({
      from: 'Zaid Shaikh <onboarding@resend.dev>', // Use your verified domain
      to: [email],
      reply_to: 'zaid07sk@gmail.com',
      subject: 'Thank you for reaching out - Zaid Shaikh',
      html: autoReplyTemplate(name),
    });

    console.log('Emails sent:', { notificationData, autoReplyData });

    res.status(200).json({ 
      success: true, 
      message: 'Emails sent successfully',
      data: { notificationData, autoReplyData }
    });

  } catch (error) {
    console.error('Resend Error:', error);
    res.status(500).json({ 
      error: 'Failed to send email', 
      details: error.message 
    });
  }
}