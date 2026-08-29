import type { Metadata } from "next";
import LegalPage from "@/components/common/LegalPage";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Kolekta's Terms of Service — the legally binding agreement governing your use of the Kolekta website, tools, and content.",
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

export default function TermsPage() {
  return (
    <LegalPage
      label="Legal"
      title="Terms of Service"
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
          estimator, and a research questionnaire. No paid subscription, filing
          service, or live user accounts exist at this stage. These terms
          govern your use of this website only. Separate terms will apply when
          the full platform launches.
        </p>
      }
    >
      <h2>1. Parties and Agreement</h2>
      <p>
        These Terms of Service (&quot;Terms&quot;) form a legally binding
        agreement between you (&quot;you&quot;, &quot;the user&quot;) and
        Kolekta Limited, a company incorporated in Kenya under the Companies
        Act 2015 (&quot;Kolekta&quot;, &quot;we&quot;, &quot;us&quot;).
      </p>
      <p>
        By accessing or using this website at kolekta.co (the
        &quot;Site&quot;), you agree to be bound by these Terms. If you do not
        agree, do not use the Site.
      </p>
      <p>
        These Terms are governed by and construed in accordance with the laws
        of the Republic of Kenya. Any dispute arising under or in connection
        with these Terms shall be subject to the exclusive jurisdiction of the
        courts of Kenya.
      </p>

      <h2>2. What This Site Is — and Is Not</h2>
      <p>This Site provides:</p>
      <ul>
        <li>
          <strong>Tax education content</strong> — articles, guides, and
          explainers about Kenya&apos;s tax obligations for independent workers
          and creative professionals
        </li>
        <li>
          <strong>A free tax estimator tool</strong> that produces indicative
          income tax estimates based on Kenya Revenue Authority (KRA) rates for
          the 2025 tax year
        </li>
        <li>
          <strong>A research questionnaire</strong> for product development
          purposes
        </li>
      </ul>
      <p>This Site does not:</p>
      <ul>
        <li>
          <strong>File tax returns on your behalf.</strong> Kolekta is not yet
          registered as a Tax Service Provider (TSP) with the Kenya Revenue
          Authority. No return is filed through this website.
        </li>
        <li>
          <strong>Provide professional tax advice.</strong> The content on this
          Site is for general information purposes. It does not constitute
          advice from a registered tax professional and does not create a
          professional-client relationship between you and Kolekta.
        </li>
        <li>
          <strong>Store your financial data.</strong> Any figures you enter
          into the tax estimator are processed locally in your browser and are
          not transmitted to or stored by Kolekta&apos;s systems.
        </li>
        <li>
          <strong>Access your KRA account.</strong> This Site will never ask for
          your iTax password or any KRA credentials.
        </li>
      </ul>

      <h2>3. The Tax Estimator — Scope and Limits</h2>
      <p>
        The tax estimator is a computational tool. It applies Kenya&apos;s
        published income tax bands, rates, and reliefs to the income figures
        you enter, and returns an estimate of your income tax liability.
      </p>
      <p>The estimator:</p>
      <ul>
        <li>
          <strong>Reflects rates and rules</strong> as at the &quot;Last
          reviewed&quot; date shown at the top of the estimator page. Tax rates
          can change. We update the estimator when material changes occur, but
          we do not guarantee real-time accuracy.
        </li>
        <li>
          <strong>Produces an estimate only.</strong> Your actual tax liability
          depends on your specific circumstances, the accuracy of the
          information you provide, the application of reliefs and exemptions
          particular to you, and the final assessment of the Kenya Revenue
          Authority.
        </li>
        <li>
          <strong>Does not account for</strong> penalties, interest, prior-year
          liabilities, VAT obligations, Turnover Tax elections, or any
          obligation other than the individual income tax (IT1) computation
          shown.
        </li>
        <li>
          <strong>Is not a substitute</strong> for advice from a qualified,
          ICPAK-registered tax professional before filing your return.
        </li>
      </ul>
      <p>
        See the full Disclaimer (
        <a href="/disclaimer">kolekta.co/disclaimer</a>) for the limits of our
        liability in relation to estimator output.
      </p>

      <h2>4. Education Content</h2>
      <p>
        All articles, guides, blog posts, and explanatory content published on
        this Site are written for general information purposes. They reflect
        our understanding of Kenya&apos;s tax rules as at the dates indicated
        on each piece of content.
      </p>
      <p>
        Tax law changes frequently in Kenya. KRA circulars, Finance Acts, and
        administrative guidance can alter the position described in any piece
        of content after its publication date. Always check the publication
        date and consult a qualified professional before acting on anything you
        read here.
      </p>
      <p>
        Nothing on this Site constitutes legal or tax advice, and Kolekta does
        not hold itself out as providing such advice. Kolekta&apos;s
        ICPAK-certified accountant partner validates the tax logic in our
        computational tools, but that validation is not a professional opinion
        directed at any individual user.
      </p>

      <h2>5. Research Questionnaire</h2>
      <p>
        Participation in our research questionnaire is entirely voluntary. By
        completing the questionnaire, you consent to Kolekta using your
        responses for product research and development as described in our
        Privacy Policy (<a href="/privacy">kolekta.co/privacy</a>).
      </p>
      <p>
        Questionnaire responses do not create any contractual relationship
        between you and Kolekta, and do not entitle you to any product,
        service, refund, or priority access, unless we have explicitly
        confirmed this to you in writing.
      </p>

      <h2>6. Acceptable Use</h2>
      <p>You may use this Site only for lawful purposes. You must not:</p>
      <ul>
        <li>
          Use the Site in any way that violates applicable Kenyan law, including
          the Computer Misuse and Cybercrimes Act 2018, the Data Protection Act
          2019, or the Income Tax Act (Cap. 470)
        </li>
        <li>
          Attempt to gain unauthorised access to any part of the Site or its
          underlying systems
        </li>
        <li>
          Use automated tools, bots, or scrapers to extract content or data from
          the Site without our prior written consent
        </li>
        <li>
          Upload, transmit, or post any content that is unlawful, harmful,
          defamatory, or infringes the intellectual property rights of any third
          party
        </li>
        <li>
          Represent the output of the tax estimator as professional tax advice,
          or reproduce it in any way that misrepresents its nature or source
        </li>
      </ul>
      <p>
        We reserve the right to suspend or restrict access to the Site for any
        user who breaches these Terms.
      </p>

      <h2>7. Intellectual Property</h2>
      <p>
        All content on this Site — including text, design, graphics, code, and
        the tax estimator tool — is owned by or licensed to Kolekta Limited. It
        is protected by copyright and other intellectual property laws of Kenya
        and applicable international conventions.
      </p>
      <p>
        You may share links to this Site and quote brief extracts from our
        content for non-commercial purposes, provided you clearly attribute the
        source as Kolekta (kolekta.co). You may not reproduce substantial
        portions of our content, republish our tools, or use our content in any
        commercial context without our prior written consent.
      </p>
      <p>
        &quot;Kolekta&quot; and the Kolekta visual identity are the property of
        Kolekta Limited. Nothing on this Site grants you any licence to use our
        name, logo, or branding.
      </p>

      <h2>8. Third-Party Links and Services</h2>
      <p>
        This Site may contain links to third-party websites including
        KRA&apos;s iTax portal, ICPAK, the Office of the Data Protection
        Commissioner, and other resources. These links are provided for your
        convenience only.
      </p>
      <p>
        Kolekta does not control third-party websites and is not responsible for
        their content, accuracy, privacy practices, or availability. A link
        from this Site does not constitute an endorsement.
      </p>

      <h2>9. Limitation of Liability</h2>
      <p>
        To the maximum extent permitted by Kenyan law:
      </p>
      <ul>
        <li>
          Kolekta provides this Site and all content on it &quot;as is&quot; and
          without warranties of any kind, express or implied — including
          warranties of accuracy, fitness for a particular purpose, or
          non-infringement.
        </li>
        <li>
          Kolekta shall not be liable for any direct, indirect, incidental, or
          consequential loss or damage arising from your use of this Site or
          reliance on any content or estimator output, including any tax
          assessment, penalty, or interest imposed by KRA.
        </li>
        <li>
          Kolekta&apos;s total liability to you under these Terms, in any
          circumstances where liability cannot be excluded, shall not exceed KES
          5,000 (Kenya Shillings five thousand), reflecting the fact that this
          Site is provided free of charge at the pre-launch stage.
        </li>
      </ul>
      <p>
        Nothing in these Terms excludes liability for fraud, fraudulent
        misrepresentation, or any liability that cannot be excluded under the
        Kenya Consumer Protection Act 2012 or any other applicable mandatory
        law.
      </p>

      <h2>10. No Professional Relationship</h2>
      <p>
        Using this Site does not create a professional relationship — whether
        accountant-client, lawyer-client, or any other — between you and
        Kolekta or any individual associated with Kolekta.
      </p>
      <p>
        Kolekta Limited is not a registered tax agent or Tax Service Provider
        (TSP) with the Kenya Revenue Authority at this stage.
      </p>

      <h2>11. Availability and Changes to the Site</h2>
      <p>
        We do not guarantee that this Site will be available at all times or
        that it will be free from errors or interruptions. We reserve the right
        to modify, suspend, or discontinue any part of the Site at any time
        without notice.
      </p>
      <p>
        We may update these Terms at any time. The &quot;Last reviewed&quot;
        date at the top of this page reflects the most recent version.
        Continued use of the Site after any update constitutes your acceptance
        of the revised Terms. For material changes, we will provide reasonable
        notice on the Site.
      </p>

      <h2>12. Severability</h2>
      <p>
        If any provision of these Terms is found to be invalid, unlawful, or
        unenforceable by a court of competent jurisdiction, that provision shall
        be severed from the remaining Terms, which shall continue in full force
        and effect.
      </p>

      <h2>13. Entire Agreement</h2>
      <p>
        These Terms, together with our Privacy Policy (
        <a href="/privacy">kolekta.co/privacy</a>) and Disclaimer (
        <a href="/disclaimer">kolekta.co/disclaimer</a>), constitute the entire
        agreement between you and Kolekta with respect to your use of this
        Site. They supersede all prior agreements, representations, and
        understandings between you and Kolekta relating to the same subject
        matter.
      </p>

      <h2>14. Contact</h2>
      <p>
        Questions about these Terms should be directed to:
      </p>
      {contactBlock}
    </LegalPage>
  );
}
