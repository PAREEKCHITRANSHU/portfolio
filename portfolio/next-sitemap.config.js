/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://aman.dev",
  generateRobotsTxt: true,
  exclude: ["/api/*"],
};
