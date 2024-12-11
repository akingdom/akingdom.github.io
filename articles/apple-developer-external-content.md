### **Promoting and Selling External Digital Content in Apple Apps** - December 2024

This document is intended to help provide clarity and comprehensiveness regarding Apple's requirements for promoting and selling external digital content within apps, based on the latest Apple Developer Program License Agreement, in a fair, accurate, and comprehensive manner:

#### **Promoting External Digital Content**

1. **Single Page Restriction**:
   - **Relevant Text**: "Apps can only promote external content on a single, dedicated page within the app."
   - **Clarification**: Promotions for external content, such as links to books, guides, subscription services, or third-party resources, must be confined to a single page within the app. This restriction ensures that promotions do not interfere with the app’s primary functionality or overwhelm the user experience.

2. **Internal Links Requirement**:
   - **Relevant Text**: "Apps must also provide internal App Store links for the same content."
   - **Clarification**:
     - **Definition of "App Store" in this Context**: "App Store" refers to the digital marketplace where apps and media content approved by Apple are distributed. The content in question does not necessarily need to be its own app—it can also be media (like an audiobook, guide, or movie) sold through a third-party app or as part of an app’s offerings on the App Store. For example:
       - If you promote a guide available externally, the equivalent content could be made accessible via an in-app purchase within your app or linked to an app that provides it in the App Store.
     - **Content Scope**: This requirement applies primarily to **media and digital content** intended for **commercial sale or active promotion**. Examples include:
       - **Books or eBooks**: A novel or manual sold externally on a website.
       - **Movies/TV Shows**: Media content sold or rented on an external platform.
       - **Subscription Services**: Streaming or membership-based content promoted externally.
     - **Exemptions**: Purely informational resources like free user manuals or help documents provided to support your app or device are typically exempt from this requirement unless they are being actively sold or promoted externally.

3. **Warning Notice**:
   - **Relevant Text**: "Apps must display a warning to users that Apple is not responsible for the privacy or security of purchases made through external links."
   - **Clarification**: Apps must display a clear notice if users are directed to external purchase platforms. For example:
     - **Example Warning**: “Purchases made outside this app are not Apple transactions, thus Apple is not responsible for the privacy or security of these transactions.”
     - This notice helps users understand that purchases made outside of Apple’s ecosystem carry risks, such as different privacy policies or transaction protections.

#### **Selling External Digital Content**

1. **Fee Application**:
   - **Relevant Text**: "Apple charges a 27% fee on external purchases, which reduces to 12% for annual subscriptions after the first year."
   - **Clarification**: Apple imposes this commission on external purchases facilitated through apps to maintain parity with its in-app purchase fees. Developers must report these transactions to Apple to ensure compliance. The lower rate for annual subscriptions incentivizes developers to build long-term subscription models.

2. **Strict Guidelines**:
   - **Relevant Text**: "Developers must follow Apple's strict guidelines to include external purchase links."
   - **Clarification**: These guidelines dictate how external purchase links are displayed to ensure transparency, seamless user experience, and compliance with Apple’s ecosystem rules. For instance:
     - Links must be clearly labeled and not misleading.
     - Apps must not circumvent Apple’s payment mechanisms for transactions within the app.

3. **Discount Flexibility**:
   - **Relevant Text**: "External links are not bound by Apple's semi-strict rules for discounts or coupon codes."
   - **Clarification**: Developers promoting external content can offer discounts or use promotional codes more freely than when offering content through in-app purchases, which are subject to stricter Apple guidelines. This provides flexibility for external promotions.

#### **Edge Cases and Practical Considerations**

1. **Device Manuals**:
   - If your app provides a manual as a free resource, it **does not need to comply** with the Internal Links Requirement, as it is not commercial content.
   - If the manual is part of a paid resource (e.g., a premium troubleshooting guide), and you promote it externally, you must either:
     - Offer it as an in-app purchase or equivalent App Store item, or
     - Include a disclaimer when linking externally.

2. **Promotions for Non-Digital Goods**:
   - Content like physical merchandise (e.g., branded T-shirts) does not fall under these requirements. The rules apply only to digital goods or services.

3. **Non-Sale External Links**:
   - If the external link is not for commercial promotion or purchase (e.g., a link to a free blog post), the App Store link requirement **does not apply**. However, the warning notice may still be necessary to address privacy and security concerns.

---

### **Practical Example (a PDF Guide)**
- **Promotion**: A dedicated page in your app can highlight your guide.
- **Free Manual**: Embed the guide in your app or link to an external PDF. No App Store link is required.
- **Paid Guide**: Offer it via in-app purchase or provide an App Store link to an equivalent item. If sold externally, include the required warning notice.

---

