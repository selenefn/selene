export class ErrorBuilder {
    private errorCode: string;
    private errorMessage: string;
    private numericErrorCode: number;
    private httpStatusCode: number;
    private messageVars: string[] = [];

    constructor(code: string, message: string, numericCode: number, httpStatusCode: number) {
        this.errorCode = code;
        this.errorMessage = message;
        this.numericErrorCode = numericCode;
        this.httpStatusCode = httpStatusCode;
    };

    public withVars(...vars: string[]) {
        this.errorMessage = vars.reduce((message, v) => message.replace("{}", v), this.errorMessage);
        this.messageVars = vars;
        return this;
    };

    public withMessage(message: string) {
        this.errorMessage = message;
        return this;
    };

    public get message() {
        return this.errorMessage;
    };

    public get httpStatus() {
        return this.httpStatusCode;
    };

    public build() {
        return {
            errorCode: this.errorCode,
            errorMessage: this.errorMessage,
            messageVars: this.messageVars,
            numericErrorCode: this.numericErrorCode,
            originatingService: "selene",
            intent: "prod"
        };
    };
};

export class HttpException extends Error {
    private err: ErrorBuilder;

    constructor(err: ErrorBuilder) {
        super(err.message);
        this.err = err;
    };

    public withVars(...vars: string[]) {
        this.err.withVars(...vars);
        return this;
    }; 

    public withMessage(message: string) {
        this.err.withMessage(message);
        return this;
    };

    public build() {
        return this.err.build();
    };

    public get message() {
        return this.err.message;
    };

    public get httpStatus() {
        return this.err.httpStatus;
    };
};

export const errors = {
    cloudstorage: {
        file_not_found: new ErrorBuilder("errors.selene.cloudstorage.file_not_found", "Sorry, we couldn't find a system file for {}", 12004, 404),
    },
    common: {
        unknown_error: new ErrorBuilder("errors.selene.common.unknown_error", "An unknown error occurred", 1000, 500),
        invalid_request: new ErrorBuilder("errors.selene.common.invalid_request", "Invalid request", 1013, 400),
    },
    oauth: {
        unsupported_grant_type: new ErrorBuilder("errors.selene.oauth.unsupported_grant_type", "Unsupported grant type: {}", 1016, 400),
        invalid_refresh_token: new ErrorBuilder("errors.selene.oauth.invalid_refresh_token", "Sorry the refresh token '{}' is invalid", 18036, 400),
        invalid_account_credentials: new ErrorBuilder("errors.selene.oauth.invalid_account_credentials", "Sorry the account credentials you are using are invalid", 18031, 400),
        authorization_code_not_found: new ErrorBuilder("errors.selene.oauth.authorization_code_not_found", "Sorry the authorization code you supplied was not found. It is possible that it was no longer valid", 18059, 400),
        exchange_code_not_found: new ErrorBuilder("errors.selene.oauth.exchange_code_not_found", "Sorry the exchange code you supplied was not found. It is possible that it was no longer valid", 18057, 400),
    }
};