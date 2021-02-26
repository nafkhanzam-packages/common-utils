import axios, {AxiosRequestConfig, AxiosResponse, Method} from "axios";
import {parse as parseCookie} from "cookie";
import NodeFormData from "form-data";
import {serialize as toFormData} from "object-to-formdata";

type QueryType = Record<string, unknown>;
type BodyType = Record<string, unknown>;

var FormDataType: any = globalThis.FormData || NodeFormData;

export type ApiOpt = {
  authorization?: string;
  query?: QueryType;
  body?: BodyType | typeof FormDataType | string;
  contentType?: string;
  axiosProps?: AxiosRequestConfig;
  isFormData?: boolean;
};

const exec = async <T>(
  method: Method,
  url: string,
  opts?: ApiOpt,
): Promise<AxiosResponse<T>> => {
  return (await axios({
    method,
    url,
    headers: {
      Authorization: opts?.authorization,
      "Content-Type": opts?.contentType ?? "application/json",
      ...(opts?.isFormData ? (opts?.body as NodeFormData).getHeaders() : {}),
    },
    params: opts?.query,
    data: opts?.body,
    ...opts?.axiosProps,
  })) as AxiosResponse<T>;
};

export const apiUtils = {
  exec,
  get: async <T>(url: string, opts?: Omit<ApiOpt, "body">) =>
    exec<T>("GET", url, opts),
  post: async <T>(url: string, opts?: ApiOpt) => exec<T>("POST", url, opts),
  put: async <T>(url: string, opts?: ApiOpt) => exec<T>("PUT", url, opts),
  delete: async <T>(url: string, opts?: ApiOpt) => exec<T>("DELETE", url, opts),
  toFormData,
  parseCookie,
};

export class ApiClient {
  public authorization: string;
  constructor(public baseUrl: string, authorization?: string) {
    this.authorization = authorization ?? "";
  }
  async exec<T>(method: Method, url: string, opts?: ApiOpt) {
    return await apiUtils.exec<T>(method, this.toUrl(url), {
      authorization: this.authorization,
      ...opts,
    });
  }

  async get<T>(url: string, opts?: Omit<ApiOpt, "body">) {
    return await this.exec<T>("get", url, opts);
  }

  async post<T>(url: string, opts?: ApiOpt) {
    return await this.exec<T>("post", url, opts);
  }

  async put<T>(url: string, opts?: ApiOpt) {
    return await this.exec<T>("put", url, opts);
  }

  async delete<T>(url: string, opts?: ApiOpt) {
    return await this.exec<T>("delete", url, opts);
  }

  toFormData = apiUtils.toFormData;
  parseCookie = apiUtils.parseCookie;

  private toUrl(url: string) {
    if (url.startsWith("/") && this.baseUrl) {
      url = this.baseUrl + url;
    }
    return url;
  }
}
