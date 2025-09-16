class DataExtractor {
  constructor() {
    this.patterns = {
      email:
        /\b[A-Za-z0-9][A-Za-z0-9._%+-]*@[A-Za-z0-9][A-Za-z0-9.-]*\.[A-Za-z]{2,}\b/g,
      url: /https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}(?:[-a-zA-Z0-9()@:%_+.~#?&/=]*)/g,
      phone: /(?:\+?1\s*)?(?:\(\d{3}\)|\d{3})[-.\s]?\d{3}[-.\s]?\d{4}/g,
      credit_card: /\b(?:\d{4}[\s-]?){3}\d{4}\b/g,
      time12h: /\b(?:1[0-2]|0?[1-9]):[0-5][0-9]\s?(?:AM|PM|am|pm)\b/g,
      time24h: /\b(?:[01]?[0-9]|2[0-3]):[0-5][0-9](?::[0-5][0-9])?\b/g,
      html_tag: /<\/?[a-zA-Z][^>]*?>/g,
      hashtag: /#[A-Za-z0-9_]+/g,
      currency: /\$\d{1,3}(?:,\d{3})*(?:\.\d{2})?/g,
    };
  }

  extractEmails(text) {
    return text.match(this.patterns.email) || [];
  }
  extractUrls(text) {
    return text.match(this.patterns.url) || [];
  }
  extractPhones(text) {
    return text.match(this.patterns.phone) || [];
  }
  extractCreditCards(text) {
    return text.match(this.patterns.credit_card) || [];
  }

  extractTimes(text) {
    const times12h = text.match(this.patterns.time12h) || [];
    const times24h = text.match(this.patterns.time24h) || [];
    return {
      "12h": times12h,
      "24h": times24h.filter((t) => !times12h.includes(t)),
    };
  }

  extractHtmlTags(text) {
    return text.match(this.patterns.html_tag) || [];
  }
  extractHashtags(text) {
    return text.match(this.patterns.hashtag) || [];
  }
  extractCurrency(text) {
    return text.match(this.patterns.currency) || [];
  }

  extractAll(text) {
    return {
      emails: this.extractEmails(text),
      urls: this.extractUrls(text),
      phones: this.extractPhones(text),
      credit_cards: this.extractCreditCards(text),
      times: this.extractTimes(text),
      html_tags: this.extractHtmlTags(text),
      hashtags: this.extractHashtags(text),
      currency: this.extractCurrency(text),
    };
  }

  validateEmail(email) {
    return new RegExp(`^${this.patterns.email.source}$`).test(email);
  }

  validateUrl(url) {
    return new RegExp(`^${this.patterns.url.source}$`).test(url);
  }

  validatePhone(phone) {
    return new RegExp(`^${this.patterns.phone.source}$`).test(phone);
  }

  validateCreditCard(card) {
    if (!new RegExp(`^${this.patterns.credit_card.source}$`).test(card))
      return false;
    const digits = card.replace(/[\s-]/g, "");
    if (!/^\d+$/.test(digits)) return false;

    let sum = 0;
    let shouldDouble = false;
    for (let i = digits.length - 1; i >= 0; i--) {
      let digit = parseInt(digits[i]);
      if (shouldDouble) {
        digit *= 2;
        if (digit > 9) digit -= 9;
      }
      sum += digit;
      shouldDouble = !shouldDouble;
    }
    return sum % 10 === 0;
  }
}

module.exports = DataExtractor;
