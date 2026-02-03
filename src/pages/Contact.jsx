// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { ArrowLeft, Mail, Phone, MapPin, Send, Loader2 } from 'lucide-react';
// import emailjs from '@emailjs/browser';

// const Contact = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     subject: '',
//     message: '',
//   });
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [submitStatus, setSubmitStatus] = useState(null);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);
//     setSubmitStatus(null);

//     // Validate form
//     if (!formData.name || !formData.email || !formData.message) {
//       setSubmitStatus({ type: 'error', message: 'Please fill in all required fields' });
//       setIsSubmitting(false);
//       return;
//     }

//     // Get EmailJS configuration from environment variables
//     const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
//     const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
//     const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

//     // Check if EmailJS is configured
//     if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
//       // Fallback: Save to localStorage if EmailJS is not configured
//       try {
//         const submissions = JSON.parse(localStorage.getItem('contactSubmissions') || '[]');
//         submissions.push({
//           ...formData,
//           timestamp: new Date().toISOString(),
//         });
//         localStorage.setItem('contactSubmissions', JSON.stringify(submissions));

//         setSubmitStatus({
//           type: 'success',
//           message: 'Thank you for contacting us! We will get back to you soon. (Note: EmailJS not configured - message saved locally)',
//         });

//         setFormData({
//           name: '',
//           email: '',
//           phone: '',
//           subject: '',
//           message: '',
//         });
//       } catch (error) {
//         setSubmitStatus({
//           type: 'error',
//           message: 'Something went wrong. Please try again later.',
//         });
//       } finally {
//         setIsSubmitting(false);
//       }
//       return;
//     }

//     // Send email using EmailJS
//     try {
//       const templateParams = {
//         from_name: formData.name,
//         from_email: formData.email,
//         phone: formData.phone || 'Not provided',
//         subject: formData.subject || 'No subject',
//         message: formData.message,
//         to_name: 'Eduromɔ-naa Team',
//       };

//       await emailjs.send(
//         EMAILJS_SERVICE_ID,
//         EMAILJS_TEMPLATE_ID,
//         templateParams,
//         EMAILJS_PUBLIC_KEY
//       );

//       setSubmitStatus({
//         type: 'success',
//         message: 'Thank you for contacting us! We will get back to you soon.',
//       });

//       // Reset form
//       setFormData({
//         name: '',
//         email: '',
//         phone: '',
//         subject: '',
//         message: '',
//       });
//     } catch (error) {
//       console.error('EmailJS error:', error);
//       setSubmitStatus({
//         type: 'error',
//         message: 'Failed to send message. Please try again later or contact us directly.',
//       });
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="relative w-full min-h-screen py-16 sm:py-20">
//       <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
//         {/* Header */}
//         <div className="mb-8">
//           <button
//             onClick={() => navigate('/')}
//             className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors mb-4"
//           >
//             <ArrowLeft size={18} />
//             <span className="text-sm font-semibold">Back to Home</span>
//           </button>
//           <div className="mx-auto max-w-2xl text-center">
//             <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gray-500">
//               Get in Touch
//             </p>
//             <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
//               Contact Us
//             </h1>
//             <p className="mt-3 text-sm leading-relaxed text-gray-600 sm:text-base">
//               Have a question or want to place a custom order? We'd love to hear from you!
//             </p>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
//           {/* Contact Information */}
//           <div className="lg:col-span-1">
//             <div className="bg-white/85 rounded-2xl border border-black/10 shadow-sm backdrop-blur-sm p-6 sm:p-8">
//               <h2 className="text-xl font-bold text-gray-900 mb-6">Contact Information</h2>
              
//               <div className="space-y-6">
//                 {/* Phone */}
//                 <div className="flex items-start gap-4">
//                   <div className="flex-shrink-0 p-3 rounded-lg bg-[#ff9500]/10">
//                     <Phone size={20} className="text-[#ff9500]" />
//                   </div>
//                   <div>
//                     <h3 className="text-sm font-semibold text-gray-900 mb-1">Phone</h3>
//                     <a
//                       href="tel:+233501234567"
//                       className="text-sm text-gray-600 hover:text-[#ff9500] transition-colors"
//                     >
//                       +233 50 123 4567
//                     </a>
//                     <br />
//                     <a
//                       href="tel:+233241234567"
//                       className="text-sm text-gray-600 hover:text-[#ff9500] transition-colors"
//                     >
//                       +233 24 123 4567
//                     </a>
//                   </div>
//                 </div>

//                 {/* Email */}
//                 <div className="flex items-start gap-4">
//                   <div className="flex-shrink-0 p-3 rounded-lg bg-[#ff9500]/10">
//                     <Mail size={20} className="text-[#ff9500]" />
//                   </div>
//                   <div>
//                     <h3 className="text-sm font-semibold text-gray-900 mb-1">Email</h3>
//                     <a
//                       href="mailto:info@eduromonaa.com"
//                       className="text-sm text-gray-600 hover:text-[#ff9500] transition-colors break-all"
//                     >
//                       info@eduromonaa.com
//                     </a>
//                   </div>
//                 </div>

//                 {/* Location */}
//                 <div className="flex items-start gap-4">
//                   <div className="flex-shrink-0 p-3 rounded-lg bg-[#ff9500]/10">
//                     <MapPin size={20} className="text-[#ff9500]" />
//                   </div>
//                   <div>
//                     <h3 className="text-sm font-semibold text-gray-900 mb-1">Location</h3>
//                     <p className="text-sm text-gray-600 leading-relaxed">
//                       KAE DABI HOUSE<br />
//                       Teshie, Aboma<br />
//                       Accra, Ghana
//                     </p>
//                   </div>
//                 </div>
//               </div>

//               {/* Business Hours */}
//               <div className="mt-8 pt-8 border-t border-gray-200">
//                 <h3 className="text-sm font-semibold text-gray-900 mb-3">Business Hours</h3>
//                 <div className="space-y-2 text-sm text-gray-600">
//                   <div className="flex justify-between">
//                     <span>Monday - Friday</span>
//                     <span className="font-semibold">8:00 AM - 8:00 PM</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span>Saturday</span>
//                     <span className="font-semibold">9:00 AM - 6:00 PM</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span>Sunday</span>
//                     <span className="font-semibold">10:00 AM - 4:00 PM</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Contact Form */}
//           <div className="lg:col-span-2">
//             <div className="bg-white/85 rounded-2xl border border-black/10 shadow-sm backdrop-blur-sm p-6 sm:p-8">
//               <h2 className="text-xl font-bold text-gray-900 mb-6">Send us a Message</h2>

//               <form onSubmit={handleSubmit} className="space-y-6">
//                 {/* Name */}
//                 <div>
//                   <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-1.5">
//                     Full Name <span className="text-red-500">*</span>
//                   </label>
//                   <input
//                     type="text"
//                     id="name"
//                     name="name"
//                     value={formData.name}
//                     onChange={handleInputChange}
//                     required
//                     placeholder="Enter your full name"
//                     className="w-full rounded-lg border border-black/10 bg-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#ff9500] focus:border-transparent"
//                   />
//                 </div>

//                 {/* Email and Phone Row */}
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//                   <div>
//                     <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1.5">
//                       Email <span className="text-red-500">*</span>
//                     </label>
//                     <input
//                       type="email"
//                       id="email"
//                       name="email"
//                       value={formData.email}
//                       onChange={handleInputChange}
//                       required
//                       placeholder="your.email@example.com"
//                       className="w-full rounded-lg border border-black/10 bg-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#ff9500] focus:border-transparent"
//                     />
//                   </div>
//                   <div>
//                     <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-1.5">
//                       Phone Number
//                     </label>
//                     <input
//                       type="tel"
//                       id="phone"
//                       name="phone"
//                       value={formData.phone}
//                       onChange={handleInputChange}
//                       placeholder="050 123 4567"
//                       className="w-full rounded-lg border border-black/10 bg-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#ff9500] focus:border-transparent"
//                     />
//                   </div>
//                 </div>

//                 {/* Subject */}
//                 <div>
//                   <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-1.5">
//                     Subject
//                   </label>
//                   <input
//                     type="text"
//                     id="subject"
//                     name="subject"
//                     value={formData.subject}
//                     onChange={handleInputChange}
//                     placeholder="What is this regarding?"
//                     className="w-full rounded-lg border border-black/10 bg-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#ff9500] focus:border-transparent"
//                   />
//                 </div>

//                 {/* Message */}
//                 <div>
//                   <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-1.5">
//                     Message <span className="text-red-500">*</span>
//                   </label>
//                   <textarea
//                     id="message"
//                     name="message"
//                     value={formData.message}
//                     onChange={handleInputChange}
//                     required
//                     rows={6}
//                     placeholder="Tell us how we can help you..."
//                     className="w-full rounded-lg border border-black/10 bg-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#ff9500] focus:border-transparent resize-none"
//                   />
//                 </div>

//                 {/* Submit Status */}
//                 {submitStatus && (
//                   <div
//                     className={`p-4 rounded-lg ${
//                       submitStatus.type === 'success'
//                         ? 'bg-green-50 text-green-800 border border-green-200'
//                         : 'bg-red-50 text-red-800 border border-red-200'
//                     }`}
//                   >
//                     <p className="text-sm font-semibold">{submitStatus.message}</p>
//                   </div>
//                 )}

//                 {/* Submit Button */}
//                 <button
//                   type="submit"
//                   disabled={isSubmitting}
//                   className={`w-full rounded-lg bg-[#ff9500] px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#e68600] hover:shadow-md flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed ${
//                     isSubmitting ? 'cursor-wait' : ''
//                   }`}
//                 >
//                   {isSubmitting ? (
//                     <>
//                       <Loader2 size={18} className="animate-spin" />
//                       <span>Sending...</span>
//                     </>
//                   ) : (
//                     <>
//                       <Send size={18} />
//                       <span>Send Message</span>
//                     </>
//                   )}
//                 </button>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Contact;



import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Mail, Phone, MapPin, Send, Loader2 } from 'lucide-react';
import emailjs from '@emailjs/browser';

const Contact = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  // Initialize EmailJS on component mount
  useEffect(() => {
    const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
    
    if (EMAILJS_PUBLIC_KEY) {
      try {
        emailjs.init(EMAILJS_PUBLIC_KEY);
        console.log('EmailJS initialized successfully');
      } catch (error) {
        console.error('EmailJS initialization error:', error);
      }
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    // Validate form
    if (!formData.name || !formData.email || !formData.message) {
      setSubmitStatus({ type: 'error', message: 'Please fill in all required fields' });
      setIsSubmitting(false);
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setSubmitStatus({ type: 'error', message: 'Please enter a valid email address' });
      setIsSubmitting(false);
      return;
    }

    // Get EmailJS configuration from environment variables
    const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    // Check if EmailJS is configured
    if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
      console.warn('EmailJS not configured, saving to localStorage');
      
      // Fallback: Save to localStorage if EmailJS is not configured
      try {
        const submissions = JSON.parse(localStorage.getItem('contactSubmissions') || '[]');
        submissions.push({
          ...formData,
          timestamp: new Date().toISOString(),
        });
        localStorage.setItem('contactSubmissions', JSON.stringify(submissions));

        setSubmitStatus({
          type: 'success',
          message: 'Thank you for contacting us! We will get back to you soon.',
        });

        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: '',
        });
      } catch (error) {
        console.error('LocalStorage error:', error);
        setSubmitStatus({
          type: 'error',
          message: 'Something went wrong. Please try again later.',
        });
      } finally {
        setIsSubmitting(false);
      }
      return;
    }

    // Send email using EmailJS
    try {
      console.log('Sending email via EmailJS...');
      
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone || 'Not provided',
        subject: formData.subject || 'Contact Form Submission',
        message: formData.message,
        to_name: 'Eduromɔ-naa Team',
        reply_to: formData.email,
      };

      console.log('Template params:', templateParams);

      const response = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams
      );

      console.log('EmailJS response:', response);

      if (response.status === 200) {
        setSubmitStatus({
          type: 'success',
          message: 'Thank you for contacting us! We will get back to you soon.',
        });

        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: '',
        });

        // Also save to localStorage as backup
        try {
          const submissions = JSON.parse(localStorage.getItem('contactSubmissions') || '[]');
          submissions.push({
            ...formData,
            timestamp: new Date().toISOString(),
            emailSent: true,
          });
          localStorage.setItem('contactSubmissions', JSON.stringify(submissions));
        } catch (storageError) {
          console.warn('Failed to save to localStorage:', storageError);
        }
      } else {
        throw new Error(`EmailJS returned status ${response.status}`);
      }
    } catch (error) {
      console.error('EmailJS error:', error);
      
      // Provide more specific error messages
      let errorMessage = 'Failed to send message. ';
      
      if (error.text) {
        console.error('Error text:', error.text);
        errorMessage += 'Please try again later or contact us directly.';
      } else if (error.status === 412) {
        errorMessage += 'There was a configuration issue. Please contact us directly at info@eduromonaa.com';
      } else if (error.message) {
        errorMessage += error.message;
      } else {
        errorMessage += 'Please try again later.';
      }
      
      setSubmitStatus({
        type: 'error',
        message: errorMessage,
      });

      // Save to localStorage as fallback
      try {
        const submissions = JSON.parse(localStorage.getItem('contactSubmissions') || '[]');
        submissions.push({
          ...formData,
          timestamp: new Date().toISOString(),
          emailSent: false,
          error: error.message || 'Unknown error',
        });
        localStorage.setItem('contactSubmissions', JSON.stringify(submissions));
        console.log('Message saved to localStorage as fallback');
      } catch (storageError) {
        console.error('Failed to save to localStorage:', storageError);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative w-full min-h-screen py-16 sm:py-20">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors mb-4"
          >
            <ArrowLeft size={18} />
            <span className="text-sm font-semibold">Back to Home</span>
          </button>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gray-500">
              Get in Touch
            </p>
            <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Contact Us
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-gray-600 sm:text-base">
              Have a question or want to place a custom order? We'd love to hear from you!
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Contact Information */}
          <div className="lg:col-span-1">
            <div className="bg-white/85 rounded-2xl border border-black/10 shadow-sm backdrop-blur-sm p-6 sm:p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Contact Information</h2>
              
              <div className="space-y-6">
                {/* Phone */}
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 p-3 rounded-lg bg-[#ff9500]/10">
                    <Phone size={20} className="text-[#ff9500]" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 mb-1">Phone</h3>
                    <a
                      href="tel:+233501234567"
                      className="text-sm text-gray-600 hover:text-[#ff9500] transition-colors"
                    >
                      +233 50 123 4567
                    </a>
                    <br />
                    <a
                      href="tel:+233241234567"
                      className="text-sm text-gray-600 hover:text-[#ff9500] transition-colors"
                    >
                      +233 24 123 4567
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 p-3 rounded-lg bg-[#ff9500]/10">
                    <Mail size={20} className="text-[#ff9500]" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 mb-1">Email</h3>
                    <a
                      href="mailto:info@eduromonaa.com"
                      className="text-sm text-gray-600 hover:text-[#ff9500] transition-colors break-all"
                    >
                      info@eduromonaa.com
                    </a>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 p-3 rounded-lg bg-[#ff9500]/10">
                    <MapPin size={20} className="text-[#ff9500]" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 mb-1">Location</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      KAE DABI HOUSE<br />
                      Teshie, Aboma<br />
                      Accra, Ghana
                    </p>
                  </div>
                </div>
              </div>

              {/* Business Hours */}
              <div className="mt-8 pt-8 border-t border-gray-200">
                <h3 className="text-sm font-semibold text-gray-900 mb-3">Business Hours</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Monday - Friday</span>
                    <span className="font-semibold">8:00 AM - 8:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday</span>
                    <span className="font-semibold">9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday</span>
                    <span className="font-semibold">10:00 AM - 4:00 PM</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white/85 rounded-2xl border border-black/10 shadow-sm backdrop-blur-sm p-6 sm:p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Send us a Message</h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your full name"
                    className="w-full rounded-lg border border-black/10 bg-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#ff9500] focus:border-transparent"
                  />
                </div>

                {/* Email and Phone Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1.5">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      placeholder="your.email@example.com"
                      className="w-full rounded-lg border border-black/10 bg-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#ff9500] focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-1.5">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="050 123 4567"
                      className="w-full rounded-lg border border-black/10 bg-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#ff9500] focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="What is this regarding?"
                    className="w-full rounded-lg border border-black/10 bg-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#ff9500] focus:border-transparent"
                  />
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    placeholder="Tell us how we can help you..."
                    className="w-full rounded-lg border border-black/10 bg-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#ff9500] focus:border-transparent resize-none"
                  />
                </div>

                {/* Submit Status */}
                {submitStatus && (
                  <div
                    className={`p-4 rounded-lg ${
                      submitStatus.type === 'success'
                        ? 'bg-green-50 text-green-800 border border-green-200'
                        : 'bg-red-50 text-red-800 border border-red-200'
                    }`}
                  >
                    <p className="text-sm font-semibold">{submitStatus.message}</p>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full rounded-lg bg-[#ff9500] px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#e68600] hover:shadow-md flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed ${
                    isSubmitting ? 'cursor-wait' : ''
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;