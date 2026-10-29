export type Project = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  technologies: string[];
  githubUrl: string;
  imagePath: string;
  imageObjectFit?: "cover" | "contain";
  screenshots: DashboardScreenshot[];
  challengeHeading: string;
  businessProblem: string;
  metrics: Array<{ label: string; value: string; detail?: string }>;
  insightHeading: string;
  insights: string[];
  recommendationHeading: string;
  recommendations: string[];
  impactHeading: string;
  expectedImpact: string;
};

export type DashboardScreenshot = {
  title: string;
  imagePath: string;
  alt: string;
};

export const projects: Project[] = [
  {
    id: "sales-dashboard",
    title: "Retail Sales Analysis Dashboard",
    subtitle: "Strong sales are only part of the branch performance story.",
    description:
      "An Excel analysis of sales, net revenue, profit, branch returns, and monthly performance across four Egyptian branches.",
    technologies: ["Microsoft Excel", "Power Query", "Pivot Tables"],
    githubUrl: "https://github.com/Omarboghdady/Sales_Dashboard_Project",
    imagePath: "/projects/sales-dashboard.jpg",
    screenshots: [
      { title: "Home Dashboard", imagePath: "/projects/sales-dashboard.jpg", alt: "Sales dashboard comparing branch sales, revenue, and profit" },
      { title: "Problems Dashboard", imagePath: "/projects/sales-problems.jpg", alt: "Sales dashboard showing returns, discounts, and customer feedback by branch and category" },
    ],
    challengeHeading: "Which branches are growing—and where should performance be questioned?",
    businessProblem:
      "Management needs to compare branch sales with the value retained after costs and returns. The analysis brings those measures together so a high sales total is not mistaken for healthy performance on its own.",
    metrics: [
      { label: "Total sales", value: "1.697B" },
      { label: "Net revenue", value: "1.506B" },
      { label: "Net profit", value: "445.9M" },
      { label: "Total return", value: "13%" },
    ],
    insightHeading: "Alexandria leads sales; Cairo’s return signal merits validation.",
    insights: [
      "Alexandria records the highest branch sales at 637.6M, ahead of Cairo at 423.8M. That establishes a sales lead, but the chart alone does not show whether Alexandria also leads on margin.",
      "The branch-return visual labels Cairo at 30% and the other branches at 5% each. Because the dashboard does not define the denominator, treat this as a prompt to validate the underlying return measure—not as a confirmed branch return rate.",
      "February is the lowest month in the displayed sales trend at 129.5M. This identifies a point for comparison, not a proven seasonal pattern.",
      "Although discounts and customer feedback are part of the project scope, their values are not visible in this dashboard capture. Their effect on branch profitability cannot be concluded from the available evidence.",
    ],
    recommendationHeading: "Validate the return signal before changing branch policy.",
    recommendations: [
      "Start with Cairo’s return records: confirm the percentage definition, then segment returns by product and reason and compare them with customer feedback.",
      "Bring branch discount amounts into the same review as net revenue, costs, and net profit. The available screenshot does not show discount figures, so no branch discount strategy can yet be judged.",
      "Compare February with other years and relevant trading periods before treating the monthly low as a recurring demand issue.",
    ],
    impactHeading: "A clearer view of branch quality, not just branch volume.",
    expectedImpact:
      "Validating return and discount measures alongside profit could help managers focus investigations where customer experience or retained value may be at risk, while avoiding decisions based on sales volume alone.",
  },
  {
    id: "hr-analytics-dashboard",
    title: "HR Analytics Dashboard",
    subtitle: "A stable headcount can still hide uneven retention over time.",
    description:
      "A Power BI dashboard covering workforce structure, salaries, attendance, performance, recruitment, and turnover.",
    technologies: ["Power BI", "DAX", "Power Query"],
    githubUrl: "https://github.com/Omarboghdady/HR-Analytics-Dashboard",
    imagePath: "/projects/hr-analytics-dashboard.jpg",
    screenshots: [
      { title: "Overview", imagePath: "/projects/hr-analytics-dashboard.jpg", alt: "HR overview dashboard with headcount, active employees, turnover, and monthly trends" },
      { title: "Workforce Analysis", imagePath: "/projects/hr-workforce.jpg", alt: "Workforce dashboard showing employee age groups, gender distribution, job titles, and employee list" },
      { title: "Salary Analysis", imagePath: "/projects/hr-salary.jpg", alt: "Salary dashboard with annual salary, monthly cost, department comparisons, and monthly cost trend" },
      { title: "Attendance Analysis", imagePath: "/projects/hr-attendance.jpg", alt: "Attendance dashboard showing absence, leave, present days, and department and monthly patterns" },
      { title: "Performance Analysis", imagePath: "/projects/hr-performance.jpg", alt: "Performance dashboard with score distribution, department averages, and performance versus absence" },
      { title: "Recruitment Analysis", imagePath: "/projects/hr-recruitment.jpg", alt: "Recruitment dashboard showing applicants, hires, time to hire, and recruitment cost" },
      { title: "Manager Overview", imagePath: "/projects/hr-manager.jpg", alt: "Manager dashboard comparing department performance, absent days, and turnover rates" },
    ],
    challengeHeading: "How stable is the workforce—and when does turnover rise?",
    businessProblem:
      "HR needs a view that connects workforce size with employee exits over time. This overview establishes the current headcount picture and highlights when turnover deserves a closer look, without assuming what caused the changes.",
    metrics: [
      { label: "Employees", value: "150" },
      { label: "Active employees", value: "130" },
      { label: "Turnover rate", value: "13%" },
    ],
    insightHeading: "Turnover is concentrated in two visible monthly peaks.",
    insights: [
      "The overview shows 150 employees, including 130 active and 20 resigned, with a 13% turnover KPI. Together, these measures make employee exits a material workforce-planning question.",
      "The monthly chart reaches 30% in August and 31% in December, compared with 11% in June. The contrast identifies periods for investigation; it does not explain why turnover changed.",
      "Department headcount is visible, but the available screenshot does not show departmental turnover or attendance measures. It cannot verify that Finance has the highest turnover or Marketing the highest absence.",
    ],
    recommendationHeading: "Use the monthly peaks to guide a focused HR review.",
    recommendations: [
      "Compare August and December exits by department, role, tenure, and manager, then check the pattern against hiring and staffing records before attributing a cause.",
      "Pair turnover with attendance, recruitment, and performance views to distinguish retention concerns from broader workforce-planning needs.",
      "Keep the turnover definition and reporting period consistent when monitoring whether any HR action is followed by a change.",
    ],
    impactHeading: "Turn workforce signals into better-timed HR decisions.",
    expectedImpact:
      "A focused review of when and where exits occur could help HR prioritize retention conversations and staffing plans. Tracking measures consistently would make it easier to assess whether subsequent actions coincide with a different trend.",
  },
  {
    id: "nexa-retail-dashboard",
    title: "Nexa Retail Dashboard",
    subtitle: "Connect the sales curve to the customer and operational views behind it.",
    description:
      "A Power BI retail analysis with separate views for sales, customers, product and inventory, and returns.",
    technologies: ["Power BI", "Power Query", "Data Modeling", "DAX"],
    githubUrl: "https://github.com/Omarboghdady/Nexa-Retail-Dashboard",
    imagePath: "/projects/nexa-retail-dashboard.jpg",
    screenshots: [
      { title: "Sales", imagePath: "/projects/nexa-retail-dashboard.jpg", alt: "Nexa retail sales dashboard showing revenue and order performance" },
      { title: "Customer Analysis", imagePath: "/projects/nexa-customers.jpg", alt: "Customer dashboard with customer counts, order activity, customer status, and yearly acquisition" },
      { title: "Product & Inventory", imagePath: "/projects/nexa-inventory.jpg", alt: "Product and inventory dashboard showing stock value, reorder levels, product counts, and inventory movement" },
      { title: "Returns", imagePath: "/projects/nexa-returns.jpg", alt: "Returns dashboard showing return volume, reasons, category rates, headcount, and turnover" },
    ],
    challengeHeading: "What sits behind the changes in retail revenue?",
    businessProblem:
      "Sales outcomes can reflect more than demand: customer activity, stock availability, and product returns may all warrant review. Nexa organizes these areas into connected dashboard views so teams can investigate performance across functions rather than treating revenue as a standalone result.",
    metrics: [
      { label: "Total revenue", value: "$7.60M" },
      { label: "Total orders", value: "2,453" },
      { label: "Profit margin", value: "69%" },
    ],
    insightHeading: "The visible sales trend dips in September, then finishes higher in December.",
    insights: [
      "The sales view shows $7.60M in revenue across 2,453 orders and a displayed 69% profit margin. The margin’s calculation basis is not specified in the screenshot, so it should be interpreted using the project’s measure definition.",
      "In the displayed monthly profile, revenue reaches a low of $0.52M in September and a high of $0.76M in December. This variation can guide questions about timing, but the chart does not establish a cause.",
      "Customer, Product & Inventory, and Return tabs are visible, but their underlying dashboards and measures are not included in this capture. The supplied evidence therefore cannot verify the reported inactive-customer, reorder, or defective-return counts.",
    ],
    recommendationHeading: "Trace the sales pattern across customer, stock, and returns.",
    recommendations: [
      "Compare September and December with promotion calendars, stock availability, and comparable periods before scheduling campaigns around the apparent low and high.",
      "Use the customer view to test whether activity changes alongside revenue, and the inventory view to check whether availability could be relevant; do not infer a relationship until the measures are compared.",
      "Review the returns view by product and reason, then coordinate any quality or replenishment follow-up with the teams responsible for those processes.",
    ],
    impactHeading: "Coordinate retail decisions around shared evidence.",
    expectedImpact:
      "Connecting customer, inventory, and returns evidence to the sales trend could help teams distinguish demand changes from operational issues and direct follow-up to the right area. The available sales capture alone cannot confirm those causes.",
  },
  {
    id: "quantum-electronics-dashboard",
    title: "Quantum Electronics Dashboard",
    subtitle: "The category earning the most revenue is not the category with the strongest margin.",
    description:
      "A business intelligence dashboard analyzing revenue, profitability, stores, product categories, and sales trends.",
    technologies: ["Microsoft Power BI", "Data Visualization", "Business Intelligence"],
    githubUrl: "https://github.com/Omarboghdady/Quantum-Electronics-Dashboard",
    imagePath: "/projects/quantum-electronics-dashboard.jpg",
    screenshots: [
      { title: "Overview & KPIs", imagePath: "/projects/quantum-electronics-dashboard.jpg", alt: "Quantum Electronics overview dashboard with revenue, profit, margin, and category performance" },
      { title: "Store Performance", imagePath: "/projects/quantum-store-performance.jpg", alt: "Store dashboard comparing revenue and margin with top and bottom stores" },
      { title: "Products & Time Trends", imagePath: "/projects/quantum-products-time-trends.jpg", alt: "Product and time dashboard showing product margins, revenue by weekday, and year-over-year revenue" },
    ],
    challengeHeading: "Are sales leaders also contributing the strongest profitability?",
    businessProblem:
      "Revenue shows the scale of sales, while profit and margin show a different dimension of performance. This dashboard compares the overall results with category margins and revenue so management can investigate where sales volume and retained value diverge.",
    metrics: [
      { label: "Total revenue", value: "$14M" },
      { label: "Total profit", value: "$4M" },
      { label: "Profit margin", value: "28%" },
    ],
    insightHeading: "Toys leads category revenue; Electronics leads category margin.",
    insights: [
      "Toys contributes approximately $5M in displayed category revenue—the largest category value—yet its margin is 21%, the lowest shown. Revenue leadership therefore does not mean margin leadership.",
      "Electronics shows the highest category margin at 45%, while its displayed revenue is approximately $2M. This contrast makes category mix, costs, and pricing useful areas to examine, not automatic reasons to shift investment.",
      "Monthly revenue varies across the displayed period, from about $0.49M in July 2022 to about $0.88M in January 2023. These points frame a timing question; the chart alone does not explain the movement.",
    ],
    recommendationHeading: "Compare category economics before changing the sales mix.",
    recommendations: [
      "Break down Toys’ costs, prices, and promotions to understand the gap between its revenue contribution and 21% margin before considering pricing or promotion changes.",
      "Assess whether Electronics’ 45% margin is sustainable at its current sales level, including availability and category profit, before prioritizing expansion.",
      "Compare monthly and store results over consistent periods to test whether the revenue swings recur and whether they align with category or store changes.",
    ],
    impactHeading: "Make growth decisions with both revenue and margin in view.",
    expectedImpact:
      "Reviewing revenue, costs, and margin together could help management evaluate pricing, promotion, and inventory options without over-weighting the largest sales total. Store-level comparisons can then help target follow-up where the detailed data supports it.",
  },
  {
    id: "hse-analysis-dashboard",
    title: "HSE Analysis Dashboard",
    subtitle: "Make safety activity visible—and make follow-up the next management question.",
    description:
      "A Power BI overview of safety indicators, contractor warning letters, competency verification, and Permit to Work activity.",
    technologies: ["Microsoft Power BI", "Excel", "Python", "SQL"],
    githubUrl: "https://github.com/Omarboghdady/HSE-Analysis-Dashboard",
    imagePath: "/projects/hse-analysis-dashboard.jpg",
    screenshots: [
      { title: "HSE Overview & PTW Analysis", imagePath: "/projects/hse-analysis-dashboard.jpg", alt: "HSE dashboard showing safety indicators, permit activity, contractor warnings, and competency verification" },
      { title: "Safety Incidents & Equipment Analysis", imagePath: "/projects/hse-safety-equipment.jpg", alt: "Safety dashboard showing unsafe acts and conditions, fire systems, and equipment status" },
    ],
    challengeHeading: "Can teams see where safety follow-up should be focused?",
    businessProblem:
      "Safety teams need a shared view of leading indicators, contractor observations, competency verification, and permit activity. This dashboard brings those signals together to support review and follow-up; the counts are monitoring measures, not proof of causes or incident outcomes.",
    metrics: [
      { label: "HSE warnings", value: "51" },
      { label: "Near misses", value: "7" },
      { label: "PCA warning letters", value: "23", detail: "45.1% of the displayed warning-letter total" },
    ],
    insightHeading: "Contractor warnings are concentrated, while follow-up context matters.",
    insights: [
      "For the displayed September 2025–June 2026 period, the overview records 51 HSE warnings and 7 near misses. These are counts of recorded activity; the screenshot does not provide severity or outcome detail.",
      "PCA accounts for 23 warning letters, or 45.1% of the contractor-warning total shown. That concentration makes the corrective-action status and underlying observation types a sensible review priority—not evidence of why the warnings occurred.",
      "Loader Operators have the highest visible competency-verification count at 16. A higher count is not itself a competency gap; teams need to compare verification coverage with workforce and role requirements.",
      "Unsafe-act and unsafe-condition totals are not visible in this dashboard capture, so they are not quantified here.",
    ],
    recommendationHeading: "Prioritize corrective-action closure, not just warning counts.",
    recommendations: [
      "Review PCA warning letters by observation type, severity, date, and corrective-action status; track closure and recurrence using a consistent period.",
      "Check competency verification against required and current role coverage, rather than treating the highest verification count as a risk ranking.",
      "Use permit-to-work trends alongside site observations and near-miss follow-up to identify where preventive checks may need attention.",
    ],
    impactHeading: "Turn a monitoring snapshot into a repeatable prevention cycle.",
    expectedImpact:
      "Consistent tracking of warnings, corrective-action closure, verification coverage, and permit activity could help safety teams focus reviews, make follow-up more visible, and support earlier preventive decisions. The dashboard does not demonstrate achieved safety improvements.",
  },
  {
    id: "cream-cafe-sales-analysis",
    title: "Cream Café – Sales Analysis Dashboard",
    subtitle: "Understand how product mix, store contribution, and trading patterns shape café sales.",
    description:
      "A café sales analysis using MySQL for data preparation and analytical queries, with Power BI dashboards to explore revenue, transactions, products, locations, and sales over time.",
    technologies: ["MySQL", "Power BI"],
    githubUrl: "https://github.com/Omarboghdady/Cream-Cafe-Sales-Analysis-README.md",
    imagePath: "/projects/cream-cafe-sales-overview.jpg",
    imageObjectFit: "contain",
    screenshots: [
      {
        title: "Sales Overview",
        imagePath: "/projects/cream-cafe-sales-overview.jpg",
        alt: "Cream Café overview showing revenue, transactions, quantity, average transaction value, store sales share, product category sales, and monthly revenue",
      },
      {
        title: "Product & Time Analysis",
        imagePath: "/projects/cream-cafe-product-time-analysis.jpg",
        alt: "Cream Café analysis showing top products, monthly revenue, sales by hour, and revenue by product category",
      },
    ],
    challengeHeading: "How do revenue, product mix, store contribution, and trading time shape café sales?",
    businessProblem:
      "The dashboard brings sales measures and product, store, and time-based views together. This gives decision-makers a shared basis for reviewing commercial performance and asking where inventory or operating attention may be useful.",
    metrics: [
      { label: "Total revenue", value: "698.8K" },
      { label: "Transactions", value: "149,116" },
      { label: "Quantity sold", value: "214,470" },
      { label: "Average transaction value", value: "4.69" },
    ],
    insightHeading: "Coffee leads category revenue, while store sales are closely balanced.",
    insights: [
      "The overview reports 698,812 in revenue across 149,116 transactions and 214,470 items, with an average transaction value of 4.69.",
      "Monthly revenue rises from 76K in February to 166K in June, the strongest month shown in the displayed January–June period.",
      "Coffee contributes approximately 270K in category revenue, followed by tea at approximately 196K. The product view also ranks Sustainably Grown Organic Lg first at 21.2K.",
      "The three locations each contribute about one-third of sales: Hell's Kitchen 33.84%, Astoria 33.23%, and Lower Manhattan 32.92%.",
      "The product-and-time view identifies 10:00 AM as the peak sales hour in the displayed hourly analysis.",
    ],
    recommendationHeading: "Turn observed demand patterns into focused operational reviews.",
    recommendations: [
      "Prioritize availability for higher-revenue categories and products, while monitoring the broader category mix before making assortment changes.",
      "Review staffing and preparation capacity around the observed 10:00 AM peak, then compare service and sales patterns to assess where adjustments may help.",
      "Investigate the increase in monthly revenue from February through June to understand which factors may be repeatable; the dashboard does not identify its cause.",
      "Compare store-level sales and product performance to identify specific opportunities for local follow-up without assuming one location is underperforming.",
    ],
    impactHeading: "Support more informed inventory, staffing, and store-level decisions.",
    expectedImpact:
      "Using the dashboard to review product demand, peak trading times, monthly movement, and store contribution could help focus operational questions and resource planning. The analysis shows sales patterns, not measured business improvements.",
  },
];
