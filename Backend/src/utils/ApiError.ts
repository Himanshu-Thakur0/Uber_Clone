class ApiError extends Error {
    statusCode?: number;
    data: any;
    success: boolean;
    errors: any[];

    constructor(
        statusCode?:number,
        message = "something went wrong",
        errors:any[] = [],
        stack = ""
    ) {
        super(message);
        this.statusCode = statusCode;
        this.data = null;
        this.message = message;
        this.success = false;
        this.errors = errors;
    }
}

export { ApiError };
