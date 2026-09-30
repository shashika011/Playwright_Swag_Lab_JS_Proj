
export class Test01 {
  constructor(page) {
    this.page = page;
    this.usernameInput = page.getByRole('textbox', { name: 'username' });
    this.passwordInput = page.getByRole('textbox', { name: 'password' });
    this.loginButton = page.getByRole('button', { name: 'Login' });

  }

    async userLogin (usrname,password) {
     await this.page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
      await this.usernameInput.fill(usrname, { delay: 100 });
      await this.passwordInput.fill(password, { delay: 100 });
      await this.loginButton.click();
    }

}