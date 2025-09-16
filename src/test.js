#!/usr/bin/env node

const DataExtractor = require("./extractor");

function runTests() {
  const extractor = new DataExtractor();

  const text = `
    Contact us at user@example.com or firstname.lastname@company.co.uk
    Visit https://www.example.com or https://subdomain.example.org/page
    Call us at (123) 456-7890, 123-456-7890, or 123.456.7890
    Pay with 4532-0151-1283-0366 or 1234-5678-9012-3456
    Meeting at 14:30 or 2:30 PM
    HTML: <div class="container"><p>Hello</p></div>
    Follow #RegexPower #CodingLife
    Price: $19.99 or $1,234.56
  `;

  console.log("===== EXTRACTION RESULTS =====");
  console.log(extractor.extractAll(text));

  console.log("\n===== VALIDATION TESTS =====");
  console.log("Email valid:", extractor.validateEmail("user@example.com"));
  console.log("Email invalid:", extractor.validateEmail("@example.com"));

  console.log("Phone valid:", extractor.validatePhone("(123) 456-7890"));
  console.log("Phone invalid:", extractor.validatePhone("12345"));

  console.log("URL valid:", extractor.validateUrl("https://www.example.com"));
  console.log("URL invalid:", extractor.validateUrl("ftp://example.com"));

  console.log("Card valid:", extractor.validateCreditCard("4532015112830366"));
  console.log(
    "Card invalid:",
    extractor.validateCreditCard("1234 5678 9012 3456")
  );
}

runTests();
