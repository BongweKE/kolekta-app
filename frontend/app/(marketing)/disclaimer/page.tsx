import type { Metadata } from "next";
import LegalPage from "@/components/common/LegalPage";

export const metadata: Metadata = {
  title: "Disclaimer",
  description:
    "Kolekta's Disclaimer — the tax estimator produces estimates only. It is not professional advice, a tax return, or a guarantee of your actual tax position.",
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

export default function DisclaimerPage() {
  return (
    <LegalPage
      accent="#E0A020"
      label="Legal"
      title="Disclaimer"
      meta={
        <>
          <span>Last reviewed: June 2026</span>
          <span aria-hidden="true">·</span>
          <span>
            Tax rates reflect: Finance Act 2023 and KRA published rates, 2025
            tax year
          </span>
        </>
      }
      notice={
        <p>
          <strong>Read before using the estimator.</strong> The Kolekta tax
          estimator produces estimates only. It is not a tax return, not
          professional advice, and not a guarantee of your actual tax position.
          Tax rules in Kenya change frequently. Always consult a qualified,
          ICPAK-registered tax professional before filing your return.
        </p>
      }
    >
      <h2>1. General Information Only</h2>
      <p>
        Everything on this website — including all articles, guides,
        explainers, tool outputs, and any other content — is provided for
        general information purposes only. It does not constitute and should
        not be relied upon as:
      </p>
      <ul>
        <li>Professional tax advice</li>
        <li>Legal advice</li>
        <li>Financial or investment advice</li>
        <li>Accounting advice</li>
        <li>An opinion directed at your specific circumstances</li>
      </ul>
      <p>
        No content on this Site creates a professional relationship between you
        and Kolekta Limited, or between you and any accountant, lawyer, or
        other professional associated with Kolekta.
      </p>
      <p>
        Before filing any tax return, making any tax payment, or taking any
        action in response to KRA correspondence, you should seek advice from a
        qualified tax professional who is registered with the Institute of
        Certified Public Accountants of Kenya (ICPAK) and who understands your
        individual circumstances.
      </p>

      <h2>2. The Tax Estimator — What It Is</h2>
      <p>
        The Kolekta tax estimator applies Kenya&apos;s published income tax
        bands, rates, and standard reliefs to the income figures you enter. The
        computation logic has been reviewed by an ICPAK-certified accountant.
      </p>
      <p>The estimator currently covers:</p>
      <ul>
        <li>
          <strong>Individual income tax (IT1)</strong> — progressive bands for
          the 2025 tax year
        </li>
        <li>
          <strong>Withholding tax (WHT) credits</strong> at the standard 5% rate
          for professional services
        </li>
        <li>
          <strong>Personal relief (KES 28,800 per year)</strong> — applied only
          where indicated as applicable to employed individuals
        </li>
        <li>
          <strong>Insurance relief</strong> (15% of premiums paid, maximum KES
          60,000 per year)
        </li>
        <li>
          <strong>Standard eTims-compliant business expense deductions</strong>
        </li>
      </ul>
      <p>The estimator does not cover:</p>
      <ul>
        <li>
          <strong>Turnover Tax (ToT)</strong> — if your annual gross income is
          between KES 1 million and KES 25 million, ToT at 3% of gross may be
          available as an alternative to IT1. The estimator does not calculate
          or recommend between these options.
        </li>
        <li>
          <strong>Value Added Tax (VAT) obligations</strong> — if your annual
          turnover exceeds KES 5 million, you may be required to register for
          VAT. The estimator does not flag or compute VAT.
        </li>
        <li>
          Rental income tax, agricultural income, director&apos;s fees, or
          foreign income
        </li>
        <li>Prior-year tax liabilities, penalties, or interest</li>
        <li>
          NSSF, SHIF, or AHL contributions — these are noted in the portal but
          not individually computed in the estimator
        </li>
        <li>
          Any KRA Special Table restrictions that may block your ability to
          file
        </li>
        <li>
          Individual reliefs beyond those listed above — mortgage interest
          relief, pension contributions, HOSP contributions, or disability
          exemptions
        </li>
      </ul>

      <h2>3. The Tax Estimator — Accuracy and Currency</h2>
      <p>
        The estimator reflects Kenya Revenue Authority tax rates and bands as at
        June 2026. Kenya&apos;s tax rules change with each Finance Act, KRA
        circular, and administrative gazette. Changes may have occurred after
        this date that are not yet reflected in the estimator.
      </p>
      <p>Specifically, users should be aware that:</p>
      <ul>
        <li>
          <strong>eTims enforcement:</strong> From January 2026, KRA validates
          declared expenses against eTims records at the point of filing.
          Expenses without a corresponding eTims invoice number may be
          automatically disallowed. The estimator flags this but cannot know
          which of your actual expenses are eTims-compliant.
        </li>
        <li>
          <strong>KRA pre-populated returns:</strong> From March 2026, KRA
          sends pre-populated 2025 income tax returns based on eTims, WHT, and
          NTSA data. KRA&apos;s figure and the estimator&apos;s figure may
          differ. Where they differ, you will need to justify your position
          with your own records. The estimator output alone is not sufficient
          justification.
        </li>
        <li>
          <strong>WHT certificates:</strong> The estimator allows you to enter
          WHT amounts as credits. In practice, you must hold a valid WHT
          certificate issued by the payer on iTax before you can claim that
          credit on your return. The estimator assumes certificates are held —
          it does not verify this.
        </li>
        <li>
          <strong>Motor vehicle expenses:</strong> Claiming vehicle expenses on
          your IT1 return requires a motor vehicle logbook recording the date,
          destination, purpose, and kilometres for every business trip. Without
          a logbook, KRA will disallow the entire vehicle expense claim — not
          reduce it. The estimator does not verify whether you hold a logbook.
        </li>
      </ul>
      <p>
        We update the estimator when we become aware of material changes to
        rates or rules. We do not guarantee that the estimator reflects all
        changes in real time, and we accept no liability for any inaccuracy
        arising from a change in law or KRA practice after the &quot;Last
        reviewed&quot; date on this page.
      </p>

      <h2>4. No Filing, No Professional Opinion</h2>
      <p>
        The tax estimator does not file a tax return. No data you enter into
        the estimator is transmitted to KRA, to iTax, or to any accountant. The
        estimator is a standalone calculation tool.
      </p>
      <p>
        Kolekta Limited is not registered as a Tax Service Provider (TSP) with
        the Kenya Revenue Authority at this stage.
      </p>
      <p>
        The estimator output does not constitute a tax return, a self-assessment,
        or any formal communication with KRA. It has no legal standing in any
        dispute with KRA.
      </p>

      <h2>5. Reliance at Your Own Risk</h2>
      <p>
        You use this website and the tax estimator entirely at your own risk.
        Kolekta Limited accepts no responsibility for:
      </p>
      <ul>
        <li>
          Any tax assessment, penalty, or interest imposed by KRA as a result of
          reliance on information from this website or the estimator
        </li>
        <li>
          Any decision — financial, legal, or otherwise — made in reliance on
          content published on this website
        </li>
        <li>
          Any loss or damage of any kind arising from errors, omissions, or
          inaccuracies in the content or estimator output, whether caused by
          Kolekta or by changes in law or KRA practice
        </li>
        <li>
          Any failure of a third-party website or service linked to from this
          Site
        </li>
      </ul>
      <p>
        This exclusion applies to the fullest extent permitted by the Kenya
        Consumer Protection Act 2012 and applicable Kenyan law. Nothing in this
        Disclaimer excludes liability for fraud or fraudulent
        misrepresentation.
      </p>

      <h2>6. Education Content — Currency and Completeness</h2>
      <p>
        Articles, guides, and blog posts published on this Site reflect our
        understanding of Kenya&apos;s tax rules as at their individual
        publication dates, which are shown on each piece of content.
      </p>
      <p>
        Kenya&apos;s tax landscape changes frequently — through Finance Acts
        passed annually, KRA administrative circulars, court decisions, and
        gazette notices. Content published six months ago may describe a
        position that has since changed.
      </p>
      <p>
        We aim to update content when material changes occur, but we do not
        guarantee that every piece of content is current at the time you read
        it. Always check the publication date, check for subsequent KRA
        guidance, and consult a qualified professional before acting.
      </p>

      <h2>7. No Endorsement of Third Parties</h2>
      <p>
        References to KRA, iTax, ICPAK, the ODPC, specific legislation, or any
        other institution or organisation on this Site are for information
        purposes only. They do not constitute an endorsement of those
        institutions or their products and services, nor do they imply any
        official affiliation or authorisation.
      </p>
      <p>
        Kolekta has no commercial relationship with KRA, ICPAK, the ODPC, or
        any other regulatory or professional body referenced on this Site,
        other than as a regulated entity subject to their requirements.
      </p>

      <h2>8. Pricing Benchmarks</h2>
      <p>
        Where this Site or Kolekta&apos;s tools reference market pricing
        benchmarks for creative services — for example, indicative rates for
        photography, video production, or design — these are published for
        informational purposes only and reflect our understanding of general
        market conditions in Kenya.
      </p>
      <p>
        They are not a recommendation, a valuation, or a guarantee that any
        particular rate will be accepted by any client. Pricing decisions are
        yours alone to make, and Kolekta accepts no liability for any
        commercial outcome arising from use of these benchmarks.
      </p>

      <h2>9. Jurisdiction</h2>
      <p>
        This Disclaimer is governed by and construed in accordance with the
        laws of the Republic of Kenya. Any dispute arising under this
        Disclaimer shall be subject to the exclusive jurisdiction of the courts
        of Kenya.
      </p>
      <p>
        If you are accessing this Site from outside Kenya, you are responsible
        for ensuring compliance with the laws of your own jurisdiction. The
        content on this Site is directed at users in Kenya and is not intended
        to constitute advice or guidance for tax obligations in any other
        country.
      </p>

      <h2>10. Updates to This Disclaimer</h2>
      <p>We will update this Disclaimer when:</p>
      <ul>
        <li>
          The estimator&apos;s tax rates are updated following a Finance Act or
          KRA change
        </li>
        <li>Kolekta obtains TSP registration with KRA</li>
        <li>The platform moves from pre-launch to live operations</li>
        <li>
          Any material change in our legal status or service scope occurs
        </li>
      </ul>
      <p>
        The &quot;Last reviewed&quot; date and &quot;Tax rates reflect&quot;
        date at the top of this page will always indicate the basis on which
        the estimator is operating. Check these dates before relying on any
        output.
      </p>

      <h2>11. Contact</h2>
      <p>
        If you have a question about this Disclaimer or have identified content
        that appears to be inaccurate or out of date, please let us know:
      </p>
      {contactBlock}
    </LegalPage>
  );
}
