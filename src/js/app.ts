$(function () {
    class Application {
        loginBox: JQuery<HTMLElement>;
        loginForm: JQuery<HTMLElement>;
        constructor() {
            this.loginBox = $("#loginbox");
            this.loginForm = this.loginBox.find(".login-form");
            console.log("Application instance created");
            console.log("constructor:", this.loginBox);
            this.init();
            this.bindEvents();
        }
        init(): void {
            this.loginBox.tabs({ active: 0 });
            console.log("init", this.loginBox);
        }
        bindEvents(): void {
            console.log("bindEvents", this.loginBox);
            this.loginForm
                .on("focus", "input", function () {
                    $(this).closest(".item").addClass("focus");
                })
                .on("blur", "input", function () {
                    $(this).closest(".item").removeClass("focus");
                });
            $(document)
                .ajaxStart(function () {
                    $("button:submit").addClass("log-in").prop("disabled", true);
                })
                .ajaxStop(function () {
                    $("button:submit").removeClass("log-in").prop("disabled", false);
                });
            $("form").on("submit", function () {
                console.log(111);
            });
        }
    }
    const app = new Application();
});
