// // src/components/Email/EmailSender.jsx
// import React, { useState } from "react";

// const EmailSender = ({ setBotStatus }) => {
//   const [to, setTo] = useState("");
//   const [subject, setSubject] = useState("");
//   const [message, setMessage] = useState("");

//   const sendEmail = () => {
//     if (!to || !subject || !message) {
//       alert("Please fill in all fields!");
//       setBotStatus("Missing email fields. Please complete them.");
//       return;
//     }

//     // Simulate email send
//     alert(`📧 Email Sent!\n\nTo: ${to}\nSubject: ${subject}\n\n${message}`);
//     setBotStatus(`Email sent to ${to}`);
//     clearForm();
//   };

//   const clearForm = () => {
//     setTo("");
//     setSubject("");
//     setMessage("");
//     setBotStatus("Email form cleared.");
//   };

//   return (
//     <div className="relative bg-gradient-to-br from-amber-100/60 via-orange-100/40 to-pink-100/30 border border-amber-300/40 rounded-3xl p-10 shadow-2xl max-w-2xl mx-auto backdrop-blur-xl overflow-hidden">
//       {/* Decorative background icon */}
//       <div className="absolute -top-8 -right-8 w-32 h-32 bg-gradient-to-br from-amber-200/40 to-orange-300/30 rounded-full blur-2xl z-0" />
//       <h2 className="text-3xl font-extrabold text-amber-600 mb-8 flex items-center gap-2 z-10 relative drop-shadow-lg">
//         <span className="bg-amber-100/80 rounded-full p-2 shadow-md">📧</span> Send Email
//       </h2>
//       <div className="mb-6 z-10 relative">
//         <label className="block text-orange-700 mb-2 font-semibold">To</label>
//         <input
//           type="email"
//           className="w-full p-3 bg-white/60 text-orange-900 border border-amber-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 transition-all placeholder-orange-400/70 shadow-inner"
//           placeholder="recipient@example.com"
//           value={to}
//           onChange={(e) => setTo(e.target.value)}
//         />
//       </div>
//       <div className="mb-6 z-10 relative">
//         <label className="block text-orange-700 mb-2 font-semibold">Subject</label>
//         <input
//           type="text"
//           className="w-full p-3 bg-white/60 text-orange-900 border border-amber-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 transition-all placeholder-orange-400/70 shadow-inner"
//           placeholder="Email subject"
//           value={subject}
//           onChange={(e) => setSubject(e.target.value)}
//         />
//       </div>
//       <div className="mb-8 z-10 relative">
//         <label className="block text-orange-700 mb-2 font-semibold">Message</label>
//         <textarea
//           className="w-full p-3 bg-white/60 text-orange-900 border border-amber-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 transition-all placeholder-orange-400/70 shadow-inner"
//           placeholder="Type your message here..."
//           rows={5}
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//         />
//       </div>
//       <div className="flex gap-4 z-10 relative">
//         <button
//           className="flex-1 px-5 py-3 rounded-xl bg-gradient-to-r from-amber-400 via-orange-400 to-pink-400 text-white font-bold shadow-lg hover:shadow-orange-400/40 hover:scale-105 transition-all duration-300 ring-2 ring-amber-200/40 hover:ring-4 hover:ring-orange-300/40"
//           onClick={sendEmail}
//         >
//           📤 Send Email
//         </button>
//         <button
//           className="flex-1 px-5 py-3 rounded-xl bg-gradient-to-r from-pink-300 via-orange-200 to-amber-200 text-orange-900 font-bold shadow-lg hover:shadow-pink-300/40 hover:scale-105 transition-all duration-300 ring-2 ring-pink-100/40 hover:ring-4 hover:ring-orange-200/40"
//           onClick={clearForm}
//         >
//           🗑️ Clear
//         </button>
//       </div>
//     </div>
//   );
// };

// export default EmailSender;



// import React, { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import { Mail, Send, Paperclip, User, AtSign, FileText, Clock } from 'lucide-react';

// const SendEmail = ({ voiceCommand }) => {
//   const [emailData, setEmailData] = useState({
//     to: '',
//     cc: '',
//     bcc: '',
//     subject: '',
//     body: '',
//     priority: 'normal'
//   });
//   const [isSending, setIsSending] = useState(false);
//   const [sentEmails, setSentEmails] = useState([]);
//   const [attachments, setAttachments] = useState([]);

//   useEffect(() => {
//     if (voiceCommand && voiceCommand.trim()) {
//       processVoiceCommand(voiceCommand);
//     }
//   }, [voiceCommand]);

//   const processVoiceCommand = (command) => {
//     const lowerCommand = command.toLowerCase();
    
//     if (lowerCommand.includes('send email to')) {
//       const emailMatch = command.match(/send email to (.+?)(?:\s|$)/i);
//       if (emailMatch) {
//         setEmailData(prev => ({ ...prev, to: emailMatch[1] }));
//       }
//     } else if (lowerCommand.includes('subject')) {
//       const subjectMatch = command.match(/subject (.+)/i);
//       if (subjectMatch) {
//         setEmailData(prev => ({ ...prev, subject: subjectMatch[1] }));
//       }
//     } else if (lowerCommand.includes('body') || lowerCommand.includes('message')) {
//       const bodyMatch = command.match(/(?:body|message) (.+)/i);
//       if (bodyMatch) {
//         setEmailData(prev => ({ ...prev, body: bodyMatch[1] }));
//       }
//     }
//   };

//   const handleSendEmail = async () => {
//     if (!emailData.to || !emailData.subject || !emailData.body) return;

//     setIsSending(true);
    
//     // Simulate sending email
//     await new Promise(resolve => setTimeout(resolve, 2000));
    
//     const newEmail = {
//       id: Date.now(),
//       ...emailData,
//       timestamp: new Date(),
//       status: 'sent'
//     };

//     setSentEmails(prev => [newEmail, ...prev]);
//     setEmailData({
//       to: '',
//       cc: '',
//       bcc: '',
//       subject: '',
//       body: '',
//       priority: 'normal'
//     });
//     setAttachments([]);
//     setIsSending(false);
//   };

//   const quickTemplates = [
//     {
//       name: 'Meeting Request',
//       subject: 'Meeting Request - [Topic]',
//       body: 'Hi,\n\nI would like to schedule a meeting to discuss [topic]. Please let me know your availability.\n\nBest regards,'
//     },
//     {
//       name: 'Follow Up',
//       subject: 'Following up on our conversation',
//       body: 'Hi,\n\nI wanted to follow up on our recent conversation about [topic]. Please let me know if you need any additional information.\n\nBest regards,'
//     },
//     {
//       name: 'Thank You',
//       subject: 'Thank you',
//       body: 'Hi,\n\nThank you for [reason]. I really appreciate your time and assistance.\n\nBest regards,'
//     }
//   ];

//   const useTemplate = (template) => {
//     setEmailData(prev => ({
//       ...prev,
//       subject: template.subject,
//       body: template.body
//     }));
//   };

//   return (
//     <div className="h-full space-y-6">
//       {/* Header */}
//       <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm rounded-2xl border border-blue-500/30 p-6">
//         <div className="flex items-center space-x-3 mb-4">
//           <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
//             <Mail className="w-6 h-6 text-white" />
//           </div>
//           <div>
//             <h2 className="text-2xl font-bold text-white">Send Email</h2>
//             <p className="text-blue-300">Compose and send emails with voice commands</p>
//           </div>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         {/* Email Composer */}
//         <div className="lg:col-span-2 space-y-4">
//           {/* Recipients */}
//           <div className="bg-black/50 backdrop-blur-sm rounded-2xl border border-purple-500/30 p-6">
//             <h3 className="text-white font-semibold mb-4 flex items-center">
//               <User className="w-5 h-5 mr-2 text-purple-400" />
//               Recipients
//             </h3>
            
//             <div className="space-y-3">
//               <div>
//                 <label className="block text-purple-300 text-sm mb-1">To *</label>
//                 <input
//                   type="email"
//                   value={emailData.to}
//                   onChange={(e) => setEmailData(prev => ({ ...prev, to: e.target.value }))}
//                   placeholder="recipient@example.com"
//                   className="w-full bg-black/30 border border-purple-500/30 rounded-xl p-3 text-white placeholder-purple-300 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20"
//                 />
//               </div>
              
//               <div className="grid grid-cols-2 gap-3">
//                 <div>
//                   <label className="block text-purple-300 text-sm mb-1">CC</label>
//                   <input
//                     type="email"
//                     value={emailData.cc}
//                     onChange={(e) => setEmailData(prev => ({ ...prev, cc: e.target.value }))}
//                     placeholder="cc@example.com"
//                     className="w-full bg-black/30 border border-purple-500/30 rounded-xl p-3 text-white placeholder-purple-300 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20"
//                   />
//                 </div>
                
//                 <div>
//                   <label className="block text-purple-300 text-sm mb-1">BCC</label>
//                   <input
//                     type="email"
//                     value={emailData.bcc}
//                     onChange={(e) => setEmailData(prev => ({ ...prev, bcc: e.target.value }))}
//                     placeholder="bcc@example.com"
//                     className="w-full bg-black/30 border border-purple-500/30 rounded-xl p-3 text-white placeholder-purple-300 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20"
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Subject and Priority */}
//           <div className="bg-black/50 backdrop-blur-sm rounded-2xl border border-purple-500/30 p-6">
//             <div className="grid grid-cols-3 gap-4">
//               <div className="col-span-2">
//                 <label className="block text-purple-300 text-sm mb-1">Subject *</label>
//                 <input
//                   type="text"
//                   value={emailData.subject}
//                   onChange={(e) => setEmailData(prev => ({ ...prev, subject: e.target.value }))}
//                   placeholder="Email subject"
//                   className="w-full bg-black/30 border border-purple-500/30 rounded-xl p-3 text-white placeholder-purple-300 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20"
//                 />
//               </div>
              
//               <div>
//                 <label className="block text-purple-300 text-sm mb-1">Priority</label>
//                 <select
//                   value={emailData.priority}
//                   onChange={(e) => setEmailData(prev => ({ ...prev, priority: e.target.value }))}
//                   className="w-full bg-black/30 border border-purple-500/30 rounded-xl p-3 text-white focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20"
//                 >
//                   <option value="low">Low</option>
//                   <option value="normal">Normal</option>
//                   <option value="high">High</option>
//                 </select>
//               </div>
//             </div>
//           </div>

//           {/* Email Body */}
//           <div className="bg-black/50 backdrop-blur-sm rounded-2xl border border-purple-500/30 p-6">
//             <div className="flex items-center justify-between mb-4">
//               <h3 className="text-white font-semibold flex items-center">
//                 <FileText className="w-5 h-5 mr-2 text-purple-400" />
//                 Message
//               </h3>
//               <div className="flex items-center space-x-2">
//                 <button className="p-2 text-purple-300 hover:text-white hover:bg-purple-800/50 rounded-lg transition-colors">
//                   <Paperclip className="w-4 h-4" />
//                 </button>
//               </div>
//             </div>
            
//             <textarea
//               value={emailData.body}
//               onChange={(e) => setEmailData(prev => ({ ...prev, body: e.target.value }))}
//               placeholder="Type your message here..."
//               rows={12}
//               className="w-full bg-black/30 border border-purple-500/30 rounded-xl p-4 text-white placeholder-purple-300 resize-none focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20"
//             />
//           </div>

//           {/* Send Button */}
//           <motion.button
//             onClick={handleSendEmail}
//             disabled={!emailData.to || !emailData.subject || !emailData.body || isSending}
//             className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white py-4 rounded-xl font-semibold flex items-center justify-center space-x-2 transition-all duration-200"
//             whileHover={{ scale: 1.02 }}
//             whileTap={{ scale: 0.98 }}
//           >
//             {isSending ? (
//               <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
//             ) : (
//               <Send className="w-5 h-5" />
//             )}
//             <span>{isSending ? 'Sending...' : 'Send Email'}</span>
//           </motion.button>
//         </div>

//         {/* Sidebar */}
//         <div className="space-y-4">
//           {/* Quick Templates */}
//           <div className="bg-black/50 backdrop-blur-sm rounded-2xl border border-purple-500/30 p-6">
//             <h3 className="text-white font-semibold mb-4">Quick Templates</h3>
//             <div className="space-y-2">
//               {quickTemplates.map((template, index) => (
//                 <button
//                   key={index}
//                   onClick={() => useTemplate(template)}
//                   className="w-full text-left p-3 bg-purple-800/20 hover:bg-purple-700/30 border border-purple-600/30 rounded-lg text-purple-300 hover:text-white transition-colors"
//                 >
//                   <div className="font-medium">{template.name}</div>
//                   <div className="text-xs opacity-70 truncate">{template.subject}</div>
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Sent Emails */}
//           <div className="bg-black/50 backdrop-blur-sm rounded-2xl border border-purple-500/30 p-6">
//             <h3 className="text-white font-semibold mb-4 flex items-center">
//               <Clock className="w-5 h-5 mr-2 text-purple-400" />
//               Recent Sent
//             </h3>
            
//             {sentEmails.length === 0 ? (
//               <div className="text-center py-6">
//                 <div className="w-12 h-12 bg-purple-800/30 rounded-full flex items-center justify-center mx-auto mb-3">
//                   <Mail className="w-6 h-6 text-purple-400" />
//                 </div>
//                 <p className="text-purple-300 text-sm">No emails sent yet</p>
//               </div>
//             ) : (
//               <div className="space-y-3 max-h-60 overflow-y-auto">
//                 {sentEmails.slice(0, 5).map((email) => (
//                   <motion.div
//                     key={email.id}
//                     initial={{ opacity: 0, x: 20 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     className="bg-purple-900/20 border border-purple-500/20 rounded-lg p-3"
//                   >
//                     <div className="text-white text-sm font-medium truncate">{email.subject}</div>
//                     <div className="text-purple-300 text-xs truncate">To: {email.to}</div>
//                     <div className="text-purple-400 text-xs mt-1">
//                       {email.timestamp.toLocaleDateString()} {email.timestamp.toLocaleTimeString()}
//                     </div>
//                   </motion.div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SendEmail;























// import React, { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import emailjs from 'emailjs-com';
// import { Mail, Send, FileText, User, Clock } from 'lucide-react';

// const SendEmail = ({ voiceCommand }) => {
//   const [emailData, setEmailData] = useState({
//     to: '',
//     cc: '',
//     bcc: '',
//     subject: '',
//     body: '',
//     priority: 'normal'
//   });
//   const [isSending, setIsSending] = useState(false);
//   const [sentEmails, setSentEmails] = useState([]);

//   useEffect(() => {
//     if (voiceCommand && voiceCommand.trim()) {
//       processVoiceCommand(voiceCommand);
//     }
//   }, [voiceCommand]);

//   const processVoiceCommand = (command) => {
//     const lower = command.toLowerCase();

//     if (lower.includes('send email to')) {
//       const match = command.match(/send email to (.+?)(?:\s|$)/i);
//       if (match) setEmailData(prev => ({ ...prev, to: match[1] }));
//     }
//     if (lower.includes('subject')) {
//       const match = command.match(/subject (.+)/i);
//       if (match) setEmailData(prev => ({ ...prev, subject: match[1] }));
//     }
//     if (lower.includes('body') || lower.includes('message')) {
//       const match = command.match(/(?:body|message) (.+)/i);
//       if (match) setEmailData(prev => ({ ...prev, body: match[1] }));
//     }
//   };

//   const handleSendEmail = async () => {
//     if (!emailData.to || !emailData.subject || !emailData.body) {
//       alert('To, Subject, and Body are required');
//       return;
//     }

//     setIsSending(true);

//     const templateParams = {
//       from_name: 'Aura Assistant',
//       to_email: emailData.to,
//       cc_email: emailData.cc,
//       bcc_email: emailData.bcc,
//       subject: emailData.subject,
//       message: emailData.body,
//       priority: emailData.priority,
//     };

//     try {
//       await emailjs.send(
//         'service_ru0gfim',
//         'template_g89bnel',
//         templateParams,
//         'Sn7lu72SQZFPFJs6-'
//       );

//       const newEmail = {
//         id: Date.now(),
//         ...emailData,
//         timestamp: new Date(),
//         status: 'sent'
//       };

//       setSentEmails(prev => [newEmail, ...prev]);
//       setEmailData({
//         to: '',
//         cc: '',
//         bcc: '',
//         subject: '',
//         body: '',
//         priority: 'normal'
//       });

//       alert('✅ Email sent successfully!');
//     } catch (err) {
//       console.error('Failed to send email:', err);
//       alert('❌ Failed to send email. Check console.');
//     }

//     setIsSending(false);
//   };

//   const quickTemplates = [
//     {
//       name: 'Meeting Request',
//       subject: 'Meeting Request - [Topic]',
//       body: 'Hi,\n\nI would like to schedule a meeting to discuss [topic]. Please let me know your availability.\n\nBest regards,'
//     },
//     {
//       name: 'Follow Up',
//       subject: 'Following up on our conversation',
//       body: 'Hi,\n\nI wanted to follow up on our recent conversation about [topic].\n\nBest regards,'
//     },
//     {
//       name: 'Thank You',
//       subject: 'Thank you',
//       body: 'Hi,\n\nThank you for [reason]. I really appreciate your help.\n\nBest regards,'
//     }
//   ];

//   const useTemplate = (template) => {
//     setEmailData(prev => ({
//       ...prev,
//       subject: template.subject,
//       body: template.body
//     }));
//   };

//   return (
//     <div className="h-full space-y-6">
//       {/* Header */}
//       <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm rounded-2xl border border-blue-500/30 p-6">
//         <div className="flex items-center space-x-3 mb-4">
//           <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
//             <Mail className="w-6 h-6 text-white" />
//           </div>
//           <div>
//             <h2 className="text-2xl font-bold text-white">Send Email</h2>
//             <p className="text-blue-300">Compose and send emails with voice commands</p>
//           </div>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         {/* Email Composer */}
//         <div className="lg:col-span-2 space-y-4">
//           {/* Recipients */}
//           <div className="bg-black/50 backdrop-blur-sm rounded-2xl border border-purple-500/30 p-6">
//             <h3 className="text-white font-semibold mb-4 flex items-center">
//               <User className="w-5 h-5 mr-2 text-purple-400" />
//               Recipients
//             </h3>

//             <div className="space-y-3">
//               <div>
//                 <label className="block text-purple-300 text-sm mb-1">To *</label>
//                 <input
//                   type="email"
//                   value={emailData.to}
//                   onChange={(e) => setEmailData(prev => ({ ...prev, to: e.target.value }))}
//                   placeholder="recipient@example.com"
//                   className="inputStyle"
//                 />
//               </div>

//               <div className="grid grid-cols-2 gap-3">
//                 <div>
//                   <label className="block text-purple-300 text-sm mb-1">CC</label>
//                   <input
//                     type="email"
//                     value={emailData.cc}
//                     onChange={(e) => setEmailData(prev => ({ ...prev, cc: e.target.value }))}
//                     placeholder="cc@example.com"
//                     className="inputStyle"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-purple-300 text-sm mb-1">BCC</label>
//                   <input
//                     type="email"
//                     value={emailData.bcc}
//                     onChange={(e) => setEmailData(prev => ({ ...prev, bcc: e.target.value }))}
//                     placeholder="bcc@example.com"
//                     className="inputStyle"
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Subject and Priority */}
//           <div className="bg-black/50 backdrop-blur-sm rounded-2xl border border-purple-500/30 p-6">
//             <div className="grid grid-cols-3 gap-4">
//               <div className="col-span-2">
//                 <label className="block text-purple-300 text-sm mb-1">Subject *</label>
//                 <input
//                   type="text"
//                   value={emailData.subject}
//                   onChange={(e) => setEmailData(prev => ({ ...prev, subject: e.target.value }))}
//                   placeholder="Email subject"
//                   className="inputStyle"
//                 />
//               </div>

//               <div>
//                 <label className="block text-purple-300 text-sm mb-1">Priority</label>
//                 <select
//                   value={emailData.priority}
//                   onChange={(e) => setEmailData(prev => ({ ...prev, priority: e.target.value }))}
//                   className="inputStyle"
//                 >
//                   <option value="low">Low</option>
//                   <option value="normal">Normal</option>
//                   <option value="high">High</option>
//                 </select>
//               </div>
//             </div>
//           </div>

//           {/* Body */}
//           <div className="bg-black/50 backdrop-blur-sm rounded-2xl border border-purple-500/30 p-6">
//             <h3 className="text-white font-semibold mb-4 flex items-center">
//               <FileText className="w-5 h-5 mr-2 text-purple-400" />
//               Message
//             </h3>
//             <textarea
//               value={emailData.body}
//               onChange={(e) => setEmailData(prev => ({ ...prev, body: e.target.value }))}
//               placeholder="Type your message here..."
//               rows={10}
//               className="inputStyle resize-none"
//             />
//           </div>

//           {/* Send Button */}
//           <motion.button
//             onClick={handleSendEmail}
//             disabled={!emailData.to || !emailData.subject || !emailData.body || isSending}
//             className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white py-4 rounded-xl font-semibold flex items-center justify-center space-x-2 transition-all duration-200"
//             whileHover={{ scale: 1.02 }}
//             whileTap={{ scale: 0.98 }}
//           >
//             {isSending ? (
//               <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
//             ) : (
//               <Send className="w-5 h-5" />
//             )}
//             <span>{isSending ? 'Sending...' : 'Send Email'}</span>
//           </motion.button>
//         </div>

//         {/* Sidebar */}
//         <div className="space-y-4">
//           {/* Quick Templates */}
//           <div className="bg-black/50 backdrop-blur-sm rounded-2xl border border-purple-500/30 p-6">
//             <h3 className="text-white font-semibold mb-4">Quick Templates</h3>
//             <div className="space-y-2">
//               {quickTemplates.map((template, index) => (
//                 <button
//                   key={index}
//                   onClick={() => useTemplate(template)}
//                   className="w-full text-left p-3 bg-purple-800/20 hover:bg-purple-700/30 border border-purple-600/30 rounded-lg text-purple-300 hover:text-white transition-colors"
//                 >
//                   <div className="font-medium">{template.name}</div>
//                   <div className="text-xs opacity-70 truncate">{template.subject}</div>
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Sent Emails */}
//           <div className="bg-black/50 backdrop-blur-sm rounded-2xl border border-purple-500/30 p-6">
//             <h3 className="text-white font-semibold mb-4 flex items-center">
//               <Clock className="w-5 h-5 mr-2 text-purple-400" />
//               Recent Sent
//             </h3>
//             {sentEmails.length === 0 ? (
//               <div className="text-center py-6">
//                 <div className="w-12 h-12 bg-purple-800/30 rounded-full flex items-center justify-center mx-auto mb-3">
//                   <Mail className="w-6 h-6 text-purple-400" />
//                 </div>
//                 <p className="text-purple-300 text-sm">No emails sent yet</p>
//               </div>
//             ) : (
//               <div className="space-y-3 max-h-60 overflow-y-auto">
//                 {sentEmails.map((email) => (
//                   <motion.div
//                     key={email.id}
//                     initial={{ opacity: 0, x: 20 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     className="bg-purple-900/20 border border-purple-500/20 rounded-lg p-3"
//                   >
//                     <div className="text-white text-sm font-medium truncate">{email.subject}</div>
//                     <div className="text-purple-300 text-xs truncate">To: {email.to}</div>
//                     <div className="text-purple-400 text-xs mt-1">
//                       {email.timestamp.toLocaleDateString()} {email.timestamp.toLocaleTimeString()}
//                     </div>
//                   </motion.div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SendEmail;










import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import emailjs from 'emailjs-com';
import { Mail, Send, FileText, User, Clock } from 'lucide-react';

const SendEmail = ({ voiceCommand }) => {
  const [emailData, setEmailData] = useState({
    from: '',
    to: '',
    cc: '',
    bcc: '',
    subject: '',
    body: '',
    priority: 'normal'
  });
  const [isSending, setIsSending] = useState(false);
  const [sentEmails, setSentEmails] = useState([]);

  // Process voice commands (optional)
  useEffect(() => {
    if (voiceCommand && voiceCommand.trim()) {
      processVoiceCommand(voiceCommand);
    }
  }, [voiceCommand]);

  const processVoiceCommand = (command) => {
    const lower = command.toLowerCase();

    if (lower.includes('send email to')) {
      const match = command.match(/send email to (.+?)(?:\s|$)/i);
      if (match) setEmailData(prev => ({ ...prev, to: match[1] }));
    }
    if (lower.includes('subject')) {
      const match = command.match(/subject (.+)/i);
      if (match) setEmailData(prev => ({ ...prev, subject: match[1] }));
    }
    if (lower.includes('body') || lower.includes('message')) {
      const match = command.match(/(?:body|message) (.+)/i);
      if (match) setEmailData(prev => ({ ...prev, body: match[1] }));
    }
  };

  const handleSendEmail = async () => {
  if (!emailData.from || !emailData.to || !emailData.subject || !emailData.body) {
    alert('From, To, Subject, and Body are required');
    return;
  }

  setIsSending(true);

  try {
    const response = await fetch('http://localhost:5000/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(emailData)
    });

    if (response.ok) {
      const newEmail = {
        id: Date.now(),
        ...emailData,
        timestamp: new Date(),
        status: 'sent'
      };

      setSentEmails(prev => [newEmail, ...prev]);
      setEmailData({
        from: '',
        to: '',
        cc: '',
        bcc: '',
        subject: '',
        body: '',
        priority: 'normal'
      });

      alert('✅ Email sent successfully!');
    } else {
      alert('❌ Failed to send email. Check backend.');
    }
  } catch (error) {
    console.error('❌ Error sending email:', error);
    alert('❌ Failed to send email.');
  }

  setIsSending(false);
};


  const quickTemplates = [
    {
      name: 'Meeting Request',
      subject: 'Meeting Request - [Topic]',
      body: 'Hi,\n\nI would like to schedule a meeting to discuss [topic]. Please let me know your availability.\n\nBest regards,'
    },
    {
      name: 'Follow Up',
      subject: 'Following up on our conversation',
      body: 'Hi,\n\nI wanted to follow up on our recent conversation about [topic].\n\nBest regards,'
    },
    {
      name: 'Thank You',
      subject: 'Thank you',
      body: 'Hi,\n\nThank you for [reason]. I really appreciate your help.\n\nBest regards,'
    }
  ];

  const useTemplate = (template) => {
    setEmailData(prev => ({
      ...prev,
      subject: template.subject,
      body: template.body
    }));
  };

  return (
    <div className="h-full space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm rounded-2xl border border-blue-500/30 p-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
            <Mail className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">Send Email</h2>
            <p className="text-blue-300">Compose and send emails with voice commands</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Email Composer */}
        <div className="lg:col-span-2 space-y-4">
          {/* Recipients */}
          <div className="bg-black/50 backdrop-blur-sm rounded-2xl border border-purple-500/30 p-6">
            <h3 className="text-white font-semibold mb-4 flex items-center">
              <User className="w-5 h-5 mr-2 text-purple-400" />
              Recipients
            </h3>

            <div className="space-y-3">
              <div>
                <label className="block text-purple-300 text-sm mb-1">From (Sender Email) *</label>
                <input
                  type="email"
                  value={emailData.from}
                  onChange={(e) => setEmailData(prev => ({ ...prev, from: e.target.value }))}
                  placeholder="sender@example.com"
                  className="inputStyle"
                />
              </div>

              <div>
                <label className="block text-purple-300 text-sm mb-1">To *</label>
                <input
                  type="email"
                  value={emailData.to}
                  onChange={(e) => setEmailData(prev => ({ ...prev, to: e.target.value }))}
                  placeholder="recipient@example.com"
                  className="inputStyle"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-purple-300 text-sm mb-1">CC</label>
                  <input
                    type="email"
                    value={emailData.cc}
                    onChange={(e) => setEmailData(prev => ({ ...prev, cc: e.target.value }))}
                    placeholder="cc@example.com"
                    className="inputStyle"
                  />
                </div>

                <div>
                  <label className="block text-purple-300 text-sm mb-1">BCC</label>
                  <input
                    type="email"
                    value={emailData.bcc}
                    onChange={(e) => setEmailData(prev => ({ ...prev, bcc: e.target.value }))}
                    placeholder="bcc@example.com"
                    className="inputStyle"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Subject and Priority */}
          <div className="bg-black/50 backdrop-blur-sm rounded-2xl border border-purple-500/30 p-6">
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-2">
                <label className="block text-purple-300 text-sm mb-1">Subject *</label>
                <input
                  type="text"
                  value={emailData.subject}
                  onChange={(e) => setEmailData(prev => ({ ...prev, subject: e.target.value }))}
                  placeholder="Email subject"
                  className="inputStyle"
                />
              </div>

              <div>
                <label className="block text-purple-300 text-sm mb-1">Priority</label>
                <select
                  value={emailData.priority}
                  onChange={(e) => setEmailData(prev => ({ ...prev, priority: e.target.value }))}
                  className="inputStyle"
                >
                  <option value="low">Low</option>
                  <option value="normal">Normal</option>
                  <option value="high">High</option>
                </select>
              </div>
            </div>
          </div>

          {/* Email Body */}
          <div className="bg-black/50 backdrop-blur-sm rounded-2xl border border-purple-500/30 p-6">
            <h3 className="text-white font-semibold mb-4 flex items-center">
              <FileText className="w-5 h-5 mr-2 text-purple-400" />
              Message
            </h3>
            <textarea
              value={emailData.body}
              onChange={(e) => setEmailData(prev => ({ ...prev, body: e.target.value }))}
              placeholder="Type your message here..."
              rows={10}
              className="inputStyle resize-none"
            />
          </div>

          {/* Send Button */}
          <motion.button
            onClick={handleSendEmail}
            disabled={!emailData.from || !emailData.to || !emailData.subject || !emailData.body || isSending}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white py-4 rounded-xl font-semibold flex items-center justify-center space-x-2 transition-all duration-200"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {isSending ? (
              <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <Send className="w-5 h-5" />
            )}
            <span>{isSending ? 'Sending...' : 'Send Email'}</span>
          </motion.button>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Quick Templates */}
          <div className="bg-black/50 backdrop-blur-sm rounded-2xl border border-purple-500/30 p-6">
            <h3 className="text-white font-semibold mb-4">Quick Templates</h3>
            <div className="space-y-2">
              {quickTemplates.map((template, index) => (
                <button
                  key={index}
                  onClick={() => useTemplate(template)}
                  className="w-full text-left p-3 bg-purple-800/20 hover:bg-purple-700/30 border border-purple-600/30 rounded-lg text-purple-300 hover:text-white transition-colors"
                >
                  <div className="font-medium">{template.name}</div>
                  <div className="text-xs opacity-70 truncate">{template.subject}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Sent Emails */}
          <div className="bg-black/50 backdrop-blur-sm rounded-2xl border border-purple-500/30 p-6">
            <h3 className="text-white font-semibold mb-4 flex items-center">
              <Clock className="w-5 h-5 mr-2 text-purple-400" />
              Recent Sent
            </h3>
            {sentEmails.length === 0 ? (
              <div className="text-center py-6">
                <div className="w-12 h-12 bg-purple-800/30 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Mail className="w-6 h-6 text-purple-400" />
                </div>
                <p className="text-purple-300 text-sm">No emails sent yet</p>
              </div>
            ) : (
              <div className="space-y-3 max-h-60 overflow-y-auto">
                {sentEmails.map((email) => (
                  <motion.div
                    key={email.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-purple-900/20 border border-purple-500/20 rounded-lg p-3"
                  >
                    <div className="text-white text-sm font-medium truncate">{email.subject}</div>
                    <div className="text-purple-300 text-xs truncate">To: {email.to}</div>
                    <div className="text-purple-400 text-xs mt-1">
                      {email.timestamp.toLocaleDateString()} {email.timestamp.toLocaleTimeString()}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SendEmail;
