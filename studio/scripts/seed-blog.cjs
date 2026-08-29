/* eslint-disable no-console */
/**
 * Seed script for the Kolekta blog.
 * Uploads cover images and creates author, categories, and posts.
 *
 * Run from the repo root with the API token exported:
 *   set -a && source .env.local && set +a
 *   node studio/scripts/seed-blog.cjs
 */
const {createClient} = require('@sanity/client')
const fs = require('fs')
const path = require('path')

const token = process.env.SANITY_AUTH_TOKEN
if (!token) {
  console.error('Missing SANITY_AUTH_TOKEN. Source .env.local first.')
  process.exit(1)
}

const client = createClient({
  projectId: 'pg78qsiy',
  dataset: 'production',
  apiVersion: '2026-08-29',
  token,
  useCdn: false,
})

const IMG_DIR = path.join(__dirname, '..', '..', '.seed-images')

async function uploadImage(fileName) {
  const filePath = path.join(IMG_DIR, fileName)
  if (!fs.existsSync(filePath)) {
    console.error(`Missing image: ${filePath}`)
    process.exit(1)
  }
  const asset = await client.assets.upload('image', fs.createReadStream(filePath), {
    filename: fileName,
  })
  console.log(`Uploaded ${fileName} -> ${asset._id}`)
  return asset
}

function block(children) {
  return {_type: 'block', style: 'normal', children}
}

function textBlock(text) {
  return block([{_type: 'span', text}])
}

function h2Block(text) {
  return {_type: 'block', style: 'h2', children: [{_type: 'span', text}]}
}

function h3Block(text) {
  return {_type: 'block', style: 'h3', children: [{_type: 'span', text}]}
}

function listBlock(text, listType = 'bullet') {
  return {_type: 'block', style: 'normal', listItem: listType, level: 1, children: [{_type: 'span', text}]}
}

async function main() {
  // --- Author ---
  const author = await client.create({
    _type: 'author',
    name: 'Kolekta Editorial Team',
    slug: {_type: 'slug', current: 'kolekta-editorial'},
    bio: 'Kolekta helps Kenya\'s independent workers, creatives, and small businesses understand and file their taxes with confidence. Our editorial team translates the Kenya Revenue Authority\'s rules into plain English.',
  })
  console.log('Created author:', author._id)

  // --- Categories ---
  const cats = {
    PAYE: 'PAYE',
    deductions: 'Deductions',
    kra: 'KRA',
    vat: 'VAT',
    gettingStarted: 'Getting Started',
  }
  const catIds = {}
  for (const [key, title] of Object.entries(cats)) {
    const doc = await client.create({
      _type: 'category',
      title,
      slug: {_type: 'slug', current: title.toLowerCase().replace(/\s+/g, '-')},
    })
    catIds[key] = doc._id
    console.log(`Created category ${title}:`, doc._id)
  }

  // --- Cover images ---
  const payeImg = await uploadImage('paye.jpg')
  const expensesImg = await uploadImage('expenses.jpg')
  const itaxImg = await uploadImage('itax.jpg')
  const vatImg = await uploadImage('vat.jpg')
  const pinImg = await uploadImage('pin.jpg')

  const imgRef = (asset) => ({
    _type: 'image',
    asset: {_type: 'reference', _ref: asset._id},
    alt: 'A Kolekta blog cover image',
  })

  // --- Posts ---
  const posts = [
    {
      title: 'How PAYE Actually Works in Kenya — A Plain English Guide',
      slug: 'paye-guide-2026',
      category: catIds.PAYE,
      featured: true,
      readTime: '8 min read',
      publishedAt: '2026-05-12T08:00:00Z',
      excerpt:
        'Most people know PAYE exists. Very few know how it is calculated. Here is every step — the tax bands, reliefs, and deductions — explained simply.',
      coverImage: imgRef(payeImg),
      body: [
        textBlock('PAYE (Pay As You Earn) is the system the Kenya Revenue Authority uses to collect income tax from employees before they ever see their money. Your employer deducts it, then remits it to KRA on your behalf. It sounds simple — and once you understand the maths, it is.'),
        h2Block('What counts as taxable employment income?'),
        textBlock('Almost everything you receive from your employer counts. That includes your salary and wages, but also commissions, bonuses, overtime, sick pay, leave pay, director\u2019s fees, service gratuity, and most allowances.'),
        textBlock('Non-cash benefits count too, but only above a threshold. Benefits exceeding KShs 5,000 per month (or KShs 60,000 per year) are taxable. Below that, employer-provided meals, medical cover, and a modest night-out allowance (KShs 2,000 per day) are not taxed.'),
        h2Block('The tax bands (effective 1 July 2023)'),
        textBlock('PAYE is charged on your taxable income at progressive rates. The more you earn, the higher the rate on each extra shilling — but you never pay the top rate on your whole salary, only on the portion that falls in each band.'),
        listBlock('First KShs 24,000 per month (KShs 288,000/year): 10%'),
        listBlock('Next KShs 8,333 per month (KShs 100,000/year): 25%'),
        listBlock('Next KShs 467,667 per month (KShs 5,612,000/year): 30%'),
        listBlock('Next KShs 300,000 per month (KShs 3,600,000/year): 32.5%'),
        listBlock('Above KShs 800,000 per month (KShs 9,600,000/year): 35%'),
        h2Block('Reliefs that reduce your tax'),
        textBlock('Two big reliefs cut what you actually pay:'),
        listBlock('Personal relief of KShs 2,400 per month (KShs 28,800/year) — granted automatically to resident individuals.'),
        listBlock('Insurance relief of 15% of premiums paid on life, health, or education policies, capped at KShs 60,000 per year.'),
        h2Block('Deductions your employer must make'),
        textBlock('Before tax is computed, your employer deducts several statutory contributions. The main ones, as per the Finance Act 2024 and the Affordable Housing Act 2024:'),
        listBlock('Affordable Housing Levy (AHL) at 1.5% of gross salary — paid by both you and your employer.'),
        listBlock('Social Health Insurance Fund (SHIF) contributions.'),
        listBlock('NSSF/registered pension or provident fund contributions, up to KShs 30,000 per month (KShs 360,000/year).'),
        listBlock('Post-retirement medical fund contributions, up to KShs 15,000 per month.'),
        listBlock('Mortgage interest up to KShs 30,000 per month on a qualifying home loan.'),
        h2Block('When is PAYE due?'),
        textBlock('Employers must deduct and remit PAYE, and file the return through iTax, on or before the 9th day of the following month. If there is no tax to declare, a nil return is still required.'),
        h2Block('What happens if an employer is late?'),
        listBlock('Late filing: the higher of 25% of the tax due or KShs 10,000.'),
        listBlock('Late payment: a 5% penalty plus interest at 1% per month (or part of a month) until the tax is paid in full.'),
        listBlock('Failure to deduct and account for tax: 25% of the tax involved or KShs 10,000, whichever is higher.'),
        h2Block('Why this matters for you'),
        textBlock('If you are an employee, your payslip is doing this maths for you every month. Understanding the bands helps you read your payslip with confidence, plan for statutory deductions, and notice quickly when something looks off. If you are an employer or freelancer who hires contractors, knowing how PAYE works is your responsibility — not your accountant\u2019s.'),
        textBlock('Need to check your exact figures? KRA publishes a free PAYE calculator, and you can always verify the rates above on the KRA website.'),
      ],
    },
    {
      title: 'What Kenyan Creatives Can Claim as Business Expenses',
      slug: 'allowable-expenses-creatives',
      category: catIds.deductions,
      featured: false,
      readTime: '6 min read',
      publishedAt: '2026-05-05T08:00:00Z',
      excerpt:
        'From Adobe subscriptions to Uber rides to shoots — a practical breakdown of what you can legally deduct against your creative income in Kenya.',
      coverImage: imgRef(expensesImg),
      body: [
        textBlock('If you are a photographer, videographer, designer, musician, or content creator in Kenya, you are running a business — whether or not it feels like one yet. And businesses get to deduct the costs of earning income. Claiming the right expenses can be the difference between paying tax on everything you earn and paying tax on what you actually keep.'),
        h2Block('The golden rule'),
        textBlock('A business expense is deductible if it is incurred wholly and exclusively in the production of your income. That is the test KRA applies. The expense must be necessary for your trade and backed by documentation — an invoice, receipt, or eTIMS-compliant e-invoice.'),
        h2Block('What you can claim'),
        h3Block('Equipment and software'),
        listBlock('Camera gear, lenses, drones, lighting, and audio equipment — capital costs are depreciated (wear and tear) over their useful life.'),
        listBlock('Software subscriptions: Adobe Creative Cloud, Final Cut Pro, Pro Tools, Notion, and cloud storage you use for work.'),
        listBlock('Computers, tablets, and phones used for your creative work.'),
        h3Block('Shoots and production'),
        listBlock('Location fees and permits for shoots.'),
        listBlock('Props, costumes, and set design materials.'),
        listBlock('Hired crew and assistants — with proper contracts and records.'),
        listBlock('Backdrops, gaffers, batteries, and expendables.'),
        h3Block('Travel and transport'),
        listBlock('Uber, taxi, and mileage for work-related shoots and client meetings.'),
        listBlock('Fuel and maintenance for a vehicle used in your business.'),
        listBlock('Flights and accommodation when travelling for a client project.'),
        h3Block('Marketing and running costs'),
        listBlock('Website hosting and domain names.'),
        listBlock('Social media advertising, portfolio hosting (Behance, Squarespace), and promo materials.'),
        listBlock('Phone and data bills, apportioned to the business portion of use.'),
        h3Block('Professional services'),
        listBlock('Accountant and bookkeeping fees.'),
        listBlock('Legal fees related to contracts and your business.'),
        h2Block('What you cannot claim'),
        listBlock('Private and personal expenses — that trip to the coast is not a shoot.'),
        listBlock('Fines, penalties, and bribes.'),
        listBlock('Capital improvements on assets you do not own.'),
        listBlock('Entertainment expenses — KRA does not allow deductions for entertainment incurred in business.'),
        h2Block('The eTIMS reality'),
        textBlock('Since KRA\u2019s eTIMS rollout, invoices and receipts must be eTIMS-compliant for the related expenses to be easily verifiable. Issue e-invoices when you bill clients, and ask suppliers for compliant receipts when you spend. It is the cleanest way to support every shilling you claim.'),
        h2Block('Keep a system'),
        textBlock('You do not need a full-time accountant to start, but you do need a system. A simple spreadsheet, a phone photo of every receipt, and a monthly 15-minute tidy-up will save you thousands in headaches — and real money — at filing time.'),
      ],
    },
    {
      title: 'How to File Your Returns on iTax — Step by Step',
      slug: 'kra-itax-guide',
      category: catIds.kra,
      featured: false,
      readTime: '12 min read',
      publishedAt: '2026-04-20T08:00:00Z',
      excerpt:
        'iTax does not have to be terrifying. Here is a walkthrough of every screen — from logging in to filing your return and getting your compliance certificate.',
      coverImage: imgRef(itaxImg),
      body: [
        textBlock('Every Kenyan taxpayer\u2019s relationship with the government runs through one portal: iTax, at itax.kra.go.ke. For freelancers and small-business owners it is the place you register your obligations, file returns, and get the Tax Compliance Certificate clients keep asking for. Here is the full walkthrough.'),
        h2Block('Before you start'),
        listBlock('Your KRA PIN and password. If you have never registered, do that first — your PIN is your tax identity.'),
        listBlock('Your income records for the year: bank statements, M-PESA business statements, invoices, and contracts.'),
        listBlock('Records of any expenses you intend to claim (with supporting receipts).'),
        listBlock('A stable internet connection and patience — the portal can be slow during peak filing weeks.'),
        h2Block('Step 1: Log in'),
        textBlock('Go to itax.kra.go.ke and log in with your PIN as the username and your password. If you have forgotten your password, use the \u201cForgot Password\u201d flow — you will need the registered email or phone number.'),
        h2Block('Step 2: Check your obligations'),
        textBlock('After logging in, look at your dashboard for your registered tax obligations — for example, Income Tax, Turnover Tax, or VAT. If you are self-employed, your income tax obligation is typically \u201cIncome Tax — Resident Individual.\u201d'),
        h2Block('Step 3: File your return'),
        listBlock('Click the Returns tab and select File Return.'),
        listBlock('Choose the tax obligation relevant to you (e.g. Income Tax — Resident Individual for freelancers).'),
        listBlock('Select the tax period (the year you are filing).'),
        listBlock('Download the Excel/CSV return template, fill it in with your income and allowable deductions, and validate it.'),
        listBlock('Upload the validated file back to iTax, agree to the terms and conditions, and submit.'),
        textBlock('You will receive an acknowledgement receipt confirming your filing. Save it.'),
        h2Block('Step 4: Make your payment'),
        textBlock('If you owe tax, go to the Payments tab, select Payment Registration, choose the tax head and period, and generate a payment slip. You can pay:'),
        listBlock('At a bank using the generated payment slip.'),
        listBlock('Via M-PESA using KRA\u2019s Paybill number and the payment registration number as the account number.'),
        listBlock('By card, if supported.'),
        h2Block('Step 5: Get your compliance certificate'),
        textBlock('Once your returns are filed and any tax is paid, you can generate a Tax Compliance Certificate (TCC) from iTax. Many clients and corporates require a TCC before they will pay you — so keep your filings current.'),
        h2Block('Common mistakes to avoid'),
        listBlock('Filing after the deadline — late filing attracts penalties.'),
        listBlock('Filing a nil return when you actually had income (interest on late taxes adds up fast).'),
        listBlock('Understating income and hoping nobody notices — KRA cross-checks bank and M-PESA data.'),
        listBlock('Not keeping your acknowledgment receipts.'),
        h2Block('When to get help'),
        textBlock('If your affairs are simple — a single income stream and standard deductions — iTax is very doable yourself. If you have multiple businesses, employees, or cross-border income, an accountant who files through iTax is worth every shilling.'),
      ],
    },
    {
      title: 'When Do You Need to Register for VAT in Kenya?',
      slug: 'vat-registration-kenya',
      category: catIds.vat,
      featured: false,
      readTime: '5 min read',
      publishedAt: '2026-04-08T08:00:00Z',
      excerpt:
        'The KES 5 million threshold, how VAT actually works, what the 16% rate means for your pricing, and what happens if you cross the line.',
      coverImage: imgRef(vatImg),
      body: [
        textBlock('VAT (Value Added Tax) is the tax you charge on your sales and pay on your purchases — and only businesses that cross a specific threshold are required to collect it. Here is when you need to register, and what happens once you do.'),
        h2Block('The KES 5 million threshold'),
        textBlock('If you supply taxable goods or services worth KES 5 million or more in any year, you are required to register for VAT. That is the legal line. If your turnover is below it, registration is optional — you may apply for voluntary registration subject to conditions.'),
        textBlock('One important exception: if you are a non-resident selling digital services into Kenya (through an online marketplace or digital platform), you are required to register for VAT regardless of turnover.'),
        h2Block('How VAT actually works'),
        textBlock('VAT runs on an input/output system:'),
        listBlock('Output tax — the VAT you charge your customers on sales.'),
        listBlock('Input tax — the VAT you pay on business purchases.'),
        listBlock('Tax payable = Output tax − Input tax.'),
        textBlock('The general rate is 16%. Some supplies are zero-rated (0%) — for example, certain exports and specified goods in the Second Schedule to the VAT Act. Exempt supplies, listed in the First Schedule, are not taxable and their input tax cannot be deducted.'),
        h2Block('The 16% and your pricing'),
        textBlock('Once registered, you add 16% VAT to your taxable sales. The classic trap is absorbing the VAT yourself. Suppose you sell for KShs 12,000:'),
        listBlock('Net sale price: KShs 12,000'),
        listBlock('Plus 16% VAT: KShs 1,920'),
        listBlock('Customer pays: KShs 13,920'),
        textBlock('You collect the KShs 1,920, subtract the input VAT you paid on your own purchases, and remit the difference to KRA.'),
        h2Block('Your obligations once registered'),
        listBlock('File a VAT return and pay on or before the 20th day of the following month, through iTax.'),
        listBlock('Onboard onto eTIMS at etims.kra.go.ke and issue e-invoices for your sales.'),
        listBlock('Keep proper records of all transactions.'),
        listBlock('Notify KRA within 21 days of any change of name, address, or nature of business.'),
        h2Block('What if you cross the threshold by accident?'),
        textBlock('The system is increasingly data-driven. KRA cross-references your M-PESA and bank inflows with your filings. If your turnover crosses KES 5 million and you are not registered, expect a letter. The cheapest path is to monitor your revenue through the year and register promptly when you approach the line.'),
        h2Block('Can you deregister?'),
        textBlock('Yes — if you cease making taxable supplies, or if your turnover has fallen below KES 5 million for a year, you may apply to deregister. Keep filing returns until KRA confirms your deregistration.'),
      ],
    },
    {
      title: 'Getting Your KRA PIN as a Freelancer — Everything You Need',
      slug: 'freelancer-tax-pin',
      category: catIds.gettingStarted,
      featured: false,
      readTime: '4 min read',
      publishedAt: '2026-03-18T08:00:00Z',
      excerpt:
        'No PIN means no business. Here is how to register with KRA as an individual freelancer, what information you need, and what to do if you have never filed.',
      coverImage: imgRef(pinImg),
      body: [
        textBlock('In Kenya, your KRA PIN is your tax identity — and increasingly, your key to getting paid. Clients, platforms, and banks ask for it constantly. If you are freelancing without one, you are leaving money and opportunities on the table.'),
        h2Block('Why freelancers need a PIN'),
        listBlock('To invoice clients — corporates require a PIN to process supplier invoices.'),
        listBlock('To register tax obligations and file returns on iTax.'),
        listBlock('To pay taxes via M-PESA Paybill and bank payment slips.'),
        listBlock('To open business bank accounts and sign contracts.'),
        h2Block('What you need to register'),
        listBlock('Your national ID (or passport for non-residents).'),
        listBlock('A phone number and email address.'),
        listBlock('Your address and date of birth.'),
        listBlock('Your source(s) of income (e.g. freelance services, digital content, consulting).'),
        h2Block('Step-by-step registration'),
        listBlock('Visit the iTax portal at itax.kra.go.ke and open the registration page.'),
        listBlock('Choose \u201cIndividual\u201d as your taxpayer type.'),
        listBlock('Select \u201cOnline Form\u201d as the mode of registration.'),
        listBlock('Fill in Section A (basic information), Section B (obligation details), and Section C (source of income details).'),
        listBlock('Submit the form.'),
        textBlock('You will receive an acknowledgment receipt with a reference number so you can track your application while you await approval.'),
        h2Block('What happens after approval'),
        textBlock('You receive your PIN certificate. Log in to iTax, confirm your tax obligations (typically Income Tax — Resident Individual), and you are officially in the system.'),
        h2Block('First-time filer? Start here'),
        textBlock('If you have been earning and have never filed, the best move is to file a voluntary disclosure before KRA comes looking. Voluntary disclosures generally attract more favourable treatment than a surprise audit letter. Gather your income records, use the iTax walkthrough in our KRA iTax guide, and consider an accountant if your affairs are complex.'),
        h2Block('PIN hygiene'),
        textBlock('Never share your PIN password. Beware \u201cKRA officers\u201d who call demanding payment or asking you to share your password — KRA will never ask for your password. Official communication comes through the iTax portal and official KRA channels.'),
      ],
    },
  ]

  for (const post of posts) {
    const {slug, ...rest} = post
    const doc = await client.create({
      _type: 'post',
      ...rest,
      slug: {_type: 'slug', current: slug},
    })
    console.log(`Created post "${slug}":`, doc._id)
  }

  console.log('\nSeed complete.')
  console.log('Publish the posts in the Studio, or run the publish step to make them live.')
}

main().catch((err) => {
  console.error('Seed failed:', err.message)
  process.exit(1)
})
