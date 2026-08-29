import type { Metadata } from "next";
import LegalPage from "@/components/common/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Kolekta's Privacy Policy — how we collect, use, and protect your personal data, in compliance with Kenya's Data Protection Act 2019 and the ODPC.",
};

const contactBlock = (
  <div className="legal-contact">
    <p>
      <strong>Kolekta Limited</strong>
    </p>
    <p>Nairobi, Kenya</p>
    <p>
      <a href="mailto:support@kolekta.co">support@kolekta.co</a>
    </p>
  </div>
);

export default function PrivacyPage() {
  return (
    <LegalPage
      label="Legal"
      title="Privacy Policy"
      meta={
        <>
          <span>Last reviewed: June 2026</span>
          <span aria-hidden="true">·</span>
          <span>Effective: June 2026</span>
          <span aria-hidden="true">·</span>
          <span>Governing law: Republic of Kenya</span>
        </>
      }
      notice={
        <p>
          <strong>Pre-launch notice.</strong> Kolekta is currently in
          pre-launch stage. This website provides tax education, a free tax
          estimator, and a research questionnaire. No tax returns are filed
          through this website, and no financial or personal tax data is stored
          here. Full ODPC registration and a Data Protection Impact Assessment
          (DPIA) will be completed before any such data is collected or
          processed.
        </p>
      }
    >
      <h2>1. Who We Are</h2>
      <p>
        Kolekta is a tax compliance and record-keeping platform being developed
        for Kenya&apos;s independent workers, creatives, and small production
        businesses.
      </p>
      <p>
        The platform is operated by Kolekta Limited, a company incorporated in
        Kenya under the Companies Act 2015. Our contact address is:
      </p>
      {contactBlock}
      <p>
        For the purposes of Kenya&apos;s Data Protection Act 2019 (DPA 2019),
        Kolekta Limited is the data controller for personal data collected
        through this website.
      </p>

      <h2>2. Legal Framework</h2>
      <p>This policy is written in compliance with:</p>
      <ul>
        <li>
          <strong>Kenya Data Protection Act 2019</strong> (No. 24 of 2019) and
          the Data Protection (General) Regulations 2021 — our primary legal
          framework
        </li>
        <li>
          <strong>Kenya Computer Misuse and Cybercrimes Act 2018</strong> —
          governing unlawful access to and misuse of computer data
        </li>
        <li>
          <strong>Kenya Consumer Protection Act 2012</strong> — your rights as
          a consumer of digital services
        </li>
        <li>
          <strong>EU General Data Protection Regulation (GDPR)</strong> —
          applied where visitors from the European Economic Area (EEA) access
          this website, to the extent it is applicable to our processing
          activities
        </li>
      </ul>
      <p>
        Where there is a conflict between Kenyan law and any other framework,
        Kenyan law prevails.
      </p>

      <h2>3. What Data We Collect — and What We Don&apos;t</h2>
      <h3>What we collect at this stage</h3>
      <p>
        This website is an information and education resource. The only
        personal data we actively collect is through our research
        questionnaire, which may ask for:
      </p>
      <ul>
        <li>Your name (optional)</li>
        <li>Your email address (optional, if you wish to be contacted)</li>
        <li>
          General information about your work as a creative professional — for
          example, the types of income you earn, whether you currently file tax
          returns, and what challenges you face
        </li>
      </ul>
      <p>
        The questionnaire does not ask for your KRA PIN, your iTax password,
        income figures, client names, or any financial data. It is a product
        research instrument only.
      </p>
      <h3>What we do not collect at this stage</h3>
      <ul>
        <li>KRA PIN or iTax credentials of any kind</li>
        <li>Tax returns, income data, or financial records</li>
        <li>Bank account details or payment information</li>
        <li>Identification documents</li>
        <li>Biometric data</li>
      </ul>
      <h3>Tax estimator</h3>
      <p>
        Our free tax estimator tool processes the income figures you enter to
        produce an estimated tax liability. This data is not stored,
        transmitted to any server, or associated with your identity. The
        calculation runs in your browser session only. When you close or
        refresh the page, the data is gone.
      </p>
      <h3>Website analytics</h3>
      <p>
        We may collect standard website analytics data — pages visited, time on
        page, device type, and approximate geographic region — using
        privacy-respecting analytics tools. This data is aggregated and not
        linked to any individual. No advertising trackers or cross-site
        tracking cookies are used.
      </p>

      <h2>4. How We Use the Data We Collect</h2>
      <p>
        Questionnaire responses are used solely for product research — to
        understand the needs of Kenya&apos;s creative workforce and to design a
        platform that serves them. Specifically:
      </p>
      <ul>
        <li>
          <strong>Research and product development:</strong> Understanding what
          features matter most to Kenya&apos;s independent workers
        </li>
        <li>
          <strong>Community building:</strong> If you provide your email, we
          may contact you to share updates, invite you to beta participation,
          or ask follow-up research questions
        </li>
      </ul>
      <p>
        We will not use your data for automated decision-making, profiling, or
        any purpose unrelated to building the Kolekta platform.
      </p>
      <p>
        <strong>Legal basis for processing (DPA 2019, s.30):</strong> Consent.
        You choose to complete the questionnaire. You may withdraw that consent
        at any time by emailing{" "}
        <a href="mailto:support@kolekta.co">support@kolekta.co</a>.
      </p>
      <p>
        <strong>Legal basis for processing under GDPR (Article 6(1)(a)):</strong>{" "}
        Consent, where GDPR applies.
      </p>

      <h2>5. Data Storage and Security</h2>
      <p>
        Our research questionnaire is built using Google Forms. Responses are
        collected and stored in Google Sheets, both of which are services
        operated by Google LLC (and its affiliates). Google acts as a data
        processor on our behalf.
      </p>
      <p>
        Google applies industry-standard security measures to data processed
        through its Workspace products, including encryption in transit (TLS)
        and encryption at rest. Google&apos;s data processing practices for
        Workspace are governed by Google&apos;s Cloud Data Processing Addendum,
        which sets out the contractual basis on which Google handles data on
        our behalf. (
        <a href="https://workspace.google.com/terms/dpa_terms.html">
          workspace.google.com/terms/dpa_terms.html
        </a>
        )
      </p>
      <p>
        We do not sell, rent, or share your personal data with third parties
        for commercial purposes. We may share data with:
      </p>
      <ul>
        <li>
          <strong>Google LLC</strong> — as our data processor for questionnaire
          collection and storage via Google Forms and Google Sheets, as
          described above
        </li>
        <li>
          <strong>Other service providers</strong> who assist us in operating
          this website, under data processing agreements that require them to
          protect your data
        </li>
        <li>
          <strong>Law enforcement or regulatory authorities</strong> where we
          are required to do so by law, including under Kenya&apos;s Data
          Protection Act 2019 and the Computer Misuse and Cybercrimes Act 2018
        </li>
      </ul>
      <p>
        We retain questionnaire data for as long as it is relevant to product
        development, and for a maximum of three years from the date of
        collection, unless you ask us to delete it sooner. You may request
        deletion at any time by emailing{" "}
        <a href="mailto:support@kolekta.co">support@kolekta.co</a>. We will
        delete your responses from our Google Sheets records within 21 days of
        a valid deletion request.
      </p>

      <h2>6. Cross-Border Data Transfers</h2>
      <p>
        Google LLC is headquartered in the United States. By using Google Forms
        to submit your questionnaire responses, your data is transferred to and
        stored on Google&apos;s servers, which may be located outside Kenya —
        including in the United States and other countries where Google operates
        data centres.
      </p>
      <p>
        We rely on Google&apos;s Cloud Data Processing Addendum as the safeguard
        for this transfer, consistent with the requirements of Kenya&apos;s Data
        Protection Act 2019 (s.49 — restriction on transfer of personal data
        outside Kenya) and, where applicable, GDPR Chapter V. Google&apos;s
        Addendum incorporates Standard Contractual Clauses approved for
        cross-border transfers.
      </p>
      <p>
        You may review Google&apos;s privacy practices at{" "}
        <a href="https://policies.google.com/privacy">
          policies.google.com/privacy
        </a>
        .
      </p>
      <p>
        If you are not comfortable with your data being processed by Google
        outside Kenya, please do not complete the questionnaire. You can still
        use the tax estimator, read our education content, and contact us by
        email — none of those activities involve Google Forms.
      </p>

      <h2>7. Your Rights</h2>
      <p>
        Under Kenya&apos;s Data Protection Act 2019 (Part IV) and, where
        applicable, the GDPR, you have the right to:
      </p>
      <ul>
        <li>Access the personal data we hold about you</li>
        <li>Correct inaccurate or incomplete personal data</li>
        <li>
          Delete your personal data (the &quot;right to erasure&quot;), subject
          to any legal retention requirements
        </li>
        <li>Object to processing of your personal data</li>
        <li>
          Withdraw consent at any time, without affecting the lawfulness of
          processing before withdrawal
        </li>
        <li>
          Lodge a complaint with the Office of the Data Protection Commissioner
          (ODPC) at <a href="https://www.odpc.go.ke">www.odpc.go.ke</a>
        </li>
      </ul>
      <p>
        To exercise any of these rights, email{" "}
        <a href="mailto:support@kolekta.co">support@kolekta.co</a>. We will
        respond within 21 days, as required by the DPA 2019.
      </p>

      <h2>8. Cookies</h2>
      <p>
        This website uses only essential cookies necessary for the site to
        function (for example, to remember your session on the tax estimator
        page). We do not use advertising cookies or cross-site tracking
        cookies.
      </p>
      <p>
        You can control cookies through your browser settings. Disabling
        essential cookies may affect how the site works.
      </p>

      <h2>9. Children&apos;s Privacy</h2>
      <p>
        This website is not directed at persons under the age of 18. We do not
        knowingly collect personal data from children. If you believe a child
        has submitted data through this website, please contact us at{" "}
        <a href="mailto:support@kolekta.co">support@kolekta.co</a> and we will
        delete it promptly.
      </p>

      <h2>10. What Will Change When the Platform Launches</h2>
      <p>
        When Kolekta moves from pre-launch to live operations, this policy will
        be substantially updated to cover:
      </p>
      <ul>
        <li>
          The collection and processing of tax records, KRA-related data, and
          financial information
        </li>
        <li>ODPC registration details and our Data Protection Officer contact</li>
        <li>
          The trust architecture governing how accountants access client data
          under mandate (without password sharing)
        </li>
        <li>
          Specific retention periods for tax records (Kenya&apos;s Tax
          Procedures Act requires five-year retention)
        </li>
        <li>
          Our TSP (Tax Service Provider) registration status with KRA
        </li>
      </ul>
      <p>
        We will notify questionnaire subscribers by email when this updated
        policy is published.
      </p>

      <h2>11. Changes to This Policy</h2>
      <p>
        We may update this policy from time to time. The &quot;Last
        reviewed&quot; date at the top of this page will always reflect the
        most recent version. For material changes, we will provide notice via
        the website or by email where we hold your contact details.
      </p>

      <h2>12. Contact</h2>
      <p>
        For any questions about this policy or how we handle your data:
      </p>
      {contactBlock}
      <p>
        For complaints you may also contact the Office of the Data Protection
        Commissioner (ODPC): <a href="https://www.odpc.go.ke">www.odpc.go.ke</a>
      </p>
    </LegalPage>
  );
}
