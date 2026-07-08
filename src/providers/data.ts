import {
    createDataProvider,
    CreateDataProviderOptions,
} from "@refinedev/rest";
import { BACKEND_BASE_URL } from "@/constants";
import { CreateResponse, HttpError } from "@refinedev/core";


type ListResponse<T = unknown> = {
    data: T[];
    pagination?: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    };
};

const buildHttpError = async (
    response: Response,
): Promise<HttpError> => {
    let message = "Request failed";

    try {
        const payload = (await response.json()) as {
            message?: string;
            errors?: string[];
        };

        if (payload.message) {
            message = payload.message;
        }
    } catch {
        // Ignore JSON parsing errors
    }

    return {
        message,
        statusCode: response.status,
    };
};

const options: CreateDataProviderOptions = {
    getList: {
        buildQueryParams: async ({ resource, filters }) => {
            const params: Record<string, string> = {};

            filters?.forEach((filter: any) => {
                if (
                    filter &&
                    "field" in filter &&
                    "value" in filter
                ) {
                    const { field, value } = filter;

                    if (resource === "subjects") {
                        if (field === "department") {
                            params.department = String(value);
                        }

                        if (field === "name" || field === "code") {
                            params.search = String(value);
                        }
                    }

                    if (resource === "classes") {
                        if (field === "name") {
                            params.search = String(value);
                        }

                        if (field === "subject") {
                            params.subject = String(value);
                        }

                        if (field === "teacher") {
                            params.teacher = String(value);
                        }
                    }

                    if (resource === "users") {
                        if (field === "role") {
                            params.role = String(value);
                        }

                        if (field === "name" || field === "email") {
                            params.search = String(value);
                        }
                    }
                }
            });

            return params;
        },
        getEndpoint: ({ resource }) => resource,

        mapResponse: async (response) => {
            if (!response.ok) throw await buildHttpError(response.clone());
            const payload: ListResponse = await response.clone().json();

            return payload.data ?? [];
        },

        getTotalCount: async (response) => {
            if (!response.ok) throw await buildHttpError(response.clone());

            const payload: ListResponse = await response.clone().json();

            return (
                payload.pagination?.total ??
                payload.data?.length ??
                0
            );
        },
    },
    create: {
        getEndpoint: ({ resource }) => resource,
        buildBodyParams: async ({ variables }) => variables,
        mapResponse: async (response) => {
            const json: CreateResponse = await response.json();
            return json.data ?? [];
        },


    }
};

const { dataProvider } = createDataProvider(
    BACKEND_BASE_URL,
    options
);

export { dataProvider };