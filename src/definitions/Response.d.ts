import { AxiosResponse } from 'axios';

type Response<T> = AxiosResponse<{
    responseType: number,
    response: T,
}>;

export default Response;
