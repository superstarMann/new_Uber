import Mailgun from "mailgun-js";

const mailGunClient = new Mailgun({
    apiKey: process.env.MAILGUN_API_KEY || '',
    domain: "sandbox8c893df668a443898b981a848c195445.mailgun.org"
});

const sendEmail = (subject: string, html: string) => {
    const emailData  = {
        from: "wsx94503@naver.com",
        to: "wsx94503@naver.com",
        subject,
        html
    };
    return mailGunClient.messages().send(emailData);
};

export const sendVerificationEmail = (fullName: string, key: string) => {
    const emailSubject = `Hello ${fullName}! please verify your email`;
    const emailBody = `Verify your email by clicking<a href = "http://nuber.com/verification/${key}/">here</a>`;
    return sendEmail(emailSubject, emailBody);
}

