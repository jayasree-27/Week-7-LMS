export class ApiResponse<T> {
    status: number;
    data?: T;
    message?: string;
    errors?: any;

    constructor(status: number, data?: T, message?: string, errors?: any) {
        this.status = status;
        this.data = data;
        this.message = message;
        this.errors = errors;
    }
}
