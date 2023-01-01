import fs from "fs";
import handlebars from "handlebars";

import sendGridMail from "@sendgrid/mail";

import { IMailProvider } from "../IMailProvider";

export class SendGridMailProvider implements IMailProvider {
  constructor() {
    sendGridMail.setApiKey(String(process.env.SENDGRID_API_KEY));
  }

  async sendMail(
    to: string,
    subject: string,
    variables: any,
    path: string
  ): Promise<void> {
    const templateFileContent = fs.readFileSync(path).toString("utf-8");

    const templateParse = handlebars.compile(templateFileContent);

    const templateHTML = templateParse(variables);

    await sendGridMail.send({
      to,
      from: "Rentx <noreply@rentx.com.br>",
      subject,
      html: templateHTML,
    });
  }
}
