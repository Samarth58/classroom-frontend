import { GraduationCap, School } from "lucide-react";

export const USER_ROLES = {
    STUDENT: "student",
    TEACHER: "teacher",
    ADMIN: "admin",
};

export const ROLE_OPTIONS = [
    {
        value: USER_ROLES.STUDENT,
        label: "Student",
        icon: GraduationCap,
    },
    {
        value: USER_ROLES.TEACHER,
        label: "Teacher",
        icon: School,
    },
];

export const DEPARTMENTS = [
    "Computer Science",
    "Mathematics",
    "Physics",
    "Chemistry",
    "Biology",
    "English",
    "History",
    "Geography",
    "Economics",
    "Business Administration",
    "Engineering",
    "Psychology",
    "Sociology",
    "Political Science",
    "Philosophy",
    "Education",
    "Fine Arts",
    "Music",
    "Physical Education",
    "Law",
] as const;

export const DEPARTMENT_OPTIONS = DEPARTMENTS.map((dept) => ({
    value: dept,
    label: dept,
}));

export const MAX_FILE_SIZE = 3 * 1024 * 1024; // 3MB in bytes
export const ALLOWED_TYPES = [
    "image/png",
    "image/jpeg",
    "image/jpg",
    "image/webp",
];

import { z } from "zod";

const envSchema = z.object({
    VITE_CLOUDINARY_UPLOAD_URL: z.string().url("Must be a valid URL"),
    VITE_CLOUDINARY_CLOUD_NAME: z.string().min(1, "Cloud name is required"),
    VITE_BACKEND_BASE_URL: z.string().url("Must be a valid URL"),
    VITE_API_URL: z.string().url("Must be a valid URL"),
    VITE_ACCESS_TOKEN_KEY: z.string().min(1, "Access token key is required"),
    VITE_REFRESH_TOKEN_KEY: z.string().min(1, "Refresh token key is required"),
    VITE_CLOUDINARY_UPLOAD_PRESET: z.string().min(1, "Upload preset is required"),
});

const env = envSchema.parse({
    VITE_CLOUDINARY_UPLOAD_URL: import.meta.env.VITE_CLOUDINARY_UPLOAD_URL,
    VITE_CLOUDINARY_CLOUD_NAME: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
    VITE_BACKEND_BASE_URL: import.meta.env.VITE_BACKEND_BASE_URL,
    VITE_API_URL: import.meta.env.VITE_API_URL,
    VITE_ACCESS_TOKEN_KEY: import.meta.env.VITE_ACCESS_TOKEN_KEY,
    VITE_REFRESH_TOKEN_KEY: import.meta.env.VITE_REFRESH_TOKEN_KEY,
    VITE_CLOUDINARY_UPLOAD_PRESET: import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET,
});

export const CLOUDINARY_UPLOAD_URL = env.VITE_CLOUDINARY_UPLOAD_URL;
export const CLOUDINARY_CLOUD_NAME = env.VITE_CLOUDINARY_CLOUD_NAME;
export const BACKEND_BASE_URL = env.VITE_BACKEND_BASE_URL;

export const BASE_URL = import.meta.env.VITE_API_URL;
export const ACCESS_TOKEN_KEY = import.meta.env.VITE_ACCESS_TOKEN_KEY;
export const REFRESH_TOKEN_KEY = import.meta.env.VITE_REFRESH_TOKEN_KEY;
export const REFRESH_TOKEN_URL = `${BASE_URL}/refresh-token`;

export const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

export const teachers = [
    {
        id: "1",
        name: "John Doe",
    },
    {
        id: "2",
        name: "Jane Smith",
    },
    {
        id: "3",
        name: "Dr. Alan Turing",
    },
];

export const subjects = [
    {
        id: 1,
        name: "Mathematics",
        code: "MATH",
    },
    {
        id: 2,
        name: "Computer Science",
        code: "CS",
    },
    {
        id: 3,
        name: "Physics",
        code: "PHY",
    },
    {
        id: 4,
        name: "Chemistry",
        code: "CHEM",
    },
];