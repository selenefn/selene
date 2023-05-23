export class ErrorBuilder {
    public errorCode: string;
    public errorMessage: string;
    public numericErrorCode: number;
    public httpStatusCode: number;
    public messageVars: string[] = [];

    constructor(code: string, message: string, numericCode: number, httpStatusCode: number) {
        this.errorCode = code;
        this.errorMessage = message;
        this.numericErrorCode = numericCode;
        this.httpStatusCode = httpStatusCode;
    };

    public with(...vars: string[]) {
        this.errorMessage = vars.reduce((message, v) => message.replace("{}", v), this.errorMessage);
        this.messageVars = vars;
        return this;
    };

    public build() {
        return {
            errorCode: this.errorCode,
            errorMessage: this.errorMessage,
            messageVars: this.messageVars,
            numericErrorCode: this.numericErrorCode,
            originatingService: "selene",
            intent: "prod",
            error_description: this.errorMessage,
            error: this.errorCode
        };
    };
};

export class HttpException extends Error {
    public err: ErrorBuilder;

    constructor(err: ErrorBuilder) {
        super(err.errorMessage);
        this.err = err;
    };

    public with(...vars: string[]) {
        this.err.with(...vars);
        return this;
    }; 

    public build() {
        return this.err.build();
    };
};

export const errors = {
    unsupported_grant_type: new ErrorBuilder("selene.unsupported_grant_type", "Unsupported grant type: {}", 1016, 400),
    unknown: new ErrorBuilder("selene.unknown_error", "An unknown error occurred", 1000, 500),
};