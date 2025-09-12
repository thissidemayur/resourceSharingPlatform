interface iApiResponseProps {
  status: number;
  data: any;
  message: string;
}

class ApiResponse {
  statusCode: number;
  data: any;
  message: string;
  success: boolean;
  constructor({ status, data, message = 'success' }: iApiResponseProps) {
    this.statusCode = status;
    this.data = data;
    this.message = message;
    this.success = status < 400;
  }
}

export { ApiResponse };
