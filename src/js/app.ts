$(function () {
    class Application {
        loginBox: JQuery<HTMLElement>;
        constructor() {
            this.loginBox = $("#loginbox");
            console.log("Application instance created");
            console.log("constructor:", this.loginBox);
            this.init();
            this.bindEvents();
        }
        init(): void {
            this.loginBox.tabs({active: 0});
            console.log("init", this.loginBox);
        }
        bindEvents(): void {
            console.log("bindEvents", this.loginBox);
        }
    }
    const app = new Application();
});
