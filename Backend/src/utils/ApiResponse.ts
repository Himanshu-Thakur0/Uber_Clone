class ApiResponse {
    statusCode:number;
    data: any[];
    message:string;
    success:boolean;
    token?: string;

    constructor(statusCode:number , data:any[], message = "success" , token?:string) {
        this.statusCode = statusCode
        this.token = token
        this.data = data
        this.message = message
        this.success = statusCode < 400
    }
}

export { ApiResponse }
