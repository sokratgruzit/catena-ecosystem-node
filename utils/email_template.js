export function verification_template(verification_link) {
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <title>Email Verification</title>
  </head>
  <body>
    <table align="center" width="600" cellpadding="0" cellspacing="0" style="background-color: #fff; border-collapse: collapse;">
      <tr>
        <td style="padding: 20px;">
          <h1 style="text-align:center;">Welcome to ${process.env.COMPANY_NAME}</h1>
          <p>Thanks for updating profile. please verify your email address by clicking the button below:</p>
          <table align="center" style="margin: 20px auto;">
            <tr>
              <td>
                <a href="${verification_link}" style="background-color: #4CAF50; color: white; padding: 12px 20px; border: none; border-radius: 4px; cursor: pointer; font-size: 18px; text-decoration: none;">
                  Verify my email
                </a>
              </td>
            </tr>
          </table>
          <p>If you have any issues or didn't sign up for an account, please contact us at <a href="mailto:${process.env.COMPANY_EMAIL}">${process.env.COMPANY_EMAIL}</a></p>
          <p><b>If you haven't signup with us, please disregard this email and do not click on the verify button. We apologize for any inconvenience this may have caused.</b></p>
        </td>
      </tr>
    </table>
  </body>
  </html>  
  `;
}

export function reset_password_template(reset_password_link) {
  return `<!DOCTYPE html>
  <html>
  <head>
    <title>Reset Password</title>
  </head>
  <body>
    <table align="center" width="600" cellpadding="0" cellspacing="0" style="background-color: #fff; border-collapse: collapse;">
      <tr>
        <td style="padding: 20px;">
          <h1 style="text-align:center;">Reset Password</h1>
          <p>We received a request to reset the password for your account. If you made this request, click the button below to reset your password:</p>
          <table align="center" style="margin: 20px auto;">
            <tr>
              <td>
                <a href="${reset_password_link}" style="background-color: #4CAF50; color: white; padding: 12px 20px; border: none; border-radius: 4px; cursor: pointer; font-size: 18px; text-decoration: none;">
                  Reset Password
                </a>
              </td>
            </tr>
          </table>
          <p>If you didn't make this request, you can safely ignore this email.</p>
          <p>Best regards,</p>
          <p>The Team</p>
        </td>
      </tr>
    </table>
  </body>
  </html>
`;
}
