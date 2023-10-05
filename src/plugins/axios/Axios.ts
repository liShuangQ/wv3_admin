import axios, {AxiosRequestConfig} from "axios";
import {ElLoading, ElMessage} from "element-plus";
import qs from 'qs'


export interface MyAxiosRequestConfig extends AxiosRequestConfig {
    throttle?: boolean
    spinning?: boolean
}


export default class Axios {
    private instance;
    private lastTime;
    private throttleTime;
    private loadingInstance: any;

    constructor(config: MyAxiosRequestConfig) {
        this.instance = axios.create(config);
        this.interceptors();
        this.lastTime = 0
        this.throttleTime = 2000
        this.loadingInstance = null
    }

    public request<T, D = ResponseResult<T>>(config: MyAxiosRequestConfig) {
        return new Promise(async (res, rej) => {
            try {
                config.data = qs.stringify(config.data)
                const response = await this.instance.request<D>(config);
                //处理直接返回数据
                res(response.data);
            } catch (error) {
                rej(error);
            }
        }) as Promise<D>;
    }

    public jsonp(url: string, data: any) {
        if (!url)
            throw new Error('url is necessary')
        const callback = 'CALLBACK' + Math.random().toString().substr(9, 18)
        const JSONP = document.createElement('script')
        JSONP.setAttribute('type', 'text/javascript')
        const headEle = document.getElementsByTagName('head')[0]
        let ret = '';
        if (data) {
            if (typeof data === 'string')
                ret = '&' + data;
            else if (typeof data === 'object') {
                for (let key in data)
                    ret += '&' + key + '=' + encodeURIComponent(data[key]);
            }
            ret += '&_time=' + Date.now();
        }
        JSONP.src = `${url}?callback=${callback}${ret}`;
        return new Promise((resolve) => {
            (window as any)[callback] = (r: any) => {
                resolve(r)
                headEle.removeChild(JSONP)
                delete (window as any)[callback]
            }
            headEle.appendChild(JSONP)
        })
    }

    private interceptors() {
        // 添加请求拦截器
        this.interceptorsRequest();
        // 添加响应拦截器
        this.interceptorsResponse();
    }

    private interceptorsRequest() {
        this.instance.interceptors.request.use(
            (config: MyAxiosRequestConfig) => {
                if (config.throttle) {
                    const nowTime = new Date().getTime()

                    if (nowTime - this.lastTime < this.throttleTime) {
                        return Promise.reject({response: {status: 'Throttling'}})
                    }
                    this.lastTime = nowTime
                }
                config.spinning && (this.loadingInstance = ElLoading.service({
                    lock: true,
                    text: 'Loading',
                    background: 'rgba(0, 0, 0, 0.7)',
                }))
                config.headers && (config.headers['X-Token'] = "123")
                return config
            },
            (error) => {
                // 对请求错误做些什么
                return Promise.reject(error);
            }
        );
    }

    private interceptorsResponse() {
        this.instance.interceptors.response.use(
            (response) => {
                this.loadingInstance && this.loadingInstance.close()

                // 2xx 范围内的状态码都会触发该函数。
                return response;
            },
            (error) => {
                this.loadingInstance && this.loadingInstance.close()
                ElMessage.error('请求失败，请联系管理员。')
                // 超出 2xx 范围的状态码都会触发该函数。
                switch (error.response.status) {
                case 'Throttling':
                    break;
                case 401:
                    break;
                case 422:
                    break;
                default:
                }
                return Promise.reject(error);
            }
        );
    }
}
