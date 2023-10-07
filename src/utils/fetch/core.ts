interface IInstanceParameter {
  (
    url: string,
    method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
    params?: {
      body?: BodyInit;
      cache?: "force-cache" | "no-store";
      next?: { revalidate: number };
    },
  ): Promise<any>;
}

interface IGetFetch {
  (
    url: string,
    options?: {
      cache?: "force-cache" | "no-store";
      next?: { revalidate: number };
    },
  ): Promise<any>;
}

interface IPostFetch {
  (url: string, body?: BodyInit): Promise<any>;
}

const instance: IInstanceParameter = async (url, method, params) => {
  const baseUrl = process.env.BASE_URL;

  try {
    const res = await fetch(`${baseUrl}${url}`, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      ...params,
    });

    const data = res.json();

    return data;
  } catch (err) {
    return err;
  }
};

const getFetch: IGetFetch = async (url, options) => {
  try {
    const data = await instance(url, "GET", options);

    return data;
  } catch (err) {
    return err;
  }
};

const postFetch: IPostFetch = async (url, body) => {
  try {
    const data = await instance(url, "POST", { body });

    return data;
  } catch (err) {
    return err;
  }
};

const putFetch: IPostFetch = async (url, body) => {
  try {
    const data = await instance(url, "PUT", { body });

    return data;
  } catch (err) {
    return err;
  }
};

export { getFetch, postFetch, putFetch };
