export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Terms & Conditions</h1>
        <p className="text-gray-500 mb-8">Last updated: {new Date().toLocaleDateString()}</p>

        <div className="space-y-6 text-gray-600">
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">1. Acceptance of Terms</h2>
            <p>By accessing and using BookStore website, you agree to be bound by these Terms & Conditions. If you do not agree with any part of these terms, please do not use our website.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">2. Account Registration</h2>
            <p>To make purchases, you must create an account with accurate and complete information. You are responsible for maintaining the confidentiality of your account credentials and for all activities under your account.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">3. Orders and Payments</h2>
            <p>All orders are subject to acceptance and availability. We reserve the right to refuse or cancel any order for any reason, including but not limited to:</p>
            <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
              <li>Product availability issues</li>
              <li>Errors in pricing or product information</li>
              <li>Suspected fraudulent activity</li>
              <li>Payment processing failures</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">4. Pricing and Availability</h2>
            <p>All prices are listed in USD and are subject to change without notice. We strive to display accurate product information, but errors may occur. If a product is listed at an incorrect price, we reserve the right to cancel or refuse orders.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">5. Shipping and Delivery</h2>
            <p>Delivery times are estimates and not guaranteed. We are not responsible for delays caused by shipping carriers, customs, or weather conditions. Risk of loss passes to you upon delivery.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">6. Returns and Refunds</h2>
            <p>We accept returns within 30 days of purchase for unused products in original condition. Refunds will be processed to the original payment method within 7-10 business days after receiving the returned item.</p>
            <p className="mt-2">To initiate a return, contact our customer support at support@bookstore.com.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">7. Intellectual Property</h2>
            <p>All content on this website, including text, images, logos, and software, is the property of BookStore and protected by copyright laws. You may not reproduce, distribute, or modify any content without our written permission.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">8. Limitation of Liability</h2>
            <p>To the maximum extent permitted by law, BookStore shall not be liable for any indirect, incidental, or consequential damages arising from your use of our website or products.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">9. Changes to Terms</h2>
            <p>We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting. Your continued use of the website constitutes acceptance of the modified terms.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">10. Contact Information</h2>
            <p>For questions about these Terms & Conditions, please contact us:</p>
            <p className="mt-2">Email: legal@bookstore.com</p>
            <p>Phone: +1 (555) 123-4567</p>
            <p>Address: 123 Book Street, New York, NY 10001</p>
          </section>
        </div>
      </div>
    </div>
  );
}