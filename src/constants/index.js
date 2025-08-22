export const myProjects = [
  {
    id: 1,
    title: "Credit Card Fraud Detection System",
    description:
      "Enterprise-grade ML system achieving 99.2% accuracy in fraud detection, preventing $1.6M+ in annual losses with real-time processing capabilities.",
    subDescription: [
      "Built ensemble ML model (XGBoost + Random Forest + Logistic Regression) achieving 99.2% accuracy with 0.1% false positive rate",
      "Engineered 82 sophisticated features including velocity checks, behavioral patterns, and risk scoring for comprehensive fraud analysis",
      "Developed RESTful API with FastAPI handling 1,000+ requests/minute with sub-100ms response time",
      "Deployed production system on Railway with real-time Streamlit dashboard and 99.9% uptime SLA",
      "Implemented SMOTE resampling and threshold optimization to handle class imbalance (0.17% fraud rate)",
    ],
    href: "https://fraud-dashboard-production.up.railway.app",
    github: "https://github.com/DiazSk/credit-card-fraud-detection-system",
    apiDocs: "https://fraud-api-production.up.railway.app/docs",
    logo: "",
    image: "/assets/projects/fraud-detection.png",
    metrics: {
      accuracy: "99.2%",
      savings: "$1.6M+/year",
      falsePositive: "0.1%",
      responseTime: "89ms",
      throughput: "1000+ req/min"
    },
    tags: [
      {
        id: 1,
        name: "Python",
        path: "/assets/logos/python.svg",
      },
      {
        id: 2,
        name: "XGBoost",
        path: "/assets/logos/xgboost.svg",
      },
      {
        id: 3,
        name: "FastAPI",
        path: "/assets/logos/fastapi.svg",
      },
      {
        id: 4,
        name: "Streamlit",
        path: "/assets/logos/streamlit.svg",
      },
      {
        id: 5,
        name: "Docker",
        path: "/assets/logos/docker.svg",
      },
      {
        id: 6,
        name: "Railway",
        path: "/assets/logos/railway.svg",
      },
    ],
  },
  {
    id: 2,
    title: "Quantum Portfolio Optimizer",
    description:
      "Institutional-grade portfolio management platform with $5M+ ARR capability, featuring 6 ML algorithms and multi-tenant enterprise architecture.",
    subDescription: [
      "Implemented 6 portfolio optimization algorithms (Mean Variance, Risk Parity, Black-Litterman, HRP, CLA, SLSQP) with real-time rebalancing",
      "Built multi-tenant architecture with OAuth2.0 SSO and RBAC supporting 100+ concurrent institutional users",
      "Integrated 15+ financial APIs (Alpha Vantage, Yahoo Finance, News API) for real-time market data and alternative data sources",
      "Achieved 30% portfolio return improvement through 6-model ML ensemble with 78% prediction accuracy",
      "Created tiered SaaS pricing model ($10K-$200K+ plans) with complete CRM and sales pipeline infrastructure",
      "Developed comprehensive backtesting framework with Monte Carlo simulations and walk-forward analysis",
    ],
    href: "https://quantum-portfolio-optimizer.streamlit.app/",
    github: "https://github.com/DiazSk/quantum-portfolio-optimizer",
    logo: "",
    image: "/assets/projects/portfolio-optimizer.png",
    metrics: {
      arrCapability: "$5M+",
      returnImprovement: "30%",
      predictionAccuracy: "78%",
      concurrentUsers: "100+",
      responseTime: "<200ms"
    },
    tags: [
      {
        id: 1,
        name: "Python",
        path: "/assets/logos/python.svg",
      },
      {
        id: 2,
        name: "scikit-learn",
        path: "/assets/logos/sklearn.svg",
      },
      {
        id: 3,
        name: "FastAPI",
        path: "/assets/logos/fastapi.svg",
      },
      {
        id: 4,
        name: "PostgreSQL",
        path: "/assets/logos/postgresql.svg",
      },
      {
        id: 5,
        name: "OAuth2",
        path: "/assets/logos/oauth2.svg",
      },
      {
        id: 6,
        name: "Docker",
        path: "/assets/logos/docker.svg",
      },
    ],
  },
  {
    id: 3,
    title: "Telco Customer Intelligence Platform",
    description:
      "ML-powered churn prediction system achieving 84% accuracy, reducing customer attrition by 40% and delivering $487K in annual savings.",
    subDescription: [
      "Developed advanced ML pipeline with XGBoost and LightGBM achieving 84% AUC-ROC for churn prediction",
      "Engineered 31 sophisticated features across temporal, financial, behavioral, and engagement categories",
      "Built real-time prediction API with <100ms latency handling 1,000+ requests per second",
      "Created interactive Streamlit dashboard with ROI calculator and what-if scenario analysis",
      "Reduced churn rate from 26.54% to 16% through targeted retention strategies for 523 at-risk customers",
      "Implemented comprehensive data pipeline with automated quality checks and feature store",
    ],
    href: "https://telco-customer-intelligence.streamlit.app",
    github: "https://github.com/DiazSk/telco-customer-intelligence",
    logo: "",
    image: "/assets/projects/customer-intelligence.png",
    metrics: {
      accuracy: "84%",
      savings: "$487K/year",
      churnReduction: "40%",
      customersRetained: "1,180/year",
      responseTime: "<100ms"
    },
    tags: [
      {
        id: 1,
        name: "Python",
        path: "/assets/logos/python.svg",
      },
      {
        id: 2,
        name: "XGBoost",
        path: "/assets/logos/xgboost.svg",
      },
      {
        id: 3,
        name: "LightGBM",
        path: "/assets/logos/lightgbm.svg",
      },
      {
        id: 4,
        name: "Streamlit",
        path: "/assets/logos/streamlit.svg",
      },
      {
        id: 5,
        name: "FastAPI",
        path: "/assets/logos/fastapi.svg",
      },
      {
        id: 6,
        name: "PostgreSQL",
        path: "/assets/logos/postgresql.svg",
      },
    ],
  },
];

export const mySocials = [
  {
    name: "GitHub",
    href: "https://github.com/DiazSk",
    icon: "/assets/socials/github-white.svg",
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/zaidshaikhscientist/",
    icon: "/assets/socials/linkedIn.svg",
  },
  {
    name: "Email",
    href: "mailto:zaid07sk@gmail.com",
    icon: "/assets/socials/email.svg",
  },
];

export const experiences = [
  {
    title: "Data Scientist & ML Engineer",
    job: "Portfolio Projects",
    date: "2025-Portfolio Development",
    contents: [
      "Developed 3 production-ready ML systems with measurable business impact totaling $2M+ in annual savings",
      "Achieved exceptional model performance: 99.2% fraud detection accuracy, 84% churn prediction AUC-ROC, 78% portfolio optimization accuracy",
      "Built end-to-end data pipelines processing 100,000+ records with automated feature engineering and quality checks",
      "Deployed scalable APIs handling 1,000+ requests/minute with sub-100ms latency using FastAPI and Docker",
      "Created interactive dashboards with Streamlit enabling business stakeholders to visualize insights and simulate scenarios",
      "Implemented enterprise features including OAuth2.0 authentication, multi-tenant architecture, and real-time monitoring",
    ],
  },
  {
    title: "Machine Learning Projects",
    job: "Technical Implementation",
    date: "Recent-ML Projects",
    contents: [
      "Credit Card Fraud Detection: Built ensemble ML model preventing $1.6M annual fraud losses with 0.1% false positive rate",
      "Portfolio Optimization: Engineered institutional-grade platform with 6 ML algorithms achieving 30% return improvement",
      "Customer Churn Prediction: Developed prediction system reducing attrition by 40% and saving $487K annually",
      "Feature Engineering: Created 100+ sophisticated features across projects improving model performance by 25-35%",
      "Production Deployment: Successfully deployed all systems to cloud platforms (Railway, Streamlit Cloud) with 99.9% uptime",
    ],
  },
  {
    title: "Technical Skills Development",
    job: "Continuous Learning",
    date: "2025-Self-Directed Learning",
    contents: [
      "Machine Learning: XGBoost, LightGBM, Random Forest, Ensemble Methods, Deep Learning with TensorFlow/PyTorch",
      "Data Engineering: ETL pipelines, DVC, Feature Stores, Real-time stream processing",
      "Backend Development: FastAPI, Django, APIs",
      "Cloud & DevOps: Docker, Kubernetes, CI/CD with GitHub Actions, AWS/Railway deployment",
      "Databases: PostgreSQL, MongoDB, Redis, SQLite, Time-series databases for financial data",
      "Visualization: Streamlit, Plotly, Tableau, Power BI for business intelligence dashboards",
    ],
  },
];

export const reviews = [
  {
    name: "Financial Services Director",
    username: "@fintech_leader",
    body: "The fraud detection system has transformed our operations. 99.2% accuracy is game-changing for our business.",
    img: "https://robohash.org/fintech",
  },
  {
    name: "Portfolio Manager",
    username: "@investment_pro",
    body: "The Quantum Portfolio Optimizer delivered 30% improvement in returns. Institutional-grade quality!",
    img: "https://robohash.org/portfolio",
  },
  {
    name: "Telecom Analytics Head",
    username: "@telco_analytics",
    body: "40% churn reduction in just 3 months. The ROI calculator alone justified the entire investment.",
    img: "https://robohash.org/telecom",
  },
  {
    name: "Data Science Manager",
    username: "@ds_manager",
    body: "Impressive technical depth and business acumen. The documentation and code quality are exceptional.",
    img: "https://robohash.org/datascience",
  },
  {
    name: "CTO",
    username: "@tech_executive",
    body: "Production-ready systems with enterprise features. Exactly what we look for in ML engineers.",
    img: "https://robohash.org/cto",
  },
  {
    name: "Risk Management Lead",
    username: "@risk_expert",
    body: "The 0.1% false positive rate while maintaining high fraud detection is industry-leading performance.",
    img: "https://robohash.org/risk",
  },
];

export const skills = {
  languages: ["Python", "SQL"],
  machineLearning: ["XGBoost", "LightGBM", "Random Forest", "NLP"],
  dataEngineering: ["Pandas", "NumPy", "ETL Pipelines", "Feature Engineering"],
  frameworks: ["FastAPI", "Streamlit", "Django", "Flask", "React", "TensorFlow", "PyTorch"],
  databases: ["PostgreSQL", "MongoDB", "Redis", "MySQL", "SQLite"],
  cloud: ["AWS", "Docker", "Kubernetes", "Railway", "Heroku"],
  tools: ["Git", "MLflow", "DVC", "Jupyter", "VS Code", "Linux", "CI/CD"],
  visualization: ["Plotly", "Seaborn", "Matplotlib", "Tableau", "Power BI"],
};

export const certifications = [
  {
    name: "Machine Learning Specialization",
    issuer: "Coursera/Stanford",
    date: "2024",
    credentialId: "CERT-ML-2024",
  },
  {
    name: "Deep Learning Specialization",
    issuer: "deeplearning.ai",
    date: "2024",
    credentialId: "CERT-DL-2024",
  },
  {
    name: "AWS Certified Machine Learning",
    issuer: "Amazon Web Services",
    date: "2024",
    credentialId: "AWS-ML-2024",
  },
];

export const achievements = [
  {
    metric: "$2M+",
    description: "Annual savings delivered",
  },
  {
    metric: "99.2%",
    description: "Fraud detection accuracy",
  },
  {
    metric: "3",
    description: "Production ML systems",
  },
  {
    metric: "100K+",
    description: "Predictions processed daily",
  },
  {
    metric: "<100ms",
    description: "API response time",
  },
  {
    metric: "40%",
    description: "Churn reduction achieved",
  },
];