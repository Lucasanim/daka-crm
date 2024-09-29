/* eslint-disable @typescript-eslint/no-unsafe-function-type */
import { AxiosError, AxiosResponse } from "axios";
import AxiosInstance from "../../infrastructure/http/AxiosInstance";
import { store } from "../../infrastructure/state/store/Store";
import {
  logout,
  refreshToken,
} from "../../infrastructure/state/reducers/AuthReducer";

export class GenericClient {
  private instance;

  constructor(subPath: string) {
    this.instance = AxiosInstance(subPath);
  }

  /** Refresh the token and retry the request */
  private async retryRequest(request: Function, path: string, body?: object) {
    const tokenData = store.getState().auth?.token;
    await store.dispatch(refreshToken(tokenData));
    return await request(path, body);
  }

  /**
   * Attempts to make a request to a protected route, if it receives a 401 response code
   * refreshes the token and retries the request automatically
   */
  private async withRetrialRequest(
    request: Function,
    path: string,
    body?: object
  ) {
    try {
      return await request(path, body);
    } catch (e) {
      if (e instanceof AxiosError && e.response?.status == 401) {
        try {
          return await this.retryRequest(request, path, body);
        } catch (e) {
          console.log(e);
          await store.dispatch(logout());
        }
      } else {
        throw e;
      }
    }
  }

  get<T>(path: string) {
    return this.withRetrialRequest(
      this.instance.get<T>,
      path
    ) as unknown as AxiosResponse<T>;
  }

  post<T>(path: string, body?: object) {
    return this.withRetrialRequest(
      this.instance.post<T>,
      path,
      body
    ) as unknown as AxiosResponse<T>;
  }

  put<T>(path: string, body?: object) {
    return this.withRetrialRequest(
      this.instance.put<T>,
      path,
      body
    ) as unknown as AxiosResponse<T>;
  }

  delete(path: string, body?: object) {
    return this.withRetrialRequest(this.instance.delete, path, body);
  }
}
