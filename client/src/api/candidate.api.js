import api from "./axios";

export const getCandidates = async () => {
    const response = await api.get("/candidates");
    return response.data;
};

export const createCandidate = async (formData) => {
    const response = await api.post("/candidates", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return response.data;
};

export const updateCandidateStatus = async (id, status) => {
    const response = await api.put(`/candidates/${id}/status`, { status });
    return response.data;
};

export const getMetrics = async () => {
    const response = await api.get("/candidates/metrics");
    return response.data;
};

export const deleteCandidate = async (id) => {
    const response = await api.delete(`/candidates/${id}`);
    return response.data;
};
